-- AlterTable
ALTER TABLE `PaymentProduct` ADD COLUMN `variantId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `subCategoryId` INTEGER NULL;

-- CreateTable
CREATE TABLE `SubCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `imageUrl` VARCHAR(191) NULL,
    `categoryId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_subCategoryId_fkey` FOREIGN KEY (`subCategoryId`) REFERENCES `SubCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubCategory` ADD CONSTRAINT `SubCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PaymentProduct` ADD CONSTRAINT `PaymentProduct_variantId_fkey` FOREIGN KEY (`variantId`) REFERENCES `ProductVariantValue`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
