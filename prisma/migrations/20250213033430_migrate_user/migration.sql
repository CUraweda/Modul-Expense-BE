/*
  Warnings:

  - You are about to drop the column `userId` on the `kategoriuser` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `kategoriuser` DROP FOREIGN KEY `KategoriUser_userId_fkey`;

-- AlterTable
ALTER TABLE `kategoriuser` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `kategoriUserId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_kategoriUserId_fkey` FOREIGN KEY (`kategoriUserId`) REFERENCES `KategoriUser`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
