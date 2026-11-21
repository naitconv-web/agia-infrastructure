/**
 * AGIA — Ingestion Webhook & CRM Engine (Google Apps Script)
 * 
 * Instructions de déploiement :
 * 1. Ouvrir le fichier CRM Google Sheets : ID 1EmC6f4ljLU2GZmD9HEBt50WdTlVXoQtPQ64vFQL1I_0
 * 2. Menu Extensions > Apps Script
 * 3. Coller ce code et déployer en "Application Web" (Exécuter en tant que : Moi, Accès : Tout le monde)
 * 4. Utiliser l'URL de déploiement générée comme endpoint d'envoi dans les formulaires web.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var rawData = e.postData ? e.postData.contents : null;
    var data;
    
    if (rawData) {
      try {
        data = JSON.parse(rawData);
      } catch (err) {
        data = e.parameter;
      }
    } else {
      data = e.parameter;
    }

    var sheetId = "1EmC6f4ljLU2GZmD9HEBt50WdTlVXoQtPQ64vFQL1I_0";
    var ss = SpreadsheetApp.openById(sheetId);
    var leadsSheet = ss.getSheetByName("01_PROSPECTS_LEADS");

    var idLead = "LEAD-" + Utilities.formatDate(new Date(), "GMT+1", "yyyyMMdd-HHmmss");
    var dateEntree = Utilities.formatDate(new Date(), "GMT+1", "yyyy-MM-dd HH:mm:ss");
    var marche = data.marche || "France";
    var entreprise = data.entreprise || "N/A";
    var contactNom = data.nom || "N/A";
    var email = data.email || "N/A";
    var telephone = data.telephone || "";
    var besoin = data.besoin || "";
    var maturite = data.maturite || "Non précisée";
    var budget = data.budget || "Non précisé";
    var description = data.description || "";

    // Calcul du score de qualification algorithmique (1 à 10)
    var score = 5; // Base
    if (budget.indexOf("5 000") !== -1 || budget.indexOf("15 000") !== -1) score += 3;
    else if (budget.indexOf("2 500") !== -1) score += 2;
    if (telephone.length >= 8) score += 1;
    if (description.length > 30) score += 1;
    if (score > 10) score = 10;

    var statut = "NOUVEAU";
    var notes = "Capture Web. Besoin: " + besoin + " | Détails: " + description;

    // Ajout dans le CRM Google Sheets
    leadsSheet.appendRow([
      idLead, dateEntree, marche, entreprise, contactNom, email, telephone,
      besoin, maturite, budget, score, statut, notes
    ]);

    // Notification Email immédiate au Dirigeant
    var notificationSubject = "🚨 [NOUVEAU LEAD AGIA] " + entreprise + " (" + marche + ") — Score: " + score + "/10";
    var notificationBody = "Un nouveau prospect a soumis une demande d'analyse :\n\n" +
      "ID Lead : " + idLead + "\n" +
      "Entreprise : " + entreprise + "\n" +
      "Contact : " + contactNom + "\n" +
      "Email : " + email + "\n" +
      "Téléphone : " + telephone + "\n" +
      "Marché : " + marche + "\n" +
      "Besoin : " + besoin + "\n" +
      "Budget estimé : " + budget + "\n" +
      "Score de qualification : " + score + "/10\n" +
      "Description : " + description + "\n\n" +
      "Lien CRM : https://docs.google.com/spreadsheets/d/" + sheetId;

    // Envoi via MailApp (quota Google Workspace standard)
    try {
      MailApp.sendEmail(Session.getActiveUser().getEmail(), notificationSubject, notificationBody);
    } catch (mailErr) {
      Logger.log("Notification email non envoyée: " + mailErr);
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
