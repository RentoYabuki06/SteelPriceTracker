import { NextRequest, NextResponse } from "next/server";
import { fetchAndSaveMaterialPrices } from "@/models/Materials/utils/fetchAndSaveMaterialPrices";

/**
 * 一週間の材料価格データを取得して保存するAPI
 * @param request
 * @returns
 */
export async function GET(request: NextRequest) {
  try {
    console.log("材料価格データの取得を開始します...");

    // 1週間前の日付を計算
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7);

    const result = await fetchAndSaveMaterialPrices(startDate, endDate);

    if (result.success) {
      return NextResponse.json({
        message: "データの取得と保存が完了しました",
        startDate,
        endDate,
      });
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error("スクレイピングエラー:", error);
    return NextResponse.json(
      { error: "データの取得に失敗しました" },
      { status: 500 }
    );
  }
}
