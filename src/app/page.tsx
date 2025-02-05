'use client'

import Image from "next/image";
import { MaterialCard } from "@/components/MaterialCard";
import type { MaterialData } from "@/types/material";

// サンプルデータ
const sampleData: MaterialData[] = [
  {
    id: "rebar-10mm",
    name: "鉄筋_１０㎜",
    data: [
      { date: '2024-01', price: 120000 },
      { date: '2024-02', price: 125000 },
      { date: '2024-03', price: 123000 },
    ]
  },
  {
    id: "rebar-13mm",
    name: "鉄筋_１３㎜",
    data: [
      { date: '2024-01', price: 118000 },
      { date: '2024-02', price: 122000 },
      { date: '2024-03', price: 120000 },
    ]
  },
  {
    id: "cement",
    name: "セメント",
    data: [
      { date: '2024-01', price: 15000 },
      { date: '2024-02', price: 15500 },
      { date: '2024-03', price: 16000 },
    ]
  }
];

export default function Home() {
  return (
    <div className="min-h-screen p-8 flex flex-col gap-8">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-bold">材料価格トレンド</h1>
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
      </header>

      <main className="flex flex-col gap-8">
        <div className="grid grid-cols-1 gap-6">
          {sampleData.map((material) => (
            <MaterialCard key={material.id} material={material} />
          ))}
        </div>
      </main>

      <footer className="mt-auto py-4 text-center text-sm text-gray-500">
        データ提供: 日本経済新聞・建設資材・相場
      </footer>
    </div>
  );
}
