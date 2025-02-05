import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // MaterialTypeの初期データを作成
  const materialTypes = [
    { name: '鉄筋' },
    { name: 'セメント' },
    { name: '砂利' },
    { name: '砂' },
    // 必要に応じて追加
  ];

  for (const type of materialTypes) {
    await prisma.materialType.upsert({
      where: { name: type.name },
      update: {},
      create: { name: type.name },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 