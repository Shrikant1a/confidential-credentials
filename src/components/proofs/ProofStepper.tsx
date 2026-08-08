import React from 'react';
import { Check, Loader2 } from 'lucide-react';

export interface ProofStepperProps {
  currentStep: number; // 1 to 4
  steps?: string[];
}

export const ProofStepper: React.FC<ProofStepperProps> = ({
  currentStep,
  steps = ['Credential Selected', 'Claims Configured', 'Generating Proof', 'Proof Generated'],
}) => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between relative">
        {/* Background track line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2 z-0" />
        
        {/* Progress track line */}
        <div
          className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-brand-purple -translate-y-1/2 z-0 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((label, idx) => {
          const stepNum = idx + 1;
          const isCompleted = currentStep > stepNum;
          const isCurrent = currentStep === stepNum;

          return (
            <div key={label} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-900/30 ring-4 ring-midnight-950'
                    : isCurrent
                    ? 'bg-gradient-to-br from-blue-600 to-brand-purple text-white shadow-lg shadow-purple-900/40 ring-4 ring-midnight-950 ring-brand-purple/20'
                    : 'bg-midnight-800 border border-slate-700 text-slate-400 ring-4 ring-midnight-950'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : isCurrent && stepNum === 3 ? (
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                ) : (
                  stepNum
                )}
              </div>
              <span
                className={`text-[11px] font-medium mt-2 text-center max-w-[80px] sm:max-w-none transition-colors ${
                  isCurrent
                    ? 'text-slate-100 font-semibold'
                    : isCompleted
                    ? 'text-slate-300'
                    : 'text-slate-500'
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
