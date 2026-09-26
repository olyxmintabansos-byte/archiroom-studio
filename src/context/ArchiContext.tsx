"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { RoomModule, WallElevation, BoqMaterialItem, ProjectCad, CadKpi } from "@/types/archi";

interface ArchiContextType {
  rooms: RoomModule[];
  elevations: WallElevation[];
  selectedElevationId: string;
  setSelectedElevationId: (id: string) => void;
  boqItems: BoqMaterialItem[];
  selectedRoomId: string;
  setSelectedRoomId: (id: string) => void;
  project: ProjectCad;
  kpis: CadKpi;
  gridSnap: boolean;
  setGridSnap: (snap: boolean) => void;
  showDimensions: boolean;
  setShowDimensions: (show: boolean) => void;
  addRoom: (template: Omit<RoomModule, "id">) => void;
  updateRoomPosition: (id: string, deltaX: number, deltaY: number) => void;
  rotateRoom: (id: string) => void;
  deleteRoom: (id: string) => void;
  updateBoqRate: (id: string, newRate: number) => void;
  resetCadData: () => void;
}

const INITIAL_ROOMS: RoomModule[] = [
  {
    id: "RM-01",
    name: "LIVING & REFLECTION HALL",
    category: "LIVING",
    widthM: 6.0,
    lengthM: 8.0,
    areaSqm: 48.0,
    wallThicknessCm: 15,
    finishFloor: "Monolithic Honed Concrete (Stark Grey)",
    finishWall: "Pure Matte Plaster Paint (Ultra White)",
    posX: 140,
    posY: 100,
    rotationDeg: 0,
    dimensionLabel: "6.00m × 8.00m",
  },
  {
    id: "RM-02",
    name: "MINIMALIST ZEN COURTYARD (VOID)",
    category: "OPEN_COURTYARD",
    widthM: 4.0,
    lengthM: 4.0,
    areaSqm: 16.0,
    wallThicknessCm: 0,
    finishFloor: "Charcoal Basalt Crushed Gravel (Water Feature)",
    finishWall: "Frameless Structural Low-Iron Glass",
    posX: 380,
    posY: 100,
    rotationDeg: 0,
    dimensionLabel: "4.00m × 4.00m",
  },
  {
    id: "RM-03",
    name: "KITCHEN & DINING ATELIER",
    category: "KITCHEN_DINING",
    widthM: 5.0,
    lengthM: 6.0,
    areaSqm: 30.0,
    wallThicknessCm: 15,
    finishFloor: "Off-White Terrazzo In-Situ Cast",
    finishWall: "Blackened Steel Island & Matte Finish",
    posX: 140,
    posY: 340,
    rotationDeg: 0,
    dimensionLabel: "5.00m × 6.00m",
  },
  {
    id: "RM-04",
    name: "MASTER SLEEPING SUITE",
    category: "BEDROOM",
    widthM: 5.0,
    lengthM: 5.0,
    areaSqm: 25.0,
    wallThicknessCm: 15,
    finishFloor: "Natural Bleached Oak Plank 220mm",
    finishWall: "Acoustic Flush Wall Paneling",
    posX: 340,
    posY: 260,
    rotationDeg: 0,
    dimensionLabel: "5.00m × 5.00m",
  },
];

const INITIAL_ELEVATIONS: WallElevation[] = [
  {
    id: "ELV-01",
    wallCode: "WALL-N01",
    orientation: "TAMPAK UTARA",
    widthM: 12.0,
    clearHeightM: 3.6,
    parapetHeightM: 4.2,
    openingType: "Frameless Minimal Pivot Glass Door",
    openingWidthM: 3.0,
    openingHeightM: 3.0,
    sillHeightM: 0.0,
    wallStructure: "Exposed Board-Formed Reinforced Concrete (200mm)",
    finishLayer: "Hydrophobic Matte Silane Impregnation",
    hatchPattern: "CONCRETE_DENSE",
  },
  {
    id: "ELV-02",
    wallCode: "WALL-S02",
    orientation: "TAMPAK SELATAN",
    widthM: 10.0,
    clearHeightM: 3.6,
    parapetHeightM: 4.2,
    openingType: "Continuous Linear Clerestory Ribbon Window",
    openingWidthM: 8.0,
    openingHeightM: 0.8,
    sillHeightM: 2.6,
    wallStructure: "Precision Aerated Autoclaved Concrete (150mm)",
    finishLayer: "Ultra-White Mineral Silicate Plaster",
    hatchPattern: "LIGHT_BRICK",
  },
  {
    id: "ELV-03",
    wallCode: "SECT-A01",
    orientation: "POTONGAN A-A",
    widthM: 14.0,
    clearHeightM: 3.8,
    parapetHeightM: 4.5,
    openingType: "Central Courtyard Full-Height Glazed Facade",
    openingWidthM: 4.0,
    openingHeightM: 3.6,
    sillHeightM: 0.0,
    wallStructure: "Dual Layer Concrete Cavity Wall with Thermal Core",
    finishLayer: "Exposed Cast Concrete & Shadow Gap Reveal",
    hatchPattern: "CONCRETE_DENSE",
  },
];

