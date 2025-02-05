import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as cheerio from 'cheerio';

// スクレイピングで取得したデータの型定義
type ScrapedData = {
  name: string;
  priceMin: number;
  priceMax: number;
  location: string;
  unit: string;
};

// 材料タイプのマッピング
const MATERIAL_TYPE_MAPPING: Record<string, number> = {
  '鉄筋': 1,
  'セメント': 2,
  // 他の材料タイプも追加
};

async function fetchMaterialPrices(): Promise<ScrapedData[]> {
  try {
    const response = await fetch('http://shuyousoubakouzai.sblo.jp/');
    const html = await response.text();
    const $ = cheerio.load(html);
    
    const materials: ScrapedData[] = [];
    
    // ここでスクレイピングロジックを実装
    // 例: テーブルから価格データを抽出
    // 実際のサイト構造に合わせて調整が必要です
    $('.price-table tr').each((_, element) => {
      const name = $(element).find('.material-name').text().trim();
      const priceText = $(element).find('.price').text().trim();
      // 価格テキストから最小・最大価格を抽出（例: "120,000-125,000"）
      const [min, max] = priceText.split('-').map(p => 
        parseFloat(p.replace(/,/g, ''))
      );
      
      if (name && !isNaN(min) && !isNaN(max)) {
        materials.push({
          name,
          priceMin: min,
          priceMax: max,
          location: '東京',  // デフォルト値
          unit: 't',        // デフォルト値
        });
      }
    });

    return materials;
  } catch (error) {
    console.error('Error fetching prices:', error);
    throw error;
  }
}

async function saveMaterialPrices(materials: ScrapedData[]) {
  const date = new Date();
  
  for (const material of materials) {
    // 材料タイプを判定（名前から推測）
    const typeId = MATERIAL_TYPE_MAPPING[
      Object.keys(MATERIAL_TYPE_MAPPING).find(type => 
        material.name.includes(type)
      ) || '其他'
    ];

    // 材料の取得または作成
    const materialRecord = await prisma.material.upsert({
      where: {
        name: material.name,
      },
      create: {
        name: material.name,
        typeId,
      },
      update: {},
    });

    // 価格データの保存
    await prisma.materialPrice.create({
      data: {
        materialId: materialRecord.id,
        priceMin: material.priceMin,
        priceMax: material.priceMax,
        location: material.location,
        unit: material.unit,
        date,
      },
    });
  }
}

export async function GET(request: Request) {
  try {
    // 認証チェック
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // データ取得
    const materials = await fetchMaterialPrices();
    
    // データベースに保存
    await saveMaterialPrices(materials);

    return NextResponse.json({ 
      success: true, 
      message: 'Prices fetched and stored successfully',
      timestamp: new Date().toISOString(),
      count: materials.length
    });

  } catch (error) {
    console.error('Cron job failed:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch and store prices' 
    }, { status: 500 });
  }
}