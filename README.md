# DNSControl: Office 365 Record Generator

This repository contains an example [DNSControl](https://stackexchange.github.io/dnscontrol/) configuration file with functions to automatically generate DNS records for Office 365.

For more information and examples, [please see the blog post here](https://gbe0.com/posts/hosting-domains/dnscontrol-office-365-record-generator/).

Please feel free to modify to modify the functions as needed for your situation and make it your own.

## Basic Usage

1. In [creds.json](creds.json), define a list of your credentials used to access your registrar (if required) and DNS provider. For the list of supported credential options and providers see the [official documentation here](https://stackexchange.github.io/dnscontrol/provider-list).
2. In [dnsconfig.js](dnsconfig.js), define set the registrar and DNS provider names. They need to match the credentials required.
3. In [vars/Office365.js](vars/Office365.js), set your Office 365 tenant name. Usually you can get this from the "onmicrosoft.com" hostname (eg. if your "onmicrosoft.com" hostname is "example.onmicrosoft.com", your tenant name will be "example").
4. Optionally, in [vars/SPF.js](vars/SPF.js), define third party SPF record information.
5. Create the list of DNS zones in [domains/](domains/). Example templates have been included. If you have existing DNS records not yet defined in DNSControl, can optionally dump them from the provider first.
6. Run DNSControl in preview mode to see what changes will be made: `dnscontrol preview`
7. Push the changes: `dnscontrol push`
