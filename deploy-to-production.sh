#!/usr/bin/env bash

#firebase logout
#firebase login
echo "be sure you are using the right firebase user."

npm run build && firebase deploy --project production --only hosting:www
