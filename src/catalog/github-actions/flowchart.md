# GitHub Actions Flowchart

```mermaid
flowchart TD
    %% Main Nodes
    Event(GitHub Event)
    WorkflowFile[.github/workflows YAML]
    Workflow(Workflow)
    Job1(Job 1)
    Job2(Job 2)
    JobN(Job N)
    Step1[Step 1]
    Step2[Step 2]
    StepN[Step N]
    Action[GitHub Action]
    Command[Shell Command]
    Runner(Runner Environment)
    Artifacts[(Artifacts)]
    Cache[(Cache)]
    Secrets{{Secrets}}
    Env{{Environment Variables}}
    Output[[Job Output]]

    %% Subgraphs
    subgraph WorkflowExecution
        Workflow --> |contains| Job1
        Workflow --> |contains| Job2
        Workflow --> |contains| JobN

        Job1 --> |executes| Step1
        Job1 --> |executes| Step2
        Job1 --> |executes| StepN

        Step1 --> |can be| Action
        Step2 --> |can be| Command

        Job1 -.-> |depends on| Job2
        Job2 -.-> |depends on| JobN
    end

    subgraph Resources
        Step1 -.-> |uses| Secrets
        Step1 -.-> |uses| Env
        Step1 -.-> |creates| Output
        Step1 -.-> |stores| Artifacts
        Step1 -.-> |uses/stores| Cache
    end

    %% Connections
    Event --> |triggers| Workflow
    WorkflowFile --> |defines| Workflow
    WorkflowExecution -.-> |runs on| Runner

    %% Styles
    classDef triggerNode fill:#f9a,stroke:#333,stroke-width:2px
    classDef definitionNode fill:#adf,stroke:#333,stroke-width:2px
    classDef executionNode fill:#ad5,stroke:#333,stroke-width:2px
    classDef resourceNode fill:#d9f,stroke:#333,stroke-width:2px

    class Event triggerNode
    class WorkflowFile,Workflow definitionNode
    class Job1,Job2,JobN,Step1,Step2,StepN,Action,Command,Runner executionNode
    class Artifacts,Cache,Secrets,Env,Output resourceNode
```

## Key Components Explained

1. **GitHub Event**: Triggers the workflow execution (e.g., push, pull request, scheduled event)
2. **Workflow File**: YAML configuration in `.github/workflows/` that defines the entire process
3. **Workflow**: The complete automated process containing one or more jobs
4. **Jobs**: Collections of steps that execute on the same runner
5. **Steps**: Individual tasks that run commands or actions
6. **Actions**: Reusable code units that perform specific tasks
7. **Commands**: Shell commands executed directly on the runner
8. **Runner Environment**: The server where jobs execute (GitHub-hosted or self-hosted)
9. **Resources**:
   - **Artifacts**: Files persisted after a job completes
   - **Cache**: Dependency cache to speed up workflows
   - **Secrets**: Encrypted sensitive data
   - **Environment Variables**: Configuration data
   - **Outputs**: Values passed between jobs or steps

## Flow Sequence

1. A GitHub event occurs (e.g., code push)
2. The event triggers workflows defined in YAML files
3. Each workflow executes its jobs (in parallel or sequentially)
4. Each job runs on a specific runner environment
5. Jobs execute their steps in sequence
6. Steps can use actions, run commands, and interact with resources
7. Output from the workflow (artifacts, logs) is available after completion
