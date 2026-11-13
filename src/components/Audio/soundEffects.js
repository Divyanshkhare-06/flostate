/**
 * Web Audio API gentle sound generator for FLOWSTATE.
 * Zero external audio files required - works offline and anywhere.
 */

let audioCtx = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Gentle singing bowl chime for focus completion or session milestones
 */
export function playChime(enabled = true) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    
    // Fundamental note: E5 (659.25 Hz) with gentle harmonics
    const freqs = [659.25, 1318.5, 1977.75];
    const gains = [0.15, 0.08, 0.03];

    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(gains[i], now + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 2.6);
    });
  } catch (e) {
    console.warn('Audio playback error (muted or not allowed yet):', e);
  }
}

/**
 * Soft tick / click for mindful interaction
 */
export function playSoftTick(enabled = true) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.04);

    gainNode.gain.setValueAtTime(0.04, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  } catch {
    // Non-blocking
  }
}

/**
 * Calm gong / wave for Digital Sunset or deep relaxation
 */
export function playCalmWave(enabled = true) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(261.63, now); // Middle C
    osc.frequency.exponentialRampToValueAtTime(130.81, now + 3.0); // Low C

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.12, now + 0.2);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 3.6);
  } catch {
    // Non-blocking
  }
}

