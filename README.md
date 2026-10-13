# CareScript isolated hosting probe

This is an inert hosting test, with no WHO data, authentication, database, credentials or CareScript application imports. GET /healthz returns a fictional marker; every other application route returns 503 Review unavailable. This does not enable Standard or Pro review.

Use Node 24.21.0, Free compute, manual deployment only, and health check /healthz. Build: node verify-probe.cjs. Start: node host-probe.cjs --serve-fictional. Render supplies PORT. No dependency installation, secrets, custom domain, persistent disk or datastore is required.

The build checks the original v186 probe SHA-256. This package does not authorize publishing, account access expansion or deployment. No protected reader or platform trust claim is included.
