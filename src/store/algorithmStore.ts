import { create } from 'zustand';
import { AlgorithmState, AlgorithmSpeed, AlgorithmType } from '../types/algorithms';

interface AlgorithmStore extends AlgorithmState {
  setAlgorithm: (algorithm: string, type: AlgorithmType) => void;
  setInput: (input: any[]) => void;
  setPlaying: (isPlaying: boolean) => void;
  setSpeed: (speed: AlgorithmSpeed) => void;
  setStep: (step: number | ((currentStep: number) => number)) => void;
  reset: () => void;
}

const initialState: AlgorithmState = {
  isPlaying: false,
  speed: 'medium',
  currentStep: 0,
  totalSteps: 0,
  algorithm: null,
  type: null,
  input: [],
  visualData: [],
  pseudocode: [],
  currentLine: 0,
  shouldFade: false
};

export const useAlgorithmStore = create<AlgorithmStore>((set) => ({
  ...initialState,
  setAlgorithm: (algorithm, type) => set({ algorithm, type }),
  setInput: (input) => set({ input }),
  setPlaying: (isPlaying) => set({ isPlaying }),
  setSpeed: (speed) => set({ speed }),
  setStep: (step) =>
    set((state) => ({
      currentStep: typeof step === 'function' ? step(state.currentStep) : step,
    })),  
  reset: () => set(initialState),
}));