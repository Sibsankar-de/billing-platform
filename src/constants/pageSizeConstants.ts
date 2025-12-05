export const PAGE_SIZE_MAP = {
  A4: "w-[210mm] min-h-[297mm]",
  LETTER: "w-[216mm] min-h-[279mm]",
  RECEIPT: "w-[80mm] min-h-[200mm]",
};

export type PageSizeType = keyof typeof PAGE_SIZE_MAP;
