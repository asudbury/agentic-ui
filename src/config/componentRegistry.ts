/**
 * Component Registry Configuration
 *
 * Central registry of UI components available for dynamic rendering.
 * This registry maps component names to their React component implementations
 * and defines the tools available to the AI agent.
 */

import { MetricCard } from '../components/MetricCard';
import { DataGrid } from '../components/DataGrid';
import { ActionWidget } from '../components/ActionWidget';
import type { UITool, ComponentRegistry } from '../types/componentRegistry';

/**
 * UI Tools available to the AI agent
 *
 * These definitions inform the AI about what components can be rendered
 * and what props each component accepts.
 */
export const UI_TOOLS: UITool[] = [
  {
    name: 'MetricCard',
    description:
      'Displays a single key metric with a trend indicator. Use for KPIs, stats, or important numbers.',
    props: {
      label: 'string - The metric name or label',
      value: 'string | number - The metric value to display',
      trend: 'up | down | neutral - Optional trend direction',
      color: 'red | green | blue | purple - Optional color scheme',
    },
  },
  {
    name: 'DataGrid',
    description:
      'Displays a table of data rows. Use for showing multiple records or structured data.',
    props: {
      columns: 'array of strings - Column headers',
      data: 'array of objects - Data rows where keys match column names',
    },
  },
  {
    name: 'ActionWidget',
    description:
      'A button/form to perform a specific action. Use for triggering operations like exports, downloads, or confirmations.',
    props: {
      actionId: 'string - Unique identifier for the action',
      buttonLabel: 'string - Text to display on the button',
      requiresConfirmation: 'boolean - Whether to show confirmation dialog',
    },
  },
];

/**
 * Component registry map
 *
 * Maps component names from AI responses to actual React components.
 * Add new components here to make them available for dynamic rendering.
 */
export const COMPONENT_MAP: ComponentRegistry = {
  MetricCard,
  DataGrid,
  ActionWidget,
};
