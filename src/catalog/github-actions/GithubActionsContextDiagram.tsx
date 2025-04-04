import React from "react";
import {
  BaseThreeJSDiagram,
  Node3D,
  Connection3D,
  NodeInfo,
} from "../../shared/components/BaseThreeJSDiagram";

const nodes: Node3D[] = [
  // Core GitHub Actions node
  {
    id: "github-actions",
    name: "GitHub Actions",
    position: [0, 0, 0],
    color: 0x2ea44f,
    type: "definition",
  },

  // Challenge nodes
  {
    id: "manual-deployments",
    name: "Manual Deployments",
    position: [-6, 3, -3],
    color: 0xff4444,
    type: "trigger",
  },
  {
    id: "code-quality",
    name: "Code Quality",
    position: [-6, 3, 3],
    color: 0xff4444,
    type: "trigger",
  },
  {
    id: "testing",
    name: "Testing",
    position: [6, 3, -3],
    color: 0xff4444,
    type: "trigger",
  },
  {
    id: "release-process",
    name: "Release Process",
    position: [6, 3, 3],
    color: 0xff4444,
    type: "trigger",
  },

  // Solution nodes
  {
    id: "automated-ci",
    name: "Automated CI/CD",
    position: [-6, -3, -3],
    color: 0x4caf50,
    type: "execution",
  },
  {
    id: "quality-checks",
    name: "Quality Checks",
    position: [-6, -3, 3],
    color: 0x4caf50,
    type: "execution",
  },
  {
    id: "test-automation",
    name: "Test Automation",
    position: [6, -3, -3],
    color: 0x4caf50,
    type: "execution",
  },
  {
    id: "release-automation",
    name: "Release Automation",
    position: [6, -3, 3],
    color: 0x4caf50,
    type: "execution",
  },
];

const connections: Connection3D[] = [
  // Challenges to GitHub Actions
  {from: "manual-deployments", to: "github-actions", type: "challenge"},
  {from: "code-quality", to: "github-actions", type: "challenge"},
  {from: "testing", to: "github-actions", type: "challenge"},
  {from: "release-process", to: "github-actions", type: "challenge"},

  // GitHub Actions to Solutions
  {from: "github-actions", to: "automated-ci", type: "solution"},
  {from: "github-actions", to: "quality-checks", type: "solution"},
  {from: "github-actions", to: "test-automation", type: "solution"},
  {from: "github-actions", to: "release-automation", type: "solution"},
];

const getNodeInfo = (nodeId: string): NodeInfo => {
  const info: {[key: string]: NodeInfo} = {
    "github-actions": {
      title: "GitHub Actions",
      description:
        "Automated workflow platform integrated with GitHub repositories",
    },
    "manual-deployments": {
      title: "Manual Deployments",
      description:
        "Challenge: Error-prone and time-consuming manual deployment processes",
    },
    "code-quality": {
      title: "Code Quality",
      description: "Challenge: Maintaining consistent code quality standards",
    },
    testing: {
      title: "Testing",
      description: "Challenge: Need for consistent and automated testing",
    },
    "release-process": {
      title: "Release Process",
      description: "Challenge: Complex and manual release procedures",
    },
    "automated-ci": {
      title: "Automated CI/CD",
      description: "Solution: Automated build, test, and deployment pipelines",
    },
    "quality-checks": {
      title: "Quality Checks",
      description: "Solution: Automated code quality and security checks",
    },
    "test-automation": {
      title: "Test Automation",
      description: "Solution: Automated test execution and reporting",
    },
    "release-automation": {
      title: "Release Automation",
      description: "Solution: Streamlined and automated release process",
    },
  };
  return info[nodeId] || {title: "", description: ""};
};

export const GithubActionsContextDiagram: React.FC = () => {
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
