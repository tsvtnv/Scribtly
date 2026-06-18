-- AlterTable
ALTER TABLE "LinkedInAccount" ADD COLUMN     "sendIntervalMinutes" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "sendJitterMinutes" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "sendWindowEnd" INTEGER NOT NULL DEFAULT 17,
ADD COLUMN     "sendWindowStart" INTEGER NOT NULL DEFAULT 9,
ADD COLUMN     "timezone" TEXT NOT NULL DEFAULT 'Europe/London';

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "scheduledFor" TIMESTAMP(3);
