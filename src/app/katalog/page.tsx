"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { useArchi } from "@/context/ArchiContext";
import { Search } from "lucide-react";

export default function CatalogPage() {
  const { rooms } = useArchi();
  const [filterCat, setFilterCat] = useState<string>("ALL");
  const [search, setSearch] = useState<string>("");

  const filtered = rooms.filter((r) => {
    const matchCat = filterCat === "ALL" || r.category === filterCat;
    const matchSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.finishFloor.toLowerCase().includes(search.toLowerCase()) ||
      r.finishWall.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-white text-black font-mono pb-20 selection:bg-black selection:text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-12 space-y-12">
        {/* Whitespace-Heavy Hero Title */}
        <section className="space-y-4 max-w-3xl">
          <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 block">
            INDEX MODUL RUANG & SPESIFIKASI MATERIAL
          </span>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight uppercase leading-tight">
            STANDARISASI TIPOLOGI RUANG MONOKROM
          </h2>
          <p className="text-xs text-zinc-500 leading-relaxed max-w-2xl">
            Kompilasi modul arsitektural kanonik dengan penekanan pada proporsi ruang murni, ketebalan dinding struktural, dan integrasi material monokromatik tanpa ornamen superfluos.
          </p>
        </section>

        {/* Filter Strip */}
        <section className="flex flex-wrap items-center justify-between gap-6 border-y border-black py-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest">KATEGORI:</span>
            {["ALL", "LIVING", "BEDROOM", "KITCHEN_DINING", "SERVICE_BATH", "OPEN_COURTYARD"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCat(cat)}
                className={`px-3 py-1 text-xs uppercase tracking-wider transition-colors ${
                  filterCat === cat
                    ? "bg-black text-white font-bold"
                    : "border border-zinc-200 text-zinc-600 hover:border-black hover:text-black"
                }`}
              >
                {cat.replace(/_/g, " ")}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari modul atau spesifikasi..."
              className="border border-zinc-300 pl-8 pr-4 py-1.5 text-xs outline-none focus:border-black w-64"
            />
          </div>
        </section>

        {/* Modules Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((room) => (
            <div
              key={room.id}
              className="border border-black p-6 space-y-6 flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between border-b border-zinc-200 pb-3">
                  <div>
                    <span className="text-[9px] text-zinc-400 block tracking-widest uppercase">{room.id}</span>
                    <h3 className="text-sm font-bold uppercase tracking-wider">{room.name}</h3>
                  </div>
                  <span className="text-[9px] border border-black px-1.5 py-0.5 uppercase">
                    {room.category.replace(/_/g, " ")}
                  </span>
                </div>

                {/* Minimalist Floor Silhouette */}
                <div className="h-32 border border-zinc-200 bg-[#FAFAFA] flex items-center justify-center p-4">
                  <div
                    className="border-2 border-black bg-white flex items-center justify-center text-[10px] font-bold"
                    style={{
                      width: `${Math.min(180, room.widthM * 24)}px`,
                      height: `${Math.min(100, room.lengthM * 20)}px`,
                    }}
                  >
                    {room.dimensionLabel}
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between border-b border-zinc-100 pb-1">
                    <span className="text-zinc-500 text-[10px]">LUAS BERSIH:</span>
                    <span className="font-bold">{room.areaSqm} m²</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-100 pb-1">
                    <span className="text-zinc-500 text-[10px]">TEBAL DINDING:</span>
                    <span className="font-bold">{room.wallThicknessCm} cm</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-100 pb-1">
                    <span className="text-zinc-500 text-[10px]">FINISH LANTAI:</span>
                    <span className="font-bold text-right text-[11px]">{room.finishFloor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500 text-[10px]">FINISH DINDING:</span>
                    <span className="font-bold text-right text-[11px]">{room.finishWall}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-black flex justify-between items-center text-xs">
                <span className="text-[10px] text-zinc-400">STATUS MODUL: KANONIK</span>
                <span className="font-bold text-[10px] uppercase">SKALA 1:100</span>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}