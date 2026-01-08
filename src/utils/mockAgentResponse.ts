/**
 * Mock Agent Response Generator
 *
 * Simulates AI agent responses for demonstration purposes.
 * In a production environment, this would be replaced with actual
 * Gemini 3.0 API calls.
 */

import type { AgentUIResponse } from '../types/componentRegistry';

/**
 * Generate a mock agent response based on user goal
 *
 * @param goal - The user's goal/query
 * @returns A simulated agent UI response with components
 */
export function generateMockAgentResponse(goal: string): AgentUIResponse {
  const lowerGoal = goal.toLowerCase();

  // Sales/Revenue related goals
  if (
    lowerGoal.includes('sales') ||
    lowerGoal.includes('revenue') ||
    lowerGoal.includes('q4') ||
    lowerGoal.includes('metrics')
  ) {
    return {
      text_response:
        "Here's your Q4 sales analysis with key metrics and detailed breakdown.",
      ui_components: [
        {
          component_name: 'MetricCard',
          props: {
            label: 'Total Revenue',
            value: '$245,890',
            trend: 'up',
            color: 'green',
          },
        },
        {
          component_name: 'MetricCard',
          props: {
            label: 'Growth Rate',
            value: '12.5%',
            trend: 'up',
            color: 'blue',
          },
        },
        {
          component_name: 'MetricCard',
          props: {
            label: 'Churn Rate',
            value: '2.4%',
            trend: 'down',
            color: 'green',
          },
        },
        {
          component_name: 'DataGrid',
          props: {
            columns: ['Month', 'Revenue', 'Orders', 'Avg Order Value'],
            data: [
              {
                Month: 'October',
                Revenue: '$78,450',
                Orders: '542',
                'Avg Order Value': '$144.74',
              },
              {
                Month: 'November',
                Revenue: '$82,120',
                Orders: '589',
                'Avg Order Value': '$139.42',
              },
              {
                Month: 'December',
                Revenue: '$85,320',
                Orders: '612',
                'Avg Order Value': '$139.41',
              },
            ],
          },
        },
        {
          component_name: 'ActionWidget',
          props: {
            actionId: 'export_q4_report',
            buttonLabel: 'Download Full Report (CSV)',
            requiresConfirmation: false,
          },
        },
      ],
    };
  }

  // Marketing related goals
  if (
    lowerGoal.includes('marketing') ||
    lowerGoal.includes('campaign') ||
    lowerGoal.includes('product launch')
  ) {
    return {
      text_response:
        "I've created a comprehensive marketing strategy with key performance indicators.",
      ui_components: [
        {
          component_name: 'MetricCard',
          props: {
            label: 'Campaign Budget',
            value: '$50,000',
            trend: 'neutral',
            color: 'blue',
          },
        },
        {
          component_name: 'MetricCard',
          props: {
            label: 'Expected ROI',
            value: '3.2x',
            trend: 'up',
            color: 'purple',
          },
        },
        {
          component_name: 'DataGrid',
          props: {
            columns: ['Channel', 'Budget', 'Expected Reach', 'CPA'],
            data: [
              {
                Channel: 'Social Media',
                Budget: '$20,000',
                'Expected Reach': '150K',
                CPA: '$8.50',
              },
              {
                Channel: 'Email Marketing',
                Budget: '$10,000',
                'Expected Reach': '80K',
                CPA: '$5.20',
              },
              {
                Channel: 'Content Marketing',
                Budget: '$15,000',
                'Expected Reach': '100K',
                CPA: '$7.80',
              },
              {
                Channel: 'Paid Search',
                Budget: '$5,000',
                'Expected Reach': '30K',
                CPA: '$12.50',
              },
            ],
          },
        },
        {
          component_name: 'ActionWidget',
          props: {
            actionId: 'approve_marketing_plan',
            buttonLabel: 'Approve Marketing Plan',
            requiresConfirmation: true,
          },
        },
      ],
    };
  }

  // Travel/Trip planning related goals
  if (
    lowerGoal.includes('trip') ||
    lowerGoal.includes('travel') ||
    lowerGoal.includes('flights') ||
    lowerGoal.includes('hotel')
  ) {
    return {
      text_response:
        "I've organized your trip itinerary with costs and booking options.",
      ui_components: [
        {
          component_name: 'MetricCard',
          props: {
            label: 'Total Trip Cost',
            value: '$2,450',
            trend: 'neutral',
            color: 'blue',
          },
        },
        {
          component_name: 'DataGrid',
          props: {
            columns: ['Item', 'Details', 'Cost', 'Status'],
            data: [
              {
                Item: 'Flight',
                Details: 'SFO-LAX Round Trip',
                Cost: '$380',
                Status: 'Available',
              },
              {
                Item: 'Hotel',
                Details: 'Marriott Downtown (3 nights)',
                Cost: '$720',
                Status: 'Available',
              },
              {
                Item: 'Rental Car',
                Details: 'Compact (3 days)',
                Cost: '$210',
                Status: 'Reserved',
              },
              {
                Item: 'Meals & Misc',
                Details: 'Estimated daily expenses',
                Cost: '$540',
                Status: 'Budget',
              },
              {
                Item: 'Meeting Room',
                Details: 'Conference space (2 hours)',
                Cost: '$600',
                Status: 'Pending',
              },
            ],
          },
        },
        {
          component_name: 'ActionWidget',
          props: {
            actionId: 'book_trip',
            buttonLabel: 'Proceed with Booking',
            requiresConfirmation: true,
          },
        },
      ],
    };
  }

  // Default/Generic response
  return {
    text_response:
      "I've analyzed your goal and created a dashboard with relevant insights.",
    ui_components: [
      {
        component_name: 'MetricCard',
        props: {
          label: 'Tasks Identified',
          value: '8',
          trend: 'neutral',
          color: 'blue',
        },
      },
      {
        component_name: 'MetricCard',
        props: {
          label: 'Estimated Duration',
          value: '2-3 days',
          trend: 'neutral',
          color: 'purple',
        },
      },
      {
        component_name: 'DataGrid',
        props: {
          columns: ['Task', 'Priority', 'Status'],
          data: [
            { Task: 'Initial Research', Priority: 'High', Status: 'Pending' },
            { Task: 'Data Analysis', Priority: 'High', Status: 'Pending' },
            {
              Task: 'Report Generation',
              Priority: 'Medium',
              Status: 'Pending',
            },
            { Task: 'Review & Approval', Priority: 'Low', Status: 'Pending' },
          ],
        },
      },
      {
        component_name: 'ActionWidget',
        props: {
          actionId: 'start_workflow',
          buttonLabel: 'Start Automated Workflow',
          requiresConfirmation: false,
        },
      },
    ],
  };
}
