/*
  Warnings:

  - You are about to drop the column `name` on the `events` table. All the data in the column will be lost.
  - Added the required column `image` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `events` DROP COLUMN `name`,
    ADD COLUMN `image` TEXT NOT NULL,
    ADD COLUMN `location` VARCHAR(100) NOT NULL,
    ADD COLUMN `price` INTEGER NOT NULL,
    ADD COLUMN `title` TEXT NOT NULL,
    ADD COLUMN `type` VARCHAR(50) NOT NULL;
