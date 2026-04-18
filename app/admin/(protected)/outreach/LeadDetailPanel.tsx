"use client";

import type { SerializedLead } from "./page";

export function LeadDetailPanel({ lead }: { lead: SerializedLead }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 text-sm space-y-4 border border-gray-200 dark:border-gray-700 mt-2">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Detail label="Agency" value={lead.agencyName} />
        <Detail label="Website" value={lead.agencyWebsite} link />
        <Detail label="Location" value={lead.agencyLocation} />
        <Detail label="Fit Score" value={lead.fitScore ? `${lead.fitScore}/5` : null} />
        <Detail label="Services" value={lead.agencyServices} />
        <Detail label="Source Query" value={lead.sourceSearchQuery} />
        <Detail label="IP" value={lead.ipAddress} />
        <Detail label="Geo" value={[lead.city, lead.country].filter(Boolean).join(", ") || null} />
        <Detail label="Browser" value={lead.browser} />
        <Detail label="OS" value={lead.os} />
        <Detail label="Device" value={lead.deviceType} />
        <Detail label="User Agent" value={lead.userAgent} mono />
      </div>

      <hr className="border-gray-200 dark:border-gray-700" />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Detail label="Contact Method" value={lead.contactMethod} />
        <Detail label="Contacted At" value={lead.contactedAt ? new Date(lead.contactedAt).toLocaleString() : null} />
        <Detail label="Resend ID" value={lead.resendMessageId} mono />
        <Detail label="Email Delivered" value={lead.emailDelivered ? "Yes" : "No"} />
        <Detail label="Email Bounced" value={lead.emailBounced ? "Yes" : "No"} />
        <Detail label="Email Opened" value={lead.emailOpenedAt ? new Date(lead.emailOpenedAt).toLocaleString() : "No"} />
        <Detail label="Email Clicked" value={lead.emailClickedAt ? new Date(lead.emailClickedAt).toLocaleString() : "No"} />
        <Detail label="Form URL" value={lead.contactFormUrl} link />
        <Detail label="Form Confirmation" value={lead.contactFormConfirmation} />
      </div>

      {lead.messageSubject && (
        <>
          <hr className="border-gray-200 dark:border-gray-700" />
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Message Sent</p>
            <p className="font-medium mb-2">{lead.messageSubject}</p>
            <pre className="whitespace-pre-wrap text-xs bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
              {lead.messageBody}
            </pre>
          </div>
        </>
      )}

      <hr className="border-gray-200 dark:border-gray-700" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Detail label="First Visit" value={lead.firstVisitAt ? new Date(lead.firstVisitAt).toLocaleString() : null} />
        <Detail label="Last Visit" value={lead.lastVisitAt ? new Date(lead.lastVisitAt).toLocaleString() : null} />
        <Detail label="Total Visits" value={String(lead.totalVisits)} />
        <Detail label="Time on Site" value={`${lead.totalTimeOnSiteSeconds}s`} />
        <Detail label="Form Started" value={lead.signupFormStartedAt ? new Date(lead.signupFormStartedAt).toLocaleString() : null} />
        <Detail label="Form Abandoned" value={lead.signupFormAbandonedAt ? new Date(lead.signupFormAbandonedAt).toLocaleString() : null} />
        <Detail label="Last Field" value={lead.signupFormLastField} />
        <Detail label="Form Time" value={lead.signupFormTimeSeconds ? `${lead.signupFormTimeSeconds}s` : null} />
      </div>

      <hr className="border-gray-200 dark:border-gray-700" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Detail label="Signed Up" value={lead.signedUp ? "Yes" : "No"} />
        <Detail label="Signed Up At" value={lead.signedUpAt ? new Date(lead.signedUpAt).toLocaleString() : null} />
        <Detail label="Clerk User ID" value={lead.clerkUserId} mono />
        <Detail label="Onboarding Started" value={lead.onboardingStartedAt ? new Date(lead.onboardingStartedAt).toLocaleString() : null} />
        <Detail label="Onboarding Completed" value={lead.onboardingCompletedAt ? new Date(lead.onboardingCompletedAt).toLocaleString() : null} />
      </div>

      {lead.onboardingStepsJson && (
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">Onboarding Steps</p>
          <div className="flex gap-3 flex-wrap">
            {(Array.isArray(lead.onboardingStepsJson)
              ? (lead.onboardingStepsJson as Array<{ step: number; timeSeconds: number }>)
              : []
            ).map((s) => (
              <span key={s.step} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-1 rounded-lg text-xs">
                Step {s.step}: {s.timeSeconds}s
              </span>
            ))}
          </div>
        </div>
      )}

      {lead.events.length > 0 && (
        <>
          <hr className="border-gray-200 dark:border-gray-700" />
          <div>
            <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">Event Log</p>
            <div className="space-y-1 max-h-48 overflow-y-auto">
              {lead.events.map((ev) => (
                <div key={ev.id} className="flex gap-3 text-xs">
                  <span className="text-gray-400 tabular-nums w-36 shrink-0">
                    {new Date(ev.createdAt).toLocaleString()}
                  </span>
                  <span className="font-mono text-primary">{ev.eventType}</span>
                  {ev.page && <span className="text-gray-500">{ev.page}</span>}
                  {ev.metadata && <span className="text-gray-400 truncate">{ev.metadata}</span>}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Detail({
  label,
  value,
  mono,
  link,
}: {
  label: string;
  value?: string | null;
  mono?: boolean;
  link?: boolean;
}) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-gray-400 mb-0.5">{label}</p>
      {link ? (
        <a href={value} target="_blank" rel="noopener noreferrer" className="text-primary underline truncate block text-xs">
          {value}
        </a>
      ) : (
        <p className={`truncate ${mono ? "font-mono text-xs" : "text-xs"}`}>{value}</p>
      )}
    </div>
  );
}
