'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAlgorithmStore } from '../store/algorithmStore';

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

  return (
    <div className="bg-gray-900 rounded-lg p-4">
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
                className="w-full px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-white transition-colors flex justify-between items-center"
                onClick={() => setAlgorithm(alg, type as any)}
              >
                <span>{alg}</span>
                <span className="text-blue-600">{openCategory === type ? '◉' : '◉'}</span>
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
              <span className='text-blue-600'>{openCategory === type ? '◉' : '◉'}</span>
            </button>
            {openCategory === type && (
              <div className="px-4 py-2 space-y-2">
                {algs.map((alg) => (
                  <motion.button
                    key={alg}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full text-left px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 text-white transition-colors"
                    onClick={() => setAlgorithm(alg, type as any)}
                  >
                    {alg}
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlgorithmSelector;
