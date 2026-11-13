import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export function BreathingGuide({ mode = '478' }) {
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState('ready'); // 'inhale', 'hold', 'exhale', 'ready'
  const [countdown, setCountdown] = useState(4);
  const [cycle, setCycle] = useState(1);

  // 4-7-8 timing: Inhale 4s, Hold 7s, Exhale 8s
  useEffect(() => {
    if (!isRunning) return;

    let timer;
    if (phase === 'ready') {
      setPhase('inhale');
      setCountdown(4);
      return;
    }

    if (countdown > 1) {
      timer = setTimeout(() => {
        setCountdown((c) => c - 1);
      }, 1000);
    } else {
      // Transition to next phase
      if (phase === 'inhale') {
        setPhase('hold');
        setCountdown(7);
      } else if (phase === 'hold') {
        setPhase('exhale');
        setCountdown(8);
      } else if (phase === 'exhale') {
        setCycle((c) => c + 1);
        setPhase('inhale');
        setCountdown(4);
      }
    }

    return () => clearTimeout(timer);
  }, [isRunning, phase, countdown]);

  const handleReset = () => {
    setIsRunning(false);
    setPhase('ready');
    setCountdown(4);
    setCycle(1);
  };

  const getPhaseInstruction = () => {
    switch (phase) {
      case 'inhale':
        return 'Inhale deeply through your nose...';
      case 'hold':
        return 'Hold your breath gently...';
      case 'exhale':
        return 'Exhale slowly through your mouth...';
      case 'ready':
      default:
        return 'Press start to begin 4-7-8 relaxing breathing';
    }
  };

  const getScaleClass = () => {
    if (!isRunning || phase === 'ready') return 'scale-100';
    if (phase === 'inhale') return 'scale-125 transition-transform duration-[4000ms] ease-out';
    if (phase === 'hold') return 'scale-125';
    if (phase === 'exhale') return 'scale-90 transition-transform duration-[8000ms] ease-in-out';
    return 'scale-100';
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center select-none">
      {/* Dynamic Animated Circle */}
      <div className="relative w-48 h-48 flex items-center justify-center my-4">
        {/* Outer Aura Ring */}
        <div
          className={`absolute inset-0 rounded-full bg-[var(--accent-lavender-subtle)]/70 transition-transform ${getScaleClass()}`}
        />
        {/* Mid Ring */}
        <div
          className={`absolute inset-4 rounded-full bg-gradient-to-tr from-[#A99BFF]/20 to-[#B8E6D0]/30 transition-transform ${getScaleClass()}`}
        />
        {/* Core Ring */}
        <div className="relative z-10 w-28 h-28 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] flex flex-col items-center justify-center shadow-xs">
          {isRunning ? (
            <>
              <span className="text-3xl font-bold text-[var(--text-primary)] font-mono">
                {countdown}
              </span>
              <span className="text-[11px] font-medium uppercase tracking-wider text-[var(--accent-lavender-dark)]">
                {phase}
              </span>
            </>
          ) : (
            <span className="text-xs font-medium text-[var(--text-secondary)]">Ready</span>
          )}
        </div>
      </div>

      <p className="text-sm font-medium text-[var(--text-primary)] h-6 mt-2">
        {getPhaseInstruction()}
      </p>

      {isRunning && (
        <p className="text-xs text-[var(--text-muted)] mt-1">
          Cycle {cycle} of 4 · Parasympathetic nerve reset
        </p>
      )}

      {/* Controls */}
      <div className="flex items-center gap-3 mt-6">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent-lavender)] text-[#171A2E] font-semibold text-sm hover:brightness-105 transition-all shadow-xs"
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4 fill-current" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>{phase === 'ready' ? 'Start Breathing' : 'Resume'}</span>
            </>
          )}
        </button>

        <button
          onClick={handleReset}
          className="p-2.5 rounded-xl border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-subtle)] transition-colors"
          title="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

