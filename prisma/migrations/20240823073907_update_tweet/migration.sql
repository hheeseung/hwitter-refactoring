/*
  Warnings:

  - You are about to drop the column `profileImg` on the `tweet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `tweet` DROP COLUMN `profileImg`,
    ADD COLUMN `image` VARCHAR(191) NULL;
