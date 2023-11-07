-- AlterTable
ALTER TABLE "produtos" ADD COLUMN     "produto_imagem" TEXT;

-- CreateTable
CREATE TABLE "pedidos" (
    "id" SERIAL NOT NULL,
    "valor_total" INTEGER NOT NULL,
    "observacao" TEXT,
    "cliente_id" INTEGER NOT NULL,

    CONSTRAINT "pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedido_produtos" (
    "id" SERIAL NOT NULL,
    "quantidade_produto" INTEGER NOT NULL,
    "valor_produto" INTEGER NOT NULL,
    "pedido_id" INTEGER NOT NULL,
    "produto_id" INTEGER NOT NULL,

    CONSTRAINT "pedido_produtos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pedido_produtos" ADD CONSTRAINT "pedido_produtos_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "pedidos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido_produtos" ADD CONSTRAINT "pedido_produtos_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
