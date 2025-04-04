# GitHub Actions

GitHub Actions is a powerful CI/CD platform integrated directly into GitHub repositories. It enables you to automate your software development workflows by defining custom execution pipelines that respond to events in your GitHub repository.

## Key Concepts

### Workflows

A workflow is a configurable automated process made up of one or more jobs. Workflows are defined in YAML files stored in the `.github/workflows` directory of your repository. They're triggered by events in your repository like pushes, pull requests, or scheduled intervals.

Example workflow file:

```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: npm test
```

### Events

Events are specific activities that trigger a workflow run:

- **Repository events**: push, pull_request, create, fork, issues, issue_comment
- **Scheduled events**: schedule (using cron syntax)
- **Manual events**: workflow_dispatch, repository_dispatch
- **Webhooks**: Any GitHub webhook event

### Jobs

Jobs are sets of steps executed on the same runner. By default, multiple jobs run in parallel, but can be configured to run sequentially with dependencies.

Jobs have properties like:

- `runs-on`: Specifies the runner environment (e.g., ubuntu-latest, windows-latest)
- `needs`: Defines job dependencies
- `if`: Conditional execution
- `strategy`: Matrix builds for testing across multiple configurations

### Steps

Steps are individual tasks within a job. They can run commands, set up tasks, or run an action.

Each step:

- Runs in its own process
- Has access to the workspace and repository
- Can access outputs from previous steps
- Can be conditional

### Actions

Actions are reusable units of code that can be included as steps in your workflow. They can be:

- **Public actions**: From GitHub Marketplace or public repositories
- **Private actions**: Located in the same repository as the workflow
- **Docker container actions**: Run in a Docker container
- **JavaScript actions**: Run directly on the runner
- **Composite actions**: Combine multiple steps into a single reusable action

Common action types:

- Checkout code
- Set up runtime environments (Node.js, Python, Java)
- Deploy to cloud services
- Send notifications
- Interact with GitHub API

### Runners

Runners are servers that execute your workflows. GitHub provides:

- **GitHub-hosted runners**: Ready-to-use VMs with common tools pre-installed
- **Self-hosted runners**: Your own machines where you install the runner agent

### Environment Variables and Secrets

- **Environment variables**: Pass data between workflow steps or configure the workflow
- **Secrets**: Encrypted environment variables for sensitive data like API tokens

## Advanced Features

### Matrix Builds

Run jobs across multiple configurations simultaneously:

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [12.x, 14.x, 16.x]
        os: [ubuntu-latest, windows-latest]
    steps:
      - uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm test
```

### Artifacts and Caching

- **Artifacts**: Pass data between jobs or store workflow outputs
- **Caching**: Speed up workflows by caching dependencies

### Workflow Commands

Special commands in the form of `::command name::parameters` allow interaction with the runner:

- Set outputs
- Add system paths
- Create annotations
- Set environment variables

### Reusable Workflows

Create a workflow that can be called from another workflow:

```yaml
name: Reusable workflow
on:
  workflow_call:
    inputs:
      username:
        required: true
        type: string
```

## Best Practices

1. **Keep workflows focused**: Each workflow should have a clear purpose
2. **Use timeouts**: Prevent runaway jobs with timeouts
3. **Cache dependencies**: Reduce build times and network usage
4. **Use specific versions**: Pin action versions to avoid breaking changes
5. **Secure your workflows**: Use secrets and minimize permissions
6. **Optimize for speed**: Run jobs in parallel when possible

## Common Use Cases

- Continuous Integration: Run tests on push/PR
- Dependency updates: Automate dependabot PRs
- Deployments: Auto-deploy to staging/production
- Issue management: Auto-label and route issues
- Release management: Create releases with changelogs
- Scheduled maintenance: Clean up old artifacts
- Documentation generation: Update docs on merge to main
