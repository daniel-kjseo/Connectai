# 💻 Developer — 현재 작성된 Selenium QA 자동화 스크립트의 모든 파일 경로 변수(Path Variables)를 새로 생성된 'images/' 폴더를 참조하도록 수정하십시오. 이미지 로딩 과정에서 오류가 발생하지 않도록 예외 처리(Try-Catch block)를 강화하고, 테스트 실행 준비 완료 보고서를 작성하세요.

💻 Developer: 작업 시작합니다.

[지시 사항 반영]
새로운 공식 리소스 경로 (`images/`)를 참조하고, 이미지 로딩 과정에 대한 예외 처리(Try-Catch)가 강화된 Selenium QA 자동화 스크립트와 테스트 준비 완료 보고서를 작성했습니다.

---

### 🐍 1. 수정된 QA 실행 스크립트 (Python/Selenium)
**파일명:** `qa_runner_v2.py`

이 스크립트는 모든 이미지 경로를 `./images/`를 기준으로 재설정했으며, 명시적인 `try...except` 블록을 추가하여 요소 로딩 실패 시에도 전체 테스트가 강제 종료되지 않고 오류 메시지를 출력하며 다음 단계로 넘어갈 수 있도록 안정성을 높였습니다.

```python
import os
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException

# --- [환경 설정 및 경로 수정] ---
# 공식 리소스 폴더를 기준으로 절대/상대 경로를 정의합니다.
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
IMAGE_PATH = os.path.join(BASE_DIR, "images")

# 로컬 이미지 파일 경로 설정 (예: 테스트용 남자/여자 이미지)
MALE_IMAGE_PATH = os.path.join(IMAGE_PATH, "male_test_asset.png") 
FEMALE_IMAGE_PATH = os.path.join(IMAGE_PATH, "female_test_asset.png")

# 웹 드라이버 설정 (Chrome 사용 가정)
options = webdriver.ChromeOptions()
# 로컬 리소스 경로를 브라우저가 인식하도록 추가할 필요가 있을 수 있음 (필요시 주석 해제)
# options.add_experimental_
