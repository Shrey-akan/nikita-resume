#!/bin/sh
set -eu

cat > /app/.dev.vars <<EOF
MONGODB_URI=${MONGODB_URI}
MONGODB_DB=${MONGODB_DB:-shreyans_jain}
ADMIN_EMAIL=${ADMIN_EMAIL:-admin@shreyansjain.com}
ADMIN_PASSWORD=${ADMIN_PASSWORD}
EOF

exec npm run dev -- --host 0.0.0.0 --port 8080
