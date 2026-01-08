/**
 * Header Component
 *
 * Application header with branding and theme toggle.
 *
 * Features:
 * - Responsive design
 * - Theme toggle button
 * - Accessible navigation
 *
 * @example
 * ```tsx
 * <Header />
 * ```
 */

import { useCallback } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  const handleToggleTheme = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  return (
    <header
      className="bg-surface border-color"
      style={{ borderBottom: '1px solid var(--color-border)' }}
    >
      <div className="container flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div
            className="bg-primary"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              className="text-2xl"
              role="img"
              aria-label="AI assistant logo"
            >
              🤖
            </span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-primary m-0">
              Agentic UI
            </h1>
            <p className="text-xs text-text-muted m-0">
              Autonomous AI Assistant
            </p>
          </div>
        </div>

        <button
          onClick={handleToggleTheme}
          className="flex items-center justify-center p-2 rounded-lg transition"
          style={{
            backgroundColor: 'var(--color-surface-secondary)',
            border: '1px solid var(--color-border)',
          }}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            <Moon size={20} color="var(--color-text)" />
          ) : (
            <Sun size={20} color="var(--color-text)" />
          )}
        </button>
      </div>
    </header>
  );
}
