import React, { useEffect, useState } from 'react';
import { useAlgorithmStore } from '../store/algorithmStore';
import { getGeminiExplanation } from '../utils/logic';

const AIExplanationPanel: React.FC = () => {
  const { currentStep, visualData, algorithm } = useAlgorithmStore();
  const [explanation, setExplanation] = useState<string>('Fetching explanation...');

  useEffect(() => {
    const explain = async () => {
      const data = visualData?.[currentStep] || {};
      const text = await getGeminiExplanation(algorithm || '', currentStep, data);
      setExplanation(text);
    };

    explain();
  }, [currentStep, visualData, algorithm]);

  return (
    <div className="bg-gray-900 text-white p-4 rounded-xl w-full md:w-full h-[61vh] hidden md:block">
      <h2 className="text-xl font-semibold mb-2">🔍 Algorithm Explanation</h2>
      <p className="text-sm leading-relaxed whitespace-pre-wrap">{explanation}</p>
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center shadow-lg flex flex-col items-center gap-4 mt-5">
    <div className="text-5xl">🤖🤔✨</div>

    <h3 className="text-3xl font-bold text-blue-400">
      Coming Soon!
    </h3>

    <p className="text-sm text-gray-300 max-w-md">
      In the making of an intelligent assistant to break down every algorithm step visually and verbally, like having a coding buddy right inside your screen!
    </p>

    
    <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden mt-2">
      <div className="bg-blue-500 h-full w-3/5 animate-pulse"></div>
    </div>

    <p className="text-xs text-gray-400 mt-2">Sit tight, its cooking... 🍳</p>
  </div>
      
    </div>
  );
};

export default AIExplanationPanel;
