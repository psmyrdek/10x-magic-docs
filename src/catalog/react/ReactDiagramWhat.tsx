import React from "react";
import {
  BaseThreeJSDiagram,
  Node3D,
  Connection3D,
} from "../../shared/components/BaseThreeJSDiagram";

const ReactDiagramWhat: React.FC = () => {
  const nodes: Node3D[] = [
    // Core React
    {
      id: "react",
      name: "React Application",
      position: [0, 6, 0],
      color: 0x61dafb, // React blue
      type: "trigger",
    },
    // Components
    {
      id: "components",
      name: "Components",
      position: [-6, 4, 0],
      color: 0x00b3e6,
      type: "definition",
    },
    {
      id: "functional",
      name: "Functional Components",
      position: [-8, 2, 0],
      color: 0x00b3e6,
      type: "execution",
    },
    {
      id: "class",
      name: "Class Components",
      position: [-6, 2, 0],
      color: 0x00b3e6,
      type: "execution",
    },
    {
      id: "hoc",
      name: "Higher-Order Components",
      position: [-4, 2, 0],
      color: 0x00b3e6,
      type: "execution",
    },
    // Hooks
    {
      id: "hooks",
      name: "Hooks",
      position: [-2, 4, 0],
      color: 0xff6b6b,
      type: "definition",
    },
    {
      id: "useState",
      name: "useState",
      position: [-3, 2, 0],
      color: 0xff6b6b,
      type: "execution",
    },
    {
      id: "useEffect",
      name: "useEffect",
      position: [-1, 2, 0],
      color: 0xff6b6b,
      type: "execution",
    },
    {
      id: "customHooks",
      name: "Custom Hooks",
      position: [-2, 0, 0],
      color: 0xff6b6b,
      type: "execution",
    },
    // Data Flow
    {
      id: "dataFlow",
      name: "Data Flow",
      position: [2, 4, 0],
      color: 0x4bc0c0,
      type: "definition",
    },
    {
      id: "props",
      name: "Props",
      position: [1, 2, 0],
      color: 0x4bc0c0,
      type: "execution",
    },
    {
      id: "state",
      name: "State",
      position: [3, 2, 0],
      color: 0x4bc0c0,
      type: "execution",
    },
    {
      id: "context",
      name: "Context API",
      position: [2, 0, 0],
      color: 0x4bc0c0,
      type: "execution",
    },
    // Tools
    {
      id: "tools",
      name: "Development Tools",
      position: [6, 4, 0],
      color: 0x9966ff,
      type: "definition",
    },
    {
      id: "devTools",
      name: "React DevTools",
      position: [5, 2, 0],
      color: 0x9966ff,
      type: "execution",
    },
    {
      id: "testing",
      name: "Testing Tools",
      position: [7, 2, 0],
      color: 0x9966ff,
      type: "execution",
    },
    // Lifecycle
    {
      id: "lifecycle",
      name: "Component Lifecycle",
      position: [0, -2, 0],
      color: 0xff9f40,
      type: "definition",
    },
    {
      id: "mounting",
      name: "Mounting",
      position: [-2, -4, 0],
      color: 0xff9f40,
      type: "resource",
    },
    {
      id: "updating",
      name: "Updating",
      position: [0, -4, 0],
      color: 0xff9f40,
      type: "resource",
    },
    {
      id: "unmounting",
      name: "Unmounting",
      position: [2, -4, 0],
      color: 0xff9f40,
      type: "resource",
    },
  ];

  const connections: Connection3D[] = [
    // Main branches
    {from: "react", to: "components", type: "solid"},
    {from: "react", to: "hooks", type: "solid"},
    {from: "react", to: "dataFlow", type: "solid"},
    {from: "react", to: "tools", type: "solid"},
    // Components
    {from: "components", to: "functional", type: "solid"},
    {from: "components", to: "class", type: "solid"},
    {from: "components", to: "hoc", type: "solid"},
    // Hooks
    {from: "hooks", to: "useState", type: "solid"},
    {from: "hooks", to: "useEffect", type: "solid"},
    {from: "hooks", to: "customHooks", type: "solid"},
    // Data Flow
    {from: "dataFlow", to: "props", type: "solid"},
    {from: "dataFlow", to: "state", type: "solid"},
    {from: "dataFlow", to: "context", type: "solid"},
    // Tools
    {from: "tools", to: "devTools", type: "solid"},
    {from: "tools", to: "testing", type: "solid"},
    // Lifecycle
    {from: "components", to: "lifecycle", type: "dashed"},
    {from: "lifecycle", to: "mounting", type: "solid"},
    {from: "lifecycle", to: "updating", type: "solid"},
    {from: "lifecycle", to: "unmounting", type: "solid"},
    // Relationships
    {from: "functional", to: "hooks", type: "dashed"},
    {from: "hooks", to: "lifecycle", type: "dashed"},
    {from: "state", to: "lifecycle", type: "dashed"},
  ];

  const getNodeInfo = (nodeId: string) => {
    const infoMap: {[key: string]: {title: string; description: string}} = {
      react: {
        title: "React Application",
        description:
          "A JavaScript library for building user interfaces through components.",
      },
      components: {
        title: "Components",
        description:
          "The building blocks of React applications that encapsulate UI and logic.",
      },
      functional: {
        title: "Functional Components",
        description:
          "Modern way to write components using functions and hooks.",
      },
      class: {
        title: "Class Components",
        description: "Traditional way to write components using ES6 classes.",
      },
      hoc: {
        title: "Higher-Order Components",
        description:
          "Functions that take a component and return a new enhanced component.",
      },
      hooks: {
        title: "Hooks",
        description:
          "Functions that let you use state and other React features in functional components.",
      },
      useState: {
        title: "useState Hook",
        description: "Manages local state in functional components.",
      },
      useEffect: {
        title: "useEffect Hook",
        description: "Handles side effects in functional components.",
      },
      customHooks: {
        title: "Custom Hooks",
        description:
          "Reusable stateful logic that can be shared between components.",
      },
      dataFlow: {
        title: "Data Flow",
        description: "How data moves through a React application.",
      },
      props: {
        title: "Props",
        description: "Read-only data passed to components from their parents.",
      },
      state: {
        title: "State",
        description: "Mutable data that can be updated by components.",
      },
      context: {
        title: "Context API",
        description:
          "Way to pass data through the component tree without props.",
      },
      tools: {
        title: "Development Tools",
        description: "Tools that help develop and debug React applications.",
      },
      devTools: {
        title: "React DevTools",
        description:
          "Browser extension for inspecting React component hierarchy.",
      },
      testing: {
        title: "Testing Tools",
        description: "Libraries and utilities for testing React components.",
      },
      lifecycle: {
        title: "Component Lifecycle",
        description: "The different phases a component goes through.",
      },
      mounting: {
        title: "Mounting",
        description: "When a component is being added to the DOM.",
      },
      updating: {
        title: "Updating",
        description: "When a component is re-rendering due to changes.",
      },
      unmounting: {
        title: "Unmounting",
        description: "When a component is being removed from the DOM.",
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

export default ReactDiagramWhat;
