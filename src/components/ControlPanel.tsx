'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, StepBack, StepForward } from 'lucide-react';
import { useAlgorithmStore } from '../store/algorithmStore';
import type { AlgorithmSpeed } from '../types/algorithms';

const SPEED_MAP: Record<AlgorithmSpeed, number> = {
  slow: 1000,   // 1 second per step
  medium: 500,  // 0.5 second
  fast: 200,    // 0.2 second
};

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

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setStep((prev) => {
          if (prev >= totalSteps) {
            clearInterval(intervalRef.current!);
            setPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, SPEED_MAP[speed]);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // Clear interval on unmount
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, speed, totalSteps, setStep, setPlaying]);

  const handleSpeedChange = (newSpeed: AlgorithmSpeed) => {
    setSpeed(newSpeed);

    // If already playing, reset interval to apply new speed immediately
    if (isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setStep((prev) => {
          if (prev >= totalSteps) {
            clearInterval(intervalRef.current!);
            setPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, SPEED_MAP[newSpeed]);
    }
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
            onClick={() => setStep((prev) => Math.max(0, prev - 1))}
          >
            <StepBack size={24} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-gray-600 hover:bg-gray-500"
            onClick={() => setStep((prev) => Math.min(totalSteps, prev + 1))}
          >
            <StepForward size={24} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-red-500 hover:bg-red-600"
            onClick={() => {
              reset();
              if (intervalRef.current) {
                clearInterval(intervalRef.current);
              }
            }}
          >
            <RotateCcw size={24} />
          </motion.button>
        </div>

        <div className="flex flex-wrap items-center space-x-4">
          <span className="text-sm whitespace-nowrap hidden md:block">Speed:</span>
          <div className="flex flex-wrap space-x-2 hidden md:flex">
            {(['slow', 'medium', 'fast'] as AlgorithmSpeed[]).map((s) => (
              <button
                key={s}
                className={`px-3 py-1 rounded ${speed === s ? 'bg-blue-500' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                onClick={() => handleSpeedChange(s)}
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
