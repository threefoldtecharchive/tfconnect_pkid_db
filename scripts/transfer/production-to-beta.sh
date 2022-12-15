#!/bin/bash

ENV=beta
BETA_POD=beta-pkid-redis-86667596cc-rqr4w
PROD_POD=redis-prod-654784cfd4-ls2f8

rm ~/.kube/config
cp ~/.kube/config-hagrid-prod-jimber ~/.kube/config

kubectl cp  $PROD_POD:./ files -c redis-prod -n jimber

rm ~/.kube/config
cp ~/.kube/config-hagrid-dev-jimber ~/.kube/config

kubectl cp files/ $BETA_POD:./ -c redis -n jimber
