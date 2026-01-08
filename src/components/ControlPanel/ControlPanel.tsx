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

import { useCallback, useState } from 'react';
import {
  Pause,
  Play,
  StopCircle,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

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
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme } = useTheme();

  const handlePause = useCallback(() => {
    onPause();
  }, [onPause]);

  const handleResume = useCallback(() => {
    onResume();
  }, [onResume]);

  const handleStop = useCallback(() => {
    onStop();
  }, [onStop]);

  const toggleCollapsed = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  if (!isActive) {
    return null;
  }

  return (
    <div
      className="p-4 rounded-lg"
      style={{
        backgroundColor:
          theme === 'dark'
            ? 'rgba(30, 41, 59, 0.85)'
            : 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border:
          theme === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow:
          theme === 'dark'
            ? '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
            : '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      }}
    >
      <button
        onClick={toggleCollapsed}
        className="flex items-center justify-between w-full mb-3 cursor-pointer"
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
        }}
        aria-expanded={!isCollapsed}
      >
        <h3 className="text-sm font-bold text-text-primary m-0">
          Agent Controls
        </h3>
        {isCollapsed ? (
          <ChevronRight size={18} color="var(--color-text-muted)" />
        ) : (
          <ChevronDown size={18} color="var(--color-text-muted)" />
        )}
      </button>

      {!isCollapsed && (
        <>
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
        </>
      )}
    </div>
  );
}
