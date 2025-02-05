import { MaterialPrice } from "@prisma/client";

export type MaterialPriceInput = Omit<
  MaterialPrice,
  "id" | "createdAt" | "updatedAt"
>;
