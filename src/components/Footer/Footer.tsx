/**
 * Footer Component
 *
 * Application footer with version information.
 *
 * Features:
 * - Version number display
 * - Responsive design
 * - Accessible
 *
 * @example
 * ```tsx
 * <Footer />
 * ```
 */

import { version } from '../../../package.json';

export function Footer() {
  return (
    <footer
      className="border-color mt-6"
      style={{ borderTop: '1px solid var(--color-border)' }}
    >
      <div className="container p-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <p className="text-xs text-text-muted m-0">
            © 2026 Agentic UI. Built with React and TypeScript.
          </p>
          <p className="text-xs text-text-muted m-0">Version {version}</p>
        </div>
      </div>
    </footer>
  );
}
