import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Anomaly Detection Visual System v1.1 Prototype
 * 목적: 로딩과 실패 상태를 통해 사용자에게 '불안정성'과 '결핍감'을 유도함.
 */

type VerificationState = 'IDLE' | 'LOADING' | 'FAILURE' | 'SUCCESS';

const AnomalyVerificationSystem = () => {
  const [state, setState] = useState<VerificationState>('IDLE');
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');

  const statusMessages = [
    "Connecting to Global Provenance Archive...",
    "Scanning Ownership Fragments...",
    "Analyzing Narrative Depth...",
    "Verifying Identity Anchor...",
    "CRITICAL: Data Gap Detected!",
  ];

  const startVerification = async () => {
    setState('LOADING');
    setProgress(0);

    // 1. 불안정한 로딩 시퀀스 구현 (예측 불가능한 지연)
    for (let i = 0; i < statusMessages.length; i++) {
      setStatusText(statusMessages[i]);
      
      // 의도적인 지연 및 진행률 요동
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 1500 + 800));
      
      if (i < statusMessages.length - 1) {
        setProgress((prev) => {
          const jitter = Math.random() * 10 - 5; // -5 ~ +5 사이의 요동
          return Math.min(Math.max(prev + 15 + jitter, 0), 95);
        });
      }
    }

    // 2. 실패 상태로 전이 (결핍감 유도)
    setState('FAILURE');
  };

  const reset = () => {
    setState('IDLE');
    setProgress(0);
    setStatusText('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-green-500 font-mono p-4">
      <div className="w-full max-w-md border border-green-900 bg-zinc-950 p-8 shadow-[0_0_20px_rgba(0,100,0,0.3)] relative overflow-hidden">
        
        {/* 배경 Glitch 효과 (Failure 상태일 때만 활성화) */}
        <AnimatePresence>
          {state === 'FAILURE' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ repeat: Infinity, duration: 0.2 }}
              className="absolute inset-0 bg-red-900/20 pointer-events-none z-10"
            />
          )}
        </AnimatePresence>

        <h2 className="text-xl mb-6 border-b border-green-900 pb-2 flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          PROVENANCE_VERIFIER_v1.1
        </h2>

        {state === 'IDLE' && (
          <div className="text-center py-10">
            <p className="mb-6 text-green-700">Ready to verify identity ownership.</p>
            <button 
              onClick={startVerification}
              className="px-6 py-2 border border-green-500 hover:bg-green-500 hover:text-black transition-all duration-300"
            >
              INITIALIZE SCAN
            </button>
          </div>
        )}

        {state === 'LOADING' && (
          <div className="space-y-6">
            <div className="flex justify-between text-xs mb-1">
              <span>STATUS: {statusText}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            
            {/* 불안정한 프로그레스 바 */}
            <div className="w-full h-2 bg-zinc-800 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-green-500 shadow-[0_0_10px_#22c55e]"
                animate={{ width: `${progress}%` }}
                transition={{ type: 'spring', stiffness: 50 }}
              />
            </div>

            <div className="text-[10px] text-green-800 animate-pulse">
              {`> Searching for missing narrative fragments...`}
              <br />
              {`> Warning: Signal instability detected...`}
            </div>
          </div>
        )}

        {state === 'FAILURE' && (
          <motion.div 
            initial={{ x: -10 }} 
            animate={{ x: [0, -5, 5, 0] }} 
            transition={{ repeat: Infinity, duration: 0.1 }}
            className="text-center space-y-6"
          >
            <div className="text-red-500 text-2xl font-bold border-2 border-red-500 p-4 animate-bounce">
              ⚠️ PROVENANCE GAP DETECTED
            </div>
            <p className="text-red-400 text-sm leading-relaxed">
              Your identity ownership is <span className="underline decoration-double">incomplete</span>. 
              Critical narrative data is missing from the archive.
            </p>
            <div className="bg-red-950/30 p-3 border border-red-900 text-xs text-red-600 italic">
              "The void in your record creates a vulnerability in your existence."
            </div>
            <button 
              onClick={reset}
              className="text-xs text-zinc-500 hover:text-white underline decoration-zinc-700"
            >
              RETRY CONNECTION
            </button>
          </motion.div>
        )}
      </div>

      <div className="mt-8 text-[10px] text-zinc-600 max-w-xs text-center">
        Note: This prototype simulates technical instability to evoke a psychological sense of deficit.
      </div>
    </div>
  );
};

export default AnomalyVerificationSystem;