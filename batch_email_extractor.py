import sys
import json
import subprocess
from pathlib import Path
from collections import defaultdict

def extract_emails_from_domain(domain: str) -> dict:
    """
    Runs agency_finder.py for a single domain and parses the output.
    Returns dict with domain and emails found.
    """
    try:
        result = subprocess.run(
            ['python', 'agency_finder.py'],
            input=domain.replace('https://', '').replace('http://', ''),
            capture_output=True,
            text=True,
            timeout=120
        )

        output = result.stdout + result.stderr

        # Parse emails from output
        emails = []
        in_emails_section = False

        for line in output.split('\n'):
            if '[+] Found' in line and 'email' in line.lower():
                in_emails_section = True
                continue

            if in_emails_section and '•' in line:
                email = line.split('•')[1].strip()
                if '@' in email:
                    emails.append(email)
            elif in_emails_section and line.startswith('['):
                in_emails_section = False

        return {
            'domain': domain,
            'emails': emails,
            'success': len(emails) > 0
        }

    except subprocess.TimeoutExpired:
        print(f'  ✗ Timeout')
        return {'domain': domain, 'emails': [], 'success': False}
    except Exception as e:
        print(f'  ✗ Error: {e}')
        return {'domain': domain, 'emails': [], 'success': False}


def batch_extract_emails(domains_file: str) -> None:
    """
    Reads domains from file and extracts emails from each.
    Outputs results to JSON and CSV.
    """
    # Read domains
    if not Path(domains_file).exists():
        print(f'[-] File not found: {domains_file}')
        return

    with open(domains_file, 'r') as f:
        domains = [line.strip() for line in f if line.strip()]

    if not domains:
        print(f'[-] No domains found in {domains_file}')
        return

    print('=' * 50)
    print('BATCH EMAIL EXTRACTION')
    print('=' * 50 + '\n')
    print(f'[*] Processing {len(domains)} domains...\n')

    results = []
    success_count = 0
    total_emails = 0

    for i, domain in enumerate(domains, 1):
        domain_clean = domain.replace('https://', '').replace('http://', '')
        print(f'[{i}/{len(domains)}] {domain_clean}', end=' ... ')

        result = extract_emails_from_domain(domain)
        results.append(result)

        if result['success']:
            print(f'OK ({len(result["emails"])} emails)')
            success_count += 1
            total_emails += len(result['emails'])
        else:
            print('NONE (no emails)')

    # Save results to JSON
    json_file = 'agency_emails.json'
    with open(json_file, 'w') as f:
        json.dump(results, f, indent=2)

    # Save results to CSV
    csv_file = 'agency_emails.csv'
    with open(csv_file, 'w') as f:
        f.write('domain,emails\n')
        for result in results:
            domain = result['domain']
            emails = ';'.join(result['emails']) if result['emails'] else 'NO_EMAILS'
            f.write(f'{domain},{emails}\n')

    # Save just domains with emails for next step
    domains_with_emails_file = 'agencies_with_emails.txt'
    with open(domains_with_emails_file, 'w') as f:
        for result in results:
            if result['emails']:
                f.write(f'{result["domain"]}\n')

    # Print summary
    print('\n\n' + '=' * 50)
    print('RESULTS SUMMARY')
    print('=' * 50)
    print(f'\n[+] Processed: {len(domains)} domains')
    print(f'[+] Success: {success_count}/{len(domains)} ({100*success_count//len(domains)}%)')
    print(f'[+] Total emails found: {total_emails}')
    print(f'\n[+] Saved results to:')
    print(f'    • {json_file} (full results)')
    print(f'    • {csv_file} (CSV format)')
    print(f'    • {domains_with_emails_file} (domains with emails only)')

    # Show sample
    print('\n\n' + '=' * 50)
    print('SAMPLE RESULTS')
    print('=' * 50 + '\n')

    for result in results[:5]:
        if result['emails']:
            print(f'{result["domain"]}')
            for email in result['emails']:
                print(f'  • {email}')
            print()

    print(f'\n[*] Next steps:')
    print(f'    1. Review {csv_file} for all results')
    print(f'    2. Use {domains_with_emails_file} to import into your CRM')
    print(f'    3. Verify emails with Hunter.io (via Playwright in outreach skill)')
    print(f'    4. Send personalized outreach using the Scribtly outreach skill')


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Usage: python batch_email_extractor.py <domains_file>')
        print('Example: python batch_email_extractor.py discovered_agencies.txt')
        sys.exit(1)

    batch_extract_emails(sys.argv[1])
