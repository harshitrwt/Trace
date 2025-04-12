import React, {useState, useEffect} from 'react';
import { motion } from 'framer-motion';
import { useAlgorithmStore } from '../store/algorithmStore';
import AlgorithmSelector from './AlgorithmSelector';
import ControlPanel from './ControlPanel';
import InputArea from './InputArea';
import CodeHighlighter from './CodeHighlighter';
import Canvas from './Canvas';
import Star from './Star';
import StarField from './StarField';
import AIExplanationPanel from './AiPanel';



  

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
    const [showPopup, setShowPopup] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.innerWidth < 768) {
        setShowPopup(true);
        // Start the animation after mount
        setTimeout(() => setAnimate(true), 50);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setAnimate(false); // animate out (optional)
    setTimeout(() => setShowPopup(false), 3000); // delay unmount
  };
  
  
    return (
      <div className="relative min-h-screen bg-black text-white p-6 block">
       <div className="relative bg-black text-white p-2">
      {showPopup && (
        <div
          className={`fixed top-0 left-0 right-0 bg-gray-900 text-gray-400 py-2 px-4 flex justify-between items-center shadow-md z-[9999] 
          transform transition-all duration-500 ease-in-out
          ${animate ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
        >
          <span>
            We recommend using bigger screens for a better experience. AI features work best on desktops!
          </span>
          <button
            className="text-blue-600 hover:text-blue-700 mt-10"
            onClick={handleClose}
          >
            ✖
          </button>
        </div>
      )}
    </div>

        {/* StarField as the background */}
        <StarField />
  
        {/* Main content */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto"
          >
            <nav className="flex items-center justify-between px-4 py-3 bg-gray-900 rounded-lg  shadow-lg mb-6 flex-wrap">
              <div className="flex items-center space-x-1">
                <img
                  src="/images/protein-svgrepo-com.svg"
                  alt="Icon"
                  className="w-11 h-11 md:w-16 md:h-16"
                />
                <h1 className="text-white font-bold italic text-3xl md:text-5xl">
                  Trace
                </h1>
              </div>
  
              
              <a
                href="https://github.com/harshitrwt/Trace"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="mt-3 sm:mt-0 bg-blue-600 text-white-600 rounded-md px-3 py-1 text-sm sm:text-base font-medium shadow-2xl border border-black">
                  ⭐ {stars}
                  <span className="hidden md:block">Stars</span>
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
                <Star />
                <AIExplanationPanel/>
              </div>
            </div>
  
            {/* Small screen CodeHighlighter below all */}
            <div className="lg:hidden mt-6">
              <CodeHighlighter />
            </div>
          </motion.div>
        </div>
      </div>
    );
  };
  
export default VisualizerWrapper;

