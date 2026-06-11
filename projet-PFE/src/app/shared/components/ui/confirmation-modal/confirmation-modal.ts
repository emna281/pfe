import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Type definitions for modal configuration
 */
export type ModalType = 'danger' | 'warning' | 'info';

/**
 * Configuration interface for the confirmation modal
 */
export interface IConfirmationModalConfig {
  visible: boolean;
  titre: string;
  message: string;
  labelConfirmer: string;
  labelAnnuler: string;
  type: ModalType;
}

/**
 * ConfirmationModal Component
 *
 * A reusable confirmation dialog component that displays a modal with:
 * - Customizable title, message, and button labels
 * - Three modal types (info, warning, danger) with corresponding icons and colors
 * - Emits events for confirm/cancel actions
 *
 * @example
 * <app-confirmation-modal
 *   [visible]="isVisible"
 *   type="info"
 *   titre="Confirmation"
 *   message="Are you sure?"
 *   labelConfirmer="Yes"
 *   labelAnnuler="No"
 *   (confirmer)="onConfirm()"
 *   (annuler)="onCancel()">
 * </app-confirmation-modal>
 */
@Component({
  selector: 'app-confirmation-modal',
  imports: [CommonModule],
  templateUrl: './confirmation-modal.html',
  styleUrl: './confirmation-modal.css',
})
export class ConfirmationModal {
  /** Control modal visibility */
  @Input() visible = false;

  /** Modal title heading */
  @Input() titre = 'Confirmation';

  /** Modal body message text */
  @Input() message = 'Êtes-vous sûr ?';

  /** Text for the confirm button */
  @Input() labelConfirmer = 'Confirmer';

  /** Text for the cancel button */
  @Input() labelAnnuler = 'Annuler';

  /** Modal type determines styling and icon */
  @Input() type: ModalType = 'warning';

  /** Emitted when user confirms the action */
  @Output() confirmer = new EventEmitter<void>();

  /** Emitted when user cancels or closes the modal */
  @Output() annuler = new EventEmitter<void>();

  /**
   * Get the icon emoji based on modal type
   */
  getIconByType(type: ModalType): string {
    const icons: Record<ModalType, string> = {
      danger: '🗑️',
      warning: '⚠️',
      info: 'ℹ️',
    };
    return icons[type];
  }

  /**
   * Get the CSS class for button styling based on modal type
   */
  getButtonClass(type: ModalType): string {
    const classes: Record<ModalType, string> = {
      danger: 'bg-red-500',
      warning: 'bg-amber-500',
      info: 'bg-blue-500',
    };
    return classes[type];
  }
}
