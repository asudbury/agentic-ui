/**
 * HomePage
 *
 * Main page showcasing the Agentic UI interface.
 *
 * Features:
 * - Goal-oriented input
 * - Real-time agent status
 * - Reasoning panel showing agent's thought process
 * - Activity log of actions
 * - Progress tracking
 * - User controls for agent management
 *
 * @returns JSX.Element representing the Home page with Agentic UI
 */

import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { GoalInput } from '../../components/GoalInput';
import {
  AgentStatus,
  type AgentStatusType,
} from '../../components/AgentStatus';
import {
  ReasoningPanel,
  type ReasoningStep,
} from '../../components/ReasoningPanel';
import { ActivityLog, type Activity } from '../../components/ActivityLog';
import { ControlPanel } from '../../components/ControlPanel';
import {
  ProgressTracker,
  type ProgressStep,
} from '../../components/ProgressTracker';

export function HomePage() {
  const [status, setStatus] = useState<AgentStatusType>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [reasoning, setReasoning] = useState<ReasoningStep[]>([]);
  const [currentThought, setCurrentThought] = useState<string>('');
  const [activities, setActivities] = useState<Activity[]>([]);
  const [steps, setSteps] = useState<ProgressStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const addActivity = useCallback((type: Activity['type'], message: string) => {
    setActivities((prev) => [
      ...prev,
      {
        id: uuidv4(),
        type,
        message,
        timestamp: new Date(),
      },
    ]);
  }, []);

  const simulateAgentWorkflow = useCallback(
    async (goal: string) => {
      setIsActive(true);
      setStatus('thinking');
      setStatusMessage('Analyzing your goal...');
      addActivity('info', `Goal received: ${goal}`);

      // Simulate reasoning steps
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCurrentThought('Breaking down the goal into actionable steps...');

      await new Promise((resolve) => setTimeout(resolve, 1500));
      const step1: ReasoningStep = {
        id: uuidv4(),
        thought: 'Identified key requirements and constraints',
        completed: true,
      };
      setReasoning([step1]);
      setCurrentThought('');

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus('active');
      setStatusMessage('Executing workflow...');
      addActivity('action', 'Started workflow execution');

      // Create progress steps
      const workflowSteps: ProgressStep[] = [
        {
          id: uuidv4(),
          label: 'Research and data gathering',
          completed: false,
        },
        { id: uuidv4(), label: 'Analysis and processing', completed: false },
        { id: uuidv4(), label: 'Solution formulation', completed: false },
        { id: uuidv4(), label: 'Review and refinement', completed: false },
      ];
      setSteps(workflowSteps);

      // Simulate workflow progress
      for (let i = 0; i < workflowSteps.length; i++) {
        // Wait while paused
        while (isPaused) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        setCurrentStepIndex(i);
        setCurrentThought(`Working on: ${workflowSteps[i].label}`);
        addActivity('action', `Started: ${workflowSteps[i].label}`);

        await new Promise((resolve) => setTimeout(resolve, 2000));

        setSteps((prev) =>
          prev.map((step, idx) =>
            idx === i ? { ...step, completed: true } : step
          )
        );

        const reasoningStep: ReasoningStep = {
          id: uuidv4(),
          thought: `Completed ${workflowSteps[i].label}`,
          completed: true,
        };
        setReasoning((prev) => [...prev, reasoningStep]);
        addActivity('action', `Completed: ${workflowSteps[i].label}`);
      }

      setCurrentThought('');
      setStatus('idle');
      setStatusMessage('Workflow completed successfully');
      addActivity('action', 'Workflow completed successfully');
      setIsActive(false);
    },
    [addActivity, isPaused]
  );

  const handleGoalSubmit = useCallback(
    (goal: string) => {
      simulateAgentWorkflow(goal);
    },
    [simulateAgentWorkflow]
  );

  const handlePause = useCallback(() => {
    setIsPaused(true);
    setStatus('paused');
    setStatusMessage('Agent paused');
    addActivity('info', 'Agent paused by user');
  }, [addActivity]);

  const handleResume = useCallback(() => {
    setIsPaused(false);
    setStatus('active');
    setStatusMessage('Resuming workflow...');
    addActivity('info', 'Agent resumed');
  }, [addActivity]);

  const handleStop = useCallback(() => {
    setIsActive(false);
    setIsPaused(false);
    setStatus('idle');
    setStatusMessage('Agent stopped');
    setCurrentThought('');
    addActivity('info', 'Agent stopped by user');
  }, [addActivity]);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <Header />

      <main className="container py-6 flex-1" id="main-content">
        {/* Status Bar */}
        <div
          className="mb-6 p-4 rounded-lg"
          style={{ backgroundColor: 'var(--color-surface)' }}
        >
          <AgentStatus status={status} message={statusMessage} />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Agent Information */}
          <div className="flex flex-col gap-6">
            {isActive && (
              <>
                <ControlPanel
                  isActive={isActive}
                  isPaused={isPaused}
                  onPause={handlePause}
                  onResume={handleResume}
                  onStop={handleStop}
                />

                <ProgressTracker
                  steps={steps}
                  currentStepIndex={currentStepIndex}
                />

                <ReasoningPanel
                  reasoning={reasoning}
                  currentThought={currentThought}
                />
              </>
            )}

            <ActivityLog activities={activities} />
          </div>

          {/* Right Column - User Input */}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                What would you like to achieve?
              </h2>
              <GoalInput onSubmit={handleGoalSubmit} isProcessing={isActive} />
            </div>

            {/* Info Section */}
            {!isActive && activities.length === 0 && (
              <div
                className="p-6 rounded-lg"
                style={{ backgroundColor: 'var(--color-surface)' }}
              >
                <h3 className="text-lg font-bold text-text-primary mb-3">
                  Welcome to Agentic UI
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  This interface demonstrates the principles of agentic AI
                  design:
                </p>
                <ul
                  className="text-sm text-text-secondary"
                  style={{ listStyle: 'disc', paddingLeft: '1.5rem' }}
                >
                  <li className="mb-2">
                    <strong>Goal-oriented:</strong> Describe what you want to
                    achieve, not individual tasks
                  </li>
                  <li className="mb-2">
                    <strong>Transparent reasoning:</strong> See how the agent
                    thinks and makes decisions
                  </li>
                  <li className="mb-2">
                    <strong>User control:</strong> Pause, resume, or stop the
                    agent at any time
                  </li>
                  <li className="mb-2">
                    <strong>Activity tracking:</strong> View a complete history
                    of agent actions
                  </li>
                  <li>
                    <strong>Adaptive workflow:</strong> The agent breaks down
                    complex goals into manageable steps
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
