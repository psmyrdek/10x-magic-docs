import {Link} from "react-router-dom";

// Define available subjects
const availableSubjects = [
  {id: "github-actions", name: "GitHub Actions", path: "/github-actions"},
];

// Total number of tiles to display
const TOTAL_TILES = 25;

export default function HomePage() {
  return (
    <div className='container mx-auto p-8'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
        {Array.from({length: TOTAL_TILES}, (_, index) => {
          const subject = availableSubjects[index];

          if (subject) {
            return (
              <Link
                key={subject.id}
                to={subject.path}
                className='bg-gradient-to-br from-[#2a2a2a] to-[#242424] p-4 rounded-lg shadow-lg hover:shadow-xl transition-all border border-blue-700 flex items-center justify-center h-32 hover:bg-gradient-to-br hover:from-[#323232] hover:to-[#282828] transform hover:scale-105'
              >
                <span className='text-center font-medium text-blue-300 hover:text-blue-200 transition-colors text-lg'>
                  {subject.name}
                </span>
              </Link>
            );
          } else {
            return (
              <div
                key={`placeholder-${index}`}
                className='bg-[#1e1e1e] p-4 rounded-lg border border-gray-800 border-dashed flex items-center justify-center h-32'
              >
                <span className='text-center font-medium text-gray-500'>
                  Subject {index + 1}
                </span>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
