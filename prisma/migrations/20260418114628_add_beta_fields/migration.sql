-- AlterTable
ALTER TABLE "ReferralLead" ADD COLUMN     "isBetaOffer" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "betaExpiresAt" TIMESTAMP(3),
ADD COLUMN     "betaWarningEmailSentAt" TIMESTAMP(3),
ADD COLUMN     "isBetaTester" BOOLEAN NOT NULL DEFAULT false;
