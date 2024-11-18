/*
  Warnings:

  - Added the required column `cpf` to the `PaymentDeliveryAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceId` to the `PaymentDeliveryAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `PaymentDeliveryAddress` ADD COLUMN `complement` VARCHAR(191) NULL,
    ADD COLUMN `cpf` VARCHAR(191) NOT NULL,
    ADD COLUMN `number` VARCHAR(191) NULL,
    ADD COLUMN `serviceId` VARCHAR(191) NOT NULL;
