import React from "react";
import {
  BaseThreeJSDiagram,
  Node3D,
  Connection3D,
  NodeInfo,
} from "../../shared/components/BaseThreeJSDiagram";

const nodes: Node3D[] = [
  {
    id: "traditional",
    name: "Traditional Development",
    position: [0, 4, 0],
    color: 0x4a90e2,
    type: "trigger",
  },
  {
    id: "dep_conflicts",
    name: "Dependency Conflicts",
    position: [-6, 1, 0],
    color: 0xe74c3c,
    type: "definition",
  },
  {
    id: "env_inconsistency",
    name: "Environment Inconsistency",
    position: [-3, 1, 0],
    color: 0xe74c3c,
    type: "definition",
  },
  {
    id: "resource_waste",
    name: "Resource Waste",
    position: [0, 1, 0],
    color: 0xe74c3c,
    type: "definition",
  },
  {
    id: "deployment_complexity",
    name: "Deployment Complexity",
    position: [3, 1, 0],
    color: 0xe74c3c,
    type: "definition",
  },
  {
    id: "scaling_issues",
    name: "Scaling Issues",
    position: [6, 1, 0],
    color: 0xe74c3c,
    type: "definition",
  },
  {
    id: "docker",
    name: "Docker Solution",
    position: [0, -2, 0],
    color: 0x2ecc71,
    type: "execution",
  },
  {
    id: "containerization",
    name: "Containerization",
    position: [0, -4, 0],
    color: 0x3498db,
    type: "resource",
  },
];

const connections: Connection3D[] = [
  {from: "traditional", to: "dep_conflicts", type: "solid"},
  {from: "traditional", to: "env_inconsistency", type: "solid"},
  {from: "traditional", to: "resource_waste", type: "solid"},
  {from: "traditional", to: "deployment_complexity", type: "solid"},
  {from: "traditional", to: "scaling_issues", type: "solid"},
  {from: "docker", to: "containerization", type: "solid"},
  {from: "containerization", to: "dep_conflicts", type: "dashed"},
  {from: "containerization", to: "env_inconsistency", type: "dashed"},
  {from: "containerization", to: "resource_waste", type: "dashed"},
  {from: "containerization", to: "deployment_complexity", type: "dashed"},
  {from: "containerization", to: "scaling_issues", type: "dashed"},
];

const getNodeInfo = (nodeId: string): NodeInfo => {
  const info: {[key: string]: NodeInfo} = {
    traditional: {
      title: "Traditional Development",
      description:
        "Classic software development approach with direct system dependencies",
    },
    dep_conflicts: {
      title: "Dependency Conflicts",
      description:
        "Multiple applications requiring different versions of the same libraries",
    },
    env_inconsistency: {
      title: "Environment Inconsistency",
      description:
        "'Works on my machine' syndrome - different behavior across environments",
    },
    resource_waste: {
      title: "Resource Waste",
      description: "Inefficient resource utilization with traditional VMs",
    },
    deployment_complexity: {
      title: "Deployment Complexity",
      description: "Complex setup procedures and configuration management",
    },
    scaling_issues: {
      title: "Scaling Issues",
      description: "Difficulties in scaling applications efficiently",
    },
    docker: {
      title: "Docker Solution",
      description:
        "Container platform that addresses traditional development challenges",
    },
    containerization: {
      title: "Containerization",
      description:
        "Packaging applications with dependencies in isolated containers",
    },
  };
  return info[nodeId] || {title: "", description: ""};
};

export const DockerDiagramWhy: React.FC = () => {
  return (
    <BaseThreeJSDiagram
      nodes={nodes}
      connections={connections}
      getNodeInfo={getNodeInfo}
      backgroundColor={0xf8f9fa}
    />
  );
};
