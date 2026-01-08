/**
 * GoalInput Component
 *
 * Goal-oriented input field for users to specify objectives rather than tasks.
 *
 * Features:
 * - Large textarea for complex goal descriptions
 * - Accessible with proper labels
 * - Submit button with loading state
 * - Example suggestions
 *
 * @example
 * ```tsx
 * <GoalInput onSubmit={handleGoalSubmit} isProcessing={false} />
 * ```
 */

import { useState, useCallback, type FormEvent } from 'react';
import { Send } from 'lucide-react';

export interface GoalInputProps {
  onSubmit: (goal: string) => void;
  isProcessing?: boolean;
}

export function GoalInput({ onSubmit, isProcessing = false }: GoalInputProps) {
  const [goal, setGoal] = useState('');

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (goal.trim() && !isProcessing) {
        onSubmit(goal.trim());
        setGoal('');
      }
    },
    [goal, isProcessing, onSubmit]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setGoal(e.target.value);
    },
    []
  );

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLTextAreaElement>) => {
      e.target.style.borderColor = 'var(--color-primary)';
    },
    []
  );

  const handleBlur = useCallback((e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'var(--color-border)';
  }, []);

  const handleExampleClick = useCallback(
    (example: string) => () => {
      if (!isProcessing) {
        setGoal(example);
        // Auto-submit when selecting example goal
        onSubmit(example);
      }
    },
    [isProcessing, onSubmit]
  );

  const examples = [
    {
      id: 'example-1',
      text: 'Plan a 3-day business trip to San Francisco including flights, hotels, and meeting schedules',
    },
    {
      id: 'example-2',
      text: 'Create a comprehensive marketing strategy for our new product launch',
    },
    {
      id: 'example-3',
      text: 'Analyze our Q4 sales data and provide insights with visualization recommendations',
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          id="goal-input"
          value={goal}
          onChange={handleChange}
          placeholder="Describe your goal or objective in detail..."
          className="p-4 rounded-lg text-base resize-none"
          style={{
            minHeight: '120px',
            backgroundColor: 'var(--color-background)',
            border: '2px solid var(--color-border)',
            color: 'var(--color-text)',
            outline: 'none',
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={isProcessing}
          aria-label="Goal input"
        />
        <button
          type="submit"
          disabled={!goal.trim() || isProcessing}
          className="flex items-center justify-center gap-2 p-3 rounded-lg font-medium transition"
          style={{
            backgroundColor:
              goal.trim() && !isProcessing
                ? 'var(--color-primary)'
                : 'var(--color-border)',
            color:
              goal.trim() && !isProcessing
                ? 'var(--color-primary-foreground)'
                : 'var(--color-text-muted)',
            cursor: goal.trim() && !isProcessing ? 'pointer' : 'not-allowed',
            opacity: goal.trim() && !isProcessing ? 1 : 0.6,
          }}
        >
          <Send size={18} />
          <span>{isProcessing ? 'Processing...' : 'Send'}</span>
        </button>
      </form>

      <div className="flex flex-col gap-2">
        <p className="text-xs text-text-muted font-medium">Example goals:</p>
        <div className="flex flex-col gap-2">
          {examples.map((example) => (
            <button
              key={example.id}
              onClick={handleExampleClick(example.text)}
              className="text-left p-3 rounded-lg text-sm transition cursor-pointer"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              key={example}
                cursor: 'pointer',
              }}
              disabled={isProcessing}
            >
              {example.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
