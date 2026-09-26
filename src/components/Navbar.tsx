"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useArchi } from "@/context/ArchiContext";
import { Compass, Grid, Box, Layers, FileText, RotateCcw } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { kpis, resetCadData, project } = useArchi();

  const links = [
    { href: "/", label: "STUDIO CAD DENAH", icon: Grid },
    { href: "/katalog", label: "KATALOG MODUL", icon: Box },
    { href: "/elevasi", label: "POTONGAN ELEVASI", icon: Layers },
    { href: "/spesifikasi", label: "SPESIFIKASI & BOQ", icon: FileText },
  ];

  return (
    <header className="border-b border-black bg-white text-black sticky top-0 z-50 font-mono select-none">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 border border-black flex items-center justify-center bg-black text-white">
            <Compass className="w-5 h-5 stroke-[1.5]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold tracking-[0.2em] uppercase">
                ARCHIROOM <span className="font-light text-zinc-500">STUDIO</span>
              </h1>
              <span className="text-[9px] border border-black px-1.5 py-0.2 uppercase tracking-widest bg-zinc-50">
                TITAN #29 // MONOCHROME
              </span>
            </div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">
              {project.projectName} // SKALA {project.scaleRatio}
            </p>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-8 border-l border-zinc-200 pl-8 text-xs">
          <div>
            <span className="text-[9px] text-zinc-400 uppercase tracking-wider block">LUAS TERBANGUN:</span>
            <span className="font-bold">{kpis.totalFloorAreaSqm} m² (KDB {kpis.builtCoveragePct}%)</span>
          </div>

          <div>
            <span className="text-[9px] text-zinc-400 uppercase tracking-wider block">VOID & COURTYARD:</span>
            <span className="font-bold">{kpis.courtyardVoidAreaSqm} m²</span>
          </div>

          <div>
            <span className="text-[9px] text-zinc-400 uppercase tracking-wider block">TOTAL BOQ ANGGARAN:</span>
            <span className="font-bold">Rp {(kpis.estimatedBuildCostIdr / 1000000000).toFixed(2)} M</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || pathname === `${link.href}/`;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs tracking-widest uppercase transition-all ${
                  isActive
                    ? "bg-black text-white font-bold"
                    : "border border-zinc-300 text-zinc-700 hover:border-black hover:text-black"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </Link>
            );
          })}

          <button
            onClick={() => {
              if (confirm("Reset seluruh layout dan BoQ arsitektur ke kanonik?")) {
                resetCadData();
              }
            }}
            title="Reset Layout Arsitektur"
            className="p-1.5 border border-zinc-300 text-zinc-500 hover:border-black hover:text-black transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}