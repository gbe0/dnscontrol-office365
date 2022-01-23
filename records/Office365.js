/**
 * Generate record set for Office 365 including MX, TXT, CNAME's etc.
 *
 * @param domain {string} The domain name
 * @param params {object=} The parameters
 * @param features {object=} The features to enable/disable
 * @returns {array[TXT(...),CNAME(...),MX(...)]} The array of DNS records to set
 * @example
 *  - Office365(
 *      "example.com"
 *    )
 *  - Office365(
 *      "example.com",
 *      { "validation": "ms123456789" },
 *    )
 *  - Office365(
 *      "example.com",
 *      { "tenant": "example", "ttl": 3600, "guid": "example-domain-com01", "validation": "ms123456789" },
 *      { "mx": true, "autodiscover": false, "dkim": false, "spf": false, "dmarc": false }
 *    )
 *  - Office365(
 *      "example.com",
 *      { "validation": "ms123456789", "spf": [ SPF_EXTERNAL ] },
 *      { "mx": true, "autodiscover": false, "dkim": false, "spf": true, "dmarc": false }
 *    )
 *  - Office365(
 *      "example.com",
 *      { "dmarc_rua": "dmarc-report@example.com", "dmarc_ruf": "dmarc-report@example.com" }
 *    )
 */
function Office365(domain, params, features) {
  // Set required variables
  if (!domain) {
    throw new Error("Office365: Domain name is required");
  }

  // If no params were configured, create empty object
  params = params || {};

  // The O365 tenant name
  params.tenant = params.tenant || OFFICE365_TENANT;

  // The TTL to set for records
  params.ttl = params.ttl || TTL_DEFAULT;

  // Set the domain GUID
  params.guid = params.guid || Office365GUID(domain);

  // If features not defined, set to empty to get defaults
  features = features || {};

  // Enable MX records
  features.mx = features.mx === false ? features.mx : true;

  // Enable autodiscover records
  features.autodiscover = features.autodiscover === false ? features.autodiscover : true;

  // Enable DKIM records
  features.dkim = features.dkim === false ? features.dkim : true;

  // Add Office 365 SPF record
  features.spf = features.spf === false ? features.spf : true;

  // Manage the DMARC record
  features.dmarc = features.dmarc === false ? features.dmarc : true;

  // Create empty list of records to return
  var records = [];

  // Add the validation TXT record if required
  // Not all domains require this
  if (params.validation) {
    records.push(Office365Validation(params.validation, params.ttl));
  }

  // Add MX record if required
  if (features.mx) {
    records.push(Office365MX(params.guid, params.ttl));
  }

  // Add autodiscover and Lync CNAME records if required
  if (features.autodiscover) {
    records = records.concat(Office365AutoDiscover(params.ttl));
  }

  // Add DKIM CNAME records if required
  if (features.dkim) {
    records = records.concat(Office365DKIM(params.guid, params.tenant, params.ttl));
  }

  // Add SPF record if required
  if (features.spf) {
    // If there are additional SPF records, add them as well
    if (params.spf) {
      // Add the O365 SPF record to additional SPF records
      var spf = [SPF_O365].concat(params.spf);
      records.push(SPFRecord(spf));
    } else {
      records.push(SPFRecord([SPF_O365]));
    }
  }

  // Add dmarc record if required
  if (features.dmarc) {
    records.push(DMARCRecord(domain, params.dmarc_rua, params.dmarc_ruf));
  }

  // Return the built records
  return records;
}