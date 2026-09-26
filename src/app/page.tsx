"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import { useArchi } from "@/context/ArchiContext";
import {
  RotateCw,
  Trash2,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

export default function CadStudioPage() {
  const {
    rooms,
    selectedRoomId,
    setSelectedRoomId,
    project,
    gridSnap,
    setGridSnap,
    showDimensions,
    setShowDimensions,
    updateRoomPosition,
    rotateRoom,
    deleteRoom,
    addRoom,
  } = useArchi();

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId) || rooms[0];

  const handleSpawnRoom = (cat: "LIVING" | "BEDROOM" | "KITCHEN_DINING" | "SERVICE_BATH" | "OPEN_COURTYARD") => {
    const templates = {
      LIVING: { name: "TATAMI RECEPTION SALON", widthM: 5.0, lengthM: 6.0, areaSqm: 30.0, finishFloor: "Woven Natural Igusa Mats", finishWall: "Rice Paper Shoji & Plaster" },
      BEDROOM: { name: "GUEST RETREAT SUITE", widthM: 4.0, lengthM: 4.5, areaSqm: 18.0, finishFloor: "Bleached Oak Parquet", finishWall: "Matte Chalk Plaster" },
      KITCHEN_DINING: { name: "TEA PREPARATION PANTRY", widthM: 3.5, lengthM: 4.0, areaSqm: 14.0, finishFloor: "Basalt Flagstone Tile", finishWall: "Brushed Aluminum Inset" },
      SERVICE_BATH: { name: "MONOLITH OFURO BATHROOM", widthM: 3.0, lengthM: 3.5, areaSqm: 10.5, finishFloor: "Honed Nero Marquina Marble", finishWall: "Waterproof Microcement" },
      OPEN_COURTYARD: { name: "LIGHTWELL BAMBOO VOID", widthM: 3.0, lengthM: 3.0, areaSqm: 9.0, finishFloor: "White Quartz River Pebbles", finishWall: "Frameless Minimal Glass" },
    };

    const t = templates[cat];
    addRoom({
      name: t.name,
      category: cat,
      widthM: t.widthM,
      lengthM: t.lengthM,
      areaSqm: t.areaSqm,
      wallThicknessCm: cat === "OPEN_COURTYARD" ? 0 : 15,
      finishFloor: t.finishFloor,
      finishWall: t.finishWall,
      posX: 200 + Math.random() * 80,
      posY: 180 + Math.random() * 60,
      rotationDeg: 0,
      dimensionLabel: `${t.widthM.toFixed(2)}m × ${t.lengthM.toFixed(2)}m`,
    });
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-black font-mono selection:bg-black selection:text-white flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col lg:flex-row border-b border-black">
        <aside className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-black bg-white p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div>
              <span className="text-[9px] tracking-widest text-zinc-400 uppercase block">PARAMETRIK PROYEK</span>
              <h2 className="text-base font-bold tracking-tight uppercase mt-1">{project.projectName}</h2>
              <p className="text-[10px] text-zinc-500 mt-0.5">{project.siteLocation}</p>
            </div>

            <div className="space-y-2">
              <span className="text-[9px] tracking-widest text-zinc-400 uppercase block">INJEKSI MODUL RUANG ARSITEKTUR</span>
              <div className="grid grid-cols-1 gap-1.5 text-xs">
                <button
                  onClick={() => handleSpawnRoom("LIVING")}
                  className="p-2 border border-zinc-300 hover:border-black text-left flex items-center justify-between transition-colors"
                >
                  <span className="tracking-wider text-[11px]">+ SALON / LIVING</span>
                  <span className="text-[9px] text-zinc-400">30 m²</span>
                </button>
                <button
                  onClick={() => handleSpawnRoom("BEDROOM")}
                  className="p-2 border border-zinc-300 hover:border-black text-left flex items-center justify-between transition-colors"
                >
                  <span className="tracking-wider text-[11px]">+ GUEST SUITE</span>
                  <span className="text-[9px] text-zinc-400">18 m²</span>
                </button>
                <button
                  onClick={() => handleSpawnRoom("OPEN_COURTYARD")}
                  className="p-2 border border-zinc-300 hover:border-black text-left flex items-center justify-between transition-colors"
                >
                  <span className="tracking-wider text-[11px]">+ VOID COURTYARD</span>
                  <span className="text-[9px] text-zinc-400">9 m²</span>
                </button>
                <button
                  onClick={() => handleSpawnRoom("SERVICE_BATH")}
                  className="p-2 border border-zinc-300 hover:border-black text-left flex items-center justify-between transition-colors"
                >
                  <span className="tracking-wider text-[11px]">+ OFURO BATHROOM</span>
                  <span className="text-[9px] text-zinc-400">10.5 m²</span>
                </button>
              </div>
            </div>

            <div className="space-y-2 border-t border-zinc-200 pt-4">
              <span className="text-[9px] tracking-widest text-zinc-400 uppercase block">PENGATURAN DRAFTING</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setGridSnap(!gridSnap)}
                  className={`flex-1 py-1.5 text-[10px] uppercase border transition-all ${
                    gridSnap ? "bg-black text-white border-black font-bold" : "border-zinc-300 text-zinc-500"
                  }`}
                >
                  SNAP GRID: {gridSnap ? "ON (0.5M)" : "OFF"}
                </button>
                <button
                  onClick={() => setShowDimensions(!showDimensions)}
                  className={`flex-1 py-1.5 text-[10px] uppercase border transition-all ${
                    showDimensions ? "bg-black text-white border-black font-bold" : "border-zinc-300 text-zinc-500"
                  }`}
                >
                  DIMENSI: {showDimensions ? "ON" : "OFF"}
                </button>
              </div>
            </div>
          </div>

          {selectedRoom && (
            <div className="border border-black p-4 bg-zinc-50 space-y-3">
              <div className="flex items-start justify-between border-b border-zinc-200 pb-2">
                <div>
                  <span className="text-[8px] text-zinc-400 uppercase block tracking-widest">{selectedRoom.id} // TERPILIH</span>
                  <h3 className="text-xs font-bold uppercase">{selectedRoom.name}</h3>
                </div>
                <button
                  onClick={() => deleteRoom(selectedRoom.id)}
                  className="text-zinc-400 hover:text-black p-1"
                  title="Hapus Modul"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-1 text-[10px]">
                <div className="flex justify-between">
                  <span className="text-zinc-500">DIMENSI:</span>
                  <span className="font-bold">{selectedRoom.dimensionLabel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">LUAS BERSIH:</span>
                  <span className="font-bold">{selectedRoom.areaSqm} m²</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">MATERIAL LANTAI:</span>
                  <span className="text-right text-zinc-800">{selectedRoom.finishFloor.split("(")[0]}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1 pt-2 border-t border-zinc-200">
                <div />
                <button
                  onClick={() => updateRoomPosition(selectedRoom.id, 0, -20)}
                  className="p-1 border border-zinc-300 hover:border-black flex justify-center"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <div />
                <button
                  onClick={() => updateRoomPosition(selectedRoom.id, -20, 0)}
                  className="p-1 border border-zinc-300 hover:border-black flex justify-center"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => rotateRoom(selectedRoom.id)}
                  title="Rotasi 90°"
                  className="p-1 border border-black bg-black text-white flex justify-center items-center"
                >
                  <RotateCw className="w-3 h-3" />
                </button>
                <button
                  onClick={() => updateRoomPosition(selectedRoom.id, 20, 0)}
                  className="p-1 border border-zinc-300 hover:border-black flex justify-center"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <div />
                <button
                  onClick={() => updateRoomPosition(selectedRoom.id, 0, 20)}
                  className="p-1 border border-zinc-300 hover:border-black flex justify-center"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
                <div />
              </div>
            </div>
          )}
        </aside>

        <section className="flex-1 bg-white relative overflow-hidden flex flex-col items-center justify-center p-8 lg:p-12">
          <div className="w-full max-w-5xl h-[620px] border border-black relative bg-[#FCFCFB] shadow-sm overflow-hidden select-none">
            <svg className="w-full h-full cursor-pointer" viewBox="0 0 800 600">
              <defs>
                <pattern id="cadGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ECECE8" strokeWidth="0.8" />
                  <path d="M 200 0 L 0 0 0 200" fill="none" stroke="#DCDCD7" strokeWidth="1.2" />
                </pattern>
              </defs>

              <rect width="800" height="600" fill="url(#cadGrid)" />

              <rect
                x="80"
                y="50"
                width="640"
                height="480"
                fill="none"
                stroke="#A1A1AA"
                strokeWidth="1"
                strokeDasharray="8 4"
              />
              <text x="90" y="42" fill="#71717A" fontSize="9" letterSpacing="0.1em">
                GARIS SEMPADAN BANGUNAN (SITE BOUNDARY 18.00m × 25.00m)
              </text>

              {rooms.map((room) => {
                const isSelected = room.id === selectedRoomId;
                const isVoid = room.category === "OPEN_COURTYARD";
                const pixelWidth = room.widthM * 28;
                const pixelLength = room.lengthM * 28;

                return (
                  <g
                    key={room.id}
                    transform={`translate(${room.posX}, ${room.posY})`}
                    onClick={() => setSelectedRoomId(room.id)}
                    className="cursor-pointer"
                  >
                    <rect
                      width={pixelWidth}
                      height={pixelLength}
                      fill={isVoid ? "#FFFFFF" : isSelected ? "#F4F4F3" : "#FFFFFF"}
                      stroke="#000000"
                      strokeWidth={isVoid ? "1" : "3.5"}
                      strokeDasharray={isVoid ? "4 3" : undefined}
                    />

                    {isVoid && (
                      <g stroke="#D4D4D8" strokeWidth="0.8">
                        <line x1="0" y1="0" x2={pixelWidth} y2={pixelLength} />
                        <line x1={pixelWidth} y1="0" x2="0" y2={pixelLength} />
                      </g>
                    )}

                    {!isVoid && (
                      <rect
                        x="4"
                        y="4"
                        width={pixelWidth - 8}
                        height={pixelLength - 8}
                        fill="none"
                        stroke="#000000"
                        strokeWidth="0.8"
                      />
                    )}

                    <text
                      x={pixelWidth / 2}
                      y={pixelLength / 2 - 6}
                      textAnchor="middle"
                      fill="#000000"
                      fontSize="9"
                      fontWeight="bold"
                      letterSpacing="0.08em"
                    >
                      {room.name}
                    </text>
                    <text
                      x={pixelWidth / 2}
                      y={pixelLength / 2 + 10}
                      textAnchor="middle"
                      fill="#71717A"
                      fontSize="8"
                    >
                      +{room.areaSqm} m²
                    </text>

                    {showDimensions && (
                      <g stroke="#000000" strokeWidth="0.8" opacity="0.75">
                        <line x1="0" y1="-12" x2={pixelWidth} y2="-12" />
                        <line x1="0" y1="-16" x2="0" y2="-8" />
                        <line x1={pixelWidth} y1="-16" x2={pixelWidth} y2="-8" />
                        <text
                          x={pixelWidth / 2}
                          y="-16"
                          textAnchor="middle"
                          fill="#000000"
                          fontSize="7"
                          fontWeight="bold"
                        >
                          {room.widthM.toFixed(2)}m
                        </text>

                        <line x1="-12" y1="0" x2="-12" y2={pixelLength} />
                        <line x1="-16" y1="0" x2="-8" y2="0" />
                        <line x1="-16" y1={pixelLength} x2="-8" y2={pixelLength} />
                        <text
                          x="-18"
                          y={pixelLength / 2}
                          textAnchor="middle"
                          fill="#000000"
                          fontSize="7"
                          fontWeight="bold"
                          transform={`rotate(-90, -18, ${pixelLength / 2})`}
                        >
                          {room.lengthM.toFixed(2)}m
                        </text>
                      </g>
                    )}

                    {isSelected && (
                      <rect
                        x="-3"
                        y="-3"
                        width={pixelWidth + 6}
                        height={pixelLength + 6}
                        fill="none"
                        stroke="#000000"
                        strokeWidth="1.2"
                        strokeDasharray="3 3"
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            <div className="absolute bottom-0 right-0 border-t border-l border-black bg-white p-3 text-[9px] flex items-center gap-6">
              <div>
                <span className="text-zinc-400 block text-[7px] uppercase">KOP GAMBAR:</span>
                <span className="font-bold">DENAH LANTAI SATU (GF)</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[7px] uppercase">SKALA:</span>
                <span className="font-bold">1 : 100</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[7px] uppercase">TANGGAL:</span>
                <span className="font-bold">{project.lastUpdated}</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}