-- CreateTable
CREATE TABLE `events` (
    `id` VARCHAR(100) NOT NULL,
    `eventName` TEXT NOT NULL,
    `eventDesc` TEXT NOT NULL,
    `eventStart` DATETIME(3) NOT NULL,
    `eventLastRegister` DATETIME(3) NOT NULL,
    `eventAttendee` INTEGER NOT NULL,
    `userId` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
