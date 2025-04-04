import React from "react";
import {
  BaseThreeJSDiagram,
  Node3D,
  Connection3D,
  NodeInfo,
} from "../../shared/components/BaseThreeJSDiagram";

const nodes: Node3D[] = [
  // Installation phase
  {
    id: "install",
    name: "Install Docker",
    position: [0, 4, 0],
    color: 0x2196f3,
    type: "trigger",
  },
  {
    id: "verify",
    name: "Verify Installation",
    position: [0, 2, 0],
    color: 0x03a9f4,
    type: "definition",
  },

  // Development phase
  {
    id: "dockerfile",
    name: "Create Dockerfile",
    position: [-4, 1, 0],
    color: 0x4caf50,
    type: "execution",
  },
  {
    id: "build",
    name: "Build Image",
    position: [-2, 1, 0],
    color: 0x4caf50,
    type: "execution",
  },
  {
    id: "run_dev",
    name: "Run Container",
    position: [0, 1, 0],
    color: 0x4caf50,
    type: "execution",
  },
  {
    id: "modify",
    name: "Modify Code",
    position: [2, 1, 0],
    color: 0x4caf50,
    type: "definition",
  },

  // Production phase
  {
    id: "optimize",
    name: "Optimize Image",
    position: [-4, -1, 0],
    color: 0xff9800,
    type: "execution",
  },
  {
    id: "push",
    name: "Push to Registry",
    position: [-2, -1, 0],
    color: 0xff9800,
    type: "execution",
  },
  {
    id: "deploy",
    name: "Deploy",
    position: [0, -1, 0],
    color: 0xff9800,
    type: "execution",
  },
  {
    id: "monitor",
    name: "Monitor",
    position: [2, -1, 0],
    color: 0xff9800,
    type: "definition",
  },
  {
    id: "scale",
    name: "Scale",
    position: [4, -1, 0],
    color: 0xff9800,
    type: "definition",
  },

  // Management phase
  {
    id: "list",
    name: "List Containers",
    position: [-2, -3, 0],
    color: 0x9c27b0,
    type: "resource",
  },
  {
    id: "stop",
    name: "Stop Container",
    position: [0, -3, 0],
    color: 0x9c27b0,
    type: "resource",
  },
  {
    id: "remove",
    name: "Remove Container",
    position: [2, -3, 0],
    color: 0x9c27b0,
    type: "resource",
  },
];

const connections: Connection3D[] = [
  // Installation flow
  {from: "install", to: "verify", type: "solid"},
  {from: "verify", to: "dockerfile", type: "solid"},

  // Development flow
  {from: "dockerfile", to: "build", type: "solid"},
  {from: "build", to: "run_dev", type: "solid"},
  {from: "run_dev", to: "modify", type: "solid"},
  {from: "modify", to: "build", type: "dashed"},

  // Production flow
  {from: "run_dev", to: "optimize", type: "solid"},
  {from: "optimize", to: "push", type: "solid"},
  {from: "push", to: "deploy", type: "solid"},
  {from: "deploy", to: "monitor", type: "solid"},
  {from: "monitor", to: "scale", type: "solid"},

  // Management flow
  {from: "monitor", to: "list", type: "dashed"},
  {from: "list", to: "stop", type: "solid"},
  {from: "stop", to: "remove", type: "solid"},
];

const getNodeInfo = (nodeId: string): NodeInfo => {
  const info: {[key: string]: NodeInfo} = {
    install: {
      title: "Install Docker",
      description: "Download and install Docker Desktop or Docker Engine",
    },
    verify: {
      title: "Verify Installation",
      description: "Run docker --version to verify successful installation",
    },
    dockerfile: {
      title: "Create Dockerfile",
      description: "Define application environment and dependencies",
    },
    build: {
      title: "Build Image",
      description: "Create Docker image from Dockerfile using docker build",
    },
    run_dev: {
      title: "Run Container",
      description: "Start container from image using docker run",
    },
    modify: {
      title: "Modify Code",
      description: "Make changes to application code",
    },
    optimize: {
      title: "Optimize Image",
      description: "Optimize image size and security for production",
    },
    push: {
      title: "Push to Registry",
      description: "Upload image to Docker Hub or private registry",
    },
    deploy: {
      title: "Deploy",
      description: "Deploy containers to production environment",
    },
    monitor: {
      title: "Monitor",
      description: "Monitor container health and performance",
    },
    scale: {
      title: "Scale",
      description: "Scale containers up or down based on demand",
    },
    list: {
      title: "List Containers",
      description: "View running containers with docker ps",
    },
    stop: {
      title: "Stop Container",
      description: "Stop running containers with docker stop",
    },
    remove: {
      title: "Remove Container",
      description: "Remove stopped containers with docker rm",
    },
  };
  return info[nodeId] || {title: "", description: ""};
};

export const DockerDiagramHow: React.FC = () => {
  return (
    <BaseThreeJSDiagram
      nodes={nodes}
      connections={connections}
      getNodeInfo={getNodeInfo}
      backgroundColor={0xf8f9fa}
    />
  );
};
