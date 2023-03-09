-- DropForeignKey
ALTER TABLE "ItemsShoppingCart" DROP CONSTRAINT "ItemsShoppingCart_bookId_fkey";

-- DropForeignKey
ALTER TABLE "ItemsShoppingCart" DROP CONSTRAINT "ItemsShoppingCart_otherProductId_fkey";

-- AlterTable
ALTER TABLE "ItemsShoppingCart" ALTER COLUMN "bookId" DROP NOT NULL,
ALTER COLUMN "otherProductId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ItemsShoppingCart" ADD CONSTRAINT "ItemsShoppingCart_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemsShoppingCart" ADD CONSTRAINT "ItemsShoppingCart_otherProductId_fkey" FOREIGN KEY ("otherProductId") REFERENCES "OtherProduct"("id") ON DELETE SET NULL ON UPDATE CASCADE;
