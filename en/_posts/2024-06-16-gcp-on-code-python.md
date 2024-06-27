---
layout: post
title: "Handling GCP Compute Engine with Code (Python)"
subtitle: "Using Google API Client Library to Manage Compute Engine"
date: 2024-06-16 14:00:00 +0900
last_modified_at: 2024-06-16 14:00:00 +0900
categories: ["tutorial"]
tags: ["gcp", "infra", "python"]
lang: en
---

## Table of Contents
1. [Introduction to GCP Compute Engine](#introduction-to-gcp-compute-engine)
2. [Introduction to Google API Client Library](#introduction-to-google-api-client-library)
    1. [Instance CRUD](#instance-crud)
    2. [Fetching Instance List](#fetching-instance-list)
    3. [Adding SSH Keys to an Instance](#adding-ssh-keys-to-an-instance)
3. [Use Cases](#use-cases)

## Introduction to GCP Compute Engine

GCP Compute Engine is a virtual machine service provided by Google Cloud Platform (GCP). It offers similar functionalities to Amazon AWS's EC2 service. Users can easily manage virtual machines, and it supports various tools for scaling, security, monitoring, and more.

## Introduction to Google API Client Library

Using the Google API Client Library, you can easily manage Compute Engine instances with Python. This library allows you to perform CRUD operations on instances, and since the operations are executed through code, they can be automated.

### Instance CRUD

```python
from googleapiclient import discovery
from oauth2client.client import GoogleCredentials

# Obtain Google Cloud authentication credentials.
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


# Instance reading code example
instance_name = 'instance-name'
request = service.instances().get(project=project, zone=zone, instance=instance_name)
response = request.execute()
print(response)


# Instance updating code example
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

### Fetching Instance List
```
from googleapiclient import discovery
from oauth2client.client import GoogleCredentials

# Obtain Google Cloud authentication credentials.
credentials = GoogleCredentials.get_application_default()

# Create a Compute Engine API client.
service = discovery.build('compute', 'v1', credentials=credentials)

project = 'your-project-id'  # Enter your project ID.
zone = 'asia-northeast3-a'   # Enter the zone you are using.

# Create a request to fetch the list of instances.
request = service.instances().list(project=project, zone=zone)

# Execute the request and get the response.
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

### Adding SSH Keys to an Instance
```
from googleapiclient import discovery
from google.oauth2 import service_account

# Obtain Google Cloud authentication credentials.
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

# Send a request to update the metadata
operation = compute.instances().setMetadata(
    project=PROJECT_ID,
    zone=ZONE,
    instance=INSTANCE_NAME,
    body=metadata
).execute()

print(f"Updating metadata for {INSTANCE_NAME}: {operation['name']}")
```

## Use Cases

- **Automated Instance Management**: Instead of manually managing instances through the console, you can use code to automate management tasks, increasing efficiency.
- **Resource Optimization**: You can create instances only when needed and delete them afterward, creating a cost-effective solution.