---
layout: post
title: "코드로 다루는 GCP"
subtitle: "파이썬을 이용해 GCP 조작하기"
date: 2024-06-16 14:00:00 +0900
last_modified_at: 2024-07-07 14:00:00 +0900
categories: ["tutorial"]
tags: ["gcp", "infra", "python"]
lang: ko
---

## 목차

1. [소개](#소개)
   - [사전 준비](#사전-준비)
     1. [Google Cloud SDK 설치](#google-cloud-sdk-설치)
     2. [서비스 계정 생성 및 키 파일 다운로드](#서비스-계정-생성-및-키-파일-다운로드)

2. [Compute Engine](#compute-engine)
   - [인스턴스 CRUD](#인스턴스-crud)
     - [인스턴스 생성 코드 예제](#인스턴스-생성-코드-예제)
     - [인스턴스 읽기 코드 예제](#인스턴스-읽기-코드-예제)
     - [인스턴스 업데이트 코드 예제](#인스턴스-업데이트-코드-예제)
     - [인스턴스 삭제 코드 예제](#인스턴스-삭제-코드-예제)
   - [인스턴스 리스트 가져오기](#인스턴스-리스트-가져오기)
   - [인스턴스에 SSH키 추가하기](#인스턴스에-ssh키-추가하기)

3. [Cloud Storage (GCS)](#cloud-storage-gcs)
   - [버킷 생성 및 삭제](#버킷-생성-및-삭제)
     - [버킷 생성 코드 예제](#버킷-생성-코드-예제)
     - [버킷 삭제 코드 예제](#버킷-삭제-코드-예제)
   - [객체 업로드 및 다운로드](#객체-업로드-및-다운로드)
     - [객체 업로드 코드 예제](#객체-업로드-코드-예제)
     - [객체 다운로드 코드 예제](#객체-다운로드-코드-예제)
   - [객체 리스트 가져오기](#객체-리스트-가져오기)

4. [Cloud Run](#cloud-run)
   - [라이브러리 설치](#라이브러리-설치)
   - [서비스 배포](#서비스-배포)
     - [서비스 배포 코드 예제](#서비스-배포-코드-예제)
   - [서비스 업데이트](#서비스-업데이트)
     - [서비스 업데이트 코드 예제](#서비스-업데이트-코드-예제)
   - [서비스 삭제](#서비스-삭제)
     - [서비스 삭제 코드 예제](#서비스-삭제-코드-예제)


<br>
<br>

## 소개

파이썬 코드를 이용해 GCP를 다루는 방법을 소개합니다. 대부분의 설정이 실제 콘솔에서 하는 작업과 유사하며, 코드로만 이해가 가지 않는다면 콘솔에서 직접 실행해보는것을 추천드립니다.

### 사전 준비
1. **Google Cloud SDK 설치**
   ```bash
   curl https://sdk.cloud.google.com | bash
   exec -l $SHELL
   gcloud init
   ```

2. **서비스 계정 생성 및 키 파일 다운로드**
   - Google Cloud Console에서 서비스 계정을 생성하고 JSON 키 파일을 다운로드합니다.
   - 환경 변수 설정:
     ```bash
     export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your-service-account-file.json"
     ```

<br>
<br>

## Compute Engine

GCP Compute Engine은 Google Cloud Platform(GCP)에서 제공하는 가상 머신 서비스입니다. 아마존 AWS의 EC2 서비스와 비슷한 기능을 제공합니다. 사용자는 가상머신을 손쉽게 관리할 수 있고, 스케일링, 보안, 모니터링 등 다양한 도구를 지원합니다.

### 인스턴스 CRUD

Google API Client Library를 사용하면 파이썬으로 Compute Engine을 쉽게 다룰 수 있습니다. 이 라이브러리를 통해 인스턴스의 CRUD 작업을 실행할 수 있고, 코드로 실행하기 때문에 자동화가 가능합니다.


```python
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
```python
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
```python
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

<br>
<br>

## Cloud Storage (GCS)

Google Cloud Storage (GCS)는 GCP에서 제공하는 객체 스토리지 서비스입니다. 대규모 데이터를 저장하고 관리할 수 있습니다.

### 버킷 생성 및 삭제

#### 버킷 생성 코드 예제
```python
from google.cloud import storage

# 클라이언트를 생성합니다.
client = storage.Client()

# 버킷 이름과 지역을 지정합니다.
bucket_name = 'your-bucket-name'
location = 'asia-northeast3'

# 버킷을 생성합니다.
bucket = client.bucket(bucket_name)
bucket.location = location
bucket = client.create_bucket(bucket)

print(f'Bucket {bucket_name} created in {location}.')
```

#### 버킷 삭제 코드 예제
```python
from google.cloud import storage

# 클라이언트를 생성합니다.
client = storage.Client()

# 삭제할 버킷 이름을 지정합니다.
bucket_name = 'your-bucket-name'

# 버킷을 가져옵니다.
bucket = client.bucket(bucket_name)

# 버킷을 삭제합니다.
bucket.delete()

print(f'Bucket {bucket_name} deleted.')
```

### 객체 업로드 및 다운로드

Google Cloud Storage에 객체를 업로드하고 다운로드하는 방법에 대해 설명합니다.

#### 객체 업로드 코드 예제
```python
from google.cloud import storage

# 클라이언트를 생성합니다.
client = storage.Client()

# 버킷 이름과 업로드할 파일 경로를 지정합니다.
bucket_name = 'your-bucket-name'
source_file_name = 'local-file-path'
destination_blob_name = 'storage-object-name'

# 버킷을 가져옵니다.
bucket = client.bucket(bucket_name)

# Blob 객체를 생성하고 파일을 업로드합니다.
blob = bucket.blob(destination_blob_name)
blob.upload_from_filename(source_file_name)

print(f'File {source_file_name} uploaded to {destination_blob_name}.')
```

#### 객체 다운로드 코드 예제
```python
from google.cloud import storage

# 클라이언트를 생성합니다.
client = storage.Client()

# 버킷 이름과 다운로드할 객체 이름을 지정합니다.
bucket_name = 'your-bucket-name'
source_blob_name = 'storage-object-name'
destination_file_name = 'local-file-path'

# 버킷을 가져옵니다.
bucket = client.bucket(bucket_name)

# Blob 객체를 가져오고 파일을 다운로드합니다.
blob = bucket.blob(source_blob_name)
blob.download_to_filename(destination_file_name)

print(f'Blob {source_blob_name} downloaded to {destination_file_name}.')
```

### 객체 리스트 가져오기

Google Cloud Storage에서 특정 버킷의 객체 리스트를 가져오는 방법에 대해 설명합니다.

#### 객체 리스트 가져오기 코드 예제
```python
from google.cloud import storage

# 클라이언트를 생성합니다.
client = storage.Client()

# 버킷 이름을 지정합니다.
bucket_name = 'your-bucket-name'

# 버킷을 가져옵니다.
bucket = client.bucket(bucket_name)

# 객체 리스트를 가져옵니다.
blobs = bucket.list_blobs()

print('Objects in the bucket:')
for blob in blobs:
    print(blob.name)
```

<br>
<br>

## Cloud Run

Google Cloud Run은 컨테이너화된 애플리케이션을 빠르고 간편하게 배포할 수 있는 완전 관리형 서버리스 플랫폼입니다. Cloud Run을 사용하면 인프라 관리 없이 코드 실행에 집중할 수 있으며, 자동으로 확장되며 트래픽에 맞게 조정됩니다. Cloud Run을 Python 코드로 자동화하려면 Google Cloud SDK의 Python 클라이언트 라이브러리를 사용합니다.

### 라이브러리 설치

```bash
pip install google-api-python-client google-auth-httplib2 google-auth-oauthlib
```

### 서비스 배포

Cloud Run API와 Google Cloud SDK를 사용하여 Python 코드로 Cloud Run 서비스를 배포, 업데이트 및 삭제하는 방법을 보여줍니다. Docker 이미지를 빌드하고 Google Container Registry(GCR)에 푸시한 다음, 해당 이미지를 사용하여 Cloud Run 서비스를 관리할 수 있습니다.

#### 서비스 배포 코드 예제
```python
from googleapiclient.discovery import build
from google.oauth2 import service_account
import subprocess

# 서비스 계정 인증 정보 설정
credentials = service_account.Credentials.from_service_account_file(
    'path/to/your-service-account-file.json')

# Cloud Run API 클라이언트 생성
service = build('run', 'v1', credentials=credentials)

# Docker 이미지 빌드 및 푸시
def build_and_push_docker_image(image_name):
    subprocess.run(['docker', 'build', '-t', image_name, '.'])
    subprocess.run(['docker', 'push', image_name])

# 서비스 배포 함수
def deploy_service(service_name, image_name, region):
    build_and_push_docker_image(image_name)
    
    # Cloud Run 서비스 배포
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

# 변수 설정
service_name = 'your-service-name'
image_name = 'gcr.io/your-project-id/your-image-name'
region = 'your-region'

# 서비스 배포 실행
deploy_service(service_name, image_name, region)
```

### 서비스 업데이트

#### 서비스 업데이트 코드 예제
```python
# 서비스 업데이트 함수
def update_service(service_name, image_name, region):
    build_and_push_docker_image(image_name)
    
    # Cloud Run 서비스 업데이트
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

# 서비스 업데이트 실행
update_service(service_name, image_name, region)
```

### 서비스 삭제

#### 서비스 삭제 코드 예제
```python
# 서비스 삭제 함수
def delete_service(service_name, region):
    project_id = 'your-project-id'
    name = f'projects/{project_id}/locations/{region}/services/{service_name}'
    
    request = service.projects().locations().services().delete(name=name)
    response = request.execute()
    print(f'Service {service_name} deleted from region {region}.')

# 서비스 삭제 실행
delete_service(service_name, region)
```

<br>
<br>

## 이후 추가될 내용
5. [Cloud Functions](#cloud-functions)
   - [함수 배포](#함수-배포)
   - [함수 호출](#함수-호출)
   - [함수 삭제](#함수-삭제)
6. [BigQuery](#bigquery)
   - [데이터셋 생성 및 삭제](#데이터셋-생성-및-삭제)
   - [쿼리 실행](#쿼리-실행)
   - [테이블 데이터 가져오기](#테이블-데이터-가져오기)
7. [Pub/Sub](#pubsub)
   - [주제 생성 및 삭제](#주제-생성-및-삭제)
   - [메시지 발행](#메시지-발행)
   - [구독 설정 및 메시지 수신](#구독-설정-및-메시지-수신)
8. [AI Platform](#ai-platform)
   - [모델 배포](#모델-배포)
   - [예측 요청](#예측-요청)
   - [모델 삭제](#모델-삭제)
9. [Firestore](#firestore)
    - [문서 생성 및 삭제](#문서-생성-및-삭제)
    - [문서 쿼리 및 업데이트](#문서-쿼리-및-업데이트)
10. [App Engine](#app-engine)
    - [애플리케이션 배포](#애플리케이션-배포)
    - [버전 관리 및 트래픽 분배](#버전-관리-및-트래픽-분배)
11. [Cloud Dataflow](#cloud-dataflow)
    - [파이프라인 생성 및 실행](#파이프라인-생성-및-실행)
    - [작업 모니터링 및 관리](#작업-모니터링-및-관리)
12. [Cloud Translation](#cloud-translation)
    - [텍스트 번역](#텍스트-번역)
    - [다양한 언어 지원](#다양한-언어-지원)
13. [Vision AI](#vision-ai)
    - [이미지 분석 및 라벨링](#이미지-분석-및-라벨링)
    - [텍스트 인식 (OCR)](#텍스트-인식-ocr)
14. [활용 방안](#활용-방안)