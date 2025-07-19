import { create } from 'zustand';

export type AlgorithmType = 'sorting' | 'searching' | 'pathfinding' | 'tree' | 'graph' | 'linear' | 'linkedStructures' | 'dynamic' | 'backtracking';
export type AlgorithmSpeed = 'slow' | 'medium' | 'fast';

export interface AlgorithmState {
  isPlaying: boolean;
  speed: AlgorithmSpeed;
  currentStep: number;
  totalSteps: number;
  algorithm: string | null;
  type: AlgorithmType | null;
  input: any[];
  visualData: any[];
  pseudocode: string[];
  currentLine: number;
  shouldFade: boolean; 
}

export interface AlgorithmActions {
  setPlaying: (isPlaying: boolean) => void;
  setSpeed: (speed: AlgorithmSpeed) => void;
  setStep: (step: number | ((prev: number) => number)) => void;
  reset: () => void;
  setShouldFade: (fade: boolean) => void; // <-- NEW
}

export const useAlgorithmStore = create<AlgorithmState & AlgorithmActions>((set) => ({
  isPlaying: false,
  speed: 'medium',
  currentStep: 0,
  totalSteps: 10,
  algorithm: null,
  type: null,
  input: [],
  visualData: [],
  pseudocode: [],
  currentLine: 0,
  shouldFade: false, // <-- NEW

  setPlaying: (isPlaying) => set({ isPlaying }),
  setSpeed: (speed) => set({ speed }),
  setStep: (step) =>
    set((state) => ({
      currentStep: typeof step === 'function' ? step(state.currentStep) : step,
    })),
  reset: () =>
    set((state) => ({
      currentStep: 0,
      isPlaying: false,
      currentLine: 0,
      visualData: [...state.input], // reset visualData to original input if needed
    })),
  setShouldFade: (fade) => set({ shouldFade: fade }), // <-- NEW
}));
