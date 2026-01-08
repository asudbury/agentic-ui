/**
 * AgentStatus Component
 *
 * Displays the current status of the AI agent with visual indicators.
 *
 * Features:
 * - Status badge with color coding
 * - Animated pulse for active states
 * - Clear status text
 *
 * @example
 * ```tsx
 * <AgentStatus status="thinking" message="Analyzing your request..." />
 * ```
 */

export type AgentStatusType =
  | 'idle'
  | 'thinking'
  | 'active'
  | 'paused'
  | 'error';

export interface AgentStatusProps {
  status: AgentStatusType;
  message?: string;
}

export function AgentStatus({ status, message }: AgentStatusProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'thinking':
        return {
          color: 'var(--color-agent-thinking)',
          label: 'Thinking',
          animate: true,
        };
      case 'active':
        return {
          color: 'var(--color-agent-active)',
          label: 'Active',
          animate: true,
        };
      case 'paused':
        return {
          color: 'var(--color-agent-paused)',
          label: 'Paused',
          animate: false,
        };
      case 'error':
        return {
          color: 'var(--color-agent-error)',
          label: 'Error',
          animate: false,
        };
      default:
        return {
          color: 'var(--color-text-muted)',
          label: 'Idle',
          animate: false,
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <div
          className="rounded-full"
          style={{
            width: '10px',
            height: '10px',
            backgroundColor: config.color,
            animation: config.animate ? 'pulse 2s infinite' : 'none',
          }}
        />
        <span className="text-sm font-medium" style={{ color: config.color }}>
          {config.label}
        </span>
      </div>
      {message && (
        <span className="text-sm text-text-secondary">{message}</span>
      )}
    </div>
  );
}
