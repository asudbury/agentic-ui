/**
 * ActivityLog Component
 *
 * Displays a timeline of agent actions and decisions.
 *
 * Features:
 * - Chronological list of actions
 * - Color-coded by action type
 * - Timestamps for each action
 * - Icons for visual distinction
 * - Collapsible with default collapsed state
 *
 * @example
 * ```tsx
 * <ActivityLog activities={activities} />
 * ```
 */

import { useState, useCallback } from 'react';
import {
  CheckCircle,
  AlertCircle,
  Info,
  Clock,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export type ActivityType = 'action' | 'decision' | 'info' | 'error';

export interface Activity {
  id: string;
  type: ActivityType;
  message: string;
  timestamp: Date;
}

export interface ActivityLogProps {
  activities: Activity[];
}

export function ActivityLog({ activities }: ActivityLogProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme } = useTheme();

  const toggleExpanded = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'action':
        return <CheckCircle size={16} color="var(--color-success)" />;
      case 'decision':
        return <Info size={16} color="var(--color-info)" />;
      case 'error':
        return <AlertCircle size={16} color="var(--color-error)" />;
      default:
        return <Clock size={16} color="var(--color-text-muted)" />;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  if (activities.length === 0) {
    return null;
  }

  return (
    <div
      className="rounded-lg"
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
        onClick={toggleExpanded}
        className="w-full flex items-center justify-between p-4 text-left transition"
        style={{
          cursor: 'pointer',
          background: 'none',
          border: 'none',
        }}
        aria-expanded={isExpanded}
        aria-controls="activity-log-content"
      >
        <h3 className="text-sm font-bold text-text-primary m-0">
          Activity Log ({activities.length})
        </h3>
        {isExpanded ? (
          <ChevronDown size={20} color="var(--color-text-secondary)" />
        ) : (
          <ChevronRight size={20} color="var(--color-text-secondary)" />
        )}
      </button>

      {isExpanded && (
        <div id="activity-log-content" className="px-4 pb-4">
          <div className="flex flex-col gap-2">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded animate-slide-in"
                style={{
                  backgroundColor: 'var(--color-background)',
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                <div className="mt-1">{getActivityIcon(activity.type)}</div>
                <div className="flex-1">
                  <p className="text-sm text-text-primary m-0 mb-1">
                    {activity.message}
                  </p>
                  <p className="text-xs text-text-muted m-0">
                    {formatTime(activity.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
