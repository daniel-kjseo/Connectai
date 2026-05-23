import React, { useState, useEffect } from 'react';
import { CheckCircle, ShieldCheck, Loader2, AlertCircle } from 'lucide-react';

// --- Types & Mocks ---
type ProvenanceStatus = 'IDLE' | 'VERIFYING' | 'STAMPING' | 'GRANTED' | 'ERROR';

const MOCK_LOGS = [
  "Initializing Narrative Scan...",
  "Analyzing Story Depth...",
  "Comparing Lineage Signatures...",
  "Validating Ownership Gap...",
  "Finalizing Provenance Stamp..."
];

// 가상 API: 소유권 검증 시뮬레이션
const verifyProvenanceAPI = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.1 ? resolve({ success: true, stampId: 'PROV-2026-X99' }) : reject(new Error('Verification Failed'));
    }, 3500); // 의도적인 지연 시간 (신뢰감 형성)
  });
};

// --- Components ---

export const ProvenanceStamp = () => {
  const [status, setStatus] = useState<ProvenanceStatus>('IDLE');
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [stampId, setStampId] = useState('');

  // 검증 로그 시뮬레이션 효과
  useEffect(() => {
    if (status === 'VERIFYING') {
      const interval = setInterval(() => {
        setCurrentLogIndex((prev) => (prev < MOCK_LOGS.length - 1 ? prev + 1 : prev));
      }, 700);
      return () => clearInterval(interval);
    }
  }, [status]);

  const handleClaimOwnership = async () => {
    setStatus('VERIFYING');
    setCurrentLogIndex(0);
    
    try {
      const result = await verifyProvenanceAPI();
      setStampId(result.stampId);
      setStatus('STAMPING'); 
      
      // 각인 애니메이션을 위한 짧은 대기 후 GRANTED로 전환
      setTimeout(() => setStatus('GRANTED'), 1000);
    } catch (e) {
      setStatus('ERROR');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-slate-950 text-slate-200 rounded-3xl border border-slate-800 max-w-md mx-auto shadow-2xl font-mono">
      {/* Stamp Visual Area */}
      <div className="relative w-64 h-64 mb-8 flex items-center justify-center">
        {/* Background Circle/Seal */}
        <div className={`absolute inset-0 rounded-full border-4 transition-all duration-1000 ${
          status === 'GRANTED' ? 'border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.4)] scale-105' : 'border-slate-700 opacity-50'
        }`} />
        
        {/* The Actual Stamp Image/Icon */}
        <div className={`relative z-10 transition-all duration-500 ${
          status === 'GRANTED' ? 'scale-110 text-amber-500 rotate-[-12deg]' : 'text-slate-600 scale-90'
        }`}>
          {status === 'IDLE' || status === 'VERIFYING' ? (
            <ShieldCheck size={80} strokeWidth={1.5} />
          ) : status === 'STAMPING' ? (
            <div className="animate-ping">
              <ShieldCheck size={80} strokeWidth={2} className="text-amber-400" />
            </div>
          ) : (
            <ShieldCheck size={80} strokeWidth={2.5} />
          )}
        </div>

        {/* Overlay for Granted State */}
        {status === 'GRANTED' && (
          <div className="absolute inset-0 flex items-center justify-center animate-in fade-in zoom-in duration-700">
            <span className="text-amber-500 font-bold text-xs uppercase tracking-widest bg-slate-950 px-2 py-1 rounded border border-amber-500/50">
              Certified Provenance
            </span>
          </div>
        )}
      </div>

      {/* Interaction Area */}
      <div className="w-full text-center space-y-4">
        {status === 'IDLE' && (
          <>
            <h3 className="text-xl font-semibold text-slate-100">소유권 미확인 상태</h3>
            <p className="text-sm text-slate-400">당신의 이름에 담긴 서사적 자산을 확인하고 <br/>영구적인 소유권 증명서를 발급받으세요.</p>
            <button 
              onClick={handleClaimOwnership}
              className="w-full py-3 px-6 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-bold transition-all active:scale-95 shadow-lg"
            >
              소유권 증명 시작하기
            </button>
          </>
        )}

        {status === 'VERIFYING' && (
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 text-amber-500 animate-pulse">
              <Loader2 className="animate-spin" size={20} />
              <span className="text-sm font-bold uppercase tracking-tighter">Verifying Provenance...</span>
            </div>
            <div className="bg-slate-900 p-3 rounded border border-slate-800 text-left h-24 overflow-hidden relative">
              {MOCK_LOGS.slice(0, currentLogIndex + 1).map((log, i) => (
                <div key={i} className="text-[10px] text-slate-500 mb-1 animate-in slide-in-from-left-2 duration-300">
                  {`> ${log}`}
                </div>
              ))}
              <div className="absolute bottom-0 right-0 p-1 opacity-20">
                <ShieldCheck size={16} />
              </div>
            </div>
          </div>
        )}

        {status === 'GRANTED' && (
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-center gap-2 text-green-500">
              <CheckCircle size={20} />
              <span className="text-sm font-bold uppercase tracking-tighter">Ownership Granted</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              서사적 자산의 소유권이 성공적으로 증명되었습니다.<br/>
              증명 ID: <span className="text-amber-500 font-bold">{stampId}</span>
            </p>
            <button 
              onClick={() => setStatus('IDLE')} 
              className="text-[10px] text-slate-600 hover:text-slate-400 underline transition-colors"
            >
              초기화 후 다시 시도
            </button>
          </div>
        )}

        {status === 'ERROR' && (
          <div className="space-y-3 text-red-400 animate-in shake duration-500">
            <div className="flex items-center justify-center gap-2">
              <AlertCircle size={20} />
              <span className="text-sm font-bold uppercase tracking-tighter">Verification Failed</span>
            </div>
            <p className="text-xs text-slate-500">서사적 연결 고리가 부족하여 <br/>소유권을 증명할 수 없습니다.</p>
            <button 
              onClick={() => setStatus('IDLE')}
              className="w-full py-2 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm transition-all"
            >
              재시도하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};