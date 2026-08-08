import React from 'react';
import { Check, Loader2 } from 'lucide-react';

export interface ProofStepperProps {
  currentStep: number; // 1 to 4
  steps?: string[];
}

export const ProofStepper: React.FC<ProofStepperProps> = ({
  currentStep,
  steps = ['Credential', 'Claims', 'Generating', 'Complete'],
}) => {
  return (
    <div className="w-full py-3 sm:py-4">
      <div className="flex items-center justify-between relative px-2">
        {/* Background track line */}
        <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-800 -translate-y-1/2 z-0" />
        
        {/* Progress track line */}
        <div
          className="absolute top-4 left-6 h-0.5 bg-gradient-to-r from-blue-500 to-brand-purple -translate-y-1/2 z-0 transition-all duration-500"
          style={{ width: `calc(${((currentStep - 1) / (steps.length - 1)) * 100}% - 12px)` }}
        />

        {steps.map((label, idx) => {
          const stepNum = idx + 1;
          const isCompleted = currentStep > stepNum;
          const isCurrent = currentStep === stepNum;

          return (
            <div key={label} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[11px] sm:text-xs font-semibold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-900/30 ring-4 ring-midnight-950'
                    : isCurrent
                    ? 'bg-gradient-to-br from-blue-600 to-brand-purple text-white shadow-lg shadow-purple-900/40 ring-4 ring-midnight-950 ring-brand-purple/20'
                    : 'bg-midnight-800 border border-slate-700 text-slate-400 ring-4 ring-midnight-950'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                ) : isCurrent && stepNum === 3 ? (
                  <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin text-white" />
                ) : (
                  stepNum
                )}
              </div>
              <span
                className={`text-[9px] sm:text-[11px] font-medium mt-1.5 text-center transition-colors max-w-[65px] sm:max-w-none leading-tight ${
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
