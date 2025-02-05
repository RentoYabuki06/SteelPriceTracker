"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Button,
  Slider,
} from "@mui/material";
import Sidebar from "@/components/Sidebar/Sidebar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fetchMaterials } from "@/models/Materials/service";

// 型定義
interface Price {
  date: string;
  priceMin: number;
  priceMax: number;
  unit: string;
}

interface Material {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date | null;
  typeId: number;
  prices: Price[];
}

const MaterialPriceDisplay: React.FC = () => {
  const router = useRouter();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [filterRange, setFilterRange] = useState(7);
  const [yAxisDomains, setYAxisDomains] = useState<{
    [key: string]: [number, number];
  }>({});

  // データ取得
  useEffect(() => {
    (async () => {
      const data = await fetchMaterials();
      setMaterials(data);
    })();
  }, []);

  // グラフデータ生成
  const generateChartData = (material: Material) => {
    return material.prices.slice(0, filterRange).map((price) => ({
      date: new Date(price.date).toLocaleDateString(),
      avgPrice: (price.priceMin + price.priceMax) / 2,
    }));
  };

  // 最新の価格情報取得
  const getLatestPrice = (material: Material) => {
    if (material.prices.length === 0) return "データなし";
    const latestPrice = material.prices[0]; // 最新の価格は最初の要素と仮定
    return `${new Date(latestPrice.date).toLocaleDateString()} の価格: ${latestPrice.priceMin}-${latestPrice.priceMax} (千円 / ${latestPrice.unit})`;
  };

  return (
    <div className="flex h-screen">
      {/* 左側メニュー */}
      <Sidebar />

      {/* メインコンテンツ */}
      <div className="flex-1 bg-[#f4f4f4] p-4 overflow-y-scroll overflow-x-hidden">
        <Container className="app-container">
          <Typography variant="h4" className="header" gutterBottom>
            材料時系列グラフ
          </Typography>
          <div className="filter-buttons">
            <Button variant="outlined" onClick={() => setFilterRange(7)}>
              1週間
            </Button>
            <Button variant="outlined" onClick={() => setFilterRange(30)}>
              1ヶ月
            </Button>
            <Button variant="outlined" onClick={() => setFilterRange(365)}>
              1年
            </Button>
          </div>
          {materials.map((material) => (
            <div key={material.id} className="chart-container">
              <Typography variant="h6">
                {material.name} の価格推移
                <span
                  style={{
                    marginLeft: "16px",
                    fontSize: "0.8em",
                    color: "#555",
                  }}
                >
                  {getLatestPrice(material)}
                </span>
              </Typography>
              <Slider
                value={yAxisDomains[material.name] || [100, 200]}
                onChange={(e, newValue) =>
                  setYAxisDomains({
                    ...yAxisDomains,
                    [material.name]: newValue as [number, number],
                  })
                }
                valueLabelDisplay="auto"
                min={0}
                max={1500}
                step={50}
              />
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={generateChartData(material)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={yAxisDomains[material.name] || [100, 200]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="avgPrice"
                    stroke="#8884d8"
                    name="平均単価"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ))}
        </Container>
      </div>
    </div>
  );
};

export default MaterialPriceDisplay;
