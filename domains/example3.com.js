// Domain - example3.com
// Further configuration for Office 365:
// - The GUID for the domain (used to build the DKIM and MX record) is set manually (this can happen if there is a conflict on Office 365)
// - An additional SPF include is defined
// - The autodiscover records will not be set
// The domain registrar will be set to NameCheap
D(
  "example3.com",
  // Registrar and DNS providers
  REG_NAMECHEAP,
  DnsProvider(DNS_CLOUDFLARE),

  // Add Office 365 records
  // This will setup SPF, DKIM, DMARC, auto discovery, MX
  Office365(
    "example3.com",
    {
      "guid": "example3-com1b",
      "spf": [ SPF_EXTERNAL, "ipv4:192.0.2.5" ]
    },
    {
      "autodiscover": "false"
    }
  ),

  // Set A/AAAA record and use CloudFlare proxy
  A("@", "192.0.2.1", CF_PROXY_ON),
  AAAA("@", "2001:db8::1", CF_PROXY_ON),
  CNAME("www", "example3.com.", CF_PROXY_ON)
);
