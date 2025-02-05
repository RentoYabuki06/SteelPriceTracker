import { MaterialPriceChart } from './MaterialPriceChart';

type MaterialCardProps = {
  material: {
    id: string;
    name: string;
    data: {
      date: string;
      price: number;
    }[];
  };
};

export function MaterialCard({ material }: MaterialCardProps) {
  return (
    <div 
      className="p-6 rounded-lg border border-gray-200 dark:border-gray-800"
    >
      <h2 className="text-lg font-semibold mb-4">{material.name}</h2>
      <MaterialPriceChart data={material.data} />
    </div>
  );
} 