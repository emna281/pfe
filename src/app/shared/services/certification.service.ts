import { Injectable } from "@angular/core";
import { Apprenant } from "./auth.service";


export interface CertificatBatchConfig {
    formation: string;
    dateDebut: string;
    dateFin: string;
    formateur?: string;
    dureeHeures?: number;
}

@Injectable({ providedIn: 'root' })
export class CertificatService {

    /**
     * Génère et imprime une attestation par apprenant dans une
     * seule fenêtre d'impression (une page A4 paysage par apprenant).
     */
    imprimerToutesLesAttestations(
        apprenants: Apprenant[],
        config: CertificatBatchConfig
    ): void {
        if (!apprenants.length) return;

        const pages = apprenants.map((a, i) =>
            this.genererPageApprenant(a, config, i === apprenants.length - 1)
        ).join('');

        const html = this.enveloppeHTML(pages, config.formation);

        const fenetre = window.open('', '_blank');
        if (!fenetre) {
            alert('Veuillez autoriser les popups pour imprimer les attestations.');
            return;
        }
        fenetre.document.open();
        fenetre.document.write(html);
        fenetre.document.close();

        fenetre.onload = () => {
            setTimeout(() => {
                fenetre.print();
                fenetre.close();
            }, 600);
        };
    }

    // ─── Génération HTML ────────────────────────────────────────────

    private enveloppeHTML(pages: string, titreFormation: string): string {
        return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8"/>
  <title>Attestations – ${this.esc(titreFormation)}</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=IM+Fell+English:ital@0;1&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

    @page {
      size: A4 landscape;
      margin: 0;
    }

    body {
      font-family: 'Cormorant Garamond', Georgia, serif;
      background: #fdf8f0;
    }

    /* ── Chaque page = une attestation ── */
    .page {
      position: relative;
      width: 297mm;
      height: 210mm;
      overflow: hidden;
      page-break-after: always;
      page-break-inside: avoid;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .page:last-child { page-break-after: auto; }

    .bg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: fill;
      z-index: 0;
    }

    .contenu {
      position: relative;
      z-index: 1;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20mm 30mm 14mm;
      gap: 0;
      text-align: center;
    }

    /* ── Typographie ── */
    .titre {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 13pt;
      font-weight: 400;
      letter-spacing: 0.45em;
      text-transform: uppercase;
      color: #8a6d3b;
      margin-top: 5mm;
      margin-bottom: 1.5mm;
    }

    .sous-titre {
      font-size: 8.5pt;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: #a07c45;
      font-weight: 300;
      margin-bottom: 4mm;
    }

    .hr {
      width: 80mm;
      height: 1px;
      background: linear-gradient(to right, transparent, #c9a96e, transparent);
      margin: 2mm auto;
    }

    .intro {
      font-style: italic;
      font-size: 10pt;
      color: #6b5a3e;
      font-weight: 300;
      margin: 3mm 0 1mm;
    }

    .nom {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 26pt;
      font-weight: 700;
      color: #2d1a00;
      margin: 2mm 0 3mm;
      letter-spacing: 0.04em;
      line-height: 1.15;
    }

    .texte-form {
      font-style: italic;
      font-size: 10pt;
      color: #6b5a3e;
      font-weight: 300;
      margin-bottom: 1mm;
    }

    .formation {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 14pt;
      font-style: italic;
      color: #5a3e1b;
      margin: 1mm 0 3mm;
    }

    /* ── Infos grille ── */
    .infos {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8mm;
      margin: 2.5mm 0 4mm;
    }
    .info-item { text-align: center; }
    .info-label {
      font-size: 7pt;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #a07c45;
      font-weight: 300;
    }
    .info-val {
      font-size: 9pt;
      color: #2d1a00;
      font-weight: 400;
    }
    .sep-v {
      width: 1px;
      height: 7mm;
      background: linear-gradient(to bottom, transparent, #c9a96e, transparent);
    }

    /* ── Pied ── */
    .pied {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      width: 100%;
      padding: 0 6mm;
      margin-top: 3mm;
    }
    .num {
      font-size: 7pt;
      color: #b09070;
      letter-spacing: 0.1em;
    }
    .date-em {
      font-size: 8pt;
      font-style: italic;
      color: #8a7060;
    }
    .signature-bloc { text-align: center; }
    .sig-nom {
      font-family: 'IM Fell English', Georgia, serif;
      font-style: italic;
      font-size: 9.5pt;
      color: #2d1a00;
    }
    .sig-line {
      width: 44mm;
      height: 1px;
      background: #c9a96e;
      margin: 1mm auto 1mm;
    }
    .sig-label {
      font-size: 7pt;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #a07c45;
    }

    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
</head>
<body>${pages}</body>
</html>`;
    }

    private genererPageApprenant(
        a: Apprenant,
        cfg: CertificatBatchConfig,
        derniere: boolean
    ): string {
        const nom = `${a.prenom ?? ''} ${a.nom ?? ''}`.trim();
        const dateEmission = new Date().toLocaleDateString('fr-FR', {
            day: 'numeric', month: 'long', year: 'numeric'
        });
        const num = `CERT-${new Date().getFullYear()}-${String(a.id ?? '').padStart(4, '0')}`;

        const infos: string[] = [];

        infos.push(`<div class="info-item">
      <div class="info-label">Du</div>
      <div class="info-val">${this.esc(cfg.dateDebut)}</div>
    </div>`);

        infos.push(`<div class="sep-v"></div>`);

        infos.push(`<div class="info-item">
      <div class="info-label">Au</div>
      <div class="info-val">${this.esc(cfg.dateFin)}</div>
    </div>`);

        if (cfg.dureeHeures) {
            infos.push(`<div class="sep-v"></div>
      <div class="info-item">
        <div class="info-label">Durée</div>
        <div class="info-val">${cfg.dureeHeures}h</div>
      </div>`);
        }

        if (a.posteActuel) {
            infos.push(`<div class="sep-v"></div>
      <div class="info-item">
        <div class="info-label">Poste</div>
        <div class="info-val">${this.esc(a.posteActuel)}</div>
      </div>`);
        }

        return `
<div class="page">
  <img class="bg"
    src="https://res.cloudinary.com/di4oz6m6e/image/upload/v1779704428/att_emna-01_1_agpuo8.jpg"
    alt=""
    onerror="this.style.display='none'" />

  <div class="contenu">
    <div class="titre">Attestation de Formation</div>
    <div class="sous-titre">Formation Professionnelle Continue</div>
    <div class="hr"></div>

    <div class="intro">Il est attesté que</div>
    <div class="nom">${this.esc(nom)}</div>
    <div class="texte-form">a suivi avec succès la formation</div>
    <div class="formation">« ${this.esc(cfg.formation)} »</div>
    <div class="hr"></div>

    <div class="infos">${infos.join('')}</div>

    <div class="pied">
      <div class="num">${num}</div>
      <div class="date-em">Délivré le ${dateEmission}</div>
      <div class="signature-bloc">
        <div class="sig-nom">${cfg.formateur ? this.esc(cfg.formateur) : 'Le Directeur'}</div>
        <div class="sig-line"></div>
        <div class="sig-label">Formateur / Responsable</div>
      </div>
    </div>
  </div>
</div>`;
    }

    private esc(t: string | undefined | null): string {
        return (t ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }
}