-- CreateTable
CREATE TABLE `events` (
    `id` VARCHAR(100) NOT NULL,
    `name` TEXT NOT NULL,
    `desc` TEXT NOT NULL,
    `start` DATETIME(3) NOT NULL,
    `lastRegister` DATETIME(3) NOT NULL,
    `attendee` INTEGER NOT NULL,
    `userId` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
