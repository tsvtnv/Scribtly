# tests/test_vps_clutch.py
import pytest
from vps_clutch import domain_from_url, pick_email, lead_id, first_name_from_agency, load_env_file


def test_domain_from_url_strips_www():
    assert domain_from_url("https://www.example-agency.com/about") == "example-agency.com"


def test_domain_from_url_no_www():
    assert domain_from_url("https://example-agency.com") == "example-agency.com"


def test_domain_from_url_invalid():
    assert domain_from_url("not-a-url") is None


def test_domain_from_url_none():
    assert domain_from_url(None) is None


def test_pick_email_prefers_contact():
    emails = {"noreply@ex.com", "info@ex.com", "contact@ex.com"}
    assert pick_email(emails, "ex.com") == "contact@ex.com"


def test_pick_email_skips_generic_prefixes():
    emails = {"noreply@ex.com", "postmaster@ex.com"}
    assert pick_email(emails, "ex.com") is None


def test_pick_email_filters_foreign_domains():
    emails = {"hello@ex.com", "user@gmail.com"}
    assert pick_email(emails, "ex.com") == "hello@ex.com"


def test_pick_email_empty():
    assert pick_email(set(), "ex.com") is None


def test_lead_id_is_deterministic():
    assert lead_id("example.com") == lead_id("example.com")


def test_lead_id_differs_for_different_domains():
    assert lead_id("agency-a.com") != lead_id("agency-b.com")


def test_lead_id_is_32_chars():
    assert len(lead_id("example.com")) == 32


def test_first_name_from_agency_simple():
    assert first_name_from_agency("Acme Agency") == "Acme"


def test_first_name_from_agency_single_word():
    assert first_name_from_agency("Velocify") == "Velocify"


def test_first_name_from_agency_empty():
    assert first_name_from_agency("") == "there"


def test_load_env_file_parses_key_value(tmp_path):
    env_file = tmp_path / ".env.local"
    env_file.write_text('OUTREACH_API_KEY=abc123\nSCRIPTER_BASE_URL=https://example.com\n')
    result = load_env_file(str(env_file))
    assert result["OUTREACH_API_KEY"] == "abc123"
    assert result["SCRIPTER_BASE_URL"] == "https://example.com"


def test_load_env_file_ignores_comments(tmp_path):
    env_file = tmp_path / ".env.local"
    env_file.write_text('# comment\nKEY=value\n')
    result = load_env_file(str(env_file))
    assert "# comment" not in result
    assert result["KEY"] == "value"


def test_load_env_file_missing_file():
    result = load_env_file("/nonexistent/.env.local")
    assert result == {}
