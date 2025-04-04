import React from "react";
import GithubActionsDiagram from "./GithubActionsDiagram";

const GithubActionsPage: React.FC = () => {
  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-bold mb-4'>GitHub Actions</h1>
        <p className='text-lg text-gray-700'>
          Interactive diagram of GitHub Actions workflow components and their
          relationships. Click on any element to learn more about its purpose
          and functionality.
        </p>
      </div>

      <GithubActionsDiagram />
    </div>
  );
};

export default GithubActionsPage;
