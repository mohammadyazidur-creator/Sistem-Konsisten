import React, { useState } from 'react';

export const PhoneFrame = ({
  children,
  screenTitle,
  screenshotUrl,
  showFrame = true,
  scale = 1
}) => {
  const [showFigmaCompare, setShowFigmaCompare] = useState(false);
  const [opacity, setOpacity] = useState(50);

  return (
    <div className="flex flex-col items-center">
      {/* Phone Header / Controls */}
      <div className="w-[390px] mb-3 flex items-center justify-between text-xs text-[#64748B]">
        <span className="font-semibold text-[#172B4D]">{screenTitle}</span>
        {screenshotUrl && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFigmaCompare(!showFigmaCompare)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                showFigmaCompare
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-[#E7EDF4] text-[#172B4D] hover:bg-slate-50'
              }`}
            >
              {showFigmaCompare ? 'Tutup Komparasi' : 'Bandingkan Figma'}
            </button>
            {showFigmaCompare && (
              <input
                type="range"
                min="0"
                max="100"
                value={opacity}
                onChange={(e) => setOpacity(e.target.value)}
                className="w-16 h-1 accent-blue-600 cursor-pointer"
                title={`Opasitas Figma: ${opacity}%`}
              />
            )}
          </div>
        )}
      </div>

      {/* Device Outer Frame */}
      <div
        className={`relative transition-all duration-300 ${
          showFrame
            ? 'p-3 bg-[#0F172A] rounded-[52px] shadow-2xl ring-1 ring-slate-800'
            : 'rounded-[32px] overflow-hidden shadow-xl ring-1 ring-slate-200'
        }`}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
        }}
      >
        {/* Device Notch / Dynamic Island */}
        {showFrame && (
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800 mr-8" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#06182c] border border-blue-950" />
          </div>
        )}

        {/* Screen Box (390 x 844 px) */}
        <div className="relative w-[390px] h-[844px] overflow-hidden bg-[#F8FAFC] rounded-[40px]">
          {/* Real Interactive Implementation */}
          <div className="w-full h-full">
            {children}
          </div>

          {/* Figma Reference Screenshot Overlay (when active) */}
          {showFigmaCompare && screenshotUrl && (
            <div
              className="absolute inset-0 pointer-events-none z-30 transition-opacity"
              style={{ opacity: opacity / 100 }}
            >
              <img
                src={screenshotUrl}
                alt="Figma Reference"
                className="w-[390px] h-[844px] object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
