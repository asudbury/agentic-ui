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
 *
 * @example
 * ```tsx
 * <ActivityLog activities={activities} />
 * ```
 */

import { CheckCircle, AlertCircle, Info, Clock } from 'lucide-react';

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
    return (
      <div
        className="p-4 rounded-lg text-center"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
        }}
      >
        <p className="text-sm text-text-muted m-0">
          No activities yet. Start by submitting a goal.
        </p>
      </div>
    );
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
        Activity Log
      </h3>

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
  );
}
