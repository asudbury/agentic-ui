/**
 * Component Registry Types
 *
 * Type definitions for the dynamic component registry system that enables
 * AI-driven UI generation. Components are registered with their props schemas
 * and can be dynamically instantiated based on JSON responses.
 */

import type { ComponentType } from 'react';

/**
 * Base interface for all dynamic component props
 */
export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * MetricCard component props for displaying key metrics
 */
export interface MetricCardProps extends BaseComponentProps {
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  color?: 'red' | 'green' | 'blue' | 'purple';
}

/**
 * DataGrid component props for displaying tabular data
 */
export interface DataGridProps extends BaseComponentProps {
  columns: string[];
  data: Record<string, unknown>[];
}

/**
 * ActionWidget component props for interactive actions
 */
export interface ActionWidgetProps extends BaseComponentProps {
  actionId: string;
  buttonLabel: string;
  requiresConfirmation?: boolean;
  onAction?: (actionId: string) => void;
}

/**
 * Schema definition for a UI tool/component
 */
export interface UITool {
  name: string;
  description: string;
  props: Record<string, string>;
}

/**
 * Component definition in the AI response
 */
export interface ComponentDefinition {
  component_name: string;
  props: Record<string, unknown>;
}

/**
 * AI Agent response structure
 */
export interface AgentUIResponse {
  text_response: string;
  ui_components: ComponentDefinition[];
}

/**
 * Component registry map - uses any to allow different component types
 */
export type ComponentRegistry = Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ComponentType<any>
>;
