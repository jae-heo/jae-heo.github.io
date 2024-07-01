---
layout: post
title: "테라폼 소개"
subtitle: "IaC - 코드로 인프라를 다루다"
date: 2024-06-23 14:00:00 +0900
last_modified_at: 2024-06-23 14:00:00 +0900
categories: ["tutorial"]
tags: ["terraform", "infra"]
lang: ko
---

## 목차
1. [Terraform 소개](#terraform-소개)
   - [테라폼이란?](#테라폼이란)
   - [사용하는 이유](#사용하는-이유)
   - [주요 키워드](#주요-키워드)
2. [시작하기](#시작하기)
   - [테라폼 설치하기](#테라폼-설치하기)
   - [테라폼 세팅](#테라폼-세팅)
3. [테라폼 기본 개념](#테라폼-기본-개념)
   - [테라폼 구성 파일 이해하기](#테라폼-구성-파일-이해하기)
   - [주요 요소](#주요-요소)
   - [코드 예시](#코드-예시)
4. [의존성 관리](#의존성-관리)
   - [암묵적 의존성](#암묵적-의존성)
   - [명시적 의존성](#명시적-의존성)
5. [상태 관리](#상태-관리)
   - [테라폼의 상태란?](#테라폼의-상태란)
6. [인프라 프로비저닝](#인프라-프로비저닝)
   - [구성 적용 및 삭제](#구성-적용-및-삭제)
   - [주요 명령어](#주요-명령어)
   - [오류 처리 및 디버깅](#오류-처리-및-디버깅)
7. [고급 개념](#고급-개념)
   - [모듈: 재사용 가능한 구성](#모듈-재사용-가능한-구성)
   - [작업 공간: 여러 환경 관리](#작업-공간-여러-환경-관리)
8. [베스트 프랙티스](#베스트-프랙티스)
   - [깨끗하고 유지 보수 가능한 코드 작성하기](#깨끗하고-유지-보수-가능한-코드-작성하기)
   - [테라폼 코드의 버전 관리](#테라폼-코드의-버전-관리)
   - [팀 협업](#팀-협업)
9. [통합](#통합)
   - [테라폼과 CI/CD 파이프라인 통합](#테라폼과-cicd-파이프라인-통합)
10. [결론](#결론)

<br>
<br>

## Terraform 소개

### 테라폼이란?

테라폼은 인프라를 코드로 관리(Infrastructure as Code)할 수 있도록 도와주는 오픈 소스입니다. HashiCorp에서 개발한 테라폼은 클라우드 서비스 제공업체(AWS, Azure, GCP 등)의 인프라를 프로그래밍 방식으로(programatically) 설정하고 관리할 수 있게 해줍니다. 단순 클라우드 환경뿐만 아니라 온프레미스(on-premise) 환경에서도 구성이 가능합니다.

### 사용하는 이유

**자동화**: 테라폼을 사용하면 인프라 설정을 코드로 작성하여 자동으로 배포할 수 있어, 수작업으로 인한 실수를 줄이고 일관성을 유지할 수 있습니다.

**효율성**: 복잡한 인프라를 쉽게 관리하고 배포 시간을 단축할 수 있습니다. 한 번 작성한 코드를 여러 환경에 재사용할 수 있어 효율성이 높아집니다.

**버전 관리**: 테라폼 구성 파일은 코드로 관리되므로 Git과 같은 버전 관리 시스템을 사용할 수 있습니다.

**코드 리뷰**: 리뷰를 통해 팀원간 소통, 검토 및 승인이 이루어질 수 있습니다.

### 주요 키워드

**프로바이더(Providers)**: AWS, Azure, GCP 등 다양한 클라우드와 통합을 지원합니다. 프로바이더는 특정 클라우드 서비스와 상호작용할 수 있는 API를 제공합니다.

**모듈(Modules)**: 파이썬의 모듈과 거의 같은 역할을 합니다. 테라폼 모듈을 사용하면 코드 재사용이 가능하며, 복잡한 인프라를 여러 작은 단위로 나누어 관리할 수 있습니다. 모듈은 쉽게 공유하고 버전 관리를 할 수 있습니다.

**상태 파일(State Files)**: 테라폼은 인프라의 현재 상태를 저장하는 상태 파일을 사용하여 변경 사항을 추적하고 관리합니다. 이를 통해 인프라의 드리프트(설정 불일치)를 감지하고 수정할 수 있습니다.

**계획 및 적용(Plan and Apply)**: terraform plan 명령어를 사용하여 변경 사항을 미리 검토하고, terraform apply 명령어를 통해 실제로 적용할 수 있습니다. 이를 통해 배포 전에 어떤 변경이 일어날지 확인할 수 있습니다.

**워크스페이스(Workspaces)**: 테라폼 워크스페이스를 사용하면 동일한 구성을 여러 환경(개발, 스테이징, 프로덕션)에서 쉽게 사용할 수 있습니다.

<br>
<br>

## 시작하기

### 테라폼 설치하기

아래 다운로드 페이지를 참고하여 자신의 OS에 맞게 테라폼을 설치합니다.<br>[테라폼 공식 다운로드 페이지](https://developer.hashicorp.com/terraform/install?product_intent=terraform){:target="_blank"}

### 테라폼 세팅

사용하고자 하는 프로바이더 (GCP/AWS/AZURE 등)을 위해 초기 세팅을 진행합니다.<br>GCP를 예시로 세팅하는 방법을 설명드리겠습니다.

1. Google Cloud Console에서 Project 생성 및 Service Key 발급
2. gcloud cli설치 [gcloud cli 공식문서](https://cloud.google.com/sdk/docs/install?hl=ko){:target="_blank"}
3. 인증 정보 설정
``` bash
# 해당 명령어를 입력하면 GCP로 로그인하게되고, 이후 프로젝트 등을 설정하게됩니다.
$ gcloud auth application-default login
```

<br>
<br>

## 테라폼 기본 개념

### 테라폼 구성 파일 이해하기

앞서 테라폼은 인프라를 코드로 정의하도록 도와주는 도구라고 정의했습니다. 이때 사용하는 파일은 .tf 확장자를 가지며, HCL(HashiCorp Configuration Language)로 작성됩니다. 

### 주요 요소
**프로바이더(Provider)**: 테라폼이 상호작용할 클라우드 서비스 제공업체(AWS, Azure, GCP 등)나 다른 API의 설정을 정의합니다.

**리소스(Resource)**: 인프라의 개별 구성 요소를 정의합니다. 예를 들어, 가상 머신, 데이터베이스, 네트워크 설정 등이 포함됩니다.

**변수(Variable)**: 구성 파일 내에서 재사용할 수 있는 값을 정의합니다.

**출력(Output)**: 테라폼이 적용된 후 생성된 값들을 출력합니다.

**데이터 소스(Data Source)**: 외부에서 데이터를 가져와서 리소스를 생성하는데 사용할 수 있습니다.

### 코드 예시

다음은 간단한 테라폼 구성 파일의 예시입니다. 이 예제에서는 GCP에서 Compute Engine 인스턴스를 생성하는 방법을 보여줍니다.

#### Provider 및 Resource
``` hcl
# GCP Provider를 설정합니다.
# 프로바이더는 테라폼이 상호작용할 수 있는 외부 시스템(API)을 정의합니다. 
# 각 프로바이더는 특정 클라우드 서비스(GCP 등) 또는 기타 API와의 통합을 제공합니다.
# 테라폼은 프로바이더를 통해 해당 서비스의 리소스를 관리할 수 있습니다.
provider "google" {
  credentials = file("<path-to-your-service-account-key>.json")
  project     = "<your-gcp-project-id>"
  location      = "us-central1"
}

# GCP Provider에서 제공하는 google_compute_instance 리소스를 정의합니다.
# 리소스는 테라폼 구성의 기본 단위입니다. 
# 리소스는 클라우드 인프라의 특정 요소를 나타내며, 예를 들어 가상 머신, 데이터베이스, 네트워크 설정 등을 포함합니다. 
# 각 리소스는 특정 프로바이더와 연결되며, 리소스 블록 내에서 필요한 속성을 정의합니다.
resource "google_compute_instance" "default" {
  name         = "vm-instance"
  machine_type = "n1-standard-1"
  zone         = "us-central1-a"

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-9"
    }
  }

  network_interface {
    network = "default"
    access_config {
    }
  }
}
```

#### Variables
variables.tf 파일에 변수를 정의합니다.
``` hcl
variable "project_id" {
  description = "The GCP project ID"
  type        = string
}

variable "region" {
  description = "The GCP region"
  type        = string
  default     = "us-central1"
}

variable "instance_name" {
  description = "The name of the compute instance"
  type        = string
}
```
정의된 변수를 main.tf파일에서 사용할 수 있습니다.
``` hcl
provider "google" {
  credentials = file("<path-to-your-service-account-key>.json")
  project     = var.project_id
  region      = var.region
}

resource "google_compute_instance" "default" {
  name         = var.instance_name
  machine_type = "n1-standard-1"
  zone         = "${var.region}-a"

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-9"
    }
  }

  network_interface {
    network = "default"
    access_config {
    }
  }
}
```
변수값 설정은 terraform.tfvars파일 또는 명령어에서 전달할 수 있습니다.
``` hcl
project_id     = "your-gcp-project-id"
instance_name  = "vm-instance"
```

#### Output
출력은 테라폼이 적용된 후 생성된 값을 출력하는데 사용됩니다. 이를 통해 중요한 정보를 쉽게 확인할 수 있습니다.
``` hcl
output "instance_ip" {
  description = "The IP address of the compute instance"
  value       = google_compute_instance.default.network_interface[0].access_config[0].nat_ip
}
```
명령어 terraform apply 명령어를 실행한 후 출력된 값을 확인할 수 있습니다.
``` sh
Outputs:
instance_ip = "34.68.194.64"
```

#### Datasource
데이터 소스는 외부에서 데이터를 가져와서 리소스를 생성하는 데 사용할 수 있습니다. 예를 들어, 이미 존재하는 리소스를 조회하거나 다른 API에서 데이터를 가져올 수 있습니다.
``` hcl
# 예를 들어, GCP 프로젝트의 현재 사용 가능한 네트워크를 
# 가져오고 이를 사용하여 인스턴스를 생성할 수 있습니다.
data "google_compute_network" "default" {
  name = "default"
}

resource "google_compute_instance" "default" {
  name         = var.instance_name
  machine_type = "n1-standard-1"
  zone         = "${var.region}-a"

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-9"
    }
  }

  network_interface {
    network = data.google_compute_network.default.name
    access_config {
    }
  }
}
# 이 예시에서 data "google_compute_network" "default"는 GCP의 기본 네트워크 정보를 가져와서
# google_compute_instance 리소스에서 사용합니다.

# 위의 예시들을 통해 테라폼의 변수, 출력, 데이터 소스를 사용하는 방법을 이해할 수 있습니다.
# 이를 활용하여 테라폼 구성 파일을 더욱 유연하고 재사용 가능하게 만들 수 있습니다.
```

<br>
<br>

## 의존성 관리
테라폼에서 의존성이란, 테라폼 구성 요소 간의 순서를 정의하여 리소스가 올바른 순서로 생성, 수정 또는 삭제되도록 하는 것을 의미합니다. 테라폼은 기본적으로 리소스 간의 종속성을 자동으로 감지하지만, 특정 상황에서는 명시적으로 의존성을 정의해야 할 때도 있습니다.

### 암묵적 의존성
테라폼은 리소스 간의 암묵적 의존성을 자동으로 관리합니다. 예를 들어, 한 리소스의 속성이 다른 리소스의 출력 값을 참조할 때, 테라폼은 자동으로 종속성을 인식합니다.

예시
``` hcl
resource "google_compute_network" "default" {
  name = "my-network"
}

resource "google_compute_subnetwork" "subnet" {
  name          = "my-subnet"
  ip_cidr_range = "10.0.0.0/16"
  region        = "us-central1"
  network       = google_compute_network.default.name
}

# 예시에서 google_compute_subnetwork 리소스는 
# google_compute_network 리소스를 참조하고 있으므로, 
# 테라폼은 네트워크가 먼저 생성된 후 서브네트워크가 생성되도록 합니다.
```

### 명시적 의존성
경우에 따라서는 테라폼이 의존성을 자동으로 감지하지 못할 때도 있습니다. 이럴 때는 depends_on 인수를 사용하여 명시적으로 의존성을 정의할 수 있습니다.
``` hcl
resource "google_compute_network" "default" {
  name = "my-network"
}

resource "google_compute_subnetwork" "subnet" {
  name          = "my-subnet"
  ip_cidr_range = "10.0.0.0/16"
  region        = "us-central1"
  network       = google_compute_network.default.name
}

resource "google_compute_instance" "default" {
  name         = "vm-instance"
  machine_type = "n1-standard-1"
  zone         = "us-central1-a"

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-9"
    }
  }

  network_interface {
    network = google_compute_network.default.name
  }

  depends_on = [google_compute_subnetwork.subnet]
}
# 예시에서 google_compute_instance 리소스는 
# google_compute_subnetwork 리소스에 명시적으로 의존함을 나타냅니다. 
# 따라서 서브네트워크가 생성된 후에 인스턴스가 생성됩니다.
```

<br>
<br>

## 상태 관리
상태 파일은 관리되는 인프라의 현재 상태를 추적하고 저장하는 데 사용됩니다. 이를 통해 테라폼은 인프라의 변경 사항을 감지하고, 필요한 작업을 효율적으로 수행할 수 있습니다.

### 테라폼의 상태란?
테라폼 상태는 테라폼이 인프라의 현재 상태를 저장하는 방법입니다. 상태 파일(terraform.tfstate)은 테라폼이 관리하는 모든 리소스의 정보를 포함하고 있으며, 테라폼이 인프라의 현재 상태와 구성 파일을 비교하여 필요한 변경 사항을 결정할 수 있도록 합니다. 상태 파일은 테라폼이 리소스의 속성을 추적하고, 인프라 변경 사항을 관리하는 데 사용됩니다.

상태 파일은 다음과 같은 정보를 포함합니다:
- 테라폼이 생성한 모든 리소스의 현재 상태
- 리소스의 속성과 관련된 메타데이터
- 리소스 간의 종속성 정보

테라폼 상태 파일을 적절하게 관리하는 것은 매우 중요합니다. 기본적으로 테라폼은 상태 파일을 로컬 디렉토리에 저장하지만, 여러 팀원과 협업하거나 인프라를 보다 효율적으로 관리하기 위해 원격 상태 저장소를 사용하는 것이 좋습니다.

<br>
<br>

## 인프라 프로비저닝
테라폼을 사용하여 인프라를 프로비저닝할 때, 구성 파일을 적용하여 리소스를 생성하거나 업데이트하고, 필요하지 않은 리소스를 삭제할 수 있습니다.

- **구성 적용**: `terraform apply` 명령어를 사용하여 테라폼 구성 파일에 정의된 리소스를 생성하거나 업데이트합니다. 이 명령어는 구성 파일을 읽고, 현재 상태와 비교하여 필요한 변경 사항을 적용합니다.
- **구성 삭제**: `terraform destroy` 명령어를 사용하여 테라폼 구성 파일에 정의된 모든 리소스를 삭제합니다. 이는 테스트 환경이나 임시 환경을 정리할 때 유용합니다.

### 주요 명령어

테라폼에서 자주 사용하는 주요 명령어는 다음과 같습니다:

- **terraform init**: 테라폼 초기화를 수행합니다. 이 명령어는 필요한 플러그인과 모듈을 다운로드하고, 백엔드를 구성하여 상태 파일을 초기화합니다.
  ```sh
  terraform init
  ```

- **terraform plan**: 테라폼 계획을 생성합니다. 이 명령어는 구성 파일을 분석하여 현재 상태와 비교한 후, 적용할 변경 사항을 미리 보여줍니다.
  ```sh
  terraform plan
  ```

- **terraform apply**: 테라폼 계획을 적용하여 리소스를 생성하거나 업데이트합니다. 이 명령어는 `terraform plan`에서 생성한 실행 계획을 실제로 실행합니다.
  ```sh
  terraform apply
  ```

- **terraform destroy**: 테라폼 리소스를 삭제합니다. 이 명령어는 구성 파일에 정의된 모든 리소스를 제거합니다.
  ```sh
  terraform destroy
  ```

### 오류 처리 및 디버깅

테라폼을 사용하면서 발생할 수 있는 오류를 처리하고 디버깅하는 방법은 다음과 같습니다:

- **오류 메시지 분석**: 테라폼이 제공하는 오류 메시지를 주의 깊게 읽고, 문제의 원인을 파악합니다.
- **로그 확인**: `TF_LOG` 환경 변수를 설정하여 디버그 로그를 활성화합니다. 예를 들어, `export TF_LOG=DEBUG` 명령어를 사용하여 디버그 로그를 확인할 수 있습니다.
- **테라폼 커뮤니티**: 테라폼 포럼, GitHub 이슈 트래커, Stack Overflow 등에서 비슷한 문제를 겪는 사람들의 해결 방법을 찾아보거나 직접 질문을 올려 도움을 받을 수 있습니다.
- **코드 검토**: 구성 파일을 다시 검토하여 문법 오류나 잘못된 참조가 없는지 확인합니다.
- **테라폼 문서 확인**: 테라폼 공식 문서나 프로바이더 문서를 참조하여 올바른 사용법을 확인합니다.

<br>
<br>

## 고급 개념

### 모듈: 재사용 가능한 구성

모듈은 테라폼 구성 요소를 재사용 가능하게 만드는 방법입니다. 모듈을 사용하면 복잡한 인프라 구성을 여러 개의 작은 단위로 나누어 관리할 수 있습니다. 이를 통해 코드의 재사용성과 유지보수성을 높일 수 있습니다.

**모듈 예시**

모듈을 정의하려면, 별도의 디렉토리에 테라폼 구성 파일을 작성합니다.

**디렉토리 구조**
```
modules/
  vpc/
    main.tf
    variables.tf
    outputs.tf
```

**modules/vpc/main.tf**
```hcl
resource "google_compute_network" "vpc_network" {
  name = var.network_name
}

output "network_name" {
  value = google_compute_network.vpc_network.name
}
```

**main.tf**
```hcl
module "vpc" {
  source       = "./modules/vpc"
  network_name = "my-vpc-network"
}
```

### 작업 공간: 여러 환경 관리

테라폼 작업 공간(Workspaces)을 사용하면 동일한 구성을 여러 환경에서 쉽게 사용할 수 있습니다. 작업 공간을 통해 개발, 테스트, 프로덕션 환경을 분리하여 관리할 수 있습니다.

**작업 공간 명령어**
- **작업 공간 생성**: 새로운 작업 공간을 생성합니다.
  ```sh
  terraform workspace new dev
  ```

- **작업 공간 전환**: 특정 작업 공간으로 전환합니다.
  ```sh
  terraform workspace select dev
  ```

- **작업 공간 목록 조회**: 현재 사용 가능한 작업 공간 목록을 조회합니다.
  ```sh
  terraform workspace list
  ```

<br>
<br>

## BP

### 깨끗하고 유지 보수 가능한 코드 작성하기

테라폼 코드 작성 시, 코드의 가독성과 유지보수성을 높이기 위해 다음과 같은 원칙을 따르는 것이 좋습니다:

1. **모듈화**: 인프라 구성 요소를 모듈로 나누어 재사용 가능하고 관리하기 쉽게 만듭니다. 각 모듈은 독립적으로 작동하며, 특정 기능을 수행하는 데 집중합니다.
2. **주석 달기**: 코드에 주석을 추가하여 다른 개발자나 미래의 자신이 코드를 쉽게 이해할 수 있도록 합니다. 주석은 코드의 의도와 동작을 설명하는 데 사용됩니다.
3. **일관된 코드 스타일**: 팀 내에서 일관된 코드 스타일을 유지합니다. 테라폼의 HCL(HashiCorp Configuration Language)은 간단한 구조를 가지므로, 변수 이름, 들여쓰기, 줄 바꿈 등의 스타일 가이드라인을 정하고 따릅니다.
4. **변수와 출력 사용**: 변수를 사용하여 반복되는 값을 중앙에서 관리하고, 출력값을 통해 중요한 정보를 쉽게 확인할 수 있도록 합니다.

### 테라폼 코드의 버전 관리

테라폼 코드를 버전 관리 시스템(Git 등)을 사용하여 관리하면 변경 사항을 추적하고, 협업을 쉽게 할 수 있습니다.

1. **Git 사용**: 테라폼 코드를 Git 저장소에 저장하고, 변경 사항을 커밋합니다. 이를 통해 코드의 히스토리를 추적할 수 있습니다.
   ```sh
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **브랜치 전략**: 기능별로 브랜치를 나누어 작업합니다. 예를 들어, 새로운 기능 추가나 버그 수정을 위한 브랜치를 만들고, 작업이 완료되면 메인 브랜치에 병합합니다.
   ```sh
   git checkout -b feature/new-feature
   ```

3. **코드 리뷰**: Pull Request를 통해 코드 리뷰를 진행하여 품질을 유지하고, 팀 내에서 코드에 대한 이해를 공유합니다.

### 팀 협업

테라폼을 사용하는 팀은 다음과 같은 방법으로 협업할 수 있습니다:

1. **표준화된 구성**: 팀 내에서 표준화된 테라폼 모듈과 구성 파일을 사용하여 일관성을 유지합니다.
2. **문서화**: 테라폼 코드와 인프라 구성을 문서화하여 팀원들이 쉽게 이해하고 사용할 수 있도록 합니다.
3. **상호 검토**: 정기적인 코드 리뷰를 통해 팀원 간의 코드 품질을 유지하고, 모범 사례를 공유합니다.

<br>
<br>

## 통합

### 테라폼과 CI/CD 파이프라인 통합

테라폼을 CI/CD 파이프라인에 통합하면 인프라 배포를 자동화하고, 변경 사항을 효율적으로 관리할 수 있습니다.

1. **CI/CD 도구 선택**: Jenkins, GitLab CI, GitHub Actions 등과 같은 CI/CD 도구를 선택합니다.
2. **파이프라인 설정**: 테라폼 명령어(`terraform init`, `terraform plan`, `terraform apply`)를 포함한 파이프라인을 설정하여 코드 변경 시 자동으로 인프라를 배포합니다.

**예시: GitHub Actions**

```yaml
name: Terraform

on:
  push:
    branches:
      - main

jobs:
  terraform:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Set up Terraform
      uses: hashicorp/setup-terraform@v1

    - name: Terraform Init
      run: terraform init

    - name: Terraform Plan
      run: terraform plan

    - name: Terraform Apply
      if: github.ref == 'refs/heads/main'
      run: terraform apply -auto-approve
```

<br>
<br>

## 결론
테라폼은 인프라를 코드로 관리(Infrastructure as Code)할 수 있도록 도와주는 강력한 도구입니다. 이를 통해 다양한 클라우드 환경에서 인프라를 효율적으로 생성, 관리, 삭제할 수 있습니다.