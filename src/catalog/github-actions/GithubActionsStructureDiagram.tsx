import React from "react";
import {
  BaseThreeJSDiagram,
  Node3D,
  Connection3D,
  NodeInfo,
} from "../../shared/components/BaseThreeJSDiagram";

const nodes: Node3D[] = [
  // Core node
  {
    id: "workflow",
    name: "Workflow",
    position: [0, 2, 0],
    color: 0x2ea44f,
    type: "definition",
  },

  // Main components
  {
    id: "events",
    name: "Events",
    position: [-4, 0, -2],
    color: 0xff9800,
    type: "trigger",
  },
  {
    id: "jobs",
    name: "Jobs",
    position: [0, 0, 0],
    color: 0x2196f3,
    type: "execution",
  },
  {
    id: "runners",
    name: "Runners",
    position: [4, 0, -2],
    color: 0x9c27b0,
    type: "resource",
  },

  // Event types
  {
    id: "push",
    name: "Push",
    position: [-6, -2, -3],
    color: 0xff9800,
    type: "trigger",
  },
  {
    id: "pull-request",
    name: "Pull Request",
    position: [-4, -2, -3],
    color: 0xff9800,
    type: "trigger",
  },
  {
    id: "schedule",
    name: "Schedule",
    position: [-2, -2, -3],
    color: 0xff9800,
    type: "trigger",
  },

  // Job components
  {
    id: "steps",
    name: "Steps",
    position: [-1, -2, 1],
    color: 0x2196f3,
    type: "execution",
  },
  {
    id: "actions",
    name: "Actions",
    position: [1, -2, 1],
    color: 0x2196f3,
    type: "execution",
  },

  // Runner types
  {
    id: "github-hosted",
    name: "GitHub-hosted",
    position: [3, -2, -3],
    color: 0x9c27b0,
    type: "resource",
  },
  {
    id: "self-hosted",
    name: "Self-hosted",
    position: [5, -2, -3],
    color: 0x9c27b0,
    type: "resource",
  },
];

const connections: Connection3D[] = [
  // Core connections
  {from: "workflow", to: "events", type: "contains"},
  {from: "workflow", to: "jobs", type: "contains"},
  {from: "workflow", to: "runners", type: "contains"},

  // Event connections
  {from: "events", to: "push", type: "type"},
  {from: "events", to: "pull-request", type: "type"},
  {from: "events", to: "schedule", type: "type"},

  // Job connections
  {from: "jobs", to: "steps", type: "contains"},
  {from: "jobs", to: "actions", type: "contains"},

  // Runner connections
  {from: "runners", to: "github-hosted", type: "type"},
  {from: "runners", to: "self-hosted", type: "type"},

  // Cross-component connections
  {from: "jobs", to: "runners", type: "runs-on"},
  {from: "events", to: "jobs", type: "triggers"},
];

const getNodeInfo = (nodeId: string): NodeInfo => {
  const info: {[key: string]: NodeInfo} = {
    workflow: {
      title: "Workflow",
      description: "YAML configuration file defining the automation process",
    },
    events: {
      title: "Events",
      description: "Triggers that start workflow execution",
    },
    jobs: {
      title: "Jobs",
      description: "Groups of steps that execute on runners",
    },
    runners: {
      title: "Runners",
      description: "Servers that execute workflow jobs",
    },
    push: {
      title: "Push Event",
      description: "Triggered when code is pushed to a branch",
    },
    "pull-request": {
      title: "Pull Request Event",
      description: "Triggered when a PR is opened, updated, or merged",
    },
    schedule: {
      title: "Schedule Event",
      description: "Triggered at specified times using cron syntax",
    },
    steps: {
      title: "Steps",
      description: "Individual tasks within a job",
    },
    actions: {
      title: "Actions",
      description: "Reusable units of code that can be shared",
    },
    "github-hosted": {
      title: "GitHub-hosted Runners",
      description: "Pre-configured runners maintained by GitHub",
    },
    "self-hosted": {
      title: "Self-hosted Runners",
      description: "Custom runners maintained by repository owners",
    },
  };
  return info[nodeId] || {title: "", description: ""};
};

export const GithubActionsStructureDiagram: React.FC = () => {
  return (
    <BaseThreeJSDiagram
      nodes={nodes}
      connections={connections}
      getNodeInfo={getNodeInfo}
      backgroundColor={0x1a1a1a}
      height='500px'
    />
  );
};
