import React from "react";
import {
  BaseThreeJSDiagram,
  Node3D,
  Connection3D,
} from "../../shared/components/BaseThreeJSDiagram";

const ReactDiagramHow: React.FC = () => {
  const nodes: Node3D[] = [
    // Setup Phase
    {
      id: "start",
      name: "Start React Journey",
      position: [0, 6, 0],
      color: 0x61dafb, // React blue
      type: "trigger",
    },
    {
      id: "setup",
      name: "Setup",
      position: [0, 4, 0],
      color: 0x00b3e6,
      type: "definition",
    },
    {
      id: "node",
      name: "Install Node.js",
      position: [-2, 4, 0],
      color: 0x00b3e6,
      type: "execution",
    },
    {
      id: "create",
      name: "Create Project",
      position: [0, 2, 0],
      color: 0x00b3e6,
      type: "execution",
    },
    {
      id: "deps",
      name: "Install Dependencies",
      position: [2, 4, 0],
      color: 0x00b3e6,
      type: "execution",
    },
    // Development Phase
    {
      id: "development",
      name: "Development",
      position: [0, 0, 0],
      color: 0x4bc0c0,
      type: "definition",
    },
    {
      id: "component",
      name: "Create Component",
      position: [-4, -2, 0],
      color: 0x4bc0c0,
      type: "execution",
    },
    {
      id: "state",
      name: "Add State",
      position: [-2, -2, 0],
      color: 0x4bc0c0,
      type: "execution",
    },
    {
      id: "events",
      name: "Handle Events",
      position: [0, -2, 0],
      color: 0x4bc0c0,
      type: "execution",
    },
    {
      id: "style",
      name: "Style Component",
      position: [2, -2, 0],
      color: 0x4bc0c0,
      type: "execution",
    },
    {
      id: "test",
      name: "Test Component",
      position: [4, -2, 0],
      color: 0x4bc0c0,
      type: "execution",
    },
    // Production Phase
    {
      id: "production",
      name: "Production",
      position: [0, -4, 0],
      color: 0xff9f40,
      type: "definition",
    },
    {
      id: "build",
      name: "Build App",
      position: [-3, -6, 0],
      color: 0xff9f40,
      type: "resource",
    },
    {
      id: "deploy",
      name: "Deploy App",
      position: [-1, -6, 0],
      color: 0xff9f40,
      type: "resource",
    },
    {
      id: "monitor",
      name: "Monitor Performance",
      position: [1, -6, 0],
      color: 0xff9f40,
      type: "resource",
    },
    {
      id: "optimize",
      name: "Optimize App",
      position: [3, -6, 0],
      color: 0xff9f40,
      type: "resource",
    },
  ];

  const connections: Connection3D[] = [
    // Setup Phase
    {from: "start", to: "setup", type: "solid"},
    {from: "setup", to: "node", type: "solid"},
    {from: "setup", to: "create", type: "solid"},
    {from: "setup", to: "deps", type: "solid"},
    {from: "node", to: "create", type: "dashed"},
    {from: "create", to: "deps", type: "dashed"},
    // Development Phase
    {from: "setup", to: "development", type: "solid"},
    {from: "development", to: "component", type: "solid"},
    {from: "development", to: "state", type: "solid"},
    {from: "development", to: "events", type: "solid"},
    {from: "development", to: "style", type: "solid"},
    {from: "development", to: "test", type: "solid"},
    {from: "component", to: "state", type: "dashed"},
    {from: "state", to: "events", type: "dashed"},
    {from: "events", to: "style", type: "dashed"},
    {from: "style", to: "test", type: "dashed"},
    {from: "test", to: "component", type: "dashed"},
    // Production Phase
    {from: "development", to: "production", type: "solid"},
    {from: "production", to: "build", type: "solid"},
    {from: "production", to: "deploy", type: "solid"},
    {from: "production", to: "monitor", type: "solid"},
    {from: "production", to: "optimize", type: "solid"},
    {from: "build", to: "deploy", type: "dashed"},
    {from: "deploy", to: "monitor", type: "dashed"},
    {from: "monitor", to: "optimize", type: "dashed"},
    {from: "optimize", to: "monitor", type: "dashed"},
  ];

  const getNodeInfo = (nodeId: string) => {
    const infoMap: {[key: string]: {title: string; description: string}} = {
      start: {
        title: "Start React Journey",
        description: "Beginning your journey with React development.",
      },
      setup: {
        title: "Setup",
        description:
          "Initial setup phase to prepare your development environment.",
      },
      node: {
        title: "Install Node.js",
        description: "Install Node.js and npm to manage JavaScript packages.",
      },
      create: {
        title: "Create Project",
        description:
          "Create a new React project using Create React App or Vite.",
      },
      deps: {
        title: "Install Dependencies",
        description: "Install required dependencies and dev tools.",
      },
      development: {
        title: "Development",
        description: "Main development phase where you build your application.",
      },
      component: {
        title: "Create Component",
        description: "Create a new React component with its basic structure.",
      },
      state: {
        title: "Add State",
        description:
          "Implement state management using hooks or class properties.",
      },
      events: {
        title: "Handle Events",
        description: "Add event handlers to make your component interactive.",
      },
      style: {
        title: "Style Component",
        description:
          "Add CSS styles to make your component visually appealing.",
      },
      test: {
        title: "Test Component",
        description: "Write and run tests to ensure component reliability.",
      },
      production: {
        title: "Production",
        description: "Prepare and deploy your application for production use.",
      },
      build: {
        title: "Build App",
        description:
          "Create an optimized production build of your application.",
      },
      deploy: {
        title: "Deploy App",
        description: "Deploy your application to a hosting platform.",
      },
      monitor: {
        title: "Monitor Performance",
        description: "Track application performance and user experience.",
      },
      optimize: {
        title: "Optimize App",
        description:
          "Improve application performance based on monitoring data.",
      },
    };

    return (
      infoMap[nodeId] || {
        title: "Unknown Node",
        description: "No information available for this node.",
      }
    );
  };

  return (
    <BaseThreeJSDiagram
      nodes={nodes}
      connections={connections}
      getNodeInfo={getNodeInfo}
      backgroundColor={0xffffff}
    />
  );
};

export default ReactDiagramHow;
