import React from 'react';
import { motion } from 'framer-motion';
import { useAlgorithmStore } from '../store/algorithmStore';
import AlgorithmSelector from './AlgorithmSelector';
import ControlPanel from './ControlPanel';
import InputArea from './InputArea';
import CodeHighlighter from './CodeHighlighter';
import Canvas from './Canvas';

const VisualizerWrapper: React.FC = () => {
  useAlgorithmStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-8">
          Data Structures & Algorithms Visualizer
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <AlgorithmSelector />
            <Canvas />
            <ControlPanel />
          </div>
          
          <div className="space-y-6">
            <InputArea />
            <CodeHighlighter />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VisualizerWrapper;