const INITIAL_BOQ: BoqMaterialItem[] = [
  {
    id: "BOQ-01",
    divisionCode: "DIV-03",
    category: "STRUKTUR BETON MONOLITIK",
    itemDescription: "Beton Bertulang K-350 Board-Formed Architectural Finish",
    specification: "Semen Portland Tipe 1 dengan bekisting kayu pinus garis serat vertikal tajam.",
    unit: "m³",
    quantity: 142,
    unitRateIdr: 2850000,
    totalPriceIdr: 404700000,
  },
  {
    id: "BOQ-02",
    divisionCode: "DIV-08",
    category: "PINTU & BUKAAN MINIMALIS",
    itemDescription: "Kaca Struktural Low-Iron Frameless 12mm Tempered Laminated",
    specification: "Transmisi cahaya 91%, invisible floor pivot bearing Dorma RTS-85.",
    unit: "m²",
    quantity: 68,
    unitRateIdr: 3400000,
    totalPriceIdr: 231200000,
  },
  {
    id: "BOQ-03",
    divisionCode: "DIV-09",
    category: "FINISHING LANTAI MONOKROM",
    itemDescription: "Monolithic Honed Concrete Floor dengan Densifier Lithium",
    specification: "Grinding grit 800 satin sheen, sambungan dilatasi sealant hitam 3mm.",
    unit: "m²",
    quantity: 119,
    unitRateIdr: 950000,
    totalPriceIdr: 113050000,
  },
  {
    id: "BOQ-04",
    divisionCode: "DIV-09",
    category: "FINISHING DINDING INTERIOR",
    itemDescription: "Pelapis Dinding Mineral Silikat Matte Ultra-White",
    specification: "Zero VOC, formula kapur murni Keim Innostar tanpa pigmen buatan.",
    unit: "m²",
    quantity: 340,
    unitRateIdr: 280000,
    totalPriceIdr: 95200000,
  },
  {
    id: "BOQ-05",
    divisionCode: "DIV-07",
    category: "THERMAL & WATERPROOFING",
    itemDescription: "Membran Waterproofing Poliuretan Elastomerik Atap Datar",
    specification: "Ketebalan kering 2.0mm tahan genangan air terus-menerus.",
    unit: "m²",
    quantity: 160,
    unitRateIdr: 450000,
    totalPriceIdr: 72000000,
  },
];

const INITIAL_PROJECT: ProjectCad = {
  projectId: "ARC-2026-029",
  projectName: "RESIDENCE OF PURE VOID & SILENCE",
  architectName: "Studio Monolith Architecture APAC",
  clientName: "Private Contemporary Art Collector",
  siteLocation: "Bukit Dago Pakar Utara Kav. 12, Bandung",
  plotWidthM: 18.0,
  plotLengthM: 25.0,
  scaleRatio: "1:100",
  lastUpdated: "26 September 2026",
};

const ArchiContext = createContext<ArchiContextType | undefined>(undefined);

