import os
import shutil
import yaml
from jinja2 import Environment, FileSystemLoader

# 템플릿 로더 설정
env = Environment(loader=FileSystemLoader('templates'))

# 템플릿 파일 로드
index_template = env.get_template('index.html')
project_template = env.get_template('project_detail.html')

# 데이터 파일 로드 함수
def load_data(folder, filename):
    with open(os.path.join('data', folder, filename), 'r', encoding='utf-8') as file:
        return yaml.safe_load(file)

# 데이터 로드
data_en = load_data('en', 'index.yml')
data_ko = load_data('ko', 'index.yml')
projects_en = load_data('en', 'projects.yml')
projects_ko = load_data('ko', 'projects.yml')

# 프로젝트 상세 데이터 로드
project1_en = load_data('en', 'project1.yml')
project1_ko = load_data('ko', 'project1.yml')
project2_en = load_data('en', 'project2.yml')
project2_ko = load_data('ko', 'project2.yml')
project3_en = load_data('en', 'project3.yml')
project3_ko = load_data('ko', 'project3.yml')

# HTML 파일 생성
output_dir = 'docs'  # docs 폴더로 설정
os.makedirs(output_dir, exist_ok=True)

# 기본 index.html 파일 생성 (영어 페이지로 설정)
with open(os.path.join(output_dir, 'index.html'), 'w') as f:
    f.write(index_template.render(**data_en, projects=projects_en['projects'], lang='en'))

# 한국어 페이지 생성
with open(os.path.join(output_dir, 'index_ko.html'), 'w') as f:
    f.write(index_template.render(**data_ko, projects=projects_ko['projects'], lang='ko'))

# 프로젝트 세부 페이지 생성
with open(os.path.join(output_dir, 'project1.html'), 'w') as f:
    f.write(project_template.render(**project1_en, lang='en'))
with open(os.path.join(output_dir, 'project1_ko.html'), 'w') as f:
    f.write(project_template.render(**project1_ko, lang='ko'))

with open(os.path.join(output_dir, 'project2.html'), 'w') as f:
    f.write(project_template.render(**project2_en, lang='en'))
with open(os.path.join(output_dir, 'project2_ko.html'), 'w') as f:
    f.write(project_template.render(**project2_ko, lang='ko'))

with open(os.path.join(output_dir, 'project3.html'), 'w') as f:
    f.write(project_template.render(**project3_en, lang='en'))
with open(os.path.join(output_dir, 'project3_ko.html'), 'w') as f:
    f.write(project_template.render(**project3_ko, lang='ko'))

# CSS 파일 복사
shutil.copy('style.css', output_dir)

# Favicon 파일 복사
shutil.copy('favicon.ico', output_dir)

# 사진 파일 복사
shutil.copy('me.jpeg', output_dir)
