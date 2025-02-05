'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StaffPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');  // ルートページへリダイレクト
    }, 5000);  // 5秒後

    return () => clearTimeout(timer);  // クリーンアップ
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl font-bold mb-4">準備中です</h1>
      <p className="text-gray-600">5秒後にtopページへ自動遷移します...</p>
    </div>
  );
}
