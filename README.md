# ![AMP CMS Logo](logo.svg)

[![Maintainability](https://api.codeclimate.com/v1/badges/6751f127815b5bac4cee/maintainability)](https://codeclimate.com/github/ValeriaVG/amp-cms/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6751f127815b5bac4cee/test_coverage)](https://codeclimate.com/github/ValeriaVG/amp-cms/test_coverage)

Content management system for blazingly fast AMP websites, written in TypeScript.

AMP CMS is currently in active development. It's not ready for production use until it reaches v1.0.

Current stage: alpha

## How to deploy

[![Deploy to DO](https://www.deploytodo.com/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/ValeriaVG/amp-cms/tree/main&refcode=6ad1223ed047)

## First-time & Emergency access

You can set up a superuser account though the following environment variables:

- `SUPERUSER_EMAIL`, by default is set to `clark.kent@daily.planet`
- `SUPERUSER_PASSWORD`, by default is set to `clark&lois`

> WARNING: consider changing the default superuser credentials

## Known bugs

- No file management system
- No way to list pages from <amp/> yet
- Sometimes errors are showing Unexpected JSON instead of a proper response
- Dashboard does not work in Safari
