import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, StepBack, StepForward } from 'lucide-react';
import { useAlgorithmStore } from '../store/algorithmStore';
import type { AlgorithmSpeed } from '../types/algorithms';

const ControlPanel: React.FC = () => {
  const {
    isPlaying,
    speed,
    currentStep,
    totalSteps,
    setPlaying,
    setSpeed,
    setStep,
    reset
  } = useAlgorithmStore();

  const handleSpeedChange = (newSpeed: AlgorithmSpeed) => {
    setSpeed(newSpeed);
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="flex items-center justify-between ml-12 md:ml-0">
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-blue-500 hover:bg-blue-600"
            onClick={() => setPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-gray-600 hover:bg-gray-500"
            onClick={() => setStep(Math.max(0, currentStep - 1))}
          >
            <StepBack size={24} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-gray-600 hover:bg-gray-500"
            onClick={() => setStep(Math.min(totalSteps, currentStep + 1))}
          >
            <StepForward size={24} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-red-500 hover:bg-red-600"
            onClick={reset}
          >
            <RotateCcw size={24} />
          </motion.button>
        </div>

        <div className="flex flex-wrap items-center space-x-4 ">
          <span className="text-sm whitespace-nowrap hidden md:block">Speed:</span>
          <div className="flex flex-wrap space-x-2 hidden md:block">
            {['slow', 'medium', 'fast'].map((s) => (
              <button
                key={s}
                className={`px-3 py-1 rounded ${speed === s ? 'bg-blue-500' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                onClick={() => handleSpeedChange(s as AlgorithmSpeed)}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;