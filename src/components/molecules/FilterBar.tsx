import React from "react";
import { Input as AtomInput } from "@/components/atoms/Input";
import { DollarSign, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/atoms/Button";

interface FilterBarProps {
  threshold: number;
  onThresholdChange: (val: number) => void;
  maxSalesValue: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  threshold,
  onThresholdChange,
  maxSalesValue,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (!isNaN(val)) {
      onThresholdChange(val);
    }
  };

  const presets = [0, 50000, 75000, 100000];

  return (
    <div className="flex flex-col gap-4 w-full bg-zinc-900/40 p-5 rounded-2xl border border-zinc-800/60">
      <div className="flex items-center gap-2 text-zinc-350">
        <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
        <h3 className="text-sm font-semibold tracking-wide">Sales Threshold Filter</h3>
      </div>
      
      <p className="text-xs text-zinc-500 -mt-2">
        Only months with sales figures greater than or equal to the threshold will be included in the chart and calculations.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mt-1">
        {/* Slider */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <div className="flex justify-between text-xs font-semibold text-zinc-400">
            <span>THRESHOLD VALUE</span>
            <span className="text-indigo-400 font-mono">${threshold.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="0"
            max={maxSalesValue || 200000}
            step="5000"
            value={threshold}
            onChange={(e) => onThresholdChange(Number(e.target.value))}
            className="w-full h-2 bg-zinc-950 rounded-lg appearance-none cursor-pointer accent-indigo-500 border border-zinc-850"
          />
          <div className="flex justify-between text-[10px] text-zinc-600 font-mono">
            <span>$0</span>
            <span>${(maxSalesValue || 200000).toLocaleString()}</span>
          </div>
        </div>

        {/* Input & Presets */}
        <div className="flex flex-col gap-2">
          <AtomInput
            id="threshold-input"
            label="Manual Value ($)"
            type="number"
            value={threshold === 0 ? "" : threshold}
            onChange={handleInputChange}
            placeholder="Enter min sales..."
            icon={<DollarSign className="w-4 h-4" />}
          />
        </div>
      </div>

      {/* Preset Quick Actions */}
      <div className="flex flex-wrap gap-2 items-center mt-2 border-t border-zinc-800/40 pt-3">
        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mr-2">Quick Presets:</span>
        {presets.map((preset) => (
          <Button
            key={preset}
            variant="ghost"
            size="sm"
            isActive={threshold === preset}
            onClick={() => onThresholdChange(preset)}
            className="text-xs font-mono py-1 px-3 rounded-lg border border-zinc-800/60 hover:bg-zinc-850"
          >
            {preset === 0 ? "Clear Filter" : `$${(preset / 1000).toFixed(0)}k+`}
          </Button>
        ))}
      </div>
    </div>
  );
};
