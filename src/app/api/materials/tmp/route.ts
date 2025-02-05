import { fetchAndSaveMaterialPrices } from "@/models/Materials/utils/fetchAndSaveMaterialPrices";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // TODO: ここでデータベースに保存する処理を実装
    NextResponse.json({ message: "処理スタート" }, { status: 201 });

    console.log("材料価格データの取得を開始します...");
    const startDate = new Date("2023-12-01");
    const endDate = new Date("2024-12-28");

    fetchAndSaveMaterialPrices(startDate, endDate);

    return NextResponse.json({ message: "処理開始" }, { status: 200 });
  } catch (error) {
    console.error("エラー:", error);
    return NextResponse.json(
      { message: "保存に失敗しました" },
      { status: 500 }
    );
  }
}
