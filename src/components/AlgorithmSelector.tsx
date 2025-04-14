'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAlgorithmStore } from '../store/algorithmStore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const algorithms = {
  sorting: ['Bubble Sort', 'Quick Sort', 'Merge Sort'],
  searching: ['Binary Search', 'Linear Search'],
  dynamic: ['Fibonacci', 'Knapsack Problem'],
  backtracking: ['N-Queens Problem', 'Sudoku Solver'],
  pathfinding: ["Dijkstra's Algorithm"],
  tree: ['DFS', 'BFS', 'Inorder Traversal'],
  graph: ["Kruskal's Algorithm", "Prim's Algorithm"],
  linear: ['Stack Operations', 'Queue Operations'],
};

const AlgorithmSelector: React.FC = () => {
  const { setAlgorithm } = useAlgorithmStore();
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | null>(null);

  const handleSelectAlgorithm = (alg: string, type: string) => {
    setSelectedAlgorithm(alg);
    setAlgorithm(alg, type as any);
    toast.success(`Selected Algorithm: ${alg}`, {
      position: 'bottom-center',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: 'custom-toast ', 
    });
    
  };

  return (
    <div className="bg-gray-900 rounded-lg p-3">
      <h2 className="text-xl font-semibold mb-4 text-white">Select an Algorithm</h2>

      {/* Large screens grid */}
      <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(algorithms).map(([type, algs]) => (
          <div key={type} className="space-y-2">
            <h3 className="text-lg font-medium capitalize text-white">{type}</h3>
            {algs.map((alg) => (
              <motion.button
              key={alg}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full px-4 py-2 rounded ${
                selectedAlgorithm === alg ? 'bg-blue-600' : 'bg-gray-700'
              } hover:bg-blue-600 text-white transition-colors flex justify-between items-center`}
              onClick={() => {
                
                setSelectedAlgorithm(alg);
                handleSelectAlgorithm(alg, type); 
              }}
            >
              <span>{alg}</span>
            </motion.button>
            ))}
          </div>
        ))}
      </div>

      {/* Small screens: collapsible accordions */}
      <div className="sm:hidden space-y-2">
        {Object.entries(algorithms).map(([type, algs]) => (
          <div key={type} className="bg-gray-700 rounded-md">
            <button
              onClick={() => setOpenCategory(openCategory === type ? null : type)}
              className="w-full px-4 py-2 text-left font-semibold capitalize text-white flex justify-between items-center"
            >
              {type}
              <span className="text-blue-600">{openCategory === type ? '◉' : '◉'}</span>
            </button>
            <AnimatePresence>
              {openCategory === type && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="px-4 py-2 space-y-2 overflow-hidden"
                >
                  {algs.map((alg) => (
                    <motion.button
                      key={alg}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full text-left px-4 py-2 rounded ${
                        selectedAlgorithm === alg ? 'bg-blue-600' : 'bg-gray-600'
                      } hover:bg-gray-500 text-white transition-colors`}
                      onClick={() => handleSelectAlgorithm(alg, type)}
                    >
                      {alg}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlgorithmSelector;
