/*
  Warnings:

  - Added the required column `expAt` to the `vouchers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `vouchers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `vouchers` ADD COLUMN `discount` INTEGER NULL,
    ADD COLUMN `expAt` DATETIME(3) NOT NULL,
    ADD COLUMN `type` VARCHAR(50) NOT NULL,
    MODIFY `points` INTEGER NULL;
