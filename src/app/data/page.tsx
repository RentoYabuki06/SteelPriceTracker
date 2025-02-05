"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Sidebar from "@/components/Sidebar/Sidebar"
import { fetchMaterials } from "@/models/Materials/service";
import { Material } from "@prisma/client";

const MaterialDataPage: React.FC = () => {
  const router = useRouter();
  const [materials, setMaterials] = useState<Material[]>([]);

  console.log("materials", materials);

  useEffect(() => {
    (async () => {
      const data = await fetchMaterials();
      setMaterials(data);
    })();
  }, []);

  return (
    <div className="flex h-screen">
      {/* 左側メニュー */}
      <Sidebar />

      {/* メインコンテンツ */}
      <main className="flex-1 bg-[#f4f4f4] p-4 overflow-y-scroll overflow-x-hidden">
        <Container className="app-container">
          <Typography variant="h4" className="header" gutterBottom>
            材料データ一覧
          </Typography>
          <TableContainer component={Paper} className="table-container">
            <Table>
              <TableHead className="table-head">
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>材料名</TableCell>
                  <TableCell>最小単価</TableCell>
                  <TableCell>最大単価</TableCell>
                  <TableCell>単位</TableCell>
                  <TableCell>取得日時</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {materials.map((material) =>
                  material.prices.map((price: any, index: number) => (
                    <TableRow key={`${material.id}-${index}`} className="table-row">
                      <TableCell>{material.id}</TableCell>
                      <TableCell>{material.name}</TableCell>
                      <TableCell>{price.priceMin.toFixed(0)}</TableCell>
                      <TableCell>{price.priceMax.toFixed(0)}</TableCell>
                      <TableCell>{price.unit}</TableCell>
                      <TableCell>{new Date(price.date).toLocaleString()}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>

            </Table>
          </TableContainer>
        </Container>
      </main>
    </div>
  );
};

export default MaterialDataPage;
