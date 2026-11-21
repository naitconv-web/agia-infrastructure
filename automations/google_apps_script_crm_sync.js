/**
 * SYNTESIA — Ingestion Webhook & CRM Engine (Google Apps Script)
 *
 * Version : 2.2 (Recette AGIA-009 — Anti-Injection CWE-1236, Anti-Doublon, Scoring Unifié & Zéro PII Logs)
 *
 * RAPPEL DE SÉCURITÉ :
 * Ce script est préparé pour le déploiement mais N'EST PAS activé en production sans autorisation explicite.
 *
 * Instructions de déploiement (lorsque le feu vert sera donné par le fondateur) :
 * 1. Ouvrir le tableur CRM : ID 1EmC6f4ljLU2GZmD9HEBt50WdTlVXoQtPQ64vFQL1I_0
 * 2. Menu Extensions > Apps Script
 * 3. Remplacer par ce code et déployer en "Application Web" (Exécuter en tant que : Moi, Accès : Tout le monde)
 * 4. Déclarer l'URL générée comme endpoint d'ingestion dans sites/shared/syntesia-forms.js.
 */

function sanitizeSheetField(str, maxLen) {
  var limit = maxLen || 500;
  var cleaned = String(str || "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, " ")
    .trim();
  if (cleaned.length > limit) {
    cleaned = cleaned.substring(0, limit);
  }
  if (/^[=+\-@|%]/.test(cleaned)) {
    cleaned = "'" + cleaned;
  }
  return cleaned;
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Protection contre la concurrence et les doubles soumissions simultanées
  if (!lock.tryLock(10000)) {
    return ContentService.createTextOutput(JSON.stringify({
      result: "error",
      code: "LOCK_TIMEOUT",
      message: "Serveur occupé, veuillez réessayer dans quelques instants."
    })).setMimeType(ContentService.MimeType.JSON);
  }

  try {
    var rawData = (e && e.postData) ? e.postData.contents : null;
    var data = {};

    if (rawData) {
      if (rawData.length > 15000) {
        return ContentService.createTextOutput(JSON.stringify({
          result: "error",
          code: "PAYLOAD_TOO_LARGE",
          message: "Volume de données excessif."
        })).setMimeType(ContentService.MimeType.JSON);
      }
      try {
        data = JSON.parse(rawData);
      } catch (err) {
        data = (e && e.parameter) ? e.parameter : {};
      }
    } else {
      data = (e && e.parameter) ? e.parameter : {};
    }

    // 1. Contrôle Anti-Spam Honeypot (couvre les 4 formulaires France, Algérie, Sécurité, BTP)
    if (data.website_url || data.website_url_dz || data.company_website || data.business_site) {
      return ContentService.createTextOutput(JSON.stringify({
        result: "success",
        note: "Filtered by honeypot"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // 2. Contrôle de validité serveur des champs requis et formats
    var rawNom = String(data.nom || "").trim();
    var rawEmail = String(data.email || "").trim();
    var rawTel = String(data.telephone || "").trim();
    var rawDesc = String(data.description || "").trim();

    if (!rawNom || (!rawEmail && !rawTel)) {
      return ContentService.createTextOutput(JSON.stringify({
        result: "error",
        code: "MISSING_REQUIRED_FIELDS",
        message: "Nom et au moins un moyen de contact (email ou téléphone) sont obligatoires."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var emailRegex = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/;
    if (rawEmail && (!emailRegex.test(rawEmail) || rawEmail.length > 150)) {
      return ContentService.createTextOutput(JSON.stringify({
        result: "error",
        code: "INVALID_EMAIL",
        message: "Format d'adresse e-mail invalide."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var allowedPhoneChars = /^[+\d\s().\-/]{8,25}$/;
    var telDigits = rawTel.replace(/\D/g, "");
    if (rawTel && (!allowedPhoneChars.test(rawTel) || telDigits.length < 8 || telDigits.length > 15)) {
      return ContentService.createTextOutput(JSON.stringify({
        result: "error",
        code: "INVALID_PHONE",
        message: "Format de numéro de téléphone invalide (8 à 15 chiffres requis)."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var sheetId = "1EmC6f4ljLU2GZmD9HEBt50WdTlVXoQtPQ64vFQL1I_0";
    var ss = SpreadsheetApp.openById(sheetId);
    var leadsSheet = ss.getSheetByName("01_PROSPECTS_LEADS");

    var now = new Date();
    var suffix = Math.floor(1000 + Math.random() * 9000);
    var environnement = (data.test_mode === true || data.is_test === "true") ? "TEST" : "PROD";
    var prefix = (environnement === "TEST") ? "LEAD-TEST-" : "LEAD-";
    var idLead = prefix + Utilities.formatDate(now, "Europe/Paris", "yyyyMMdd-HHmmss") + "-" + suffix;
    var dateEntree = Utilities.formatDate(now, "Europe/Paris", "yyyy-MM-dd HH:mm:ss");

    var marche = sanitizeSheetField(data.marche || "France", 40);
    var verticale = sanitizeSheetField(data.verticale || "Transversal / Autre PME", 120);
    var entreprise = sanitizeSheetField(data.entreprise || "N/A", 150);
    var contactNom = sanitizeSheetField(rawNom, 120);
    var email = sanitizeSheetField(rawEmail || "N/A", 150);
    var telephone = sanitizeSheetField(rawTel, 40);
    var besoin = sanitizeSheetField(data.besoin || "", 200);
    var rawMaturite = data.maturite || (data.effectif ? "Effectif: " + data.effectif : (data.volume_devis ? "Volume devis: " + data.volume_devis : "Non précisée"));
    var maturite = sanitizeSheetField(rawMaturite, 150);
    var rawBudget = data.budget || (data.effectif ? "Calibre: " + data.effectif : "À qualifier");
    var budget = sanitizeSheetField(rawBudget, 120);
    var description = sanitizeSheetField(rawDesc, 2000);

    // 3. Contrôle de dédoublonnage sur les 25 dernières lignes du CRM
    var lastRow = leadsSheet.getLastRow();
    if (lastRow > 1) {
      var startRow = Math.max(2, lastRow - 24);
      var numRows = lastRow - startRow + 1;
      var recentRows = leadsSheet.getRange(startRow, 1, numRows, 15).getValues();
      for (var r = 0; r < recentRows.length; r++) {
        var existingVerticale = String(recentRows[r][3] || "").trim();
        var existingEmail = String(recentRows[r][6] || "").trim().toLowerCase();
        var existingBesoin = String(recentRows[r][8] || "").trim();
        var existingEnv = String(recentRows[r][14] || "").trim();
        if (
          existingEmail === email.toLowerCase() &&
          existingVerticale === verticale &&
          existingBesoin === besoin &&
          existingEnv === environnement
        ) {
          return ContentService.createTextOutput(JSON.stringify({
            result: "duplicate",
            code: "DUPLICATE_LEAD",
            message: "Une demande identique est déjà enregistrée dans le CRM."
          })).setMimeType(ContentService.MimeType.JSON);
        }
      }
    }

    // 4. Calcul du Score de Qualification (1 à 10) unifié avec syntesia-forms.js et orchestrate_crm.py
    var score = 5;
    var combinedCalibre = (budget + " | " + maturite).toUpperCase();
    if (
      combinedCalibre.indexOf("5 000") !== -1 ||
      combinedCalibre.indexOf("15 000") !== -1 ||
      combinedCalibre.indexOf("50 À 150") !== -1 ||
      combinedCalibre.indexOf("> 150") !== -1 ||
      combinedCalibre.indexOf("ETI") !== -1
    ) {
      score += 3;
    } else if (
      combinedCalibre.indexOf("2 500") !== -1 ||
      combinedCalibre.indexOf("10 À 49") !== -1 ||
      combinedCalibre.indexOf("15 À 50") !== -1 ||
      combinedCalibre.indexOf("PME") !== -1
    ) {
      score += 2;
    } else if (
      combinedCalibre.indexOf("TPE") !== -1 ||
      combinedCalibre.indexOf("1 À 9") !== -1 ||
      combinedCalibre.indexOf("1 À 15") !== -1
    ) {
      score += 1;
    }

    if (telDigits.length >= 8 && telDigits.length <= 15) score += 1;
    if (rawDesc.length > 20 && rawDesc !== "Demande d'étude opérationnelle sectorielle") score += 1;

    var vUpper = verticale.toUpperCase();
    if (
      vUpper.indexOf("SÉCURITÉ") !== -1 ||
      vUpper.indexOf("SECURITE") !== -1 ||
      vUpper.indexOf("BÂTIMENT") !== -1 ||
      vUpper.indexOf("BATIMENT") !== -1 ||
      vUpper.indexOf("BTP") !== -1 ||
      vUpper.indexOf("RÉNOVATION") !== -1 ||
      vUpper.indexOf("RENOVATION") !== -1 ||
      vUpper.indexOf("HCR") !== -1 ||
      vUpper.indexOf("CGP") !== -1
    ) {
      score += 1;
    }
    if (score > 10) score = 10;

    var statut = (environnement === "TEST")
      ? ((score >= 7) ? "TEST_QUALIFIE" : "TEST_NOUVEAU")
      : ((score >= 7) ? "QUALIFIE" : "NOUVEAU");

    var notes = sanitizeSheetField(
      (environnement === "TEST" ? "[DONNEE_TEST] " : "Capture Web. ") +
      "Verticale: " + verticale + " | Besoin: " + besoin + " | Détails: " + description,
      2500
    );

    // 5. Insertion stricte conforme au schéma 15 colonnes de 01_PROSPECTS_LEADS :
    // A: ID_Lead, B: Date_Entree, C: Marche, D: Verticale_Metier, E: Entreprise, F: Contact_Nom, G: Email,
    // H: Telephone, I: Besoin_Principal, J: Maturite_IA, K: Budget_Estime, L: Score_Qualification,
    // M: Statut, N: Notes_Diagnostic, O: Environnement
    leadsSheet.appendRow([
      idLead, dateEntree, marche, verticale, entreprise, contactNom, email, telephone,
      besoin, maturite, budget, score, statut, notes, environnement
    ]);

    // 6. Alerte interne uniquement pour les leads réels (non-test), sans journaliser de PII dans Logger.log
    if (environnement !== "TEST") {
      var notificationSubject = "[NOUVEAU LEAD SYNTESIA] " + idLead + " (" + marche + " - Score: " + score + "/10)";
      var notificationBody = "Une nouvelle demande d'étude a été enregistrée dans le CRM SYNTESIA :\n\n" +
        "ID Lead : " + idLead + "\n" +
        "Marché : " + marche + "\n" +
        "Verticale : " + verticale + "\n" +
        "Score calculé : " + score + "/10\n" +
        "Statut : " + statut + "\n\n" +
        "Consulter la fiche complète dans le CRM sécurisé : https://docs.google.com/spreadsheets/d/" + sheetId;

      try {
        MailApp.sendEmail(Session.getActiveUser().getEmail(), notificationSubject, notificationBody);
      } catch (mailErr) {
        Logger.log("Alerte email non distribuée pour " + idLead);
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      result: "success",
      idLead: idLead,
      score: score,
      statut: statut,
      environnement: environnement
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("Erreur technique d'ingestion CRM (sans PII) : " + error.name);
    return ContentService.createTextOutput(JSON.stringify({
      result: "error",
      code: "INTERNAL_ERROR",
      message: "Une erreur interne est survenue lors du traitement de la demande."
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
