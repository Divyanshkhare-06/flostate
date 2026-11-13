import React from 'react';

/**
 * Elegant minimalist SVG plant illustrations for FLOWSTATE Garden.
 * Designed with soft lavender, mint, and calming tones.
 */

export function PlantIllustration({ type = 'lavender', stage = 3, className = "w-32 h-32" }) {
  // stage: 1 (sprout), 2 (growing), 3 (budding), 4 (blooming), 5 (flourishing)
  const clampedStage = Math.max(1, Math.min(5, stage));

  switch (type) {
    case 'lavender':
      return (
        <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Minimalist Ceramic Pot */}
          <path d="M42 105 L46 130 H74 L78 105 Z" fill="#E8E6F5" stroke="#171A2E" strokeWidth="1.5" strokeLinejoin="round" />
          <line x1="38" y1="105" x2="82" y2="105" stroke="#171A2E" strokeWidth="2" strokeLinecap="round" />

          {/* Stem */}
          <path d="M60 105 Q58 75 60 45" stroke="#7EBA9B" strokeWidth="2.5" strokeLinecap="round" />

          {/* Leaves */}
          {clampedStage >= 1 && (
            <>
              <path d="M59 90 C50 86 46 80 44 76" stroke="#7EBA9B" strokeWidth="2" strokeLinecap="round" />
              <path d="M61 84 C70 80 74 74 76 70" stroke="#7EBA9B" strokeWidth="2" strokeLinecap="round" />
            </>
          )}

          {clampedStage >= 2 && (
            <>
              <path d="M59 72 C48 68 45 62 43 56" stroke="#7EBA9B" strokeWidth="2" strokeLinecap="round" />
              <path d="M61 66 C72 62 75 56 77 50" stroke="#7EBA9B" strokeWidth="2" strokeLinecap="round" />
            </>
          )}

          {/* Lavender Flower buds & blooms */}
          {clampedStage >= 3 && (
            <g>
              <ellipse cx="60" cy="40" rx="3.5" ry="5.5" fill="#A99BFF" />
              <ellipse cx="56" cy="45" rx="3" ry="5" fill="#C2B7FF" />
              <ellipse cx="64" cy="46" rx="3" ry="5" fill="#C2B7FF" />
            </g>
          )}

          {clampedStage >= 4 && (
            <g>
              <ellipse cx="54" cy="34" rx="3.5" ry="5.5" fill="#A99BFF" />
              <ellipse cx="66" cy="35" rx="3.5" ry="5.5" fill="#A99BFF" />
              <ellipse cx="60" cy="28" rx="3.5" ry="5" fill="#9080F7" />
              <circle cx="60" cy="22" r="3" fill="#A99BFF" />
            </g>
          )}

          {clampedStage >= 5 && (
            <g>
              <circle cx="50" cy="30" r="1.5" fill="#EAE6FF" className="animate-pulse" />
              <circle cx="70" cy="32" r="1.5" fill="#EAE6FF" className="animate-pulse" />
              <circle cx="60" cy="16" r="2" fill="#B8E6D0" />
            </g>
          )}
        </svg>
      );

    case 'peace_lily':
      return (
        <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Ceramic Pot */}
          <path d="M40 106 L44 130 H76 L80 106 Z" fill="#F4F3FA" stroke="#171A2E" strokeWidth="1.5" strokeLinejoin="round" />
          <line x1="36" y1="106" x2="84" y2="106" stroke="#171A2E" strokeWidth="2" strokeLinecap="round" />

          {/* Stems */}
          <path d="M60 106 Q55 70 52 48" stroke="#7EBA9B" strokeWidth="2" strokeLinecap="round" />
          {clampedStage >= 2 && <path d="M60 106 Q68 75 74 60" stroke="#7EBA9B" strokeWidth="2" strokeLinecap="round" />}

          {/* Broad Leaves */}
          <path d="M60 100 C40 85 30 70 32 55 C38 65 48 85 58 92" fill="#B8E6D0" stroke="#7EBA9B" strokeWidth="1.5" />
          {clampedStage >= 2 && (
            <path d="M60 96 C80 82 88 68 86 52 C80 62 72 82 62 90" fill="#B8E6D0" stroke="#7EBA9B" strokeWidth="1.5" />
          )}

          {/* Elegant White Spathe / Flower */}
          {clampedStage >= 3 && (
            <g>
              <path d="M52 48 C44 38 46 22 52 16 C58 22 60 38 52 48 Z" fill="#FFFFFF" stroke="#D5D1EC" strokeWidth="1.5" />
              <path d="M52 40 L52 24" stroke="#FFEAA7" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          )}

          {clampedStage >= 4 && (
            <circle cx="52" cy="14" r="3" fill="#EAE6FF" className="animate-pulse-gentle" />
          )}
        </svg>
      );

    case 'bonsai':
      return (
        <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Wide Shallow Bonsai Tray */}
          <path d="M30 114 L35 128 H85 L90 114 Z" fill="#EAE6FF" stroke="#171A2E" strokeWidth="1.5" strokeLinejoin="round" />
          <line x1="26" y1="114" x2="94" y2="114" stroke="#171A2E" strokeWidth="2" strokeLinecap="round" />
          {/* Feet */}
          <rect x="36" y="128" width="6" height="4" fill="#171A2E" rx="1" />
          <rect x="78" y="128" width="6" height="4" fill="#171A2E" rx="1" />

          {/* Curved Bonsai Trunk */}
          <path d="M60 114 C60 98 48 88 52 74 C56 60 70 54 68 42" stroke="#5F6480" strokeWidth="4" strokeLinecap="round" />

          {/* Foliage Clouds */}
          {clampedStage >= 1 && (
            <ellipse cx="44" cy="74" rx="14" ry="8" fill="#B8E6D0" stroke="#7EBA9B" strokeWidth="1.5" />
          )}
          {clampedStage >= 2 && (
            <ellipse cx="76" cy="62" rx="16" ry="9" fill="#B8E6D0" stroke="#7EBA9B" strokeWidth="1.5" />
          )}
          {clampedStage >= 3 && (
            <ellipse cx="66" cy="38" rx="18" ry="10" fill="#9CD8B9" stroke="#5EA882" strokeWidth="1.5" />
          )}
          {clampedStage >= 4 && (
            <g>
              <ellipse cx="50" cy="46" rx="10" ry="6" fill="#B8E6D0" stroke="#7EBA9B" strokeWidth="1" />
              <circle cx="68" cy="34" r="2" fill="#A99BFF" />
            </g>
          )}
        </svg>
      );

    case 'jade':
      return (
        <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Round Terracotta / Stone Pot */}
          <path d="M42 108 C42 128 78 128 78 108 Z" fill="#F4F3FA" stroke="#171A2E" strokeWidth="1.5" />
          <line x1="38" y1="108" x2="82" y2="108" stroke="#171A2E" strokeWidth="2" strokeLinecap="round" />

          {/* Thick Succulent Stems */}
          <path d="M60 108 L60 85" stroke="#7EBA9B" strokeWidth="3.5" strokeLinecap="round" />

          {/* Fleshy Round Leaves */}
          <ellipse cx="60" cy="80" rx="9" ry="6" fill="#B8E6D0" stroke="#7EBA9B" strokeWidth="1.5" />
          {clampedStage >= 2 && (
            <>
              <ellipse cx="48" cy="72" rx="8" ry="5" fill="#A5DEC2" stroke="#7EBA9B" strokeWidth="1.5" transform="rotate(-25 48 72)" />
              <ellipse cx="72" cy="72" rx="8" ry="5" fill="#A5DEC2" stroke="#7EBA9B" strokeWidth="1.5" transform="rotate(25 72 72)" />
            </>
          )}
          {clampedStage >= 3 && (
            <>
              <ellipse cx="54" cy="58" rx="7" ry="5" fill="#B8E6D0" stroke="#7EBA9B" strokeWidth="1.5" transform="rotate(-15 54 58)" />
              <ellipse cx="66" cy="58" rx="7" ry="5" fill="#B8E6D0" stroke="#7EBA9B" strokeWidth="1.5" transform="rotate(15 66 58)" />
            </>
          )}
          {clampedStage >= 4 && (
            <ellipse cx="60" cy="46" rx="6" ry="4" fill="#C7EFE0" stroke="#7EBA9B" strokeWidth="1.5" />
          )}
        </svg>
      );

    case 'mint':
    default:
      return (
        <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Hexagonal / Minimalist Pot */}
          <path d="M44 105 L48 128 H72 L76 105 Z" fill="#EAE6FF" stroke="#171A2E" strokeWidth="1.5" strokeLinejoin="round" />
          <line x1="40" y1="105" x2="80" y2="105" stroke="#171A2E" strokeWidth="2" strokeLinecap="round" />

          {/* Central Stem */}
          <path d="M60 105 Q62 75 60 48" stroke="#7EBA9B" strokeWidth="2" strokeLinecap="round" />

          {/* Serrated Mint Leaves */}
          {clampedStage >= 1 && (
            <path d="M60 92 C50 86 42 86 40 82 C46 78 54 84 60 88" fill="#B8E6D0" stroke="#7EBA9B" strokeWidth="1.2" />
          )}
          {clampedStage >= 2 && (
            <path d="M60 84 C70 78 78 78 80 74 C74 70 66 76 60 80" fill="#B8E6D0" stroke="#7EBA9B" strokeWidth="1.2" />
          )}
          {clampedStage >= 3 && (
            <>
              <path d="M60 70 C48 64 42 62 42 56 C50 54 56 62 60 66" fill="#A5DEC2" stroke="#7EBA9B" strokeWidth="1.2" />
              <path d="M60 62 C72 56 78 54 78 48 C70 46 64 54 60 58" fill="#A5DEC2" stroke="#7EBA9B" strokeWidth="1.2" />
            </>
          )}
          {clampedStage >= 4 && (
            <g>
              <ellipse cx="60" cy="42" rx="4" ry="3" fill="#C2B7FF" />
              <ellipse cx="58" cy="38" rx="2" ry="2" fill="#EAE6FF" />
              <ellipse cx="62" cy="38" rx="2" ry="2" fill="#EAE6FF" />
            </g>
          )}
        </svg>
      );
  }
}

