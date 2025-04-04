import React from "react";
import {
  BaseThreeJSDiagram,
  Node3D,
  Connection3D,
  NodeInfo,
} from "../../shared/components/BaseThreeJSDiagram";

const nodes: Node3D[] = [
  {
    id: "docker_platform",
    name: "Docker Platform",
    position: [0, 4, 0],
    color: 0x2196f3,
    type: "trigger",
  },
  // Docker Engine components
  {
    id: "docker_engine",
    name: "Docker Engine",
    position: [-4, 2, 0],
    color: 0x4caf50,
    type: "execution",
  },
  {
    id: "daemon",
    name: "Docker Daemon",
    position: [-6, 0, 0],
    color: 0x8bc34a,
    type: "definition",
  },
  {
    id: "rest_api",
    name: "REST API",
    position: [-4, 0, 0],
    color: 0x8bc34a,
    type: "definition",
  },
  {
    id: "cli",
    name: "Docker CLI",
    position: [-2, 0, 0],
    color: 0x8bc34a,
    type: "definition",
  },
  // Docker Hub components
  {
    id: "docker_hub",
    name: "Docker Hub",
    position: [0, 2, 0],
    color: 0xff9800,
    type: "execution",
  },
  {
    id: "official_images",
    name: "Official Images",
    position: [-1, 0, 2],
    color: 0xffc107,
    type: "resource",
  },
  {
    id: "community_images",
    name: "Community Images",
    position: [1, 0, 2],
    color: 0xffc107,
    type: "resource",
  },
  // Docker Compose components
  {
    id: "docker_compose",
    name: "Docker Compose",
    position: [4, 2, 0],
    color: 0xe91e63,
    type: "execution",
  },
  {
    id: "yaml_config",
    name: "YAML Config",
    position: [3, 0, 0],
    color: 0xf48fb1,
    type: "definition",
  },
  {
    id: "services",
    name: "Services",
    position: [5, 0, 0],
    color: 0xf48fb1,
    type: "definition",
  },
  // Container components
  {
    id: "container",
    name: "Container",
    position: [0, -2, 0],
    color: 0x673ab7,
    type: "execution",
  },
  {
    id: "app",
    name: "Application",
    position: [-2, -4, 0],
    color: 0x9575cd,
    type: "resource",
  },
  {
    id: "deps",
    name: "Dependencies",
    position: [0, -4, 0],
    color: 0x9575cd,
    type: "resource",
  },
  {
    id: "runtime",
    name: "Runtime",
    position: [2, -4, 0],
    color: 0x9575cd,
    type: "resource",
  },
];

const connections: Connection3D[] = [
  // Platform to main components
  {from: "docker_platform", to: "docker_engine", type: "solid"},
  {from: "docker_platform", to: "docker_hub", type: "solid"},
  {from: "docker_platform", to: "docker_compose", type: "solid"},

  // Engine connections
  {from: "docker_engine", to: "daemon", type: "solid"},
  {from: "docker_engine", to: "rest_api", type: "solid"},
  {from: "docker_engine", to: "cli", type: "solid"},

  // Hub connections
  {from: "docker_hub", to: "official_images", type: "solid"},
  {from: "docker_hub", to: "community_images", type: "solid"},

  // Compose connections
  {from: "docker_compose", to: "yaml_config", type: "solid"},
  {from: "docker_compose", to: "services", type: "solid"},

  // Container connections
  {from: "container", to: "app", type: "solid"},
  {from: "container", to: "deps", type: "solid"},
  {from: "container", to: "runtime", type: "solid"},

  // Integration connections
  {from: "docker_engine", to: "container", type: "dashed"},
  {from: "docker_hub", to: "container", type: "dashed"},
  {from: "docker_compose", to: "container", type: "dashed"},
];

const getNodeInfo = (nodeId: string): NodeInfo => {
  const info: {[key: string]: NodeInfo} = {
    docker_platform: {
      title: "Docker Platform",
      description: "Complete platform for containerizing applications",
    },
    docker_engine: {
      title: "Docker Engine",
      description: "Core container runtime and management component",
    },
    daemon: {
      title: "Docker Daemon",
      description: "Background service managing containers, images, and more",
    },
    rest_api: {
      title: "REST API",
      description: "HTTP API for controlling Docker programmatically",
    },
    cli: {
      title: "Docker CLI",
      description: "Command-line interface for Docker operations",
    },
    docker_hub: {
      title: "Docker Hub",
      description: "Cloud-based registry for Docker images",
    },
    official_images: {
      title: "Official Images",
      description: "Verified and maintained Docker images",
    },
    community_images: {
      title: "Community Images",
      description: "User-contributed Docker images",
    },
    docker_compose: {
      title: "Docker Compose",
      description: "Tool for defining multi-container applications",
    },
    yaml_config: {
      title: "YAML Config",
      description: "Configuration file format for services",
    },
    services: {
      title: "Services",
      description: "Container definitions and their relationships",
    },
    container: {
      title: "Container",
      description: "Isolated runtime environment for applications",
    },
    app: {
      title: "Application",
      description: "The main application code",
    },
    deps: {
      title: "Dependencies",
      description: "Required libraries and packages",
    },
    runtime: {
      title: "Runtime",
      description: "Execution environment (e.g., Node.js, Python)",
    },
  };
  return info[nodeId] || {title: "", description: ""};
};

export const DockerDiagramWhat: React.FC = () => {
  return (
    <BaseThreeJSDiagram
      nodes={nodes}
      connections={connections}
      getNodeInfo={getNodeInfo}
      backgroundColor={0xf8f9fa}
    />
  );
};
