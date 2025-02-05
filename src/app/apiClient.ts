export const fetchMaterialData = async () => {
	try {
	  const response = await fetch("http://localhost:8000/scrape"); // APIエンドポイント
	  if (!response.ok) {
		throw new Error(`HTTPエラー! ステータス: ${response.status}`);
	  }
	  const data = await response.json();
	  return data;
	} catch (error) {
	  console.error("データ取得エラー:", error);
	  throw error; // エラーハンドリングをフロント側で行う
	}
  };
  