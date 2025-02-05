import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixDuplicates() {
  // 1. 現在のデータを取得
  const types = await prisma.materialType.findMany();
  
  // 2. 重複を確認
  const nameCount = types.reduce((acc, type) => {
    acc[type.name] = (acc[type.name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // 3. 重複があれば最新のもの以外を削除
  for (const name in nameCount) {
    if (nameCount[name] > 1) {
      const duplicates = await prisma.materialType.findMany({
        where: { name },
        orderBy: { createdAt: 'desc' }
      });
      
      // 最初のレコード以外を削除
      for (let i = 1; i < duplicates.length; i++) {
        await prisma.materialType.delete({
          where: { id: duplicates[i].id }
        });
      }
    }
  }
}

fixDuplicates()
  .catch(console.error)
  .finally(() => prisma.$disconnect()); 