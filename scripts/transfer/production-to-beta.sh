#!/bin/bash

if [[ $1 != "--password" ]]
then
 echo "PLEASE PROVIDE A PASSWORD with ./production-to-beta.sh --password [PASSWORD]"
 exit
fi

if [[ $2 == "" ]]
then
 echo "PLEASE PROVIDE A PASSWORD with ./production-to-beta.sh --password [PASSWORD]"
 exit
fi


PASSWORD=$2
ENV=beta
PROD_POD=redis-prod-654784cfd4-ls2f8

rm ~/.kube/config
cp ~/.kube/config-hagrid-prod-jimber ~/.kube/config

kubectl cp  $PROD_POD:/data/dump.rdb dump.rdb -c redis-prod -n jimber

rm ~/.kube/config
cp ~/.kube/config-hagrid-dev-jimber ~/.kube/config

helm uninstall beta-pkid -n jimber
kubectl delete pod sync-pod -n jimber

sleep 10

kubectl apply -f ../charts/sync-chart.yaml -n jimber

sleep 10

kubectl cp dump.rdb sync-pod:/data/dump.rdb -n jimber

kubectl delete pod sync-pod -n jimber

helm upgrade --install beta-pkid ../../helm_charts -f ../../helm_charts/values/values-beta.yaml --set global.PKID_IMAGE=threefoldjimber/pkid:beta-latest  --set global.REDIS_PASSWORD="$PASSWORD" --set global.REDIS_URL="redis://:$PASSWORD@beta-pkid-redis:6379" -n jimber
