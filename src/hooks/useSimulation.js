import { useState, useEffect, useRef, useCallback } from 'react';

export const PIPELINE_STAGES = [
  { id: 1, key: 'input', label: 'Input Received', icon: 'FileText', desc: 'Raw data entering the AI engine' },
  { id: 2, key: 'tokens', label: 'Tokenization', icon: 'Layers', desc: 'Splitting into discrete tokens' },
  { id: 3, key: 'features', label: 'Feature Detection', icon: 'Sparkles', desc: 'Isolating high-weight patterns' },
  { id: 4, key: 'processing', label: 'Pattern Analysis', icon: 'Cpu', desc: 'Neural network weight evaluation' },
  { id: 5, key: 'confidence', label: 'Confidence Score', icon: 'Activity', desc: 'Softmax probability calculation' },
  { id: 6, key: 'decision', label: 'Final Decision', icon: 'CheckCircle2', desc: 'Classification prediction generated' }
];

export function useSimulation(totalSteps = 6) {
  const [currentStep, setCurrentStep] = useState(0); // 0 = idle, 1..6 = active stages
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [speed, setSpeed] = useState(1); // 0.5, 1, 1.5, 2
  const [statusMessage, setStatusMessage] = useState('Ready for input');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timelineEvents, setTimelineEvents] = useState([]);

  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const elapsedTimeRef = useRef(0);

  const getStageDuration = useCallback((step, currentSpeed) => {
    const baseDurations = {
      1: 900,  // Input received
      2: 1200, // Token breakdown
      3: 1400, // Feature detection
      4: 1600, // Neural core processing
      5: 1300, // Confidence calculation
      6: 1000  // Final decision
    };
    return (baseDurations[step] || 1000) / currentSpeed;
  }, []);

  const getStatusForStep = (step) => {
    switch (step) {
      case 1: return 'Receiving and sanitizing input stream...';
      case 2: return 'Breaking down input into discrete tokens...';
      case 3: return 'Detecting suspicious patterns & high-weight features...';
      case 4: return 'Comparing learned patterns across neural layers...';
      case 5: return 'Calculating probability distribution & confidence...';
      case 6: return 'Final AI prediction synthesized.';
      default: return 'Ready for input';
    }
  };

  const advanceStep = useCallback((targetStep) => {
    setCurrentStep(targetStep);
    const msg = getStatusForStep(targetStep);
    setStatusMessage(msg);

    const stageMeta = PIPELINE_STAGES.find(s => s.id === targetStep);
    if (stageMeta) {
      setTimelineEvents(prev => {
        const filtered = prev.filter(e => e.id !== targetStep);
        return [...filtered, {
          id: targetStep,
          label: stageMeta.label,
          desc: stageMeta.desc,
          timestamp: new Date().toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' }),
          status: 'completed'
        }];
      });
    }

    if (targetStep >= totalSteps) {
      setIsPlaying(false);
      setIsCompleted(true);
    }
  }, [totalSteps]);

  // Main simulation timer loop
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    if (currentStep < totalSteps) {
      const nextStep = currentStep + 1;
      const duration = getStageDuration(nextStep, speed);

      timerRef.current = setTimeout(() => {
        advanceStep(nextStep);
      }, duration);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentStep, speed, totalSteps, advanceStep, getStageDuration]);

  // Keep a stable elapsed-time reference so the interval is not recreated every tick.
  useEffect(() => {
    elapsedTimeRef.current = elapsedTime;
  }, [elapsedTime]);

  useEffect(() => {
    if (!isPlaying) return;

    startTimeRef.current = Date.now() - elapsedTimeRef.current * 1000;
    const interval = setInterval(() => {
      const nextElapsed = Number(((Date.now() - startTimeRef.current) / 1000).toFixed(1));
      elapsedTimeRef.current = nextElapsed;
      setElapsedTime(nextElapsed);
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const start = () => {
    setIsCompleted(false);
    setElapsedTime(0);
    setTimelineEvents([]);
    setCurrentStep(1);
    setStatusMessage(getStatusForStep(1));
    setIsPlaying(true);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const resume = () => {
    if (currentStep >= totalSteps) {
      replay();
    } else {
      setIsPlaying(true);
    }
  };

  const replay = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setCurrentStep(0);
    setIsCompleted(false);
    setElapsedTime(0);
    setTimelineEvents([]);
    setTimeout(() => {
      start();
    }, 100);
  };

  const reset = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsPlaying(false);
    setIsCompleted(false);
    setCurrentStep(0);
    setElapsedTime(0);
    setTimelineEvents([]);
    setStatusMessage('Ready for input');
  };

  const jumpToStep = (step) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsPlaying(false);
    setCurrentStep(step);
    setStatusMessage(getStatusForStep(step));
    if (step >= totalSteps) {
      setIsCompleted(true);
    }
  };

  return {
    currentStep,
    isPlaying,
    isCompleted,
    speed,
    setSpeed,
    statusMessage,
    elapsedTime,
    timelineEvents,
    start,
    pause,
    resume,
    replay,
    reset,
    jumpToStep
  };
}
