/**
 * DataGrid Component
 *
 * Displays tabular data in an accessible, styled grid format.
 * Designed for dynamic rendering in agentic UI contexts.
 *
 * Features:
 * - Responsive table layout
 * - Glassmorphism styling
 * - Accessible table markup
 * - Alternating row colors for readability
 *
 * @example
 * ```tsx
 * <DataGrid
 *   columns={['Name', 'Email', 'Status']}
 *   data={[
 *     { Name: 'John Doe', Email: 'john@example.com', Status: 'Active' },
 *     { Name: 'Jane Smith', Email: 'jane@example.com', Status: 'Pending' }
 *   ]}
 * />
 * ```
 */

import type { DataGridProps } from '../../types/componentRegistry';

export function DataGrid({
  columns,
  data,
  className = '',
  style = {},
}: DataGridProps) {
  return (
    <div
      className={`glass-card p-6 rounded-xl overflow-auto ${className}`}
      style={style}
      role="region"
      aria-label="Data table"
    >
      <table
        className="w-full"
        style={{
          borderCollapse: 'collapse',
        }}
      >
        <thead>
          <tr
            style={{
              borderBottom: `2px solid var(--color-border)`,
            }}
          >
            {columns.map((column) => (
              <th
                key={column}
                className="text-left p-3 font-semibold text-sm"
                style={{
                  color: 'var(--color-text)',
                }}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              style={{
                borderBottom: `1px solid var(--color-border)`,
                backgroundColor:
                  rowIndex % 2 === 0
                    ? 'transparent'
                    : 'var(--color-surface-secondary)',
              }}
            >
              {columns.map((column) => (
                <td
                  key={`${rowIndex}-${column}`}
                  className="p-3 text-sm"
                  style={{
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  {String(row[column] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div
          className="text-center p-6 text-sm"
          style={{ color: 'var(--color-text-muted)' }}
        >
          No data available
        </div>
      )}
    </div>
  );
}
