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
      <div className='grid grid-cols-5 gap-4'>
        {Array.from({length: TOTAL_TILES}, (_, index) => {
          const subject = availableSubjects[index];

          if (subject) {
            return (
              <Link
                key={subject.id}
                to={subject.path}
                className='bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 flex items-center justify-center h-32'
              >
                <span className='text-center font-medium'>{subject.name}</span>
              </Link>
            );
          } else {
            return (
              <div
                key={`placeholder-${index}`}
                className='bg-gray-100 p-4 rounded-lg border border-gray-200 border-dashed flex items-center justify-center h-32'
              >
                <span className='text-center font-medium text-gray-400'>
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
