-- DropForeignKey
ALTER TABLE "produtos" DROP CONSTRAINT "produtos_categoria_id_fkey";

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE CASCADE ON UPDATE CASCADE;
