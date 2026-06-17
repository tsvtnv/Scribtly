-- CreateEnum
CREATE TYPE "LinkedInAccountStatus" AS ENUM ('ACTIVE', 'DISCONNECTED', 'RECONNECTING');

-- CreateEnum
CREATE TYPE "CampaignStatus" AS ENUM ('DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "CampaignType" AS ENUM ('CONNECT_NOTE', 'CONNECT', 'FIRST_DEGREE');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'ENRICHED', 'QUEUED', 'PENDING_APPROVAL', 'CONTACTED', 'ACCEPTED', 'REPLIED', 'SKIPPED', 'BOUNCED');

-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('CONNECTION_NOTE', 'FOLLOWUP', 'AUTOBOOK');

-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('PENDING_APPROVAL', 'APPROVED', 'SENT', 'FAILED');

-- CreateEnum
CREATE TYPE "MessageDirection" AS ENUM ('INBOUND', 'OUTBOUND');

-- CreateEnum
CREATE TYPE "AutomationTaskType" AS ENUM ('ENRICH_LEAD', 'SCORE_LEAD', 'SEND_MESSAGE', 'SYNC_INBOX', 'RESET_DAILY_LIMITS');

-- CreateEnum
CREATE TYPE "AutomationTaskStatus" AS ENUM ('EXECUTING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT,
    "avatarUrl" TEXT,
    "workspaceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workspace" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT,
    "allowDuplicateLeads" BOOLEAN NOT NULL DEFAULT true,
    "skipLowIcpLeads" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Workspace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LinkedInAccount" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "unipileAccountId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "headline" TEXT,
    "status" "LinkedInAccountStatus" NOT NULL DEFAULT 'ACTIVE',
    "dailyConnLimit" INTEGER NOT NULL DEFAULT 25,
    "dailyMsgLimit" INTEGER NOT NULL DEFAULT 50,
    "connSentToday" INTEGER NOT NULL DEFAULT 0,
    "msgSentToday" INTEGER NOT NULL DEFAULT 0,
    "limitsResetAt" TIMESTAMP(3) NOT NULL,
    "lastSyncAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LinkedInAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "linkedInAccountId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "CampaignStatus" NOT NULL DEFAULT 'DRAFT',
    "type" "CampaignType" NOT NULL DEFAULT 'CONNECT_NOTE',
    "positioningText" TEXT,
    "connectionNoteTemplate" TEXT,
    "requireApproval" BOOLEAN NOT NULL DEFAULT true,
    "followUpsEnabled" BOOLEAN NOT NULL DEFAULT false,
    "followUpCount" INTEGER NOT NULL DEFAULT 1,
    "followUpDelayDays" INTEGER NOT NULL DEFAULT 3,
    "followUpTemplate" TEXT,
    "autoBookEnabled" BOOLEAN NOT NULL DEFAULT false,
    "autoBookCtaLink" TEXT,
    "autoBookReplyTemplate" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "linkedInProfileId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "headline" TEXT,
    "company" TEXT,
    "location" TEXT,
    "avatarUrl" TEXT,
    "profileUrl" TEXT NOT NULL,
    "icpScore" INTEGER,
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "contactedAt" TIMESTAMP(3),
    "acceptedAt" TIMESTAMP(3),
    "repliedAt" TIMESTAMP(3),
    "enrichedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "type" "MessageType" NOT NULL,
    "content" TEXT NOT NULL,
    "status" "MessageStatus" NOT NULL DEFAULT 'PENDING_APPROVAL',
    "unipileMessageId" TEXT,
    "sentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conversation" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "unipileThreadId" TEXT NOT NULL,
    "lastMessageAt" TIMESTAMP(3),
    "lastMessagePreview" TEXT,
    "hasUnread" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConversationMessage" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "direction" "MessageDirection" NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL,
    "unipileMessageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConversationMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AutomationLog" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "taskType" "AutomationTaskType" NOT NULL,
    "status" "AutomationTaskStatus" NOT NULL,
    "result" TEXT,
    "metadata" JSONB,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "AutomationLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "campaignId" TEXT,
    "leadId" TEXT,
    "type" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_workspaceId_idx" ON "User"("workspaceId");

-- CreateIndex
CREATE UNIQUE INDEX "Workspace_slug_key" ON "Workspace"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "LinkedInAccount_unipileAccountId_key" ON "LinkedInAccount"("unipileAccountId");

-- CreateIndex
CREATE INDEX "LinkedInAccount_workspaceId_idx" ON "LinkedInAccount"("workspaceId");

-- CreateIndex
CREATE INDEX "Campaign_workspaceId_status_idx" ON "Campaign"("workspaceId", "status");

-- CreateIndex
CREATE INDEX "Lead_campaignId_status_idx" ON "Lead"("campaignId", "status");

-- CreateIndex
CREATE INDEX "Lead_workspaceId_idx" ON "Lead"("workspaceId");

-- CreateIndex
CREATE UNIQUE INDEX "Lead_campaignId_linkedInProfileId_key" ON "Lead"("campaignId", "linkedInProfileId");

-- CreateIndex
CREATE INDEX "Message_campaignId_status_idx" ON "Message"("campaignId", "status");

-- CreateIndex
CREATE INDEX "Message_leadId_idx" ON "Message"("leadId");

-- CreateIndex
CREATE UNIQUE INDEX "Conversation_leadId_key" ON "Conversation"("leadId");

-- CreateIndex
CREATE UNIQUE INDEX "Conversation_unipileThreadId_key" ON "Conversation"("unipileThreadId");

-- CreateIndex
CREATE UNIQUE INDEX "ConversationMessage_unipileMessageId_key" ON "ConversationMessage"("unipileMessageId");

-- CreateIndex
CREATE INDEX "ConversationMessage_conversationId_sentAt_idx" ON "ConversationMessage"("conversationId", "sentAt");

-- CreateIndex
CREATE INDEX "AutomationLog_workspaceId_startedAt_idx" ON "AutomationLog"("workspaceId", "startedAt");

-- CreateIndex
CREATE INDEX "Event_workspaceId_createdAt_idx" ON "Event"("workspaceId", "createdAt");

-- CreateIndex
CREATE INDEX "Event_campaignId_createdAt_idx" ON "Event"("campaignId", "createdAt");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkedInAccount" ADD CONSTRAINT "LinkedInAccount_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_linkedInAccountId_fkey" FOREIGN KEY ("linkedInAccountId") REFERENCES "LinkedInAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConversationMessage" ADD CONSTRAINT "ConversationMessage_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AutomationLog" ADD CONSTRAINT "AutomationLog_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;
