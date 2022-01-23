// Registrars
var REG_NONE = NewRegistrar("none", "NONE");
var REG_NAMECHEAP = NewRegistrar("namecheap", "NAMECHEAP");

// DNS providers
var DNS_CLOUDFLARE = NewDnsProvider("cloudflare", "CLOUDFLAREAPI");

// CloudFlare macros
var CF_PROXY_ON = { cloudflare_proxy: "on" };
var CF_PROXY_OFF = { cloudflare_proxy: "off" };

// TTL variables
var TTL_1M = TTL(60);
var TTL_5M = TTL(300);
var TTL_30M = TTL(1800);
var TTL_60M = TTL(3600);
var TTL_6H = TTL(21600);
var TTL_12H = TTL(43200);
var TTL_1D = TTL(86400);
var TTL_7D = TTL(604800);

// Load common variables
require_glob("./vars/");

// Load functions
require_glob("./functions/");

// Load common records/record sets
require_glob("./records/");

// Configure defaults for all domains
DEFAULTS(
  DefaultTTL(TTL_DEFAULT)
);

// Manage the records for domains
require_glob("./domains/");
