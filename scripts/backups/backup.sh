#!/bin/bash

gsutil cp /data/dump.rdb gs://jimber_backups/pkid_redis_beta_backup/pkid_redis_backup-`date "+%d":"%m":"%y"-"%H":"%M".rdb`
