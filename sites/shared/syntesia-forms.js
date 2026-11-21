/**
 * SYNTESIA — Moteur Unifié de Validation des Formulaires, Pré-Qualification CRM & Navigation Mobile
 * Version : 2.1 (Pré-Production Complète — Conforme Schéma 15 Colonnes SYNTESIA_CRM_CENTRAL)
 *
 * GARDE-FOU DE SÉCURITÉ :
 * WEBHOOK_ENABLED est strictement maintenu à `false` tant que le fondateur n'a pas donné
 * l'autorisation explicite de mise en ligne commerciale. Aucune requête réseau externe n'est émise.
 */

window.SYNTESIA_CONFIG = {
  ENVIRONMENT: "PREPROD",
  WEBHOOK_ENABLED: false, // NE PAS ACTIVER SANS AUTORISATION EXPLICITE DU FONDATEUR
  WEBHOOK_URL: ""         // [À RENSEIGNER AU GO-LIVE : URL Web App Google Apps Script doPost]
};

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function computePreviewScore(payload) {
  var score = 5;
  var budget = payload.budget || "";
  if (budget.indexOf("5 000") !== -1 || budget.indexOf("15 000") !== -1) score += 3;
  else if (budget.indexOf("2 500") !== -1) score += 2;

  var digits = (payload.telephone || "").replace(/\D/g, "");
  if (digits.length >= 8) score += 1;
  if ((payload.description || "").length > 20) score += 1;

  var vUpper = (payload.verticale || "").toUpperCase();
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
  return score > 10 ? 10 : score;
}

