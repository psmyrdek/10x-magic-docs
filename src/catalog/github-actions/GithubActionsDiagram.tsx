import React from "react";
import {
  BaseThreeJSDiagram,
  Node3D,
  Connection3D,
} from "../../shared/components/BaseThreeJSDiagram";

const GithubActionsDiagram: React.FC = () => {
  // Nodes and connections data
  const nodes: Node3D[] = [
    {
      id: "event",
      name: "GitHub Event",
      position: [0, 6, 0],
      color: 0xf9aa66,
      type: "trigger",
    },
    {
      id: "workflow-file",
      name: "Workflow File",
      position: [-6, 3, 0],
      color: 0xaaddff,
      type: "definition",
    },
    {
      id: "workflow",
      name: "Workflow",
      position: [0, 3, 0],
      color: 0xaaddff,
      type: "definition",
    },
    {
      id: "job1",
      name: "Job 1",
      position: [-4, 0, 0],
      color: 0xaadd55,
      type: "execution",
    },
    {
      id: "job2",
      name: "Job 2",
      position: [0, 0, 0],
      color: 0xaadd55,
      type: "execution",
    },
    {
      id: "job3",
      name: "Job 3",
      position: [4, 0, 0],
      color: 0xaadd55,
      type: "execution",
    },
    {
      id: "step1",
      name: "Step 1",
      position: [-5, -3, 0],
      color: 0xaadd55,
      type: "execution",
    },
    {
      id: "step2",
      name: "Step 2",
      position: [-3, -3, 0],
      color: 0xaadd55,
      type: "execution",
    },
    {
      id: "action",
      name: "Action",
      position: [-5, -6, 0],
      color: 0xaadd55,
      type: "execution",
    },
    {
      id: "command",
      name: "Command",
      position: [-3, -6, 0],
      color: 0xaadd55,
      type: "execution",
    },
    {
      id: "runner",
      name: "Runner",
      position: [6, -3, 0],
      color: 0xaadd55,
      type: "execution",
    },
    {
      id: "artifacts",
      name: "Artifacts",
      position: [2, -6, 0],
      color: 0xdd99ff,
      type: "resource",
    },
    {
      id: "cache",
      name: "Cache",
      position: [4, -6, 0],
      color: 0xdd99ff,
      type: "resource",
    },
    {
      id: "secrets",
      name: "Secrets",
      position: [6, -6, 0],
      color: 0xdd99ff,
      type: "resource",
    },
  ];

  const connections: Connection3D[] = [
    {from: "event", to: "workflow", type: "solid"},
    {from: "workflow-file", to: "workflow", type: "solid"},
    {from: "workflow", to: "job1", type: "solid"},
    {from: "workflow", to: "job2", type: "solid"},
    {from: "workflow", to: "job3", type: "solid"},
    {from: "job1", to: "step1", type: "solid"},
    {from: "job1", to: "step2", type: "solid"},
    {from: "step1", to: "action", type: "solid"},
    {from: "step2", to: "command", type: "solid"},
    {from: "job1", to: "job2", type: "dashed"},
    {from: "job2", to: "job3", type: "dashed"},
    {from: "job1", to: "runner", type: "dashed"},
    {from: "job2", to: "runner", type: "dashed"},
    {from: "job3", to: "runner", type: "dashed"},
    {from: "step1", to: "artifacts", type: "dashed"},
    {from: "step1", to: "cache", type: "dashed"},
    {from: "step1", to: "secrets", type: "dashed"},
  ];

  // Node information for the info panel
  const getNodeInfo = (nodeId: string) => {
    const infoMap: {[key: string]: {title: string; description: string}} = {
      event: {
        title: "GitHub Event",
        description:
          "Triggers the workflow execution. Examples: push, pull_request, schedule, workflow_dispatch.",
      },
      "workflow-file": {
        title: "Workflow File",
        description:
          "YAML configuration file stored in .github/workflows/ directory that defines the entire process.",
      },
      workflow: {
        title: "Workflow",
        description:
          "The complete automated process containing one or more jobs that run in response to an event.",
      },
      job1: {
        title: "Job",
        description:
          "A set of steps that execute on the same runner. Jobs can run in parallel or sequentially.",
      },
      job2: {
        title: "Job",
        description:
          "A set of steps that execute on the same runner. Jobs can run in parallel or sequentially.",
      },
      job3: {
        title: "Job",
        description:
          "A set of steps that execute on the same runner. Jobs can run in parallel or sequentially.",
      },
      step1: {
        title: "Step",
        description:
          "An individual task within a job that can run commands or actions.",
      },
      step2: {
        title: "Step",
        description:
          "An individual task within a job that can run commands or actions.",
      },
      action: {
        title: "Action",
        description:
          "A reusable unit of code that can be included as a step in your workflow.",
      },
      command: {
        title: "Command",
        description: "A shell command executed directly on the runner.",
      },
      runner: {
        title: "Runner",
        description:
          "The server where jobs execute. Can be GitHub-hosted or self-hosted.",
      },
      artifacts: {
        title: "Artifacts",
        description:
          "Files persisted after a job completes, allowing data sharing between jobs.",
      },
      cache: {
        title: "Cache",
        description:
          "Dependency cache to speed up workflows by reusing previously downloaded packages.",
      },
      secrets: {
        title: "Secrets",
        description:
          "Encrypted sensitive data that can be used securely in workflows.",
      },
    };

    return (
      infoMap[nodeId] || {
        title: "Unknown",
        description: "No information available",
      }
    );
  };

  return (
    <BaseThreeJSDiagram
      nodes={nodes}
      connections={connections}
      getNodeInfo={getNodeInfo}
      height='600px'
      backgroundColor={0xf0f0f0}
    />
  );
};

export default GithubActionsDiagram;
