import React from "react";
import {
  BaseThreeJSDiagram,
  Node3D,
  Connection3D,
  NodeInfo,
} from "../../shared/components/BaseThreeJSDiagram";

const nodes: Node3D[] = [
  // Workflow stages
  {
    id: "trigger",
    name: "Code Push",
    position: [0, 4, 0],
    color: 0xff9800,
    type: "trigger",
  },
  {
    id: "checkout",
    name: "Checkout",
    position: [0, 2, 0],
    color: 0x2196f3,
    type: "execution",
  },
  {
    id: "setup",
    name: "Setup Environment",
    position: [0, 0, 0],
    color: 0x2196f3,
    type: "execution",
  },
  {
    id: "test",
    name: "Run Tests",
    position: [-3, -2, 0],
    color: 0x4caf50,
    type: "execution",
  },
  {
    id: "build",
    name: "Build",
    position: [3, -2, 0],
    color: 0x4caf50,
    type: "execution",
  },
  {
    id: "security",
    name: "Security Scan",
    position: [-3, -4, 0],
    color: 0xff4444,
    type: "execution",
  },
  {
    id: "staging",
    name: "Deploy to Staging",
    position: [3, -4, 0],
    color: 0x9c27b0,
    type: "execution",
  },
  {
    id: "integration",
    name: "Integration Tests",
    position: [0, -6, 0],
    color: 0x4caf50,
    type: "execution",
  },
  {
    id: "production",
    name: "Deploy to Production",
    position: [0, -8, 0],
    color: 0x9c27b0,
    type: "execution",
  },

  // Status nodes
  {
    id: "fail-notify",
    name: "Notify Failure",
    position: [-5, -3, 0],
    color: 0xff4444,
    type: "trigger",
  },
  {
    id: "success",
    name: "Success",
    position: [0, -10, 0],
    color: 0x4caf50,
    type: "definition",
  },
];

const connections: Connection3D[] = [
  // Main flow
  {from: "trigger", to: "checkout", type: "flow"},
  {from: "checkout", to: "setup", type: "flow"},
  {from: "setup", to: "test", type: "flow"},
  {from: "setup", to: "build", type: "flow"},
  {from: "test", to: "security", type: "flow"},
  {from: "build", to: "staging", type: "flow"},
  {from: "security", to: "integration", type: "flow"},
  {from: "staging", to: "integration", type: "flow"},
  {from: "integration", to: "production", type: "flow"},
  {from: "production", to: "success", type: "flow"},

  // Failure flows
  {from: "test", to: "fail-notify", type: "failure"},
  {from: "build", to: "fail-notify", type: "failure"},
  {from: "security", to: "fail-notify", type: "failure"},
  {from: "integration", to: "fail-notify", type: "failure"},
];

const getNodeInfo = (nodeId: string): NodeInfo => {
  const info: {[key: string]: NodeInfo} = {
    trigger: {
      title: "Code Push",
      description: "Developer pushes code to repository",
    },
    checkout: {
      title: "Checkout Code",
      description: "Clone repository and checkout correct branch",
    },
    setup: {
      title: "Setup Environment",
      description: "Install dependencies and configure environment",
    },
    test: {
      title: "Run Tests",
      description: "Execute unit and component tests",
    },
    build: {
      title: "Build Application",
      description: "Compile and build the application",
    },
    security: {
      title: "Security Scan",
      description: "Run security and vulnerability checks",
    },
    staging: {
      title: "Deploy to Staging",
      description: "Deploy application to staging environment",
    },
    integration: {
      title: "Integration Tests",
      description: "Run end-to-end and integration tests",
    },
    production: {
      title: "Deploy to Production",
      description: "Deploy application to production environment",
    },
    "fail-notify": {
      title: "Failure Notification",
      description: "Notify team of workflow failure",
    },
    success: {
      title: "Workflow Success",
      description: "All steps completed successfully",
    },
  };
  return info[nodeId] || {title: "", description: ""};
};

export const GithubActionsWorkflowDiagram: React.FC = () => {
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
