import React, {useState, useEffect} from 'react';
import { motion } from 'framer-motion';
import { useAlgorithmStore } from '../store/algorithmStore';
import AlgorithmSelector from './AlgorithmSelector';
import ControlPanel from './ControlPanel';
import InputArea from './InputArea';
import CodeHighlighter from './CodeHighlighter';
import Canvas from './Canvas';
import Star from './Star';



  

  // Replace with your actual GitHub repo
  const owner = "harshitrwt";
  const repo = "Trace";
const VisualizerWrapper: React.FC = () => {
  useAlgorithmStore();

  useEffect(() => {
    fetch(`https://api.github.com/repos/${owner}/${repo}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.stargazers_count) {
          setStars(data.stargazers_count);
        }
      })
      .catch((err) => console.error("GitHub API error:", err));
  }, []);

  const [stars, setStars] = useState(0);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <nav className="flex items-center justify-between px-4 py-3 bg-white rounded-lg shadow-lg mb-6 flex-wrap">
      
      <div className="flex items-center space-x-3">
        
      <img
  src="/images/protein-svgrepo-com.svg" 
  alt="Icon"
  className="w-9 h-9 md:w-14 md:h-12"
/>

        <h1 className="text-black font-bold italic text-3xl md:text-4xl">
          Trace
        </h1>
      </div>

      {/* GitHub Stars Box */}
      <a
  href="https://github.com/harshitrwt/Trace"
  target="_blank"
  rel="noopener noreferrer"
>
  <div className="mt-3 sm:mt-0 bg-blue-600 text-white-600 rounded-md px-3 py-1 text-sm sm:text-base font-medium shadow-2xl border border-black">
    ⭐ {stars}<span className="hidden md:block">Stars</span>
  </div>
</a>
    </nav>

        {/* Small screen InputArea (above Canvas) */}


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <AlgorithmSelector />

            <div className="lg:hidden mb-6">
              <InputArea />
            </div>

            {/* Canvas stays in its place, but InputArea is only above it on mobile */}
            <Canvas />

            <ControlPanel />
          </div>


          {/* Large screen InputArea (side panel) */}
          <div className="space-y-6 hidden lg:block">
            <InputArea />
            <CodeHighlighter />
            <Star/>
            
          </div>
        </div>

        {/* Small screen CodeHighlighter below all */}
        <div className="lg:hidden mt-6">
          <CodeHighlighter />
        </div>
      </motion.div>
    </div>
  );
};

export default VisualizerWrapper;
