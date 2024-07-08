---
layout: post
title: "Managing GCP with Code"
subtitle: "Using Python to Operate GCP"
date: 2024-06-16 14:00:00 +0900
last_modified_at: 2024-07-07 14:00:00 +0900
categories: ["tutorial"]
tags: ["gcp", "infra", "python"]
lang: en
---

## Table of Contents

1. [Introduction](#introduction)
   - [Preparation](#preparation)
     1. [Installing Google Cloud SDK](#installing-google-cloud-sdk)
     2. [Creating a Service Account and Downloading Key File](#creating-a-service-account-and-downloading-key-file)

2. [Compute Engine](#compute-engine)
   - [Instance CRUD](#instance-crud)
     - [Instance Creation Code Example](#instance-creation-code-example)
     - [Instance Read Code Example](#instance-read-code-example)
     - [Instance Update Code Example](#instance-update-code-example)
     - [Instance Deletion Code Example](#instance-deletion-code-example)
   - [Listing Instances](#listing-instances)
   - [Adding SSH Keys to Instances](#adding-ssh-keys-to-instances)

3. [Cloud Storage (GCS)](#cloud-storage-gcs)
   - [Bucket Creation and Deletion](#bucket-creation-and-deletion)
     - [Bucket Creation Code Example](#bucket-creation-code-example)
     - [Bucket Deletion Code Example](#bucket-deletion-code-example)
   - [Uploading and Downloading Objects](#uploading-and-downloading-objects)
     - [Object Upload Code Example](#object-upload-code-example)
     - [Object Download Code Example](#object-download-code-example)
   - [Listing Objects](#listing-objects)

4. [Cloud Run](#cloud-run)
   - [Library Installation](#library-installation)
   - [Deploying Services](#deploying-services)
     - [Service Deployment Code Example](#service-deployment-code-example)
   - [Updating Services](#updating-services)
     - [Service Update Code Example](#service-update-code-example)
   - [Deleting Services](#deleting-services)
     - [Service Deletion Code Example](#service-deletion-code-example)

<br>
<br>

## Introduction

This guide introduces how to manage GCP using Python code. Most settings are similar to what you would do on the console, and if you find it hard to understand through code alone, it is recommended to try executing the tasks directly on the console.

### Preparation
1. **Installing Google Cloud SDK**
   ```bash
   curl https://sdk.cloud.google.com | bash
   exec -l $SHELL
   gcloud init
   ```

2. **Creating a Service Account and Downloading Key File**
   - Create a service account on the Google Cloud Console and download the JSON key file.
   - Set the environment variable:
     ```bash
     export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your-service-account-file.json"
     ```

<br>
<br>

## Compute Engine

GCP Compute Engine is a virtual machine service provided by Google Cloud Platform (GCP). It offers similar functionality to Amazon AWS's EC2 service. Users can easily manage virtual machines and are supported with various tools for scaling, security, monitoring, etc.

### Instance CRUD

Using the Google API Client Library, you can easily manage Compute Engine instances with Python. This library allows for executing CRUD operations on instances, enabling automation through code.

```python
from googleapiclient import discovery
from oauth2client.client import GoogleCredentials

# Obtain Google Cloud authentication information.
credentials = GoogleCredentials.get_application_default()

# Create a Compute Engine API client.
service = discovery.build('compute', 'v1', credentials=credentials)

project = 'your-project-id'  # Enter your project ID.
zone = 'asia-northeast3-a'   # Enter the zone you are using.

# Instance creation code example
instance_body = {
    'name': 'instance-name',
    'machineType': f'zones/{zone}/machineTypes/n1-standard-1', # Machine type can be set
    'disks': [
        {
            'boot': True,
            'autoDelete': True,
            'initializeParams': {
                'sourceImage': 'projects/debian-cloud/global/images/family/debian-9'
            }
        }
    ],
    'networkInterfaces': [{
        'network': 'global/networks/default'
    }]
}
request = service.instances().insert(project=project, zone=zone, body=instance_body)
response = request.execute()
print(response)


# Instance read code example
instance_name = 'instance-name'
request = service.instances().get(project=project, zone=zone, instance=instance_name)
response = request.execute()
print(response)


# Instance update code example
instance_body = {
    'description': 'Updated instance'
}

request = service.instances().setMetadata(project=project, zone=zone, instance=instance, body=instance_body)
response = request.execute()
print(response)


# Instance deletion code example
instance_name = 'instance-name'
request = service.instances().delete(project=project, zone=zone, instance=instance_name)
response = request.execute()
print(response)
```

### Listing Instances
```python
from googleapiclient import discovery
from oauth2client.client import GoogleCredentials

# Obtain Google Cloud authentication information.
credentials = GoogleCredentials.get_application_default()

# Create a Compute Engine API client.
service = discovery.build('compute', 'v1', credentials=credentials)

project = 'your-project-id'  # Enter your project ID.
zone = 'asia-northeast3-a'   # Enter the zone you are using.

# Create a request to get the list of instances.
request = service.instances().list(project=project, zone=zone)

# Execute the request to get the response.
response = request.execute()

# Print the list of instances.
if 'items' in response:
    for instance in response['items']:
        print('Instance name:', instance['name'])
        print('Instance status:', instance['status'])
        print('Instance zone:', instance['zone'])
        print()
else:
    print('No instances found.')
```

### Adding SSH Keys to Instances
```python
from googleapiclient import discovery
from google.oauth2 import service_account

# Obtain Google Cloud authentication information.
credentials = GoogleCredentials.get_application_default()

# Create a Compute Engine API client.
service = discovery.build('compute', 'v1', credentials=credentials)

project = 'your-project-id'  # Enter your project ID.
zone = 'asia-northeast3-a'   # Enter the zone you are using.

# Read the public key
with open('public-key-path', 'r') as f:
    public_key = f.read().strip()

# Get the current metadata of the instance
instance = compute.instances().get(project=PROJECT_ID, zone=ZONE, instance=INSTANCE_NAME).execute()
metadata = instance.get('metadata', {})
items = metadata.get('items', [])

# Add SSH key metadata
ssh_keys = None
for item in items:
    if item['key'] == 'ssh-keys':
        ssh_keys = item
        break

if ssh_keys:
    ssh_keys['value'] += f"\n{user_name}:{public_key}"
else:
    items.append({
        'key': 'ssh-keys',
        'value': f"{user_name}:{public_key}"
    })

metadata['items'] = items

# Metadata update request
operation = compute.instances().setMetadata(
    project=PROJECT_ID,
    zone=ZONE,
    instance=INSTANCE_NAME,
    body=metadata
).execute()

print(f"Updating metadata for {INSTANCE_NAME}: {operation['name']}")
```

<br>
<br>

## Cloud Storage (GCS)

Google Cloud Storage (GCS) is an object storage service provided by GCP. It allows you to store and manage large-scale data.

### Bucket Creation and Deletion

#### Bucket Creation Code Example
```python
from google.cloud import storage

# Create a client.
client = storage.Client()

# Specify the bucket name and location.
bucket_name = 'your-bucket-name'
location = 'asia-northeast3'

# Create the bucket.
bucket = client.bucket(bucket_name)
bucket.location = location
bucket = client.create_bucket(bucket)

print(f'Bucket {bucket_name} created in {location}.')
```

#### Bucket Deletion Code Example
```python
from google.cloud import storage

# Create a client.
client = storage.Client()

# Specify the name of the bucket to delete.
bucket_name = 'your-bucket-name'

# Get the bucket.
bucket = client.bucket(bucket_name)

# Delete the bucket.
bucket.delete()

print(f'Bucket {bucket_name} deleted.')
```

### Uploading and Downloading Objects

This section explains how to upload and download objects in Google Cloud Storage.

#### Object Upload Code Example
```python
from google.cloud import storage

# Create a client.
client = storage.Client()

# Specify the bucket name and the file path to upload.
bucket_name = 'your-bucket-name'
source_file_name = 'local-file-path'
destination_blob_name = 'storage-object-name'

# Get the bucket.
bucket = client.bucket(bucket_name)

# Create a blob object and upload the file.
blob = bucket.blob(destination_blob_name)
blob.upload_from_filename(source_file_name)

print(f'File {source_file_name} uploaded to {destination_blob_name}.')
```

#### Object Download Code Example
```python
from google.cloud import storage

# Create a client.
client = storage.Client()

# Specify the bucket name and the object name to download.
bucket_name = 'your-bucket-name'
source_blob_name = 'storage-object-name'
destination_file_name = 'local-file-path'

# Get the bucket.
bucket = client.bucket(bucket_name)

# Get the blob object and download the file.
blob = bucket.blob(source_blob_name)
blob.download_to_filename(destination_file_name)

print(f'Blob {source_blob_name} downloaded to {destination_file_name}.')
```

### Listing Objects

This section explains how to list objects in a specific bucket in Google Cloud Storage.

#### Listing Objects Code Example
```python
from google.cloud import storage

# Create a client.
client = storage.Client()

# Specify the bucket name.
bucket_name = 'your-bucket-name'

# Get the bucket.
bucket = client.bucket(bucket_name)

# Get the list of objects.
blobs = bucket.list_blobs()

print('Objects in the bucket:')
for blob in blobs:
    print(blob.name)
```

<br>
<br>

## Cloud Run

Google Cloud Run is a fully managed serverless platform that allows you to quickly and easily deploy containerized applications. With Cloud Run, you can focus on running your code without managing infrastructure, and it automatically scales based on traffic. To automate Cloud Run with Python, use the Google Cloud SDK's Python client library.

### Library Installation

```bash
pip install google-api-python-client google-auth-httplib2 google-auth-oauthlib
```

### Deploying Services

This section demonstrates how to deploy, update, and delete Cloud Run services using Python code with the Cloud Run API and Google Cloud SDK. Build the Docker image, push it to Google Container Registry (GCR), and use it to manage Cloud Run services.

#### Service Deployment Code Example
```python
from googleapiclient.discovery import build
from google.oauth2 import service_account
import subprocess

# Set the service account credentials
credentials = service_account.Credentials.from_service_account_file(
    'path/to/your-service-account-file.json')

# Create a Cloud Run API client
service = build('run', 'v1', credentials=credentials)

# Build and push the Docker image
def build_and_push_docker_image(image_name):
    subprocess.run(['docker', 'build', '-t', image_name, '.'])
    subprocess.run(['docker', 'push', image_name])

# Service deployment function
def deploy_service(service_name, image_name, region):
    build_and_push_docker_image(image_name)
    
    # Deploy the Cloud Run service
    project_id = 'your-project-id'
    parent = f'projects/{project_id}/locations/{region}'
    body = {
        'metadata': {'name': service_name},
        'spec': {
            'template': {
                'spec': {
                    'containers': [{'image': image_name}]
                }
            }
        }
    }

    request = service.namespaces().services().create(parent=parent, body=body)
    response = request.execute()
    print(f'Service {service_name} deployed with image {image_name} in region {region}.')

# Set variables
service_name = 'your-service-name'
image_name = 'gcr.io/your-project-id/your-image-name'
region = 'your-region'

# Execute service deployment
deploy_service(service_name, image_name, region)
```

### Updating Services

#### Service Update Code Example
```python
# Service update function
def update_service(service_name, image_name, region):
    build_and_push_docker_image(image_name)
    
    # Update the Cloud Run service
    project_id = 'your-project-id'
    name = f'projects/{project_id}/locations/{region}/services/{service_name}'
    
    body = {
        'spec': {
            'template': {
                'spec': {
                    'containers': [{'image': image_name}]
                }
            }
        }
    }

    request = service.projects().locations().services().replaceService(name=name, body=body)
    response = request.execute()
    print(f'Service {service_name} updated with image {image_name} in region {region}.')

# Execute service update
update_service(service_name, image_name, region)
```

### Deleting Services

#### Service Deletion Code Example
```python
# Service deletion function
def delete_service(service_name, region):
    project_id = 'your-project-id'
    name = f'projects/{project_id}/locations/{region}/services/{service_name}'
    
    request = service.projects().locations().services().delete(name=name)
    response = request.execute()
    print(f'Service {service_name} deleted from region {region}.')

# Execute service deletion
delete_service(service_name, region)
```

<br>
<br>

## Future Content
5. [Cloud Functions](#cloud-functions)
   - [Deploying Functions](#deploying-functions)
   - [Invoking Functions](#invoking-functions)
   - [Deleting Functions](#deleting-functions)
6. [BigQuery](#bigquery)
   - [Creating and Deleting Datasets](#creating-and-deleting-datasets)
   - [Executing Queries](#executing-queries)
   - [Retrieving Table Data](#retrieving-table-data)
7. [Pub/Sub](#pubsub)
   - [Creating and Deleting Topics](#creating-and-deleting-topics)
   - [Publishing Messages](#publishing-messages)
   - [Setting Up Subscriptions and Receiving Messages](#setting-up-subscriptions-and-receiving-messages)
8. [AI Platform](#ai-platform)
   - [Deploying Models](#deploying-models)
   - [Making Prediction Requests](#making-prediction-requests)
   - [Deleting Models](#deleting-models)
9. [Firestore](#firestore)
    - [Creating and Deleting Documents](#creating-and-deleting-documents)
    - [Querying and Updating Documents](#querying-and-updating-documents)
10. [App Engine](#app-engine)
    - [Deploying Applications](#deploying-applications)
    - [Version Management and Traffic Splitting](#version-management-and-traffic-splitting)
11. [Cloud Dataflow](#cloud-dataflow)
    - [Creating and Running Pipelines](#creating-and-running-pipelines)
    - [Monitoring and Managing Jobs](#monitoring-and-managing-jobs)
12. [Cloud Translation](#cloud-translation)
    - [Translating Text](#translating-text)
    - [Supporting Multiple Languages](#supporting-multiple-languages)
13. [Vision AI](#vision-ai)
    - [Image Analysis and Labeling](#image-analysis-and-labeling)
    - [Text Recognition (OCR)](#text-recognition-ocr)
14. [Use Cases](#use-cases)