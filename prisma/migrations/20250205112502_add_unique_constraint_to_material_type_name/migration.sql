/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `MaterialType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MaterialType_name_key" ON "MaterialType"("name");
