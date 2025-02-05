import { useState, useEffect } from 'react';
import type { MaterialData, MaterialPriceResponse } from '@/types/material';

export function useMaterialPrices() {
  const [materials, setMaterials] = useState<MaterialData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const response = await fetch('/api/prices');
        const data = await response.json() as MaterialPriceResponse;
        
        // 型安全な変換処理
        const formattedData: MaterialData[] = data.materials.map((material) => ({
          id: material.id.toString(),
          name: material.name,
          data: material.prices.map((price) => ({
            date: price.date.split('T')[0],
            price: price.priceMin // または (price.priceMin + price.priceMax) / 2 で平均値を使用
          }))
        }));

        setMaterials(formattedData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch prices'));
      } finally {
        setLoading(false);
      }
    }

    fetchPrices();
  }, []);

  return { materials, loading, error };
} 