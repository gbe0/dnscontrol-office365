// Domain - example1.com
// Basic minimal configuration required for Office 365
D(
  "example1.com",
  // Registrar and DNS providers
  REG_NONE,
  DnsProvider(DNS_CLOUDFLARE),

  // Add Office 365 records
  // This will setup SPF, DKIM, DMARC, auto discovery, MX
  Office365("example1.com")

  // No other DNS records defined exept Office 365 records
);
