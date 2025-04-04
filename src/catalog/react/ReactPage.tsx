import React from "react";
import ReactDiagramWhy from "./ReactDiagramWhy";
import ReactDiagramWhat from "./ReactDiagramWhat";
import ReactDiagramHow from "./ReactDiagramHow";

const ReactPage: React.FC = () => {
  return (
    <div className='flex flex-col gap-8 p-8'>
      <header className='text-center'>
        <h1 className='text-4xl font-bold text-blue-600 mb-4'>React</h1>
        <p className='text-xl text-gray-600'>
          A JavaScript library for building user interfaces
        </p>
      </header>

      <section className='mb-12'>
        <h2 className='text-3xl font-semibold mb-6 text-gray-800'>
          Why React?
        </h2>
        <p className='text-gray-600 mb-6'>
          Discover the challenges in traditional web development and how React
          solves them through its innovative features and architecture.
        </p>
        <div className='bg-white rounded-lg shadow-lg p-4'>
          <ReactDiagramWhy />
        </div>
      </section>

      <section className='mb-12'>
        <h2 className='text-3xl font-semibold mb-6 text-gray-800'>
          What is React?
        </h2>
        <p className='text-gray-600 mb-6'>
          Explore React's core concepts, components, and how they work together
          to create powerful user interfaces.
        </p>
        <div className='bg-white rounded-lg shadow-lg p-4'>
          <ReactDiagramWhat />
        </div>
      </section>

      <section className='mb-12'>
        <h2 className='text-3xl font-semibold mb-6 text-gray-800'>
          How to Use React?
        </h2>
        <p className='text-gray-600 mb-6'>
          Learn the step-by-step process of building React applications, from
          initial setup to deployment.
        </p>
        <div className='bg-white rounded-lg shadow-lg p-4'>
          <ReactDiagramHow />
        </div>
      </section>

      <footer className='text-center text-gray-600 mt-8'>
        <p>
          For more information, visit the{" "}
          <a
            href='https://react.dev'
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-600 hover:text-blue-800'
          >
            official React documentation
          </a>
        </p>
      </footer>
    </div>
  );
};

export default ReactPage;
