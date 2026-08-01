'use client';

import React from 'react';

const FILES = [
  { name: 'Gursharan_Singh_CV.pdf', size: '142 KB', type: 'pdf' },
  { name: 'portfolio_v2.fig', size: '2.4 MB', type: 'figma' },
  { name: 'Case Studies', size: '— ', type: 'folder' },
  { name: 'Tech Stack Overview', size: '8 KB', type: 'doc' },
];

function FileIcon({ type }: { type: string }) {
  if (type === 'folder') {
    return (
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#D7E2EA]/30">
        <path d="M3 4C3 3.45 3.45 3 4 3H8L10 5H16C16.55 5 17 5.45 17 6V15C17 15.55 16.55 16 16 16H4C3.45 16 3 15.55 3 15V4Z" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#D7E2EA]/30">
      <path d="M5 3H12L15 6V17H5V3Z" />
      <polyline points="12,3 12,6 15,6" />
      <line x1="7" y1="10" x2="13" y2="10" />
      <line x1="7" y1="13" x2="11" y2="13" />
    </svg>
  );
}

export default function FilesApp() {
  return (
    <div className="px-4 py-3 flex flex-col" style={{ color: '#D7E2EA' }}>
      {/* Header */}
      <div className="mb-3">
        <h2 className="font-kanit font-bold text-[15px] text-white leading-tight">Files</h2>
        <p className="text-[10px] text-[#D7E2EA]/25 font-kanit mt-0.5">Documents & resources</p>
      </div>

      {/* File list */}
      <div className="flex flex-col">
        {FILES.map((file, i) => (
          <div
            key={file.name}
            className={`flex items-center gap-3 py-3 px-1 cursor-none
                       ${i < FILES.length - 1 ? 'border-b border-white/[0.04]' : ''}`}
            data-interactive
          >
            <div className="w-8 h-8 rounded-md bg-[#111113] border border-white/[0.06] flex items-center justify-center shrink-0">
              <FileIcon type={file.type} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-kanit font-medium text-[#D7E2EA]/60 truncate">{file.name}</p>
              <p className="text-[10px] font-kanit text-[#D7E2EA]/20">{file.size}</p>
            </div>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-[#D7E2EA]/15 shrink-0">
              <polyline points="4,2 8,6 4,10" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