export function ArchiProvider({ children }: { children: React.ReactNode }) {
  const [rooms, setRooms] = useState<RoomModule[]>(INITIAL_ROOMS);
  const [elevations] = useState<WallElevation[]>(INITIAL_ELEVATIONS);
  const [selectedElevationId, setSelectedElevationId] = useState<string>("ELV-01");
  const [boqItems, setBoqItems] = useState<BoqMaterialItem[]>(INITIAL_BOQ);
  const [selectedRoomId, setSelectedRoomId] = useState<string>("RM-01");
  const [project] = useState<ProjectCad>(INITIAL_PROJECT);
  const [gridSnap, setGridSnap] = useState<boolean>(true);
  const [showDimensions, setShowDimensions] = useState<boolean>(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("archiroom_rooms");
      const savedBoq = localStorage.getItem("archiroom_boq");
      if (saved) setRooms(JSON.parse(saved));
      if (savedBoq) setBoqItems(JSON.parse(savedBoq));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("archiroom_rooms", JSON.stringify(rooms));
      localStorage.setItem("archiroom_boq", JSON.stringify(boqItems));
    } catch {}
  }, [rooms, boqItems]);

  const addRoom = (template: Omit<RoomModule, "id">) => {
    const newId = `RM-${String(rooms.length + 1).padStart(2, "0")}`;
    setRooms((prev) => [...prev, { ...template, id: newId }]);
    setSelectedRoomId(newId);
  };

  const updateRoomPosition = (id: string, deltaX: number, deltaY: number) => {
    const step = gridSnap ? 20 : 5;
    setRooms((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              posX: Math.max(40, Math.min(700, Math.round((r.posX + deltaX) / step) * step)),
              posY: Math.max(40, Math.min(500, Math.round((r.posY + deltaY) / step) * step)),
            }
          : r
      )
    );
  };

  const rotateRoom = (id: string) => {
    setRooms((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const newRot = (r.rotationDeg + 90) % 360;
        return {
          ...r,
          rotationDeg: newRot,
          widthM: r.lengthM,
          lengthM: r.widthM,
          dimensionLabel: `${r.lengthM.toFixed(2)}m × ${r.widthM.toFixed(2)}m`,
        };
      })
    );
  };

  const deleteRoom = (id: string) => {
    if (rooms.length <= 1) return;
    setRooms((prev) => prev.filter((r) => r.id !== id));
    setSelectedRoomId(rooms[0]?.id || "");
  };

  const updateBoqRate = (id: string, newRate: number) => {
    setBoqItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              unitRateIdr: newRate,
              totalPriceIdr: Math.round(item.quantity * newRate),
            }
          : item
      )
    );
  };

  const resetCadData = () => {
    setRooms(INITIAL_ROOMS);
    setBoqItems(INITIAL_BOQ);
    setSelectedRoomId("RM-01");
    setSelectedElevationId("ELV-01");
    localStorage.removeItem("archiroom_rooms");
    localStorage.removeItem("archiroom_boq");
  };

  const totalFloorArea = rooms
    .filter((r) => r.category !== "OPEN_COURTYARD")
    .reduce((sum, r) => sum + r.areaSqm, 0);

  const voidArea = rooms
    .filter((r) => r.category === "OPEN_COURTYARD")
    .reduce((sum, r) => sum + r.areaSqm, 0);

  const siteArea = project.plotWidthM * project.plotLengthM;
  const kdbPct = Math.round((totalFloorArea / siteArea) * 1000) / 10;
  const totalBoqCost = boqItems.reduce((sum, b) => sum + b.totalPriceIdr, 0);

  const kpis: CadKpi = {
    totalFloorAreaSqm: totalFloorArea,
    builtCoveragePct: kdbPct,
    roomCount: rooms.length,
    courtyardVoidAreaSqm: voidArea,
    estimatedBuildCostIdr: totalBoqCost,
  };

  return (
    <ArchiContext.Provider
      value={{
        rooms,
        elevations,
        selectedElevationId,
        setSelectedElevationId,
        boqItems,
        selectedRoomId,
        setSelectedRoomId,
        project,
        kpis,
        gridSnap,
        setGridSnap,
        showDimensions,
        setShowDimensions,
        addRoom,
        updateRoomPosition,
        rotateRoom,
        deleteRoom,
        updateBoqRate,
        resetCadData,
      }}
    >
      {children}
    </ArchiContext.Provider>
  );
}

export function useArchi() {
  const context = useContext(ArchiContext);
  if (!context) throw new Error("useArchi must be used within ArchiProvider");
  return context;
}