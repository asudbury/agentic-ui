/**
 * MetricCard Component
 *
 * Displays a single key metric with optional trend indicator and color coding.
 * Designed for dynamic rendering in agentic UI contexts.
 *
 * Features:
 * - Color-coded visual feedback (red/green/blue/purple)
 * - Trend indicators (up/down/neutral)
 * - Glassmorphism styling
 * - Accessible with ARIA labels
 *
 * @example
 * ```tsx
 * <MetricCard
 *   label="Revenue"
 *   value="$45,230"
 *   trend="up"
 *   color="green"
 * />
 * ```
 */

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { MetricCardProps } from '../../types/componentRegistry';

export function MetricCard({
  label,
  value,
  trend = 'neutral',
  color = 'blue',
  className = '',
  style = {},
}: MetricCardProps) {
  const colorMap = {
    red: 'var(--color-error)',
    green: 'var(--color-success)',
    blue: 'var(--color-info)',
    purple: 'var(--color-agent-thinking)',
  };

  const trendIcons = {
    up: <TrendingUp size={20} />,
    down: <TrendingDown size={20} />,
    neutral: <Minus size={20} />,
  };

  const trendColors = {
    up: 'var(--color-success)',
    down: 'var(--color-error)',
    neutral: 'var(--color-text-muted)',
  };

  const backgroundColor = colorMap[color];
  const trendIcon = trendIcons[trend];
  const trendColor = trendColors[trend];

  return (
    <div
      className={`glass-card p-6 rounded-xl ${className}`}
      style={{
        ...style,
        borderLeft: `4px solid ${backgroundColor}`,
      }}
      role="article"
      aria-label={`Metric: ${label}`}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3
            className="text-sm font-medium"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {label}
          </h3>
          <div style={{ color: trendColor }} aria-label={`Trend: ${trend}`}>
            {trendIcon}
          </div>
        </div>
        <div
          className="text-3xl font-bold"
          style={{ color: 'var(--color-text)' }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}
