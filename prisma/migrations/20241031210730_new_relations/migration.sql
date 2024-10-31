-- DropForeignKey
ALTER TABLE `Payment` DROP FOREIGN KEY `Payment_productId_fkey`;

-- AlterTable
ALTER TABLE `Payment` MODIFY `productId` INTEGER NULL,
    MODIFY `productQuantity` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
