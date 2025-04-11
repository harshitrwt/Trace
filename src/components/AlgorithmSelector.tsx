import React from 'react';
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

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Select Algorithm</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(algorithms).map(([type, algs]) => (
          <div key={type} className="space-y-2">
            <h3 className="text-lg font-medium capitalize">{type}</h3>
            {algs.map((alg) => (
              <motion.button
                key={alg}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full text-left px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
                onClick={() => setAlgorithm(alg, type as any)}
              >
                {alg}
              </motion.button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlgorithmSelector;