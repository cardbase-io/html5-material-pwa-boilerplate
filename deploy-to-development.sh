#!/usr/bin/env bash

#firebase logout
#firebase login
echo "be sure you are using the right firebase user."

# -m "message for deployment"
npm run build && firebase deploy --project development --only hosting:www
