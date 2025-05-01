import React, {useState, useEffect, useRef} from 'react';
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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.innerWidth < 768) {
        setShowPopup(true);
        setTimeout(() => setAnimate(true), 50);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
  

  const handleClose = () => {
    setAnimate(false); 
    setTimeout(() => setShowPopup(false), 3000); 
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

        
        <StarField />
        {/* Mobile Side Menu */}
{menuOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-70 z-[10000] flex">
    <motion.div
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: 'spring', stiffness: 50 }}
      className="w-64 bg-gray-900 h-full p-6 flex flex-col"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Trace</h2>
        <button
          onClick={() => setMenuOpen(false)}
          className="text-white text-2xl"
        >
          ✖
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl text-blue-400 mb-2">Welcome!</h3>
          <p className="text-sm text-gray-400">
            Welcome to <span className="text-white font-semibold">Trace</span>! 🚀 Visualize algorithms in a whole new way.
          </p>
        </div>

        <div>
          <h3 className="text-xl text-blue-400 mb-2">About Trace</h3>
          <p className="text-sm text-gray-400">
            Trace is an interactive algorithm visualizer powered by AI. Designed for students, developers, and curious minds.
          </p>
        </div>

        <div>
          <h3 className="text-xl text-blue-400 mb-2">Quick Links</h3>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>
              <a href="https://github.com/harshitrwt/Trace" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                GitHub Repo
              </a>
            </li>
            <li>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Twitter
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Spacer */}
      <div className="flex-grow"></div>

      <p className="text-center text-xs text-gray-600">Made with 💙 by harshit_rwt</p>
    </motion.div>

    {/* Clicking outside closes the menu */}
    <div
      className="flex-grow"
      onClick={() => setMenuOpen(false)}
    ></div>
  </div>
)}

  
        
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto"
          >
            <nav className="flex items-center justify-between px-4 py-3 bg-gray-900 rounded-lg shadow-lg mb-6 flex-wrap relative">
  <div className="flex items-center space-x-2">
    <img
      src="/images/logotrace.jpg"
      alt="Icon"
      className="w-11 h-13 md:w-14 md:h-14 rounded-full m-1"
    />
    <h1 className="text-white font-bold italic text-3xl md:text-5xl hidden md:block">
      Trace
    </h1>
  </div>

  <div className="flex items-center space-x-4">
    <a
      href="https://github.com/harshitrwt/Trace"
      target="_blank"
      rel="noopener noreferrer"
      className="mt-0 sm:mt-0 bg-blue-600 text-white-600 rounded-md px-3 py-1 text-sm sm:text-base font-medium shadow-2xl border border-black"
    >
      ⭐
      <span className="hidden md:block">Star</span>
    </a>

    {/* Mobile Menu Icon */}
    <button
      onClick={() => setMenuOpen(true)}
      className="text-white focus:outline-none md:hidden"
    >
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>
</nav>

  
            {/* Small screen InputArea (above Canvas) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <AlgorithmSelector />
  
                <div className="lg:hidden mb-6">
                  <InputArea />
                </div>
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

