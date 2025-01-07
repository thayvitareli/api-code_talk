/*
  Warnings:

  - The primary key for the `chat_room` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `message` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user_chat_room_subscribe` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `message_sent_by_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_chat_room_subscribe` DROP FOREIGN KEY `user_chat_room_subscribe_chat_room_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_chat_room_subscribe` DROP FOREIGN KEY `user_chat_room_subscribe_user_id_fkey`;

-- DropIndex
DROP INDEX `message_sent_by_user_id_fkey` ON `message`;

-- DropIndex
DROP INDEX `user_chat_room_subscribe_user_id_fkey` ON `user_chat_room_subscribe`;

-- AlterTable
ALTER TABLE `chat_room` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `message` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `sent_by_user_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user_chat_room_subscribe` DROP PRIMARY KEY,
    MODIFY `user_id` VARCHAR(191) NOT NULL,
    MODIFY `chat_room_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`chat_room_id`, `user_id`);

-- AddForeignKey
ALTER TABLE `user_chat_room_subscribe` ADD CONSTRAINT `user_chat_room_subscribe_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_chat_room_subscribe` ADD CONSTRAINT `user_chat_room_subscribe_chat_room_id_fkey` FOREIGN KEY (`chat_room_id`) REFERENCES `chat_room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `message` ADD CONSTRAINT `message_sent_by_user_id_fkey` FOREIGN KEY (`sent_by_user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
