-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "shopId" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "History_productId_idx" ON "History"("productId");

-- CreateIndex
CREATE INDEX "History_shopId_idx" ON "History"("shopId");

-- CreateIndex
CREATE INDEX "History_createdAt_idx" ON "History"("createdAt");
