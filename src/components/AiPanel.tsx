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
    <div className="bg-gray-900 text-white p-4 rounded-xl w-full md:w-full h-[69vh] hidden md:block">
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

    
    <div className="flex flex-col items-center gap-2 mt-6">
  {/* Engine / Pump Effect */}
  <div className="relative flex items-center justify-center">
    {/* Outer pulse */}
    <div className="absolute w-16 h-16 bg-blue-600 rounded-full opacity-70 animate-ping-slow"></div>

    {/* Inner stable circle */}
    <div className="w-12 h-12 bg-blue-400 rounded-full z-10"></div>

    {/* Smoke */}
    <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2">
      <div className="w-4 h-4 bg-gray-300 rounded-full opacity-50 animate-smoke"></div>
    </div>
  </div>

  {/* Cooking text */}
  <p className="text-sm text-gray-400 mt-7">Sit tight, Its Cooking... 🍳</p>
</div>

  </div>
      
    </div>
  );
};

export default AIExplanationPanel;
