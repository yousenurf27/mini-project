/*
  Warnings:

  - You are about to drop the `authentications` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `token` TEXT NULL;

-- DropTable
DROP TABLE `authentications`;
