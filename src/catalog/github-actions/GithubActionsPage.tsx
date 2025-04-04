import React from "react";
import {GithubActionsContextDiagram} from "./GithubActionsContextDiagram";
import {GithubActionsStructureDiagram} from "./GithubActionsStructureDiagram";
import {GithubActionsWorkflowDiagram} from "./GithubActionsWorkflowDiagram";

export const GithubActionsPage: React.FC = () => {
  return (
    <div className='min-h-screen bg-gray-900 text-gray-100 p-8'>
      <div className='max-w-6xl mx-auto'>
        <h1 className='text-4xl font-bold mb-8 text-blue-400'>
          GitHub Actions
        </h1>

        {/* Why section */}
        <section className='mb-16'>
          <h2 className='text-3xl font-semibold mb-6 text-blue-300'>
            Why GitHub Actions?
          </h2>
          <p className='text-lg mb-6'>
            GitHub Actions revolutionizes software development workflows by
            providing seamless automation directly within your GitHub
            repositories. It addresses common challenges in modern software
            development and enables teams to focus on building features rather
            than managing infrastructure.
          </p>
          <div className='bg-gray-800 rounded-lg p-6 mb-8'>
            <GithubActionsContextDiagram />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='bg-gray-800 rounded-lg p-6'>
              <h3 className='text-xl font-semibold mb-4 text-blue-300'>
                Key Benefits
              </h3>
              <ul className='list-disc list-inside space-y-2'>
                <li>Automated CI/CD pipelines</li>
                <li>Native GitHub integration</li>
                <li>Extensive marketplace of actions</li>
                <li>Flexible and customizable workflows</li>
                <li>Built-in secret management</li>
              </ul>
            </div>
            <div className='bg-gray-800 rounded-lg p-6'>
              <h3 className='text-xl font-semibold mb-4 text-blue-300'>
                Common Use Cases
              </h3>
              <ul className='list-disc list-inside space-y-2'>
                <li>Continuous Integration</li>
                <li>Automated Testing</li>
                <li>Code Quality Checks</li>
                <li>Automated Deployments</li>
                <li>Release Management</li>
              </ul>
            </div>
          </div>
        </section>

        {/* What section */}
        <section className='mb-16'>
          <h2 className='text-3xl font-semibold mb-6 text-blue-300'>
            What is GitHub Actions?
          </h2>
          <p className='text-lg mb-6'>
            GitHub Actions is a powerful automation platform that enables you to
            create custom software development lifecycle workflows directly in
            your GitHub repository. These workflows are made up of different
            tasks and steps that can be triggered by various GitHub events.
          </p>
          <div className='bg-gray-800 rounded-lg p-6 mb-8'>
            <GithubActionsStructureDiagram />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='bg-gray-800 rounded-lg p-6'>
              <h3 className='text-xl font-semibold mb-4 text-blue-300'>
                Core Components
              </h3>
              <ul className='list-disc list-inside space-y-2'>
                <li>Workflows: YAML configuration files</li>
                <li>Events: Workflow triggers</li>
                <li>Jobs: Groups of steps</li>
                <li>Actions: Reusable workflow units</li>
                <li>Runners: Execution environments</li>
              </ul>
            </div>
            <div className='bg-gray-800 rounded-lg p-6'>
              <h3 className='text-xl font-semibold mb-4 text-blue-300'>
                Features
              </h3>
              <ul className='list-disc list-inside space-y-2'>
                <li>Matrix builds</li>
                <li>Parallel job execution</li>
                <li>Environment variables</li>
                <li>Secrets management</li>
                <li>Artifact sharing</li>
              </ul>
            </div>
          </div>
        </section>

        {/* How section */}
        <section className='mb-16'>
          <h2 className='text-3xl font-semibold mb-6 text-blue-300'>
            How to Use GitHub Actions?
          </h2>
          <p className='text-lg mb-6'>
            Implementing GitHub Actions involves creating workflow files in your
            repository's .github/workflows directory. These workflows define the
            automation process and can be as simple or complex as needed.
          </p>
          <div className='bg-gray-800 rounded-lg p-6 mb-8'>
            <GithubActionsWorkflowDiagram />
          </div>
          <div className='bg-gray-800 rounded-lg p-6 mb-8'>
            <h3 className='text-xl font-semibold mb-4 text-blue-300'>
              Basic Workflow Example
            </h3>
            <pre className='bg-gray-900 p-4 rounded-lg overflow-x-auto'>
              <code className='text-sm'>
                {`name: CI
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test`}
              </code>
            </pre>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='bg-gray-800 rounded-lg p-6'>
              <h3 className='text-xl font-semibold mb-4 text-blue-300'>
                Best Practices
              </h3>
              <ul className='list-disc list-inside space-y-2'>
                <li>Use specific versions for actions</li>
                <li>Implement proper secret management</li>
                <li>Cache dependencies</li>
                <li>Keep workflows focused and modular</li>
                <li>Add proper error handling</li>
              </ul>
            </div>
            <div className='bg-gray-800 rounded-lg p-6'>
              <h3 className='text-xl font-semibold mb-4 text-blue-300'>
                Advanced Topics
              </h3>
              <ul className='list-disc list-inside space-y-2'>
                <li>Creating custom actions</li>
                <li>Self-hosted runners</li>
                <li>Matrix builds</li>
                <li>Workflow composition</li>
                <li>Environment protection rules</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Resources section */}
        <section>
          <h2 className='text-3xl font-semibold mb-6 text-blue-300'>
            Additional Resources
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <a
              href='https://docs.github.com/en/actions'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors'
            >
              <h3 className='text-xl font-semibold mb-4 text-blue-300'>
                Official Documentation
              </h3>
              <p>
                Comprehensive guide to GitHub Actions features and capabilities
              </p>
            </a>
            <a
              href='https://github.com/marketplace?type=actions'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors'
            >
              <h3 className='text-xl font-semibold mb-4 text-blue-300'>
                Actions Marketplace
              </h3>
              <p>Discover and share reusable workflow actions</p>
            </a>
            <a
              href='https://github.com/sdras/awesome-actions'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors'
            >
              <h3 className='text-xl font-semibold mb-4 text-blue-300'>
                Awesome Actions
              </h3>
              <p>Curated list of awesome actions to use in workflows</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};
