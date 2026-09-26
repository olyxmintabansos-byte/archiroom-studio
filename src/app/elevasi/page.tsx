"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import { useArchi } from "@/context/ArchiContext";

export default function ElevationPage() {
  const { elevations, selectedElevationId, setSelectedElevationId } = useArchi();

  const activeElevation =
    elevations.find((e) => e.id === selectedElevationId) || elevations[0];

  const scale = 36;
  const svgWidth = 840;
  const svgHeight = 480;

  const wallPixelWidth = activeElevation.widthM * scale;
  const clearPixelHeight = activeElevation.clearHeightM * scale;
  const parapetPixelHeight = activeElevation.parapetHeightM * scale;

  const openingPixelWidth = activeElevation.openingWidthM * scale;
  const openingPixelHeight = activeElevation.openingHeightM * scale;
  const sillPixelHeight = activeElevation.sillHeightM * scale;

  const startX = (svgWidth - wallPixelWidth) / 2;
  const groundY = 400;

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-black font-mono selection:bg-black selection:text-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        <section className="space-y-2 max-w-3xl">
          <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 block">
            GAMBAR KERJA TEKNIK // DETAIL POTONGAN & ELEVASI DINDING
          </span>
          <h2 className="text-2xl sm:text-3xl font-light tracking-tight uppercase leading-tight">
            POTONGAN ARSITEKTURAL & ELEVASI FASAD
          </h2>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Gambar penampang vertikal struktural skala 1:50. Menampilkan ketebalan plat lantai, peil ketinggian elevasi terhadap datum tanah ±0.00, lintel bukaan jendela, dan detail parapet atap datar.
          </p>
        </section>

        <section className="border-y border-black py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-zinc-400 uppercase tracking-widest mr-2">PILIH ELEVASI:</span>
            {elevations.map((elv) => (
              <button
                key={elv.id}
                onClick={() => setSelectedElevationId(elv.id)}
                className={`px-3 py-1.5 text-xs uppercase tracking-wider transition-all ${
                  activeElevation.id === elv.id
                    ? "bg-black text-white font-bold"
                    : "border border-zinc-300 text-zinc-600 hover:border-black hover:text-black"
                }`}
              >
                {elv.orientation} ({elv.wallCode})
              </button>
            ))}
          </div>

          <div className="text-xs text-zinc-500">
            SKALA GAMBAR: <span className="font-bold text-black">1 : 50</span>
          </div>
        </section>

        <section className="border border-black bg-white p-6 sm:p-10 shadow-sm flex flex-col items-center">
          <div className="w-full max-w-4xl overflow-x-auto">
            <svg
              className="w-full min-w-[760px] h-[480px] bg-[#FCFCFB] border border-zinc-200 select-none"
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            >
              <defs>
                <pattern id="concreteHatch" width="8" height="8" patternUnits="userSpaceOnUse">
                  <path d="M 0 8 L 8 0 M -2 2 L 2 -2 M 6 10 L 10 6" stroke="#000000" strokeWidth="0.6" />
                </pattern>
                <pattern id="brickHatch" width="12" height="6" patternUnits="userSpaceOnUse">
                  <rect width="12" height="6" fill="#FFFFFF" />
                  <path d="M 0 6 L 12 6 M 6 0 L 6 6" stroke="#52525B" strokeWidth="0.5" />
                </pattern>
              </defs>

              <line x1="40" y1={groundY} x2={svgWidth - 40} y2={groundY} stroke="#000000" strokeWidth="2.5" />
              <text x="50" y={groundY - 8} fontSize="9" fontWeight="bold" fill="#000000">
                PEIL LANTAI UTAMA (DATUM ±0.00)
              </text>

              <line
                x1="40"
                y1={groundY - clearPixelHeight}
                x2={svgWidth - 40}
                y2={groundY - clearPixelHeight}
                stroke="#A1A1AA"
                strokeWidth="1"
                strokeDasharray="6 4"
              />
              <text x="50" y={groundY - clearPixelHeight - 6} fontSize="8" fill="#71717A">
                ELEVASI PLAFON BERSIH (+{activeElevation.clearHeightM.toFixed(2)}m)
              </text>

              <line
                x1="40"
                y1={groundY - parapetPixelHeight}
                x2={svgWidth - 40}
                y2={groundY - parapetPixelHeight}
                stroke="#000000"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />
              <text x="50" y={groundY - parapetPixelHeight - 6} fontSize="8" fontWeight="bold" fill="#000000">
                PUNCAK PARAPET ATAP (+{activeElevation.parapetHeightM.toFixed(2)}m)
              </text>

              <rect
                x={startX}
                y={groundY - parapetPixelHeight}
                width={wallPixelWidth}
                height={parapetPixelHeight}
                fill="none"
                stroke="#000000"
                strokeWidth="3"
              />

              <rect
                x={startX}
                y={groundY - parapetPixelHeight}
                width={wallPixelWidth}
                height={20}
                fill="url(#concreteHatch)"
                stroke="#000000"
                strokeWidth="1.5"
              />

              <rect
                x={startX - 15}
                y={groundY}
                width={wallPixelWidth + 30}
                height={25}
                fill="url(#concreteHatch)"
                stroke="#000000"
                strokeWidth="2"
              />

              <rect
                x={startX}
                y={groundY - clearPixelHeight}
                width={wallPixelWidth}
                height={clearPixelHeight}
                fill={activeElevation.hatchPattern === "CONCRETE_DENSE" ? "#F9F9F8" : "#FFFFFF"}
                stroke="#000000"
                strokeWidth="1"
              />

              <rect
                x={startX + (wallPixelWidth - openingPixelWidth) / 2}
                y={groundY - sillPixelHeight - openingPixelHeight}
                width={openingPixelWidth}
                height={openingPixelHeight}
                fill="#FFFFFF"
                stroke="#000000"
                strokeWidth="2"
              />

              <rect
                x={startX + (wallPixelWidth - openingPixelWidth) / 2 + 4}
                y={groundY - sillPixelHeight - openingPixelHeight + 4}
                width={openingPixelWidth - 8}
                height={openingPixelHeight - 8}
                fill="none"
                stroke="#71717A"
                strokeWidth="0.8"
              />
              <text
                x={startX + wallPixelWidth / 2}
                y={groundY - sillPixelHeight - openingPixelHeight / 2}
                textAnchor="middle"
                fontSize="8"
                fontWeight="bold"
                fill="#000000"
              >
                {activeElevation.openingType}
              </text>
              <text
                x={startX + wallPixelWidth / 2}
                y={groundY - sillPixelHeight - openingPixelHeight / 2 + 14}
                textAnchor="middle"
                fontSize="7"
                fill="#71717A"
              >
                {activeElevation.openingWidthM}m × {activeElevation.openingHeightM}m (Sill: +{activeElevation.sillHeightM}m)
              </text>

              <g stroke="#000000" strokeWidth="0.8">
                <line x1={startX - 30} y1={groundY} x2={startX - 30} y2={groundY - parapetPixelHeight} />
                <line x1={startX - 35} y1={groundY} x2={startX - 25} y2={groundY} />
                <line x1={startX - 35} y1={groundY - parapetPixelHeight} x2={startX - 25} y2={groundY - parapetPixelHeight} />
                <text
                  x={startX - 40}
                  y={groundY - parapetPixelHeight / 2}
                  textAnchor="middle"
                  fontSize="8"
                  fontWeight="bold"
                  transform={`rotate(-90, ${startX - 40}, ${groundY - parapetPixelHeight / 2})`}
                >
                  {activeElevation.parapetHeightM.toFixed(2)}m TOTAL
                </text>

                <line x1={startX} y1={groundY + 45} x2={startX + wallPixelWidth} y2={groundY + 45} />
                <line x1={startX} y1={groundY + 40} x2={startX} y2={groundY + 50} />
                <line x1={startX + wallPixelWidth} y1={groundY + 40} x2={startX + wallPixelWidth} y2={groundY + 50} />
                <text
                  x={startX + wallPixelWidth / 2}
                  y={groundY + 58}
                  textAnchor="middle"
                  fontSize="8"
                  fontWeight="bold"
                >
                  LEBAR DINDING: {activeElevation.widthM.toFixed(2)} METERS
                </text>
              </g>
            </svg>
          </div>

          <div className="w-full max-w-4xl mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-black pt-6 text-xs">
            <div>
              <span className="text-[9px] text-zinc-400 uppercase tracking-widest block">STRUKTUR DINDING:</span>
              <p className="font-bold mt-0.5">{activeElevation.wallStructure}</p>
            </div>
            <div>
              <span className="text-[9px] text-zinc-400 uppercase tracking-widest block">LAPISAN FINISHING:</span>
              <p className="font-bold mt-0.5">{activeElevation.finishLayer}</p>
            </div>
            <div>
              <span className="text-[9px] text-zinc-400 uppercase tracking-widest block">BUKAAN ARSITEKTUR:</span>
              <p className="font-bold mt-0.5">{activeElevation.openingType}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}