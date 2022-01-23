// Domain - example2.com
// Basic configuration of domain for Office 365 with custom DNS records
// The validation TXT record will also be added in this case for Office 365
D(
  "example2.com",
  // Registrar and DNS providers
  REG_NONE,
  DnsProvider(DNS_CLOUDFLARE),

  // Add Office 365 records
  // This will setup SPF, DKIM, DMARC, auto discovery, MX
  Office365(
    "example2.com",
    {
      "validation": "MS=ms123456789"
    }
  ),

  // Set A/AAAA record and use CloudFlare proxy
  A("@", "192.0.2.1", CF_PROXY_ON),
  AAAA("@", "2001:db8::1", CF_PROXY_ON),
  CNAME("www", "example2.com.", CF_PROXY_ON)
);
