import React from "react";
import {
  BaseThreeJSDiagram,
  Node3D,
  Connection3D,
} from "../../shared/components/BaseThreeJSDiagram";

const ReactDiagramWhy: React.FC = () => {
  const nodes: Node3D[] = [
    // Traditional Challenges
    {
      id: "challenges",
      name: "Traditional Web Dev Challenges",
      position: [0, 6, 0],
      color: 0xf9aa66,
      type: "trigger",
    },
    // DOM Manipulation Group
    {
      id: "dom",
      name: "DOM Manipulation",
      position: [-6, 3, 0],
      color: 0xff9999,
      type: "definition",
    },
    {
      id: "manual-updates",
      name: "Manual Updates",
      position: [-8, 1, 0],
      color: 0xff9999,
      type: "execution",
    },
    {
      id: "reflows",
      name: "Browser Reflows",
      position: [-6, 1, 0],
      color: 0xff9999,
      type: "execution",
    },
    // State Management Group
    {
      id: "state",
      name: "State Management",
      position: [-2, 3, 0],
      color: 0x99ff99,
      type: "definition",
    },
    {
      id: "complex-state",
      name: "Complex State",
      position: [-4, 1, 0],
      color: 0x99ff99,
      type: "execution",
    },
    {
      id: "side-effects",
      name: "Side Effects",
      position: [-2, 1, 0],
      color: 0x99ff99,
      type: "execution",
    },
    // Code Organization Group
    {
      id: "code-org",
      name: "Code Organization",
      position: [2, 3, 0],
      color: 0x9999ff,
      type: "definition",
    },
    {
      id: "monolithic",
      name: "Monolithic Code",
      position: [0, 1, 0],
      color: 0x9999ff,
      type: "execution",
    },
    {
      id: "reusability",
      name: "Poor Reusability",
      position: [2, 1, 0],
      color: 0x9999ff,
      type: "execution",
    },
    // Performance Group
    {
      id: "performance",
      name: "Performance",
      position: [6, 3, 0],
      color: 0xff99ff,
      type: "definition",
    },
    {
      id: "updates",
      name: "Frequent Updates",
      position: [4, 1, 0],
      color: 0xff99ff,
      type: "execution",
    },
    {
      id: "rerenders",
      name: "Unnecessary Rerenders",
      position: [6, 1, 0],
      color: 0xff99ff,
      type: "execution",
    },
    // React Solutions
    {
      id: "react",
      name: "React Solutions",
      position: [0, -1, 0],
      color: 0x66bbff,
      type: "trigger",
    },
    {
      id: "virtual-dom",
      name: "Virtual DOM",
      position: [-6, -3, 0],
      color: 0x66bbff,
      type: "resource",
    },
    {
      id: "declarative",
      name: "Declarative Approach",
      position: [-2, -3, 0],
      color: 0x66bbff,
      type: "resource",
    },
    {
      id: "components",
      name: "Component Architecture",
      position: [2, -3, 0],
      color: 0x66bbff,
      type: "resource",
    },
    {
      id: "ecosystem",
      name: "Rich Ecosystem",
      position: [6, -3, 0],
      color: 0x66bbff,
      type: "resource",
    },
  ];

  const connections: Connection3D[] = [
    // Challenges connections
    {from: "challenges", to: "dom", type: "solid"},
    {from: "challenges", to: "state", type: "solid"},
    {from: "challenges", to: "code-org", type: "solid"},
    {from: "challenges", to: "performance", type: "solid"},
    // DOM group
    {from: "dom", to: "manual-updates", type: "solid"},
    {from: "dom", to: "reflows", type: "solid"},
    // State group
    {from: "state", to: "complex-state", type: "solid"},
    {from: "state", to: "side-effects", type: "solid"},
    // Code organization group
    {from: "code-org", to: "monolithic", type: "solid"},
    {from: "code-org", to: "reusability", type: "solid"},
    // Performance group
    {from: "performance", to: "updates", type: "solid"},
    {from: "performance", to: "rerenders", type: "solid"},
    // React solutions
    {from: "react", to: "virtual-dom", type: "solid"},
    {from: "react", to: "declarative", type: "solid"},
    {from: "react", to: "components", type: "solid"},
    {from: "react", to: "ecosystem", type: "solid"},
    // Solutions to problems
    {from: "virtual-dom", to: "dom", type: "dashed"},
    {from: "virtual-dom", to: "performance", type: "dashed"},
    {from: "declarative", to: "manual-updates", type: "dashed"},
    {from: "declarative", to: "reusability", type: "dashed"},
    {from: "components", to: "code-org", type: "dashed"},
    {from: "components", to: "monolithic", type: "dashed"},
    {from: "ecosystem", to: "state", type: "dashed"},
    {from: "ecosystem", to: "side-effects", type: "dashed"},
  ];

  const getNodeInfo = (nodeId: string) => {
    const infoMap: {[key: string]: {title: string; description: string}} = {
      challenges: {
        title: "Traditional Web Development Challenges",
        description:
          "Common problems faced in web development before React's solutions.",
      },
      dom: {
        title: "DOM Manipulation",
        description:
          "Direct manipulation of the DOM is error-prone and can lead to performance issues.",
      },
      "manual-updates": {
        title: "Manual Updates",
        description:
          "Developers need to manually track and update the DOM, leading to complexity and bugs.",
      },
      reflows: {
        title: "Browser Reflows",
        description:
          "Frequent DOM updates cause browser reflows, impacting performance.",
      },
      state: {
        title: "State Management",
        description:
          "Managing application state becomes complex as the application grows.",
      },
      "complex-state": {
        title: "Complex State",
        description:
          "Difficulty in managing and synchronizing state across components.",
      },
      "side-effects": {
        title: "Side Effects",
        description:
          "Handling side effects like data fetching and DOM updates is challenging.",
      },
      "code-org": {
        title: "Code Organization",
        description:
          "Structuring code for maintainability and reusability is difficult.",
      },
      monolithic: {
        title: "Monolithic Code",
        description:
          "Large, tightly coupled codebases that are hard to maintain and test.",
      },
      reusability: {
        title: "Poor Reusability",
        description: "Difficulty in creating reusable UI components and logic.",
      },
      performance: {
        title: "Performance",
        description:
          "Web applications can become slow due to inefficient updates and rendering.",
      },
      updates: {
        title: "Frequent Updates",
        description:
          "Constant DOM updates can lead to performance bottlenecks.",
      },
      rerenders: {
        title: "Unnecessary Rerenders",
        description:
          "Inefficient rendering causing components to update more than necessary.",
      },
      react: {
        title: "React Solutions",
        description:
          "React's core features that address traditional web development challenges.",
      },
      "virtual-dom": {
        title: "Virtual DOM",
        description:
          "Efficient DOM updates through a lightweight copy of the actual DOM.",
      },
      declarative: {
        title: "Declarative Approach",
        description: "Write what you want to achieve, not how to achieve it.",
      },
      components: {
        title: "Component Architecture",
        description:
          "Modular, reusable building blocks for creating user interfaces.",
      },
      ecosystem: {
        title: "Rich Ecosystem",
        description:
          "Extensive collection of tools, libraries, and patterns for solving common problems.",
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

export default ReactDiagramWhy;
