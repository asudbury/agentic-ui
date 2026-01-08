/**
 * ReasoningPanel Component
 *
 * Displays the agent's reasoning process and thought chain.
 *
 * Features:
 * - Shows agent's current thinking
 * - Displays decision rationale
 * - Animated reveal of reasoning steps
 *
 * @example
 * ```tsx
 * <ReasoningPanel reasoning={reasoningSteps} />
 * ```
 */

import { useState, useCallback } from 'react';
import { Brain, CheckCircle, ChevronDown, ChevronRight } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export interface ReasoningStep {
  id: string;
  thought: string;
  completed: boolean;
}

export interface ReasoningPanelProps {
  reasoning: ReasoningStep[];
  currentThought?: string;
}

export function ReasoningPanel({
  reasoning,
  currentThought,
}: ReasoningPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme } = useTheme();

  const toggleCollapsed = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  if (reasoning.length === 0 && !currentThought) {
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
        <div className="flex items-center gap-2">
          <Brain size={20} color="var(--color-agent-thinking)" />
          <h3 className="text-sm font-bold text-text-primary m-0">
            Agent Reasoning
          </h3>
        </div>
        {isCollapsed ? (
          <ChevronRight size={18} color="var(--color-text-muted)" />
        ) : (
          <ChevronDown size={18} color="var(--color-text-muted)" />
        )}
      </button>

      {!isCollapsed && (
        <div className="flex flex-col gap-2">
          {reasoning.map((step, index) => (
            <div
              key={step.id}
              className="flex items-start gap-2 p-2 rounded animate-slide-in"
              style={{
                backgroundColor: 'var(--color-background)',
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="mt-1">
                {step.completed ? (
                  <CheckCircle size={16} color="var(--color-success)" />
                ) : (
                  <div
                    className="rounded-full"
                    style={{
                      width: '16px',
                      height: '16px',
                      backgroundColor: 'var(--color-agent-thinking)',
                      animation: 'pulse 2s infinite',
                    }}
                  />
                )}
              </div>
              <p
                className="text-sm m-0"
                style={{
                  color: step.completed
                    ? 'var(--color-text-secondary)'
                    : 'var(--color-text)',
                  opacity: step.completed ? 0.7 : 1,
                }}
              >
                {step.thought}
              </p>
            </div>
          ))}

          {currentThought && (
            <div
              className="flex items-start gap-2 p-2 rounded animate-slide-in"
              style={{
                backgroundColor: 'var(--color-background)',
                border: '1px solid var(--color-agent-thinking)',
              }}
            >
              <div className="mt-1">
                <div
                  className="rounded-full"
                  style={{
                    width: '16px',
                    height: '16px',
                    backgroundColor: 'var(--color-agent-thinking)',
                    animation: 'pulse 2s infinite',
                  }}
                />
              </div>
              <p className="text-sm text-text-primary m-0 font-medium">
                {currentThought}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
