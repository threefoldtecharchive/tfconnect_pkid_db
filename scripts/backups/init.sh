#!/bin/bash

apt update && apt install cron -y

CLOUDSDK_CORE_DISABLE_PROMPTS=1 ./google-cloud-sdk/install.sh

gcloud auth activate-service-account --key-file google-cloud-key.json
chmod 741 /data/backup.sh

command="/data/backup.sh"
job="* * * * * $command"
cat <(fgrep -i -v "$command" <(crontab -l)) <(echo "$job") | crontab -
