/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, X, Info } from 'lucide-react';
import { FORTUNE_CATEGORIES, COOKIE_STYLES, CookieType, Fortune } from './constants';

// Hand-drawn SVG components with dynamic styling
const CookieIcon = ({ 
  isOpen, 
  isCracking, 
  type = 'classic' 
}: { 
  isOpen: boolean; 
  isCracking: boolean;
  type?: CookieType;
}) => {
  const style = COOKIE_STYLES[type];

  if (isOpen) {
    return (
      <div className="relative w-48 h-32 flex items-center justify-center">
        {/* Left Half */}
        <motion.svg
          initial={{ x: 0, rotate: 0 }}
          animate={{ x: -40, rotate: -15 }}
          viewBox="0 0 100 100"
          className="w-24 h-24 absolute left-0"
        >
          <path
            d="M80,20 C60,10 30,10 10,40 C5,55 15,85 40,90 C60,95 85,80 90,60 L80,50 Z"
            fill={style.fill}
            stroke={style.stroke}
            strokeWidth="2"
          />
          <path d="M40,30 Q50,40 40,50" fill="none" stroke={style.stroke} strokeWidth="1" opacity="0.5" />
        </motion.svg>
        {/* Right Half */}
        <motion.svg
          initial={{ x: 0, rotate: 0 }}
          animate={{ x: 40, rotate: 15 }}
          viewBox="0 0 100 100"
          className="w-24 h-24 absolute right-0"
        >
          <path
            d="M20,20 C40,10 70,10 90,40 C95,55 85,85 60,90 C40,95 15,80 10,60 L20,50 Z"
            fill={style.fill}
            stroke={style.stroke}
            strokeWidth="2"
          />
          <path d="M60,30 Q50,40 60,50" fill="none" stroke={style.stroke} strokeWidth="1" opacity="0.5" />
        </motion.svg>
      </div>
    );
  }

  return (
    <motion.svg
      animate={isCracking ? { x: [-2, 2, -2, 2, 0], scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 0.2, repeat: isCracking ? Infinity : 0 }}
      viewBox="0 0 100 100"
      className="w-32 h-32 md:w-40 md:h-40 cursor-pointer drop-shadow-lg"
    >
      <path
        d="M20,50 C10,30 40,10 50,10 C60,10 90,30 80,50 C70,70 50,90 50,90 C50,90 30,70 20,50 Z"
        fill={style.fill}
        stroke={style.stroke}
        strokeWidth="2"
      />
      <path
        d="M50,10 C40,30 40,70 50,90"
        fill="none"
        stroke={style.stroke}
        strokeWidth="1.5"
        strokeDasharray="4 2"
        opacity="0.6"
      />
      <path d="M35,40 Q45,45 35,55" fill="none" stroke={style.stroke} strokeWidth="1" opacity="0.4" />
      <path d="M65,40 Q55,45 65,55" fill="none" stroke={style.stroke} strokeWidth="1" opacity="0.4" />
    </motion.svg>
  );
};

interface CookieInstance {
  id: string;
  type: CookieType;
  initialX: number;
  initialY: number;
  duration: number;
  delay: number;
}

