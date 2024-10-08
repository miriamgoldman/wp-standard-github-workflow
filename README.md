## Basic GitHub Actions Workflow Example (Level 2 in WebOps Matrix)

This repo contains a base WordPress site, using Pantheon's WordPress upstream. 

It uses a very basic GitHub actions to deploy to Pantheon on PR creation, code sync, and merge to `main`. Below outline the secrets and variables needed to successfully configure the workflow. This are configured via the repo settings, under Secrets and variables -> Actions.

This workflow currently only supports one site. More complex workflows will be made available in separate repos.

| Type     | Name           | Purpose |
| ---      | ---            | ---     |
| Secret   | TERMINUS_TOKEN | Terminus machine token for deploying code. |
| Variable | ORG_GUID       | GUID of the organization that is responsible for the site. |
| Variable | SITE_NAME      | Name of the site in the Pantheon Dashboard. |