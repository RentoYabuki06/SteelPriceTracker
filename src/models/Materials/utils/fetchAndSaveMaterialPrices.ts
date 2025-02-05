import { prisma } from "@/lib/prisma";
import { getMaterialPriceFormScraping } from "../scraping";

/**
 * 材料の価格を取得してデータベースに保存する
 * @param startDate 開始日
 * @param endDate 終了日
 * @returns 成功したかどうか
 */
export const fetchAndSaveMaterialPrices = async (
  startDate: Date,
  endDate: Date
) => {
  // 材料一覧の取得
  const materials = await prisma.material.findMany();
  const materialPrices = await prisma.materialPrice.findMany();

  // 日付の範囲を生成
  const dates: Date[] = [];
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  try {
    // 各日付に対してスクレイピングを実行
    for (const date of dates) {
      // APIの負荷を考慮して少し待機
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(`🐥 ${date.toLocaleDateString("ja-JP")} の価格を取得中...`);

      const existingItems = materialPrices.filter(
        (price) =>
          new Date(price.date).toLocaleDateString("ja-JP") ===
          new Date(date).toLocaleDateString("ja-JP")
      );

      if (existingItems.length > 0) {
        console.log(
          `🚫 ${date.toLocaleDateString("ja-JP")} のデータは既に存在します`
        );
        continue;
      }

      const prices = await getMaterialPriceFormScraping({
        materials,
        targetDate: date,
      });

      if (prices.length > 0) {
        // 同じ日付のデータが存在するかチェック
        // 取得したデータをデータベースに保存
        await prisma.materialPrice.createMany({
          data: prices,
          skipDuplicates: true, // 同じ日付・材料の組み合わせは重複させない
        });

        console.log(
          `✅ ${date.toLocaleDateString("ja-JP")} のデータを保存しました`
        );
      }
    }

    await prisma.$disconnect();
    console.log("データの取得と保存が完了しました");
    return { success: true, message: "データの取得と保存が完了しました" };
  } catch (error) {
    console.error("データ取得・保存エラー:", error);
    return { success: false, message: "データの取得または保存に失敗しました" };
  }
};
