import * as cheerio from "cheerio";
import { Material } from "@prisma/client";
import { MaterialPriceInput } from "./type";
import { MaterialPatterns } from "./const";

const padZero = (num: number): string => {
  return num.toString().padStart(2, "0");
};

// 材料名を正規表現パターンに変換する関数
const createMaterialPattern = (name: string): string => {
  // 定義済みのパターンがある場合はそれを使用
  if (MaterialPatterns[name]) {
    return MaterialPatterns[name];
  }

  // 定義済みパターンがない場合は一般的なエスケープ処理
  return name
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .replace(/×/g, "(?:×|x)")
    .replace(/\s+/g, "[\\s　]*")
    .replace(/ミリ/g, "(?:ミリ|mm)?");
};

export const getMaterialPriceFormScraping = async (p: {
  materials: Material[];
  targetDate: Date;
}) => {
  const { materials, targetDate } = p;

  const url = `http://shuyousoubakouzai.sblo.jp/archives/${targetDate.getFullYear()}${padZero(
    targetDate.getMonth() + 1
  )}${padZero(targetDate.getDate())}-1.html`;

  const response = await fetch(url, {
    headers: {
      "Accept-Charset": "utf-8",
      "Accept-Language": "ja",
    },
  });

  const buffer = await response.arrayBuffer();
  const decoder = new TextDecoder("shift-jis");
  const html = decoder.decode(buffer);
  const $ = cheerio.load(html);

  const content = $(".text")
    .text()
    .replace(/\(adsbygoogle.*?\)\;/g, "")
    .replace(/[\s　]+/g, " ")
    .trim();

  if (!content) {
    console.log("content is empty");
    return [];
  }

  const items: MaterialPriceInput[] = [];

  for (const material of materials) {
    const pattern = createMaterialPattern(material.name);

    const regex = new RegExp(`${pattern}\\s*東京\\s*(\\d{2,3}-\\d{2,3})`, "i");
    const match = content.match(regex);

    if (match) {
      const [minPrice, maxPrice] = match[1].split("-").map(Number);
      items.push({
        priceMin: minPrice,
        priceMax: maxPrice,
        location: "東京",
        date: new Date(targetDate.setHours(0, 0, 0, 0)),
        unit: "t",
        materialId: material.id,
      });
    }
  }

  return items;
};