window.initSyntesiaForm = function (formId, feedbackId, defaultMarche, accentColorHex) {
  var form = document.getElementById(formId);
  var feedback = document.getElementById(feedbackId);
  if (!form || !feedback) return;

  var badgeColor = accentColorHex || "#5C6B28";

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // 1. Contrôle Anti-Spam Honeypot unifié (couvre les 4 pages)
    var honeypots = ["website_url", "website_url_dz", "company_website", "business_site"];
    for (var i = 0; i < honeypots.length; i++) {
      var hpField = form.elements[honeypots[i]];
      if (hpField && hpField.value && hpField.value.trim() !== "") {
        window.__LAST_SYNTESIA_STATUS = "FILTERED_HONEYPOT";
        return;
      }
    }

    // 2. Extraction des valeurs
    var nom = form.nom ? form.nom.value.trim() : "";
    var entreprise = form.entreprise ? form.entreprise.value.trim() : "";
    var email = form.email ? form.email.value.trim() : "";
    var tel = form.telephone ? form.telephone.value.trim() : "";
    var verticale = form.verticale ? form.verticale.value : "Transversal / PME";
    var besoin = form.besoin ? form.besoin.value : "";
    var descField = form.description;
    var descRequired = descField ? descField.hasAttribute("required") : false;
    var desc = descField ? descField.value.trim() : "";
    var rgpd = form.rgpd_consent ? form.rgpd_consent.checked : false;

    // 3. Validation des champs obligatoires
    if (!nom || !entreprise || !email || !tel || (descRequired && !desc) || !rgpd) {
      window.__LAST_SYNTESIA_STATUS = "VALIDATION_ERROR_REQUIRED";
      feedback.className = "p-5 border border-[#B84A27] bg-[#FAF9F5] text-xs text-[#B84A27]";
      feedback.innerHTML =
        "<strong>[CONTRÔLE DE SAISIE]</strong> Veuillez renseigner tous les champs obligatoires (*) et cocher la case de consentement RGPD.";
      feedback.classList.remove("hidden");
      return;
    }

    // 4. Validation du format d'adresse e-mail professionnelle
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      window.__LAST_SYNTESIA_STATUS = "VALIDATION_ERROR_EMAIL";
      feedback.className = "p-5 border border-[#B84A27] bg-[#FAF9F5] text-xs text-[#B84A27]";
      feedback.innerHTML =
        "<strong>[FORMAT E-MAIL INVALIDE]</strong> Veuillez saisir une adresse e-mail professionnelle valide (ex: direction@entreprise.fr).";
      feedback.classList.remove("hidden");
      return;
    }

    // 5. Validation du format téléphone (minimum 8 chiffres)
    var telDigits = tel.replace(/\D/g, "");
    if (telDigits.length < 8) {
      window.__LAST_SYNTESIA_STATUS = "VALIDATION_ERROR_PHONE";
      feedback.className = "p-5 border border-[#B84A27] bg-[#FAF9F5] text-xs text-[#B84A27]";
      feedback.innerHTML =
        "<strong>[FORMAT TÉLÉPHONE INVALIDE]</strong> Veuillez saisir un numéro de téléphone valide comportant au moins 8 chiffres.";
      feedback.classList.remove("hidden");
      return;
    }

    // 6. Assemblage normalisé de la charge utile (Schéma 15 colonnes SYNTESIA_CRM_CENTRAL)
    var maturiteVal = "Non précisée";
    if (form.maturite && form.maturite.value && form.maturite.value.trim() !== "") {
      maturiteVal = form.maturite.value.trim();
    } else if (form.effectif && form.effectif.value) {
      maturiteVal = "Effectif: " + form.effectif.value;
    }

    var payload = {
      marche: (form.marche && form.marche.value) ? form.marche.value : (defaultMarche || "France"),
      verticale: verticale,
      entreprise: entreprise,
      nom: nom,
      email: email,
      telephone: tel,
      besoin: besoin,
      maturite: maturiteVal,
      budget: (form.budget && form.budget.value) ? form.budget.value : "À qualifier",
      description: desc || "Demande d'étude opérationnelle sectorielle",
      test_mode: window.SYNTESIA_CONFIG.ENVIRONMENT === "PREPROD"
    };

    var scorePreview = computePreviewScore(payload);
    payload.score_preview = scorePreview;
    window.__LAST_SYNTESIA_PAYLOAD = payload;

    // 7. Branchement conditionnel : Mode Pré-Production (local) vs Mode Production (si autorisé)
    if (window.SYNTESIA_CONFIG.WEBHOOK_ENABLED === true && window.SYNTESIA_CONFIG.WEBHOOK_URL) {
      feedback.className = "p-5 border border-[#161513] bg-[#FAF9F5] text-xs text-[#161513]";
      feedback.innerHTML = "<span class='font-mono-mark'>[TRANSMISSION SÉCURISÉE EN COURS...]</span>";
      feedback.classList.remove("hidden");

      fetch(window.SYNTESIA_CONFIG.WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          window.__LAST_SYNTESIA_STATUS = "WEBHOOK_SENT";
          feedback.className = "p-6 border border-[#161513] bg-[#EAE9E2] text-xs text-[#161513] space-y-2";
          feedback.innerHTML =
            "<div class='font-mono-mark' style='color:" + badgeColor + "'>[DEMANDE D'ÉTUDE ENREGISTRÉE &mdash; RÉF : " + escapeHtml(data.idLead || "CRM-OK") + "]</div>" +
            "<p class='text-sm font-semibold'>Merci " + escapeHtml(nom) + " (" + escapeHtml(entreprise) + ").</p>" +
            "<p class='text-[#464440] leading-relaxed'>Votre demande pour le secteur <strong>" + escapeHtml(verticale) + "</strong> a bien été transmise à notre équipe d'ingénierie.</p>";
          form.reset();
        })
        .catch(function () {
          window.__LAST_SYNTESIA_STATUS = "WEBHOOK_ERROR";
          feedback.className = "p-5 border border-[#B84A27] bg-[#FAF9F5] text-xs text-[#B84A27]";
          feedback.innerHTML =
            "<strong>[INTERRUPTION RÉSEAU]</strong> Le serveur de réception est momentanément indisponible. Vos données n'ont pas été effacées ; veuillez réessayer dans un instant.";
        });
      return;
    }

    // Mode Pré-Production par défaut (zéro appel réseau externe)
    window.__LAST_SYNTESIA_STATUS = "PREPROD_VALIDATED";
    feedback.className = "p-6 border border-[#161513] bg-[#EAE9E2] text-xs text-[#161513] space-y-2";
    feedback.innerHTML =
      "<div class='font-mono-mark' style='color:" + badgeColor + "'>[PRÉ-DIAGNOSTIC QUALIFIÉ &mdash; VALIDATION LOCALE PRÉ-PRODUCTION (" + scorePreview + "/10)]</div>" +
      "<p class='text-sm font-semibold'>Merci " + escapeHtml(nom) + " (" + escapeHtml(entreprise) + ").</p>" +
      "<p class='text-[#464440] leading-relaxed'>Votre demande pour le marché <strong>" + escapeHtml(payload.marche) + "</strong> &middot; secteur <strong>" + escapeHtml(verticale) + "</strong> portant sur <em>« " + escapeHtml(besoin) + " »</em> a été validée et structurée au format exact du CRM central SYNTESIA (15 colonnes).</p>" +
      "<p class='font-mono text-xs text-[#6E6B65] pt-2 border-t border-[#D5D4CC]'>État technique : WEBHOOK_ENABLED = false (Pré-production). Aucune donnée n'est transmise sur le réseau tant que l'activation commerciale n'est pas déclenchée par le fondateur.</p>";
    feedback.classList.remove("hidden");
    form.reset();
  });
};

window.initSyntesiaMobileNav = function () {
  var btn = document.getElementById("synMobileMenuBtn");
  var menu = document.getElementById("synMobileMenuPanel");
  if (!btn || !menu) return;

  btn.addEventListener("click", function () {
    var isHidden = menu.classList.contains("hidden");
    if (isHidden) {
      menu.classList.remove("hidden");
      btn.setAttribute("aria-expanded", "true");
    } else {
      menu.classList.add("hidden");
      btn.setAttribute("aria-expanded", "false");
    }
  });

  var links = menu.querySelectorAll("a");
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function () {
      menu.classList.add("hidden");
      btn.setAttribute("aria-expanded", "false");
    });
  }
};

document.addEventListener("DOMContentLoaded", function () {
  window.initSyntesiaMobileNav();
});
