import React, { useState, useEffect } from 'react';
import { Download, Smartphone, Check, X, Share } from 'lucide-react';
import { Modal } from './Modal';

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if running in standalone mode
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;
    setIsInstalled(isStandalone);

    // Check if iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const triggerInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
      setIsInstallable(false);
      return true;
    }
    return false;
  };

  return { isInstallable, isInstalled, isIOS, triggerInstall };
}

export function InstallAppButton({ className = '' }) {
  const { isInstallable, isInstalled, isIOS, triggerInstall } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);

  if (isInstalled) {
    return (
      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--accent-mint-subtle)] text-emerald-700 dark:text-emerald-300 text-xs font-semibold ${className}`}>
        <Check className="w-3.5 h-3.5" />
        <span>App Installed</span>
      </div>
    );
  }

  const handleClick = async () => {
    if (isInstallable) {
      await triggerInstall();
    } else if (isIOS) {
      setShowIOSModal(true);
    } else {
      // If neither triggered yet, show universal install guide
      setShowIOSModal(true);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#A99BFF] to-[#7B68EE] text-white text-xs font-semibold hover:brightness-105 transition-all shadow-xs ${className}`}
        title="Install FLOWSTATE as a standalone desktop or mobile app"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Install App</span>
      </button>

      <Modal
        isOpen={showIOSModal}
        onClose={() => setShowIOSModal(false)}
        title="Install FLOWSTATE App"
      >
        <div className="text-center py-2 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[var(--accent-lavender-subtle)] flex items-center justify-center text-[var(--accent-lavender-dark)] mx-auto">
            <Smartphone className="w-6 h-6" />
          </div>

          <div>
            <h3 className="text-base font-bold text-[var(--text-primary)]">
              Add to Home Screen
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-1 max-w-xs mx-auto">
              Install FLOWSTATE to enjoy a distraction-free, full-screen app with 100% offline support.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] text-left text-xs space-y-2.5">
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[var(--accent-lavender)] text-[#171A2E] flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                1
              </span>
              <p className="text-[var(--text-primary)]">
                On iPhone/iPad, tap the <strong>Share</strong> button <Share className="w-3.5 h-3.5 inline mx-1" /> in Safari.
                <br />
                <span className="text-[var(--text-muted)] text-[11px]">On Chrome/Edge, tap the <strong>Install</strong> icon in the address bar or menu.</span>
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[var(--accent-lavender)] text-[#171A2E] flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                2
              </span>
              <p className="text-[var(--text-primary)]">
                Select <strong>"Add to Home Screen"</strong> or <strong>"Install Application"</strong>.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[var(--accent-lavender)] text-[#171A2E] flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                3
              </span>
              <p className="text-[var(--text-primary)]">
                Open FLOWSTATE anytime directly from your home screen or desktop launcher!
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowIOSModal(false)}
            className="w-full py-2.5 rounded-xl bg-[var(--accent-navy)] text-white text-xs font-semibold hover:opacity-90"
          >
            Got it
          </button>
        </div>
      </Modal>
    </>
  );
}
