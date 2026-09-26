"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { useArchi } from "@/context/ArchiContext";
import { Printer } from "lucide-react";

export default function SpesifikasiBoqPage() {
  const { boqItems, updateBoqRate, project } = useArchi();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempRate, setTempRate] = useState<number>(0);

  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  const handleStartEdit = (id: string, currentRate: number) => {
    setEditingId(id);
    setTempRate(currentRate);
  };

  const handleSaveEdit = (id: string) => {
    updateBoqRate(id, Number(tempRate));
    setEditingId(null);
  };

  const grandTotalIdr = boqItems.reduce((acc, item) => acc + item.totalPriceIdr, 0);

  return (
    <div className="min-h-screen bg-white text-black font-mono pb-20 selection:bg-black selection:text-white">
      <div className="print:hidden">
        <Navbar />
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 space-y-8">
        <section className="print:hidden border border-black p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 block">
              DOKUMEN RENCANA ANGGARAN BIAYA & SPESIFIKASI MATERIAL
            </span>
            <h2 className="text-xl font-bold uppercase tracking-tight">
              LEMBAR KERJA SPESIFIKASI & BOQ (A4 FORMAL)
            </h2>
            <p className="text-xs text-zinc-500">
              Dokumen resmi arsitektural untuk tender kontraktor dan verifikasi belanja material kanonik.
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white text-xs uppercase tracking-widest font-bold hover:bg-zinc-800 transition-colors self-start sm:self-auto"
          >
            <Printer className="w-4 h-4" />
            CETAK / EKSPOR PDF A4
          </button>
        </section>

        <section className="border border-black p-8 sm:p-12 space-y-8 bg-white print:border-none print:p-0">
          <div className="border-b-2 border-black pb-6 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[9px] tracking-[0.2em] text-zinc-400 uppercase block">STUDIO DOKUMEN ARSITEKTUR</span>
                <h3 className="text-lg font-black uppercase tracking-tight">{project.architectName}</h3>
                <p className="text-xs text-zinc-600">{project.siteLocation}</p>
              </div>
              <div className="text-right">
                <span className="text-[9px] border border-black px-2 py-0.5 uppercase font-bold">DOKUMEN RESMI TENDER</span>
                <p className="text-xs font-bold mt-1">{project.projectId}</p>
              </div>
            </div>

            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-[10px] border-t border-zinc-200">
              <div>
                <span className="text-zinc-400 block uppercase">NAMA PROYEK:</span>
                <span className="font-bold">{project.projectName}</span>
              </div>
              <div>
                <span className="text-zinc-400 block uppercase">KLIEN:</span>
                <span className="font-bold">{project.clientName}</span>
              </div>
              <div>
                <span className="text-zinc-400 block uppercase">TANGGAL TERBIT:</span>
                <span className="font-bold">{project.lastUpdated}</span>
              </div>
              <div>
                <span className="text-zinc-400 block uppercase">STATUS ANGGARAN:</span>
                <span className="font-bold">VALIDASI PRE-TENDER</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-wider">TABEL RINCIAN MATERIAL & PEKERJAAN (BILL OF QUANTITIES)</span>
              <span className="text-zinc-400 text-[10px]">KLIK HARGA SATUAN UNTUK SIMULASI</span>
            </div>

            <div className="overflow-x-auto border border-black">
              <table className="w-full text-left text-xs">
                <thead className="bg-black text-white text-[9px] uppercase tracking-wider">
                  <tr>
                    <th className="p-2.5">KODE & KATEGORI</th>
                    <th className="p-2.5">DESKRIPSI PEKERJAAN & SPESIFIKASI</th>
                    <th className="p-2.5 text-center">VOLUME</th>
                    <th className="p-2.5 text-right">HARGA SATUAN (IDR)</th>
                    <th className="p-2.5 text-right">SUBTOTAL (IDR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 font-mono text-[11px]">
                  {boqItems.map((item) => (
                    <tr key={item.id} className="hover:bg-zinc-50">
                      <td className="p-2.5 align-top">
                        <span className="font-bold block">{item.divisionCode}</span>
                        <span className="text-[9px] text-zinc-500">{item.category}</span>
                      </td>
                      <td className="p-2.5 align-top">
                        <span className="font-bold block text-black">{item.itemDescription}</span>
                        <span className="text-[10px] text-zinc-500 block leading-tight mt-0.5">{item.specification}</span>
                      </td>
                      <td className="p-2.5 align-top text-center font-bold">
                        {item.quantity} {item.unit}
                      </td>
                      <td className="p-2.5 align-top text-right">
                        {editingId === item.id ? (
                          <div className="flex items-center justify-end gap-1">
                            <input
                              type="number"
                              value={tempRate}
                              onChange={(e) => setTempRate(Number(e.target.value))}
                              className="w-24 border border-black px-1 py-0.5 text-xs text-right outline-none"
                            />
                            <button
                              onClick={() => handleSaveEdit(item.id)}
                              className="px-1.5 py-0.5 bg-black text-white text-[9px] uppercase"
                            >
                              OK
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleStartEdit(item.id, item.unitRateIdr)}
                            title="Klik untuk ubah harga"
                            className="hover:underline font-bold text-zinc-800"
                          >
                            Rp {item.unitRateIdr.toLocaleString("id-ID")}
                          </button>
                        )}
                      </td>
                      <td className="p-2.5 align-top text-right font-bold text-black">
                        Rp {item.totalPriceIdr.toLocaleString("id-ID")}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-zinc-100 border-t-2 border-black font-black text-xs">
                    <td colSpan={4} className="p-3 text-right uppercase tracking-wider">
                      TOTAL ESTIMASI BIAYA PEKERJAAN ARSITEKTURAL (EXCL. PPN):
                    </td>
                    <td className="p-3 text-right text-base text-black">
                      Rp {grandTotalIdr.toLocaleString("id-ID")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-8 border-t-2 border-black grid grid-cols-2 gap-12 text-xs">
            <div className="space-y-16">
              <div>
                <span className="text-[9px] text-zinc-400 uppercase block">DISIAPKAN OLEH:</span>
                <p className="font-bold uppercase">PRINSIPAL ARSITEK</p>
              </div>
              <div className="border-t border-black pt-1">
                <p className="font-bold underline">Studio Monolith Architecture APAC</p>
                <p className="text-[9px] text-zinc-500">Lisensi IAI No. 04821-ARCH</p>
              </div>
            </div>

            <div className="space-y-16 text-right">
              <div>
                <span className="text-[9px] text-zinc-400 uppercase block">DISETUJUI OLEH:</span>
                <p className="font-bold uppercase">KLIEN / PEMILIK PROYEK</p>
              </div>
              <div className="border-t border-black pt-1">
                <p className="font-bold underline">{project.clientName}</p>
                <p className="text-[9px] text-zinc-500">Pemberi Tugas Pembangunan</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}