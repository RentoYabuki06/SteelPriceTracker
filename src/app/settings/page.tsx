"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Container, Typography, Button } from "@mui/material";

const SettingsPage: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(10);
  const jokes = [
    "このページはAIが夜更かしして作っています...😴",
    "準備中。コンピューターは再起動を試みています🔧。",
    "404じゃないよ！でもまだ準備中だよ🐢。",
  ];

  const getRandomJoke = () => jokes[Math.floor(Math.random() * jokes.length)];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex h-screen">
      {/* 左側メニュー */}
      <Sidebar />

      {/* メインコンテンツ */}
      <div className="flex-1 bg-[#f4f4f4] p-4 overflow-y-scroll overflow-x-hidden">
        <Container className="app-container">
          <Typography variant="h4" className="header" gutterBottom>
            🚀 ページ準備中...
          </Typography>
          <Typography variant="body1" style={{ marginTop: "10px" }}>
            新機能がここに登場予定！お楽しみに 🎉
          </Typography>

          <Typography variant="h6" style={{ marginTop: "20px" }}>
            {getRandomJoke()}
          </Typography>

          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => alert('準備中でもクリックありがとう！😄')}
            >
              押してみて！
            </Button>
          </div>
        </Container>
      </div>

      <style jsx>{`
        .loader {
          border: 8px solid #f3f3f3;
          border-top: 8px solid #1976d2;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SettingsPage;
