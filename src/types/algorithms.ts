export type AlgorithmType = 'sorting' | 'searching' | 'pathfinding' | 'tree' | 'graph' | 'linear';

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
}

export interface ControlsProps {
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onNextStep: () => void;
  onPrevStep: () => void;
  onSpeedChange: (speed: AlgorithmSpeed) => void;
  state: AlgorithmState;
}