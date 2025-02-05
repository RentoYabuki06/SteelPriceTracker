export const fetchMaterials = async () => {
  try {
    const response = await fetch("/api/materials");
    console.log("response", response);
    if (!response.ok) {
      throw new Error("データの取得に失敗しました");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("エラー:", error);
  }
};
