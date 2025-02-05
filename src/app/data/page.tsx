'use client'
import { prisma } from '@/lib/prisma';
import { Material, MaterialPrice } from '@prisma/client';

type MaterialWithRelations = Material & {
  type: { name: string };
  prices: MaterialPrice[];
};

async function getMaterialData() {
  try {
    const materials = await prisma.material.findMany({
      include: {
        type: true,
        prices: {
          orderBy: {
            date: 'desc'
          }
        }
      }
    });
    return materials;
  } catch (error) {
    console.error('Error fetching material data:', error);
    return [];
  }
}

export default async function DataPage() {
  const materials = await getMaterialData();

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">材料データ一覧</h1>
      
      <div className="grid gap-6">
        {materials.map((material: MaterialWithRelations) => (
          <div 
            key={material.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold">{material.name}</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  種類: {material.type.name}
                </p>
              </div>
              <span className="text-sm text-gray-500">
                ID: {material.id}
              </span>
            </div>

            {material.prices.length > 0 ? (
              <div className="space-y-2">
                <h3 className="font-medium">価格履歴</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left">日付</th>
                        <th className="px-4 py-2 text-right">最小価格</th>
                        <th className="px-4 py-2 text-right">最大価格</th>
                        <th className="px-4 py-2 text-left">単位</th>
                        <th className="px-4 py-2 text-left">場所</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {material.prices.map((price) => (
                        <tr key={price.id}>
                          <td className="px-4 py-2">
                            {new Date(price.date).toLocaleDateString('ja-JP')}
                          </td>
                          <td className="px-4 py-2 text-right">
                            ¥{price.priceMin.toLocaleString()}
                          </td>
                          <td className="px-4 py-2 text-right">
                            ¥{price.priceMax.toLocaleString()}
                          </td>
                          <td className="px-4 py-2">{price.unit}</td>
                          <td className="px-4 py-2">{price.location}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 italic">価格データがありません</p>
            )}

            <div className="mt-4 text-sm text-gray-500">
              <p>作成日: {new Date(material.createdAt).toLocaleString('ja-JP')}</p>
              {material.updatedAt && (
                <p>更新日: {new Date(material.updatedAt).toLocaleString('ja-JP')}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {materials.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          データが登録されていません
        </p>
      )}
    </div>
  );
}
