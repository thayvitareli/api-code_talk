/*
  Warnings:

  - You are about to drop the column `question_id` on the `comments` table. All the data in the column will be lost.
  - The primary key for the `question_technologies_tags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `question_id` on the `question_technologies_tags` table. All the data in the column will be lost.
  - You are about to drop the `questions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `forum_question_id` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forum_question_id` to the `question_technologies_tags` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_question_id_fkey`;

-- DropForeignKey
ALTER TABLE `question_technologies_tags` DROP FOREIGN KEY `question_technologies_tags_question_id_fkey`;

-- DropForeignKey
ALTER TABLE `questions` DROP FOREIGN KEY `questions_user_id_fkey`;

-- DropIndex
DROP INDEX `comments_question_id_fkey` ON `comments`;

-- AlterTable
ALTER TABLE `comments` DROP COLUMN `question_id`,
    ADD COLUMN `forum_question_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `question_technologies_tags` DROP PRIMARY KEY,
    DROP COLUMN `question_id`,
    ADD COLUMN `forum_question_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`forum_question_id`, `technologies_tag_id`);

-- DropTable
DROP TABLE `questions`;

-- CreateTable
CREATE TABLE `forum_questions` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `forum_questions` ADD CONSTRAINT `forum_questions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_forum_question_id_fkey` FOREIGN KEY (`forum_question_id`) REFERENCES `forum_questions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `question_technologies_tags` ADD CONSTRAINT `question_technologies_tags_forum_question_id_fkey` FOREIGN KEY (`forum_question_id`) REFERENCES `forum_questions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
