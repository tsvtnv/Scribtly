-- AlterTable
ALTER TABLE "LinkedInAccount" ADD COLUMN     "email" TEXT,
ADD COLUMN     "linkedinPublicId" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "premium" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "proxyCountry" TEXT;
