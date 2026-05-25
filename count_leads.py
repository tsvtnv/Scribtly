import psycopg2
conn = psycopg2.connect("postgres://postgres:hUmJcpNqaH792x8IGf1Ag7IkgozbMpQJMl4ksC59l8Rmyb6XSkzC3KSdzWRiqHgQ@100.101.61.83:3100/postgres")
cur = conn.cursor()
cur.execute('SELECT COUNT(*) FROM "ReferralLead"')
print("Current leads:", cur.fetchone()[0])
cur.execute('SELECT COUNT(*) FROM "ReferralEvent"')
print("Current events:", cur.fetchone()[0])
conn.close()
