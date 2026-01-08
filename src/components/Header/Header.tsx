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
import { Moon, Sun, Sparkles } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { AgentStatus, type AgentStatusType } from '../AgentStatus';

export interface HeaderProps {
  status?: AgentStatusType;
  statusMessage?: string;
}

export function Header({ status, statusMessage }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  const handleToggleTheme = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  return (
    <header
      className="bg-surface border-color"
      style={{ borderBottom: '1px solid var(--color-border)' }}
    >
      <div
        className="container p-4"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        {/* Left: Logo and branding */}
        <div className="flex items-center gap-4">
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
            <Sparkles size={24} color="white" />
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

        {/* Center: Agent Status */}
        <div
          className="flex items-center justify-center"
          style={{ justifySelf: 'center' }}
        >
          {status && (
            <AgentStatus status={status} message={statusMessage || ''} />
          )}
        </div>

        {/* Right: Theme toggle */}
        <div className="flex items-center justify-end">
          <button
            onClick={handleToggleTheme}
            className="flex items-center justify-center p-2 rounded-lg transition cursor-pointer"
            style={{
              backgroundColor: 'var(--color-surface-secondary)',
              border: '1px solid var(--color-border)',
              cursor: 'pointer',
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
      </div>
    </header>
  );
}
