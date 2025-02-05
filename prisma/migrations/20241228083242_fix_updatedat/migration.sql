-- AlterTable
ALTER TABLE "Material" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "MaterialItem" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "MaterialType" ALTER COLUMN "updatedAt" DROP NOT NULL;
