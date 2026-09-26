"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { RoomModule, ProjectCad, CadKpi } from "@/types/archi";

interface ArchiContextType {
  rooms: RoomModule[];
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
  const [selectedRoomId, setSelectedRoomId] = useState<string>("RM-01");
  const [project] = useState<ProjectCad>(INITIAL_PROJECT);
  const [gridSnap, setGridSnap] = useState<boolean>(true);
  const [showDimensions, setShowDimensions] = useState<boolean>(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("archiroom_rooms");
      if (saved) setRooms(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("archiroom_rooms", JSON.stringify(rooms));
    } catch {}
  }, [rooms]);

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

  const resetCadData = () => {
    setRooms(INITIAL_ROOMS);
    setSelectedRoomId("RM-01");
    localStorage.removeItem("archiroom_rooms");
  };

  const totalFloorArea = rooms
    .filter((r) => r.category !== "OPEN_COURTYARD")
    .reduce((sum, r) => sum + r.areaSqm, 0);

  const voidArea = rooms
    .filter((r) => r.category === "OPEN_COURTYARD")
    .reduce((sum, r) => sum + r.areaSqm, 0);

  const siteArea = project.plotWidthM * project.plotLengthM;
  const kdbPct = Math.round((totalFloorArea / siteArea) * 1000) / 10;

  const kpis: CadKpi = {
    totalFloorAreaSqm: totalFloorArea,
    builtCoveragePct: kdbPct,
    roomCount: rooms.length,
    courtyardVoidAreaSqm: voidArea,
    estimatedBuildCostIdr: totalFloorArea * 9500000,
  };

  return (
    <ArchiContext.Provider
      value={{
        rooms,
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