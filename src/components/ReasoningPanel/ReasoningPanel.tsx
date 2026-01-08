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

import { Brain, CheckCircle } from 'lucide-react';

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
  if (reasoning.length === 0 && !currentThought) {
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
      <div className="flex items-center gap-2 mb-3">
        <Brain size={20} color="var(--color-agent-thinking)" />
        <h3 className="text-sm font-bold text-text-primary m-0">
          Agent Reasoning
        </h3>
      </div>

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
    </div>
  );
}
