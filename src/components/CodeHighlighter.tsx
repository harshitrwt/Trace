import React from 'react';
import { useAlgorithmStore } from '../store/algorithmStore';

const CodeHighlighter: React.FC = () => {
  const { pseudocode, currentLine } = useAlgorithmStore();

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Algorithm Steps</h2>
      <div className="font-mono text-sm">
        {pseudocode.length === 0 ? (
          <p className="text-gray-400">Select an algorithm to view its steps</p>
        ) : (
          <div className="space-y-1">
            {pseudocode.map((line, index) => (
              <div
                key={index}
                className={`py-1 px-2 rounded ${
                  currentLine === index
                    ? 'bg-blue-500 bg-opacity-25 border-l-4 border-blue-500'
                    : 'border-l-4 border-transparent'
                }`}
              >
                {line}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeHighlighter;