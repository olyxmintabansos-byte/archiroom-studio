export interface RoomModule {
  id: string;
  name: string;
  category: "LIVING" | "BEDROOM" | "KITCHEN_DINING" | "SERVICE_BATH" | "OPEN_COURTYARD";
  widthM: number;
  lengthM: number;
  areaSqm: number;
  wallThicknessCm: number;
  finishFloor: string;
  finishWall: string;
  posX: number;
  posY: number;
  rotationDeg: number;
  dimensionLabel: string;
}

export interface ProjectCad {
  projectId: string;
  projectName: string;
  architectName: string;
  clientName: string;
  siteLocation: string;
  plotWidthM: number;
  plotLengthM: number;
  scaleRatio: string;
  lastUpdated: string;
}

export interface CadKpi {
  totalFloorAreaSqm: number;
  builtCoveragePct: number;
  roomCount: number;
  courtyardVoidAreaSqm: number;
  estimatedBuildCostIdr: number;
}