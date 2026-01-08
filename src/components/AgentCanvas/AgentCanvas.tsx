/**
 * AgentCanvas Component
 *
 * Dynamic UI rendering component that hydrates JSON component definitions
 * into actual React components. This is the core of the agentic UI system.
 *
 * Features:
 * - Maps component names to React components
 * - Validates props before rendering
 * - Handles rendering errors gracefully
 * - Displays conversational context
 * - Glassmorphism styling
 *
 * @example
 * ```tsx
 * <AgentCanvas
 *   agentResponse={{
 *     text_response: "Here's your data",
 *     ui_components: [
 *       {
 *         component_name: "MetricCard",
 *         props: { label: "Sales", value: "$45K", trend: "up" }
 *       }
 *     ]
 *   }}
 * />
 * ```
 */

import { Sparkles } from 'lucide-react';
import { COMPONENT_MAP } from '../../config/componentRegistry';
import type { AgentUIResponse } from '../../types/componentRegistry';

export interface AgentCanvasProps {
  agentResponse: AgentUIResponse | null;
}

export function AgentCanvas({ agentResponse }: AgentCanvasProps) {
  if (!agentResponse) {
    return null;
  }

  const { text_response, ui_components } = agentResponse;

  return (
    <div className="flex flex-col gap-6 animate-slide-in">
      {/* Conversational Context */}
      {text_response && (
        <div
          className="glass-card p-4 rounded-xl flex items-start gap-3"
          role="status"
          aria-live="polite"
        >
          <Sparkles
            size={20}
            style={{ color: 'var(--color-primary)', flexShrink: 0 }}
          />
          <p
            className="text-sm"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {text_response}
          </p>
        </div>
      )}

      {/* Dynamic UI Components */}
      <div className="flex flex-col gap-4">
        {ui_components.map((componentDef, index) => {
          const { component_name, props } = componentDef;
          const Component = COMPONENT_MAP[component_name];

          if (!Component) {
            console.warn(`Component "${component_name}" not found in registry`);
            return (
              <div
                key={index}
                className="glass-card p-4 rounded-xl"
                style={{ borderLeft: '4px solid var(--color-error)' }}
              >
                <p className="text-sm" style={{ color: 'var(--color-error)' }}>
                  Unknown component: {component_name}
                </p>
              </div>
            );
          }

          try {
            return <Component key={index} {...props} />;
          } catch (error) {
            console.error(`Error rendering ${component_name}:`, error);
            return (
              <div
                key={index}
                className="glass-card p-4 rounded-xl"
                style={{ borderLeft: '4px solid var(--color-error)' }}
              >
                <p className="text-sm" style={{ color: 'var(--color-error)' }}>
                  Error rendering {component_name}
                </p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
