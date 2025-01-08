/*
  Warnings:

  - Added the required column `chat_room_id` to the `message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `message` ADD COLUMN `chat_room_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `message` ADD CONSTRAINT `message_chat_room_id_fkey` FOREIGN KEY (`chat_room_id`) REFERENCES `chat_room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
