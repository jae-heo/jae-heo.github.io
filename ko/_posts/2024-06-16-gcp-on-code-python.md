---
layout: post
title: "코드로 다루는 GCP Compute Engine (파이썬)"
subtitle: "Google API Client 라이브러리를 이용해 Compute Engine을 다뤄보자"
date: 2024-06-16 14:00:00 +0900
last_modified_at: 2024-06-16 14:00:00 +0900
categories: ["tutorial"]
tags: ["gcp", "infra", "python"]
lang: ko
---

## 목차
1. [GCP Compute Engine 소개](#gcp-compute-engine-소개)
2. [Google API Client Library 소개](#google-api-client-library-소개)
    1. [인스턴스 CRUD](#인스턴스-crud)
    2. [인스턴스 리스트 가져오기](#인스턴스-리스트-가져오기)
    3. [인스턴스에 SSH키 추가하기](#인스턴스에-ssh키-추가하기)
3. [활용방안](#활용방안)

## GCP Compute Engine 소개

GCP Compute Engine은 Google Cloud Platform(GCP)에서 제공하는 가상 머신 서비스입니다. 아마존 AWS의 EC2 서비스와 비슷한 기능을 제공합니다. 사용자는 가상머신을 손쉽게 관리할 수 있고, 스케일링, 보안, 모니터링 등 다양한 도구를 지원합니다.

## Google API Client Library 소개

Google API Client Library를 사용하면 파이썬으로 Compute Engine을 쉽게 다룰 수 있습니다. 이 라이브러리를 통해 인스턴스의 CRUD 작업을 실행할 수 있고, 코드로 실행하기 때문에 자동화가 가능합니다.

### 인스턴스 CRUD

```
from googleapiclient import discovery
from oauth2client.client import GoogleCredentials

# Google Cloud 인증 정보를 얻습니다.
credentials = GoogleCredentials.get_application_default()

# Compute Engine API 클라이언트를 생성합니다.
service = discovery.build('compute', 'v1', credentials=credentials)

project = 'your-project-id'  # 프로젝트 ID를 입력합니다.
zone = 'asia-northeast3-a'   # 사용 중인 존을 입력합니다.

# 인스턴스 생성 코드 예제
instance_body = {
    'name': 'instance-name',
    'machineType': f'zones/{zone}/machineTypes/n1-standard-1', # 머신 타입 설정 가능
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


# 인스턴스 읽기 코드 예제
instance_name = 'instance-name'
request = service.instances().get(project=project, zone=zone, instance=instance_name)
response = request.execute()
print(response)


# 인스턴스 업데이트 코드 예제
instance_body = {
    'description': 'Updated instance'
}

request = service.instances().setMetadata(project=project, zone=zone, instance=instance, body=instance_body)
response = request.execute()
print(response)


# 인스턴스 삭제 코드 예제
instance_name = 'instance-name'
request = service.instances().delete(project=project, zone=zone, instance=instance_name)
response = request.execute()
print(response)
```

### 인스턴스 리스트 가져오기
```
from googleapiclient import discovery
from oauth2client.client import GoogleCredentials

# Google Cloud 인증 정보를 얻습니다.
credentials = GoogleCredentials.get_application_default()

# Compute Engine API 클라이언트를 생성합니다.
service = discovery.build('compute', 'v1', credentials=credentials)

project = 'your-project-id'  # 프로젝트 ID를 입력합니다.
zone = 'asia-northeast3-a'   # 사용 중인 존을 입력합니다.

# 인스턴스 목록을 가져오는 요청을 만듭니다.
request = service.instances().list(project=project, zone=zone)

# 요청을 실행하여 응답을 얻습니다.
response = request.execute()

# 인스턴스 목록을 출력합니다.
if 'items' in response:
    for instance in response['items']:
        print('Instance name:', instance['name'])
        print('Instance status:', instance['status'])
        print('Instance zone:', instance['zone'])
        print()
else:
    print('No instances found.')
```

### 인스턴스에 SSH키 추가하기
```
from googleapiclient import discovery
from google.oauth2 import service_account

# Google Cloud 인증 정보를 얻습니다.
credentials = GoogleCredentials.get_application_default()

# Compute Engine API 클라이언트를 생성합니다.
service = discovery.build('compute', 'v1', credentials=credentials)

project = 'your-project-id'  # 프로젝트 ID를 입력합니다.
zone = 'asia-northeast3-a'   # 사용 중인 존을 입력합니다.

# 공개 키 읽기
with open('public-key-path', 'r') as f:
    public_key = f.read().strip()

# 인스턴스의 현재 메타데이터 가져오기
instance = compute.instances().get(project=PROJECT_ID, zone=ZONE, instance=INSTANCE_NAME).execute()
metadata = instance.get('metadata', {})
items = metadata.get('items', [])

# SSH 키 메타데이터 추가
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

# 메타데이터 업데이트 요청
operation = compute.instances().setMetadata(
    project=PROJECT_ID,
    zone=ZONE,
    instance=INSTANCE_NAME,
    body=metadata
).execute()

print(f"Updating metadata for {INSTANCE_NAME}: {operation['name']}")
```

## 활용방안

- **자동화된 인스턴스 관리**: 콘솔에서 수동으로 인스턴스를 관리하는 대신, 코드를 사용해 관리를 자동화하여 효율성을 증가시킬 수 있습니다.
- **리소스 최적화**: 필요할때만 인스턴스를 생성하고 이후 삭제하는 등 비용 효율적인 기능을 만들 수 있습니다.