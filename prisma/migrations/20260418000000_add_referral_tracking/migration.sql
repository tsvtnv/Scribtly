-- CreateEnum
CREATE TYPE "ContactMethod" AS ENUM ('RESEND_EMAIL', 'WEBSITE_FORM', 'MANUAL');

-- CreateEnum
CREATE TYPE "OutreachStatus" AS ENUM ('NOT_CONTACTED', 'CONTACTED_VIA_FORM', 'CONTACTED_VIA_EMAIL', 'SKIPPED_DUPLICATE', 'SKIPPED_NO_CONTACT_METHOD', 'SKIPPED_NOT_RELEVANT', 'SKIPPED_POLICY_BLOCKS_OUTREACH', 'NEEDS_MANUAL_REVIEW', 'FAILED');

-- CreateTable
CREATE TABLE "ReferralLead" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "agencyName" TEXT NOT NULL,
    "agencyWebsite" TEXT,
    "agencyLocation" TEXT,
    "agencyServices" TEXT,
    "fitScore" INTEGER,
    "contactedAt" TIMESTAMP(3),
    "contactMethod" "ContactMethod",
    "contactFormUrl" TEXT,
    "contactFormConfirmation" TEXT,
    "resendMessageId" TEXT,
    "messageSubject" TEXT,
    "messageBody" TEXT,
    "sourceSearchQuery" TEXT,
    "sourceResultUrl" TEXT,
    "emailDelivered" BOOLEAN NOT NULL DEFAULT false,
    "emailBounced" BOOLEAN NOT NULL DEFAULT false,
    "emailOpenedAt" TIMESTAMP(3),
    "emailClickedAt" TIMESTAMP(3),
    "firstVisitAt" TIMESTAMP(3),
    "lastVisitAt" TIMESTAMP(3),
    "totalVisits" INTEGER NOT NULL DEFAULT 0,
    "totalTimeOnSiteSeconds" INTEGER NOT NULL DEFAULT 0,
    "ipAddress" TEXT,
    "country" TEXT,
    "city" TEXT,
    "region" TEXT,
    "userAgent" TEXT,
    "browser" TEXT,
    "os" TEXT,
    "deviceType" TEXT,
    "signupFormStartedAt" TIMESTAMP(3),
    "signupFormAbandonedAt" TIMESTAMP(3),
    "signupFormLastField" TEXT,
    "signupFormTimeSeconds" INTEGER,
    "signedUp" BOOLEAN NOT NULL DEFAULT false,
    "signedUpAt" TIMESTAMP(3),
    "clerkUserId" TEXT,
    "workspaceId" TEXT,
    "onboardingStartedAt" TIMESTAMP(3),
    "onboardingCompletedAt" TIMESTAMP(3),
    "onboardingStepsJson" TEXT,
    "outreachStatus" "OutreachStatus" NOT NULL DEFAULT 'NOT_CONTACTED',
    "optedOut" BOOLEAN NOT NULL DEFAULT false,
    "optedOutAt" TIMESTAMP(3),
    "notes" TEXT,

    CONSTRAINT "ReferralLead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReferralEvent" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eventType" TEXT NOT NULL,
    "page" TEXT,
    "metadata" TEXT,

    CONSTRAINT "ReferralEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReferralLead_leadId_key" ON "ReferralLead"("leadId");

-- AddForeignKey
ALTER TABLE "ReferralEvent" ADD CONSTRAINT "ReferralEvent_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "ReferralLead"("leadId") ON DELETE RESTRICT ON UPDATE CASCADE;
