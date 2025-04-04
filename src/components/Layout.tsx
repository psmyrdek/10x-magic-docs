import {ReactNode} from "react";
import {Link} from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({children}: LayoutProps) {
  return (
    <div className='min-h-screen bg-gray-50'>
      <header className='bg-white shadow-sm'>
        <div className='container mx-auto p-4'>
          <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between'>
            <h1 className='text-2xl font-bold text-blue-600'>
              <Link to='/'>✨ Magic Docs by 10xDevs</Link>
            </h1>
            <nav className='mt-4 sm:mt-0'>
              <ul className='flex space-x-6'>
                {/* Navigation links removed */}
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className='container mx-auto px-4 py-8'>{children}</main>
      <footer className='bg-white border-t mt-12 py-6'>
        <div className='container mx-auto px-4 text-center text-gray-500'>
          <p>© {new Date().getFullYear()} 10xDevs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
