#!/bin/bash
export STACK_NAME=<your-team-afkorting>-htf-trollalerting-core
export MY_REGION=eu-central-1
export MY_DEV_BUCKET=htf-deploymentbucket

# Package new cloudformation package
aws cloudformation package --template templates/core-troll-alerting-service.yaml --s3-bucket $MY_DEV_BUCKET --output-template export-core-troll-alerting-service.yaml --region $MY_REGION
# Deploy 
sam deploy --region $MY_REGION --template-file export-core-troll-alerting-service.yaml --stack-name $STACK_NAME --capabilities CAPABILITY_NAMED_IAM --parameter-overrides Stage=dev