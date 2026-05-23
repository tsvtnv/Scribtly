-- DropForeignKey
ALTER TABLE "ReferralEvent" DROP CONSTRAINT "ReferralEvent_leadId_fkey";

-- AlterTable
ALTER TABLE "ReferralLead" DROP COLUMN "onboardingStepsJson",
ADD COLUMN     "onboardingStepsJson" JSONB;

-- CreateIndex
CREATE INDEX "ReferralEvent_leadId_createdAt_idx" ON "ReferralEvent"("leadId", "createdAt");

-- CreateIndex
CREATE INDEX "ReferralLead_outreachStatus_idx" ON "ReferralLead"("outreachStatus");

-- CreateIndex
CREATE INDEX "ReferralLead_resendMessageId_idx" ON "ReferralLead"("resendMessageId");

-- CreateIndex
CREATE INDEX "ReferralLead_signedUp_idx" ON "ReferralLead"("signedUp");

-- CreateIndex
CREATE INDEX "Workspace_emailOptOut_onboardingCompleted_idx" ON "Workspace"("emailOptOut", "onboardingCompleted");

-- AddForeignKey
ALTER TABLE "ReferralEvent" ADD CONSTRAINT "ReferralEvent_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "ReferralLead"("leadId") ON DELETE CASCADE ON UPDATE CASCADE;

