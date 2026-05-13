import { Injectable , PLATFORM_ID, Inject} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { FactureResponseDTO } from '../../services/facture-service'; 

@Injectable({ providedIn: 'root' })
export class PdfExportService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  async exportFactures(factures: FactureResponseDTO[]): Promise<void> {
    
    if (!isPlatformBrowser(this.platformId)) return;

    const html2canvas = (await import('html2canvas')).default;
    const { default: jsPDF } = await import('jspdf');
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    for (let i = 0; i < factures.length; i++) {
      const facture = factures[i];

      // Créer un div temporaire dans le DOM
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '0';
      container.style.width = '794px';
      container.style.backgroundColor = '#ffffff';
      container.innerHTML = this.buildFactureHtml(facture);
      document.body.appendChild(container);

      // Attendre le rendu
      await new Promise(r => setTimeout(r, 200));

      const canvas = await html2canvas(container);

      document.body.removeChild(container);

      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    }

    pdf.save(`factures-export.pdf`);
  }

  private buildFactureHtml(f: FactureResponseDTO): string {
    return `
      <div style="padding: 40px; font-family: Arial, sans-serif; color: #1f2937;">

        <!-- En-tête -->
        <div style="display: flex; justify-content: space-between; margin-bottom: 32px;">
          <div>
            <h1 style="font-size: 28px; font-weight: bold;">FACTURE</h1>
            <p style="color: #6b7280;">${f.numeroFacture}</p>
          </div>
          <div style="text-align: right;">
            <p style="font-weight: 600;">Centre de Formation</p>
            <p style="color: #6b7280; font-size: 14px;">contact@centre.tn</p>
          </div>
        </div>

        <div style="height: 2px; background: #e5e7eb; margin-bottom: 32px;"></div>

        <!-- Apprenant + dates -->
        <div style="display: flex; justify-content: space-between; margin-bottom: 32px;">
          <div>
            <p style="font-size: 12px; color: #6b7280; text-transform: uppercase; margin-bottom: 8px;">Facturé à</p>
            <p style="font-weight: 600;">${f.apprenantPrenom} ${f.apprenantNom}</p>
            <p style="color: #6b7280; font-size: 14px;">${f.apprenantEmail || ''}</p>
          </div>
          <div style="text-align: right;">
            <p style="font-size: 12px; color: #6b7280; text-transform: uppercase; margin-bottom: 8px;">Détails</p>
            <p style="font-size: 14px;">Date émission : <strong>${f.dateEmission}</strong></p>
            <p style="font-size: 14px;">Date échéance : <strong>${f.dateEcheance || '-'}</strong></p>
            <p style="font-size: 14px;">Statut : <strong>${f.statut}</strong></p>
          </div>
        </div>

        <!-- Tableau prestation -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
          <thead>
            <tr style="background: #f9fafb;">
              <th style="text-align: left; padding: 12px; font-size: 13px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Formation</th>
              <th style="text-align: left; padding: 12px; font-size: 13px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Session</th>
              <th style="text-align: right; padding: 12px; font-size: 13px; color: #6b7280; border-bottom: 1px solid #e5e7eb;">Montant HT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 12px; font-size: 14px;">${f.formationTitre}</td>
              <td style="padding: 12px; font-size: 14px;">${f.sessionNom}</td>
              <td style="padding: 12px; font-size: 14px; text-align: right;">${Number(f.montantHT).toFixed(2)} TND</td>
            </tr>
          </tbody>
        </table>

        <!-- Totaux -->
        <div style="display: flex; justify-content: flex-end; margin-bottom: 32px;">
          <div style="width: 280px;">
            <div style="display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px;">
              <span style="color: #6b7280;">Montant HT</span>
              <span>${Number(f.montantHT).toFixed(2)} TND</span>
            </div>
            ${f.remise ? `
            <div style="display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px;">
              <span style="color: #6b7280;">Remise</span>
              <span style="color: #ef4444;">- ${f.remise}%</span>
            </div>` : ''}
            <div style="display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px;">
              <span style="color: #6b7280;">TVA (20%)</span>
              <span>${Number(f.montantTVA).toFixed(2)} TND</span>
            </div>
            <div style="height: 1px; background: #e5e7eb; margin: 8px 0;"></div>
            <div style="display: flex; justify-content: space-between; padding: 8px 0; font-size: 16px; font-weight: bold;">
              <span>Total TTC</span>
              <span>${Number(f.montantTTC).toFixed(2)} TND</span>
            </div>
          </div>
        </div>

        <!-- Notes -->
        ${f.notes ? `
        <div style="background: #f9fafb; padding: 16px; border-radius: 8px;">
          <p style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">Notes</p>
          <p style="font-size: 14px;">${f.notes}</p>
        </div>` : ''}

      </div>
    `;
  }
}