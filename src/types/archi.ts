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

export interface WallElevation {
  id: string;
  wallCode: string;
  orientation: "TAMPAK UTARA" | "TAMPAK SELATAN" | "TAMPAK TIMUR" | "POTONGAN A-A";
  widthM: number;
  clearHeightM: number;
  parapetHeightM: number;
  openingType: string;
  openingWidthM: number;
  openingHeightM: number;
  sillHeightM: number;
  wallStructure: string;
  finishLayer: string;
  hatchPattern: "CONCRETE_DENSE" | "LIGHT_BRICK" | "GLASS_CURTAIN";
}

export interface BoqMaterialItem {
  id: string;
  divisionCode: string;
  category: string;
  itemDescription: string;
  specification: string;
  unit: string;
  quantity: number;
  unitRateIdr: number;
  totalPriceIdr: number;
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