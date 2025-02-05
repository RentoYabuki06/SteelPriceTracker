import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GETハンドラー
export async function GET() {
  try {
    const materials = await prisma.material.findMany({
      include: {
        prices: {
          select: {
            date: true,
            priceMin: true,
            priceMax: true,
            unit: true,
          },
          orderBy: {
            date: "desc",
          },
          take: 30,
        },
      },
    });

    return NextResponse.json(materials);
  } catch {
    return NextResponse.json(
      { error: "データの生成に失敗しました" },
      { status: 500 }
    );
  }
}
