# tests/test_vps_extract.py
import pytest
from vps_extract import extract_emails_from_html, build_lead_payload, is_domain_email

def test_extract_emails_basic():
    html = "<p>Contact us at hello@example-agency.com or info@example-agency.com</p>"
    emails = extract_emails_from_html(html, "example-agency.com")
    assert "hello@example-agency.com" in emails
    assert "info@example-agency.com" in emails

def test_extract_emails_filters_foreign_domains():
    html = "<p>Email us: hello@example.com or spam@otherdomain.net</p>"
    emails = extract_emails_from_html(html, "example.com")
    assert "hello@example.com" in emails
    assert "spam@otherdomain.net" not in emails

def test_extract_emails_empty():
    emails = extract_emails_from_html("<p>No emails here</p>", "example.com")
    assert emails == set()

def test_is_domain_email_true():
    assert is_domain_email("hello@example-agency.com", "example-agency.com") is True
    assert is_domain_email("info@sub.example-agency.com", "example-agency.com") is True

def test_is_domain_email_false():
    assert is_domain_email("user@gmail.com", "example-agency.com") is False
    assert is_domain_email("noreply@mailchimp.com", "example-agency.com") is False

def test_build_lead_payload():
    lead = build_lead_payload(
        domain="example-agency.com",
        email="hello@example-agency.com",
        query="digital marketing agency"
    )
    assert lead["agencyWebsite"] == "https://example-agency.com"
    assert lead["outreachStatus"] == "NOT_CONTACTED"
    assert lead["leadId"] is not None
    assert len(lead["leadId"]) == 32
    assert lead["sourceSearchQuery"] == "digital marketing agency"
    assert lead["agencyName"] == "Example-Agency"

def test_build_lead_payload_no_email():
    lead = build_lead_payload(domain="test.com", email=None, query="agency")
    assert lead is None