export default function App() {
  const [selectedFortune, setSelectedFortune] = useState<Fortune | null>(null);
  const [activeCookieType, setActiveCookieType] = useState<CookieType>('classic');
  const [isCracking, setIsCracking] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedCookieId, setSelectedCookieId] = useState<string | null>(null);
  
  // Generate floating cookies
  const cookieInstances = useMemo(() => {
    const types: CookieType[] = ['classic', 'matcha', 'strawberry', 'chocolate', 'charcoal'];
    return Array.from({ length: 20 }, (_, i) => ({
      id: `cookie-${i}`,
      type: types[Math.floor(Math.random() * types.length)],
      initialX: Math.random() * 80 - 40, // -40% to 40%
      initialY: Math.random() * 60 - 30, // -30% to 30%
      duration: 15 + Math.random() * 10,
      delay: Math.random() * -20, // Start at different points in animation
    }));
  }, []);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const paperAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
    paperAudioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2561/2561-preview.mp3');
  }, []);

  const handleCookieClick = (cookie: CookieInstance) => {
    if (isOpen || isCracking) return;

    setSelectedCookieId(cookie.id);
    setActiveCookieType(cookie.type);
    
    // Give a moment for the cookie to "stop" before cracking
    setTimeout(() => {
      setIsCracking(true);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }

      setTimeout(() => {
        setIsCracking(false);
        setIsOpen(true);
        const categoryFortunes = FORTUNE_CATEGORIES[cookie.type];
        const randomFortune = categoryFortunes[Math.floor(Math.random() * categoryFortunes.length)];
        setSelectedFortune(randomFortune);
      }, 800);
    }, 100);
  };

  const handleZoom = () => {
    setIsZoomed(true);
    if (paperAudioRef.current) {
      paperAudioRef.current.currentTime = 0;
      paperAudioRef.current.play().catch(() => {});
    }
  };

  const reset = () => {
    setIsOpen(false);
    setIsCracking(false);
    setIsZoomed(false);
    setSelectedFortune(null);
    setSelectedCookieId(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 font-handdrawn overflow-hidden bg-[#fdfbf7]">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-8 text-center px-4 z-10 pointer-events-none"
      >
        <h1 className="text-4xl md:text-6xl text-amber-900 mb-2 font-rounded font-bold">漂浮幸運餅乾</h1>
        <p className="text-lg md:text-xl text-amber-700 opacity-80 font-rounded">捕捉一個餅乾來揭曉你的問題...</p>
      </motion.div>

      {/* Main Interaction Area */}
      <div className="relative w-full h-screen flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div 
              key="cookie-field"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {cookieInstances.map((cookie) => {
                const isSelected = selectedCookieId === cookie.id;
                
                return (
                  <motion.div
                    key={cookie.id}
                    initial={{ x: `${cookie.initialX}vw`, y: `${cookie.initialY}vh` }}
                    animate={isSelected ? { 
                      x: 0, 
                      y: 0, 
                      scale: 1.2,
                      rotate: 0
                    } : {
                      x: [
                        `${cookie.initialX}vw`, 
                        `${cookie.initialX + 20}vw`, 
                        `${cookie.initialX - 20}vw`, 
                        `${cookie.initialX}vw`
                      ],
                      y: [
                        `${cookie.initialY}vh`, 
                        `${cookie.initialY - 20}vh`, 
                        `${cookie.initialY + 20}vh`, 
                        `${cookie.initialY}vh`
                      ],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={isSelected ? { 
                      type: 'spring', 
                      stiffness: 100, 
                      damping: 15 
                    } : {
                      duration: cookie.duration,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: cookie.delay
                    }}
                    whileHover={!isSelected ? { scale: 1.1, zIndex: 20 } : {}}
                    onClick={() => handleCookieClick(cookie)}
                    className="absolute cursor-pointer"
                    style={{ zIndex: isSelected ? 30 : 10 }}
                  >
                    <CookieIcon 
                      isOpen={false} 
                      isCracking={isCracking && isSelected} 
                      type={cookie.type} 
                    />
                    {!isSelected && (
                      <motion.span 
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 0.4 }}
                        className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-amber-900 font-rounded uppercase tracking-widest whitespace-nowrap"
                      >
                        {COOKIE_STYLES[cookie.type].label}
                      </motion.span>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div 
              key="opened-cookie"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center z-40"
            >
              <CookieIcon isOpen={true} isCracking={false} type={activeCookieType} />
              
              {/* Fortune Slip */}
              <motion.div
                initial={{ y: 20, opacity: 0, scale: 0.5 }}
                animate={{ y: -20, opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                onClick={handleZoom}
                className="mt-8 cursor-pointer group"
              >
                <div className="bg-white px-8 py-3 shadow-xl border border-gray-100 transform -rotate-1 group-hover:rotate-0 transition-transform relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-red-400 opacity-20" />
                  <p className="font-typewriter text-sm text-blue-900 border-b border-blue-50 pb-2 mb-2">
                    {selectedFortune?.zh.substring(0, 25)}...
                  </p>
                  <div className="flex justify-between items-center opacity-30">
                    <span className="text-[8px] font-typewriter uppercase tracking-tighter">Flavor: {activeCookieType}</span>
                    <span className="text-[8px] font-typewriter"># {Math.floor(Math.random() * 1000)}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Zoomed Fortune Modal */}
      <AnimatePresence>
        {isZoomed && selectedFortune && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-amber-950/30 backdrop-blur-md"
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50, rotate: -3 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#fffefc] w-full max-w-xl p-8 md:p-12 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] relative hand-drawn-border"
            >
              <button 
                onClick={() => setIsZoomed(false)}
                className="absolute top-6 right-6 p-2 hover:bg-amber-50 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-amber-900" />
              </button>

              <div className="space-y-10 font-typewriter text-amber-950">
                <div className="space-y-6">
                  <p className="text-2xl md:text-4xl leading-relaxed font-bold">
                    {selectedFortune.zh}
                  </p>
                  <p className="text-lg md:text-2xl text-amber-800/60 italic leading-relaxed">
                    {selectedFortune.en}
                  </p>
                </div>
                
                <div className="pt-10 border-t-2 border-dashed border-amber-100 flex justify-between items-end">
                  <div className="text-xs opacity-30 font-mono">
                    批次: {activeCookieType.toUpperCase()} / {new Date().toLocaleDateString()}
                  </div>
                  <div className="text-amber-700 font-rounded font-bold text-3xl md:text-4xl">
                    你的幸運籤
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute bottom-12 flex gap-4 z-10"
      >
        {isOpen && (
          <button
            onClick={reset}
            className="flex items-center gap-3 px-8 py-4 bg-amber-900 text-amber-50 rounded-full transition-all shadow-lg hover:bg-amber-800 active:scale-95 text-lg font-rounded font-bold"
          >
            <RefreshCw className="w-6 h-6" />
            <span>釋放更多餅乾</span>
          </button>
        )}
      </motion.div>

      {/* Footer Info */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-amber-900/20 flex items-center gap-2 z-10 pointer-events-none">
        <Info className="w-4 h-4" />
        <span className="text-xs font-rounded uppercase tracking-widest">捕捉一個移動的餅乾來揭曉秘密</span>
      </div>
    </div>
  );
}
