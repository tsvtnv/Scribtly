const BASE_URL = `https://${process.env.UNIPILE_DSN}`;
const TOKEN = process.env.UNIPILE_API_TOKEN!;

const headers = {
  "X-API-KEY": TOKEN,
  "Content-Type": "application/json",
};

async function req<T>(method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Unipile ${method} ${path} failed: ${res.status} ${text}`);
  }
  return res.json() as Promise<T>;
}

export interface UnipileAccount {
  id: string;
  name: string;
  avatar_url?: string;
  headline?: string;
  type: string;
}

export interface UnipilePerson {
  id: string;
  public_identifier: string;
  first_name: string;
  last_name: string;
  headline?: string;
  location?: string;
  profile_picture_url?: string;
  company_name?: string;
  profile_url: string;
}

export const unipile = {
  async createAccount(email: string, password: string): Promise<{ id: string }> {
    return req("POST", "/api/v1/accounts", {
      provider: "LINKEDIN",
      username: email,
      password,
    });
  },

  async getAccount(accountId: string): Promise<UnipileAccount> {
    return req("GET", `/api/v1/accounts/${accountId}`);
  },

  async deleteAccount(accountId: string): Promise<void> {
    await req("DELETE", `/api/v1/accounts/${accountId}`);
  },

  async searchPeople(accountId: string, query: string, limit = 15): Promise<{ items: UnipilePerson[] }> {
    return req("POST", "/api/v1/linkedin/search/people", {
      account_id: accountId,
      query,
      limit,
    });
  },

  async getProfile(accountId: string, profileId: string): Promise<UnipilePerson> {
    return req("GET", `/api/v1/linkedin/profile/${profileId}?account_id=${accountId}`);
  },

  async sendConnectionRequest(
    accountId: string,
    profileId: string,
    message?: string
  ): Promise<{ id: string }> {
    return req("POST", "/api/v1/linkedin/invitation", {
      account_id: accountId,
      linkedin_member_urn: profileId,
      message,
    });
  },

  async sendMessage(
    accountId: string,
    threadId: string,
    text: string
  ): Promise<{ id: string }> {
    return req("POST", `/api/v1/chats/${threadId}/messages`, {
      account_id: accountId,
      text,
    });
  },

  async getInbox(accountId: string, cursor?: string): Promise<{
    items: Array<{
      id: string;
      last_message_at: string;
      last_message_text: string;
      attendees: Array<{ id: string; name: string; avatar_url?: string }>;
      unread: boolean;
    }>;
    cursor?: string;
  }> {
    const qs = cursor ? `&cursor=${cursor}` : "";
    return req("GET", `/api/v1/chats?account_id=${accountId}${qs}`);
  },

  async getMessages(accountId: string, threadId: string): Promise<{
    items: Array<{
      id: string;
      text: string;
      sender_id: string;
      created_at: string;
    }>;
  }> {
    return req("GET", `/api/v1/chats/${threadId}/messages?account_id=${accountId}`);
  },
};
