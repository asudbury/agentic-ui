/**
 * ActionWidget Component
 *
 * Interactive button widget for executing specific server actions.
 * Designed for dynamic rendering in agentic UI contexts.
 *
 * Features:
 * - Optional confirmation dialog
 * - Loading state management
 * - Glassmorphism styling
 * - Accessible button with ARIA labels
 *
 * @example
 * ```tsx
 * <ActionWidget
 *   actionId="export_data"
 *   buttonLabel="Download Report"
 *   requiresConfirmation={false}
 *   onAction={(id) => console.log('Action:', id)}
 * />
 * ```
 */

import { useState, useCallback } from 'react';
import { Download, AlertCircle } from 'lucide-react';
import type { ActionWidgetProps } from '../../types/componentRegistry';

export function ActionWidget({
  actionId,
  buttonLabel,
  requiresConfirmation = false,
  onAction,
  className = '',
  style = {},
}: ActionWidgetProps) {
  const [isExecuting, setIsExecuting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClick = useCallback(() => {
    if (requiresConfirmation && !showConfirm) {
      setShowConfirm(true);
      return;
    }

    setIsExecuting(true);

    if (onAction) {
      onAction(actionId);
    }

    // Simulate action completion
    setTimeout(() => {
      setIsExecuting(false);
      setShowConfirm(false);
    }, 1500);
  }, [actionId, onAction, requiresConfirmation, showConfirm]);

  const handleCancel = useCallback(() => {
    setShowConfirm(false);
  }, []);

  return (
    <div
      className={`glass-card p-6 rounded-xl ${className}`}
      style={style}
      role="region"
      aria-label="Action widget"
    >
      {showConfirm ? (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <AlertCircle size={20} style={{ color: 'var(--color-warning)' }} />
            <p
              className="text-sm font-medium"
              style={{ color: 'var(--color-text)' }}
            >
              Are you sure you want to perform this action?
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleClick}
              className="flex-1 p-2 rounded-lg text-sm font-medium transition"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-primary-foreground)',
                cursor: 'pointer',
              }}
              aria-label="Confirm action"
            >
              Confirm
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 p-2 rounded-lg text-sm font-medium transition"
              style={{
                backgroundColor: 'var(--color-surface-secondary)',
                color: 'var(--color-text)',
                cursor: 'pointer',
              }}
              aria-label="Cancel action"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={handleClick}
          disabled={isExecuting}
          className="w-full flex items-center justify-center gap-2 p-3 rounded-lg font-medium transition"
          style={{
            backgroundColor: isExecuting
              ? 'var(--color-surface-secondary)'
              : 'var(--color-primary)',
            color: isExecuting
              ? 'var(--color-text-muted)'
              : 'var(--color-primary-foreground)',
            cursor: isExecuting ? 'not-allowed' : 'pointer',
            opacity: isExecuting ? 0.6 : 1,
          }}
          aria-label={buttonLabel}
          aria-busy={isExecuting}
        >
          <Download size={18} />
          <span>{isExecuting ? 'Executing...' : buttonLabel}</span>
        </button>
      )}
    </div>
  );
}
