/*
  Warnings:

  - A unique constraint covering the columns `[alias]` on the table `Credential` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `alias` to the `Credential` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Credential` ADD COLUMN `alias` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Credential_alias_key` ON `Credential`(`alias`);
