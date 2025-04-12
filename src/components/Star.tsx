import { Github } from 'lucide-react';

const Star = () => {
  return (
    <div className="bg-gray-900 text-white rounded-xl p-6 mt-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-2">Enjoying Trace?</h2>
      <p className="mb-4 text-sm text-gray-300">
        If you liked this project or have any suggestions for improvement, feel free to drop me a <a href='harshit77dev@gmail.com' className='text-blue-500'>message</a>!
        Im always looking to build better tools and services.
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 space-x-2">
        <a
          href="https://github.com/harshitrwt" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
        >
          <Github className="mx-auto" size={18} />
          
        </a>

        <p className="text-sm text-gray-400">
          Follow me on GitHub or support my work, your support means a lot 💙
        </p>
      </div>
    </div>
  );
};

export default Star;
