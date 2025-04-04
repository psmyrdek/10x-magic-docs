import React from "react";
import {DockerDiagramWhy} from "./DockerDiagramWhy";
import {DockerDiagramWhat} from "./DockerDiagramWhat";
import {DockerDiagramHow} from "./DockerDiagramHow";

export const DockerPage: React.FC = () => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-4xl font-bold mb-8 text-center'>
        Docker: Container Platform
      </h1>

      <div className='space-y-16'>
        {/* Why Docker? */}
        <section>
          <h2 className='text-3xl font-semibold mb-4'>Why Docker?</h2>
          <p className='text-lg mb-6 text-gray-700'>
            Docker solves critical challenges in modern software development by
            providing a standardized way to package and run applications.
            Explore how Docker addresses common development and deployment
            issues:
          </p>
          <div className='h-[600px] bg-white rounded-lg shadow-lg overflow-hidden'>
            <DockerDiagramWhy />
          </div>
        </section>

        {/* What is Docker? */}
        <section>
          <h2 className='text-3xl font-semibold mb-4'>What is Docker?</h2>
          <p className='text-lg mb-6 text-gray-700'>
            Docker is a comprehensive platform for developing, shipping, and
            running containerized applications. Discover the key components and
            architecture of the Docker platform:
          </p>
          <div className='h-[600px] bg-white rounded-lg shadow-lg overflow-hidden'>
            <DockerDiagramWhat />
          </div>
        </section>

        {/* How to Use Docker */}
        <section>
          <h2 className='text-3xl font-semibold mb-4'>How to Use Docker?</h2>
          <p className='text-lg mb-6 text-gray-700'>
            Getting started with Docker involves a straightforward workflow from
            development to production. Learn the essential steps and commands
            for working with Docker:
          </p>
          <div className='h-[600px] bg-white rounded-lg shadow-lg overflow-hidden'>
            <DockerDiagramHow />
          </div>
        </section>
      </div>
    </div>
  );
};
