// Silence Next/Clerk env checks during unit tests
process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||= "pk_test_placeholder";
process.env.CLERK_SECRET_KEY ||= "sk_test_placeholder";
process.env.DATABASE_URL ||= "postgresql://placeholder@localhost/placeholder";
process.env.DIRECT_URL ||= process.env.DATABASE_URL;
process.env.ANTHROPIC_API_KEY ||= "sk-ant-placeholder";
process.env.STRIPE_SECRET_KEY ||= "sk_test_placeholder";
process.env.RESEND_API_KEY ||= "re_placeholder";
process.env.NEXT_PUBLIC_APP_URL ||= "http://localhost:3000";
