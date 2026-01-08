/**
 * ProgressTracker Component
 *
 * Displays progress through multi-step workflows.
 *
 * Features:
 * - Visual progress bar
 * - Step-by-step breakdown
 * - Current step highlighting
 * - Completion indicators
 *
 * @example
 * ```tsx
 * <ProgressTracker steps={steps} currentStep={2} />
 * ```
 */

import { useState, useCallback } from 'react';
import { CheckCircle, Circle, ChevronDown, ChevronRight } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export interface ProgressStep {
  id: string;
  label: string;
  completed: boolean;
}

export interface ProgressTrackerProps {
  steps: ProgressStep[];
  currentStepIndex: number;
}

export function ProgressTracker({
  steps,
  currentStepIndex,
}: ProgressTrackerProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme } = useTheme();
  const completedCount = steps.filter((s) => s.completed).length;
  const progressPercentage = (completedCount / steps.length) * 100;

  const toggleCollapsed = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  if (steps.length === 0) {
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
        <div
          className="flex items-center justify-between"
          style={{ width: '100%' }}
        >
          <h3 className="text-sm font-bold text-text-primary m-0">Progress</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-muted">
              {completedCount} of {steps.length}
            </span>
            {isCollapsed ? (
              <ChevronRight size={18} color="var(--color-text-muted)" />
            ) : (
              <ChevronDown size={18} color="var(--color-text-muted)" />
            )}
          </div>
        </div>
      </button>

      {!isCollapsed && (
        <>
          {/* Progress bar */}
          <div
            className="rounded-full mb-4"
            style={{
              width: '100%',
              height: '8px',
              backgroundColor: 'var(--color-border)',
              overflow: 'hidden',
            }}
          >
            <div
              className="rounded-full transition"
              style={{
                width: `${progressPercentage}%`,
                height: '100%',
                backgroundColor: 'var(--color-success)',
                transition: 'width 0.3s ease',
              }}
            />
          </div>

          {/* Steps list */}
          <div className="flex flex-col gap-2">
            {steps.map((step, index) => {
              const isCurrent = index === currentStepIndex;
              const isCompleted = step.completed;

              return (
                <div
                  key={step.id}
                  className="flex items-center gap-2 p-2 rounded"
                  style={{
                    backgroundColor: isCurrent
                      ? 'var(--color-background)'
                      : 'transparent',
                    border: isCurrent
                      ? '1px solid var(--color-primary)'
                      : '1px solid transparent',
                  }}
                >
                  {isCompleted ? (
                    <CheckCircle size={18} color="var(--color-success)" />
                  ) : (
                    <Circle
                      size={18}
                      color={
                        isCurrent
                          ? 'var(--color-primary)'
                          : 'var(--color-border)'
                      }
                      fill={isCurrent ? 'var(--color-primary)' : 'transparent'}
                    />
                  )}
                  <span
                    className="text-sm"
                    style={{
                      color: isCompleted
                        ? 'var(--color-text-secondary)'
                        : isCurrent
                          ? 'var(--color-text)'
                          : 'var(--color-text-muted)',
                      fontWeight: isCurrent ? 600 : 400,
                    }}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
