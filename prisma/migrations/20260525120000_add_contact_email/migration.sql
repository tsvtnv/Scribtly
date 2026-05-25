ALTER TABLE "ReferralLead" ADD COLUMN "contactEmail" TEXT;
ALTER TABLE "ReferralLead" ADD COLUMN "emailProvider" TEXT;
ALTER TABLE "ReferralLead" ADD COLUMN "emailValidMx" BOOLEAN;
CREATE INDEX "ReferralLead_contactEmail_idx" ON "ReferralLead"("contactEmail");
