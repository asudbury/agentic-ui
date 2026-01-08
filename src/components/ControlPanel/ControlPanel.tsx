/**
 * ControlPanel Component
 *
 * Provides user controls for managing agent execution.
 *
 * Features:
 * - Pause/resume agent
 * - Stop execution
 * - Adjust autonomy level
 * - Clear controls UI
 *
 * @example
 * ```tsx
 * <ControlPanel
 *   isActive={true}
 *   onPause={handlePause}
 *   onStop={handleStop}
 *   onResume={handleResume}
 * />
 * ```
 */

import { useCallback } from 'react';
import { Pause, Play, StopCircle } from 'lucide-react';

export interface ControlPanelProps {
  isActive: boolean;
  isPaused: boolean;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
}

export function ControlPanel({
  isActive,
  isPaused,
  onPause,
  onResume,
  onStop,
}: ControlPanelProps) {
  const handlePause = useCallback(() => {
    onPause();
  }, [onPause]);

  const handleResume = useCallback(() => {
    onResume();
  }, [onResume]);

  const handleStop = useCallback(() => {
    onStop();
  }, [onStop]);

  if (!isActive) {
    return null;
  }

  return (
    <div
      className="p-4 rounded-lg"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
      }}
    >
      <h3 className="text-sm font-bold text-text-primary mb-3 mt-0">
        Agent Controls
      </h3>

      <div className="flex gap-2">
        {!isPaused ? (
          <button
            onClick={handlePause}
            className="flex-1 flex items-center justify-center gap-2 p-3 rounded-lg font-medium transition"
            style={{
              backgroundColor: 'var(--color-warning)',
              color: 'white',
            }}
            aria-label="Pause agent"
          >
            <Pause size={18} />
            <span>Pause</span>
          </button>
        ) : (
          <button
            onClick={handleResume}
            className="flex-1 flex items-center justify-center gap-2 p-3 rounded-lg font-medium transition"
            style={{
              backgroundColor: 'var(--color-success)',
              color: 'white',
            }}
            aria-label="Resume agent"
          >
            <Play size={18} />
            <span>Resume</span>
          </button>
        )}

        <button
          onClick={handleStop}
          className="flex-1 flex items-center justify-center gap-2 p-3 rounded-lg font-medium transition"
          style={{
            backgroundColor: 'var(--color-error)',
            color: 'white',
          }}
          aria-label="Stop agent"
        >
          <StopCircle size={18} />
          <span>Stop</span>
        </button>
      </div>

      <div
        className="mt-3 p-3 rounded"
        style={{ backgroundColor: 'var(--color-background)' }}
      >
        <p className="text-xs text-text-muted m-0">
          💡 You can interrupt the agent at any time to provide feedback or
          change direction.
        </p>
      </div>
    </div>
  );
}
