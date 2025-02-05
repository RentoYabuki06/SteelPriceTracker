'use client';

import React, { useEffect, useState } from 'react';

const Page = () => {
  const [debugMessage, setDebugMessage] = useState<string>('デバッグ開始: サーバー接続確認中...');

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await fetch('http://localhost:8000/scrape');
        if (response.ok) {
          setDebugMessage('サーバー接続成功: データ取得に成功しました。');
        } else {
          setDebugMessage(`サーバー接続エラー: ステータスコード ${response.status}`);
        }
      } catch (error) {
        setDebugMessage('サーバー接続失敗: ネットワークエラーまたはサーバーが停止しています。');
        console.error('デバッグエラー:', error);
      }
    };

    checkServerStatus();
  }, []);

  return (
    <div>
      <h1>デバッグ情報</h1>
      <p>{debugMessage}</p>
    </div>
  );
};

export default Page;
