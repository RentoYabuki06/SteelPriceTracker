"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Container, Typography, Button } from "@mui/material";

const StaffPage: React.FC = () => {
  const [quote, setQuote] = useState<string>(
    "働くことは楽しい！でも、休憩も大事ですよ☕"
  );

  const quotes = [
    "一緒に未来を築きましょう！🚀",
    "休憩中も成長しています📈",
    "働くあなたが輝いています✨",
    "AIもがんばってます！あなたも負けずに🏃‍♂️",
  ];

  const handleChangeQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  return (
    <div className="flex h-screen">
      {/* 左側メニュー */}
      <Sidebar />

      {/* メインコンテンツ */}
      <div className="flex-1 bg-[#f4f4f4] p-4 overflow-y-scroll overflow-x-hidden">
        <Container className="app-container">
          <Typography variant="h4" className="header" gutterBottom>
            🎉 人件費管理ページ準備中！
          </Typography>
          <Typography variant="body1" style={{ marginTop: "10px" }}>
            {quote}
          </Typography>
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleChangeQuote}
            >
              他のメッセージを見る
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default StaffPage;
