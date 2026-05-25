import psycopg2
conn = psycopg2.connect("postgres://postgres:hUmJcpNqaH792x8IGf1Ag7IkgozbMpQJMl4ksC59l8Rmyb6XSkzC3KSdzWRiqHgQ@100.101.61.83:3100/postgres")
cur = conn.cursor()
cur.execute('DELETE FROM "ReferralEvent"')
events = cur.rowcount
cur.execute('DELETE FROM "ReferralLead"')
leads = cur.rowcount
conn.commit()
conn.close()
print(f"Deleted {leads} leads and {events} events.")
