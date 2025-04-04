import {Link} from "react-router-dom";

// Define subject data
const subjects = [
  {id: "github-actions", name: "GitHub Actions", path: "/github-actions"},
  {id: "docker", name: "Docker", path: "/docker"},
  {id: "react", name: "React", path: "/react"},
  // Placeholders for future subjects (remaining 22 tiles)
  ...Array.from({length: 22}, (_, i) => ({
    id: `placeholder-${i + 4}`,
    name: `Subject ${i + 4}`,
    path: "#",
  })),
];

export default function HomePage() {
  return (
    <div className='container mx-auto p-8'>
      <div className='grid grid-cols-5 gap-4'>
        {subjects.map((subject) =>
          subject.id.includes("placeholder") ? (
            <div
              key={subject.id}
              className='bg-gray-100 p-4 rounded-lg border border-gray-200 border-dashed flex items-center justify-center h-32'
            >
              <span className='text-center font-medium text-gray-400'>
                {subject.name}
              </span>
            </div>
          ) : (
            <Link
              key={subject.id}
              to={subject.path}
              className='bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 flex items-center justify-center h-32'
            >
              <span className='text-center font-medium'>{subject.name}</span>
            </Link>
          )
        )}
      </div>
    </div>
  );
}
