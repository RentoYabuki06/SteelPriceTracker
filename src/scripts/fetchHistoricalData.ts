import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { format, subDays, addDays } from 'date-fns';
import 'dotenv/config';

// Supabaseの設定
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface PriceData {
  date: string;
  material_name: string;
  tokyo_price: string;
  osaka_price: string;
}

async function fetchPriceData(date: Date): Promise<PriceData[]> {
  const formattedDate = format(date, 'yyyyMMdd');
  const url = `http://shuyousoubakouzai.sblo.jp/archives/${formattedDate}-1.html`;
  
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const prices: PriceData[] = [];

    // 記事本文を取得
    const content = $('.article-body-inner').text();
    
    // 行ごとに分割
    const lines = content.split('\n').map(line => line.trim()).filter(Boolean);
    
    let currentMaterial = '';
    let tokyoPrice = '';
    let osakaPrice = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // 材料名の判定（カッコ付きの数字を含む行）
      if (line.includes('SD295A)') || line.includes('ミリ')) {
        // 前の材料のデータがあれば保存
        if (currentMaterial && tokyoPrice) {
          prices.push({
            date: format(date, 'yyyy-MM-dd'),
            material_name: currentMaterial,
            tokyo_price: tokyoPrice,
            osaka_price: osakaPrice
          });
        }
        
        currentMaterial = line;
        tokyoPrice = '';
        osakaPrice = '';
        continue;
      }

      // 「東京」の行を見つけた場合
      if (line === '東京') {
        // 次の行が価格
        const nextLine = lines[i + 1];
        if (nextLine && /^\d{3}-\d{3}$/.test(nextLine)) {
          tokyoPrice = nextLine;
        }
      }

      // 「大阪」の行を見つけた場合
      if (line === '大阪') {
        // 次の行が価格
        const nextLine = lines[i + 1];
        if (nextLine && /^\d{3}-\d{3}$/.test(nextLine)) {
          osakaPrice = nextLine;
        }
      }
    }

    // 最後の材料のデータを保存
    if (currentMaterial && tokyoPrice) {
      prices.push({
        date: format(date, 'yyyy-MM-dd'),
        material_name: currentMaterial,
        tokyo_price: tokyoPrice,
        osaka_price: osakaPrice
      });
    }

    return prices;
  } catch (error) {
    console.error(`Error fetching data for ${formattedDate}:`, error);
    return [];
  }
}

async function main() {
  const endDate = new Date();
  const startDate = subDays(endDate, 365); // 1年前

  for (let date = startDate; date <= endDate; date = addDays(date, 1)) {
    const priceData = await fetchPriceData(date);
    
    if (priceData.length > 0) {
      const { error } = await supabase
        .from('historical_prices')
        .upsert(priceData, {
          onConflict: 'date,material_name'
        });

      if (error) {
        console.error('Error inserting data:', error);
      }
    }

    // レート制限を考慮して少し待機
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

main().catch(console.error); 