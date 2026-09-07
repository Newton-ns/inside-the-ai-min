import React, { useState } from 'react';
import { BoundingBox } from '../../types';
import { CheckCircle, AlertTriangle, XCircle, Info, Maximize2, ZoomIn, ZoomOut } from 'lucide-react';

interface LabelBoundingBoxViewerProps {
  imageUrl: string;
  boxes: BoundingBox[];
  onSelectBox?: (box: BoundingBox) => void;
  selectedBoxId?: string | null;
}

export const LabelBoundingBoxViewer: React.FC<LabelBoundingBoxViewerProps> = ({
  imageUrl,
  boxes,
  onSelectBox,
  selectedBoxId
}) => {
  const [hoveredBox, setHoveredBox] = useState<BoundingBox | null>(null);
  const [filter, setFilter] = useState<'all' | 'violation' | 'warning' | 'compliant'>('all');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const filteredBoxes = boxes.filter(b => {
    if (filter === 'all') return true;
    return b.status === filter;
  });

  const getBorderColor = (status: string, isHovered: boolean, isSelected: boolean) => {
    if (isSelected) return 'ring-4 ring-white border-white';
    if (status === 'violation') return isHovered ? 'border-rose-400 bg-rose-500/30' : 'border-rose-500 bg-rose-500/15';
    if (status === 'warning') return isHovered ? 'border-amber-400 bg-amber-500/30' : 'border-amber-500 bg-amber-500/15';
    return isHovered ? 'border-emerald-400 bg-emerald-500/25' : 'border-emerald-500/80 bg-emerald-500/10';
  };

  const getBadgeColor = (status: string) => {
    if (status === 'violation') return 'bg-rose-600 text-white';
    if (status === 'warning') return 'bg-amber-600 text-white';
    return 'bg-emerald-600 text-white';
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
      {/* Top Toolbar */}
      <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-slate-200">AI Label Inspection Overlay:</span>
          <span className="text-slate-400">({filteredBoxes.length} annotations detected)</span>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => setFilter('all')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            All ({boxes.length})
          </button>
          <button
            onClick={() => setFilter('violation')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all flex items-center gap-1 ${
              filter === 'violation' ? 'bg-rose-600 text-white' : 'bg-rose-950/40 text-rose-400 hover:bg-rose-900/60'
            }`}
          >
            <XCircle className="w-3 h-3" />
            Violations ({boxes.filter(b => b.status === 'violation').length})
          </button>
          <button
            onClick={() => setFilter('warning')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all flex items-center gap-1 ${
              filter === 'warning' ? 'bg-amber-600 text-white' : 'bg-amber-950/40 text-amber-400 hover:bg-amber-900/60'
            }`}
          >
            <AlertTriangle className="w-3 h-3" />
            Warnings ({boxes.filter(b => b.status === 'warning').length})
          </button>
          <button
            onClick={() => setFilter('compliant')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all flex items-center gap-1 ${
              filter === 'compliant' ? 'bg-emerald-600 text-white' : 'bg-emerald-950/40 text-emerald-400 hover:bg-emerald-900/60'
            }`}
          >
            <CheckCircle className="w-3 h-3" />
            Compliant ({boxes.filter(b => b.status === 'compliant').length})
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center space-x-1 bg-slate-800/80 p-0.5 rounded-lg">
          <button
            onClick={() => setZoomLevel(prev => Math.max(0.8, prev - 0.2))}
            className="p-1 hover:bg-slate-700 rounded text-slate-300"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] text-slate-300 px-1 font-mono">{Math.round(zoomLevel * 100)}%</span>
          <button
            onClick={() => setZoomLevel(prev => Math.min(2.0, prev + 0.2))}
            className="p-1 hover:bg-slate-700 rounded text-slate-300"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="p-1 hover:bg-slate-700 rounded text-slate-300"
            title="Reset Zoom"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Image Viewport */}
      <div className="relative w-full min-h-[420px] max-h-[560px] bg-slate-950 flex items-center justify-center overflow-auto p-4 select-none">
        <div
          className="relative inline-block transition-transform duration-200"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
        >
          {/* Main Packaging Image */}
          <img
            src={imageUrl}
            alt="Packaged Commodity Artwork"
            className="max-h-[480px] w-auto rounded-lg shadow-2xl object-contain border border-slate-800"
          />

          {/* Bounding Box Overlays */}
          {filteredBoxes.map((box) => {
            const isHovered = hoveredBox?.id === box.id;
            const isSelected = selectedBoxId === box.id;

            return (
              <div
                key={box.id}
                onClick={() => onSelectBox && onSelectBox(box)}
                onMouseEnter={() => setHoveredBox(box)}
                onMouseLeave={() => setHoveredBox(null)}
                className={`absolute border-2 rounded cursor-pointer transition-all duration-150 ${getBorderColor(
                  box.status,
                  isHovered,
                  isSelected
                )}`}
                style={{
                  left: `${box.x}%`,
                  top: `${box.y}%`,
                  width: `${box.width}%`,
                  height: `${box.height}%`
                }}
              >
                {/* Floating Tag */}
                <div
                  className={`absolute -top-3 left-1 px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wide shadow-md whitespace-nowrap uppercase flex items-center gap-1 ${getBadgeColor(
                    box.status
                  )}`}
                >
                  {box.status === 'violation' && <XCircle className="w-2.5 h-2.5" />}
                  {box.status === 'warning' && <AlertTriangle className="w-2.5 h-2.5" />}
                  {box.status === 'compliant' && <CheckCircle className="w-2.5 h-2.5" />}
                  <span>{box.rule ? box.rule.split(' ')[0] : box.status}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hover / Selection Tooltip */}
        {hoveredBox && (
          <div className="absolute bottom-4 left-4 right-4 bg-slate-900/95 backdrop-blur-md border border-slate-700 p-3 rounded-xl shadow-2xl text-xs z-30 pointer-events-none flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getBadgeColor(hoveredBox.status)}`}>
                  {hoveredBox.status}
                </span>
                <span className="text-white font-semibold">{hoveredBox.rule || "Declaration Tag"}</span>
              </div>
              <p className="text-slate-200 font-mono text-[11px]">{hoveredBox.text}</p>
            </div>
            <div className="text-[11px] text-slate-400 italic max-w-xs text-right">
              {hoveredBox.status === 'violation' ? '⚠️ Statutory Section 36 penalty applies' : '✓ Verified Compliant'}
            </div>
          </div>
        )}
      </div>

      {/* Legend Footer */}
      <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>Compliant (Mandatory Rule Met)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span>Violation (Statutory Penalty)</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span>Warning (Incomplete Info)</span>
          </div>
        </div>
        <div className="text-slate-400 hidden sm:block">
          Click any bounding box to inspect legal metrology rule citation
        </div>
      </div>
    </div>
  );
};
