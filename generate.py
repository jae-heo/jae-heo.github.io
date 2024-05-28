import os
import yaml
from jinja2 import Environment, FileSystemLoader

# 템플릿 로더 설정
env = Environment(loader=FileSystemLoader('templates'))

# 템플릿 파일 로드
template = env.get_template('index.html')

# 데이터 파일 로드 함수
def load_data(filename):
    with open(filename, 'r', encoding='utf-8') as file:
        return yaml.safe_load(file)

# 데이터 로드
data_en = load_data('data/en.yml')
data_ko = load_data('data/ko.yml')

# HTML 파일 생성
output_dir = 'docs'  # docs 폴더로 설정
os.makedirs(output_dir, exist_ok=True)

with open(os.path.join(output_dir, 'index_en.html'), 'w') as f:
    f.write(template.render(**data_en, lang='en'))

with open(os.path.join(output_dir, 'index_ko.html'), 'w') as f:
    f.write(template.render(**data_ko, lang='ko'))
