/*
  Warnings:

  - Added the required column `cep` to the `clientes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantidade_estoque` to the `produtos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clientes" ADD COLUMN     "cep" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "produtos" ADD COLUMN     "quantidade_estoque" INTEGER NOT NULL;
