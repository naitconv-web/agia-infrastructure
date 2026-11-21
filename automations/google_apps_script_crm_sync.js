/**
 * SYNTESIA — Ingestion Webhook & CRM Engine (Google Apps Script)
 * 
 * Version : 2.0 (Audit Lot 1 - Support des Verticales Métiers, Anti-Spam & RGPD)
 * 
 * RAPPEL DE SÉCURITÉ :
 * Ce script est préparé pour le déploiement mais N'EST PAS activé en production sans autorisation explicite.
 * 
 * Instructions de déploiement (lorsque le feu vert sera donné) :
 * 1. Ouvrir le tableur CRM : ID 1EmC6f4ljLU2GZmD9HEBt50WdTlVXoQtPQ64vFQL1I_0
 * 2. Menu Extensions > Apps Script
 * 3. Remplacer par ce code et déployer en "Application Web" (Exécuter en tant que : Moi, Accès : Tout le monde)
 * 4. Déclarer l'URL générée comme endpoint d'ingestion.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Protection contre la concurrence et les doubles soumissions
  if (!lock.tryLock(10000)) {
    return ContentService.createTextOutput(JSON.stringify({
      result: "error",
      message: "Serveur occupé, veuillez réessayer dans quelques instants."
    })).setMimeType(ContentService.MimeType.JSON);
  }

  try {
    var rawData = e.postData ? e.postData.contents : null;
    var data = {};
    
    if (rawData) {
      try {
        data = JSON.parse(rawData);
      } catch (err) {
        data = e.parameter || {};
      }
    } else {
      data = e.parameter || {};
    }

    // 1. Contrôle Anti-Spam Honeypot (couvre les 4 formulaires France, Algérie, Sécurité, BTP)
    // Si l'un des champs invisibles est rempli, la requête est silencieusement ignorée
    if (data.website_url || data.website_url_dz || data.company_website || data.business_site) {
      return ContentService.createTextOutput(JSON.stringify({
        result: "success",
        note: "Filtered by honeypot"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // 2. Contrôle de validité minimal des données
    if (!data.nom || (!data.email && !data.telephone)) {
      return ContentService.createTextOutput(JSON.stringify({
        result: "error",
        message: "Nom et au moins un moyen de contact (email ou téléphone) sont obligatoires."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    var sheetId = "1EmC6f4ljLU2GZmD9HEBt50WdTlVXoQtPQ64vFQL1I_0";
    var ss = SpreadsheetApp.openById(sheetId);
    var leadsSheet = ss.getSheetByName("01_PROSPECTS_LEADS");

    var idLead = "LEAD-" + Utilities.formatDate(new Date(), "GMT+1", "yyyyMMdd-HHmmss");
    var dateEntree = Utilities.formatDate(new Date(), "GMT+1", "yyyy-MM-dd HH:mm:ss");
    var marche = data.marche || "France";
    var verticale = data.verticale || "Transversal / Autre PME";
    var entreprise = data.entreprise || "N/A";
    var contactNom = data.nom || "N/A";
    var email = data.email || "N/A";
    var telephone = data.telephone || "";
    var besoin = data.besoin || "";
    var maturite = data.maturite || (data.effectif ? "Effectif: " + data.effectif : (data.volume_devis ? "Volume devis: " + data.volume_devis : "Non précisée"));
    var budget = data.budget || "À qualifier";
    var description = data.description || "";
    var environnement = (data.test_mode === true || data.is_test === "true") ? "TEST" : "PROD";

    // 3. Calcul du Score de Qualification (1 à 10) aligné sur le Catalogue Sectoriel AGIA-005
    var score = 5; // Base
    if (budget.indexOf("5 000") !== -1 || budget.indexOf("15 000") !== -1) score += 3;
    else if (budget.indexOf("2 500") !== -1) score += 2;
    if (telephone.replace(/\D/g, "").length >= 8) score += 1;
    if (description.length > 20) score += 1;
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
      score += 1; // Alignement sur les verticales prioritaires et le socle du fondateur
    }
    if (score > 10) score = 10;

    var statut = (environnement === "TEST") ? "TEST_QUALIFIE" : ((score >= 7) ? "QUALIFIE" : "NOUVEAU");
    var notes = "Capture Web. Verticale: " + verticale + " | Besoin: " + besoin + " | Détails: " + description;

    // 4. Insertion stricte conforme au schéma 15 colonnes de 01_PROSPECTS_LEADS :
    // A: ID_Lead, B: Date_Entree, C: Marche, D: Verticale_Metier, E: Entreprise, F: Contact_Nom, G: Email,
    // H: Telephone, I: Besoin_Principal, J: Maturite_IA, K: Budget_Estime, L: Score_Qualification,
    // M: Statut, N: Notes_Diagnostic, O: Environnement
    leadsSheet.appendRow([
      idLead, dateEntree, marche, verticale, entreprise, contactNom, email, telephone,
      besoin, maturite, budget, score, statut, notes, environnement
    ]);

    // 5. Alerte interne uniquement pour les leads réels (non-test)
    if (environnement !== "TEST") {
      var notificationSubject = "🚨 [NOUVEAU LEAD SYNTESIA] " + entreprise + " (" + verticale + ") — Score: " + score + "/10";
      var notificationBody = "Une nouvelle demande d'étude a été soumise sur le site SYNTESIA :\n\n" +
        "ID Lead : " + idLead + "\n" +
        "Marché : " + marche + "\n" +
        "Verticale : " + verticale + "\n" +
        "Entreprise : " + entreprise + "\n" +
        "Contact : " + contactNom + "\n" +
        "Email : " + email + "\n" +
        "Téléphone : " + telephone + "\n" +
        "Besoin exprimé : " + besoin + "\n" +
        "Contexte / Détails : " + description + "\n" +
        "Score calculé : " + score + "/10\n\n" +
        "Consulter le CRM : https://docs.google.com/spreadsheets/d/" + sheetId;

      try {
        MailApp.sendEmail(Session.getActiveUser().getEmail(), notificationSubject, notificationBody);
      } catch (mailErr) {
        Logger.log("Alerte email non distribuée : " + mailErr);
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      result: "success",
      idLead: idLead,
      score: score
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      result: "error",
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
