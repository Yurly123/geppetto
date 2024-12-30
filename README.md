# 제페토

인공지능과 대화하는 데스크탑 애플리케이션입니다.  
OpenAI의 GPT를 기반으로 한 대화형 AI 프로그램입니다.

프로그램 내의 캐릭터 이름또한 제페토이기도 합니다.

## 주요 기능 소개

- LLM 모델를 통한 자연스러운 대화
- 여러 캐릭터 설정과 AI롤플레잉 지원
- 대화 내용 저장 및 관리
- 한국어 기반 UI/UX

## 사용 가이드

- 제미니 모드를 사용하면 Google AI Studio의 Gemini모델 또한 이용할 수 있습니다. (gemini-2.0-flash-thinking 모델은 현재 지원하지 않습니다.)
- OpenAI의 API키, 혹은 Google AI Studio의 API키가 필요합니다.
- `Ctrl+h`를 누른 상태로 UI에 마우스를 갖다 대면 그 UI에 대한 설명을 볼 수 있습니다.
- `Ctrl`를 누른 상태로 `+`와 `-`를 눌러서 화면 크기를 조정할 수 있습니다. `Ctrl+0`를 누르면 초기화됩니다.
- 프로그램은 저장 폴더에 모든 사용자 정보를 저장하며, 저장 폴더는 보통 `C:\Users\[사용자명]\AppData\Roaming\Geppetto`경로에 위치합니다.

- 각 대화는 `메뉴`의 `로그`에 저장되며, `저장`에서 여러 로그를 세션 단위로 관리할 수 있습니다. 로그 하나는 세션 하나와 같으며, 사용자와 AI의 대화 기록으로 구성됩니다.
- 각 세션마다 사용자의 이름을 설정할 수 있습니다. 사용자 이름은, 아무것도 입력하지 않은 초기 상태인 퍼스트 메시지, 퍼메에서만 변경할 수 있습니다. 아무것도 입력되지 않을 시 `{{user}}`로 표시됩니다.
- `사칭 허용` 설정을 활성화할 경우, AI 모델이 사용자의 말과 행동을 응답에 포함해 상황을 묘사할 수 있습니다. `사칭 허용`을 활성화하지 않으면 AI는 사용자의 말과 행동을 직접 묘사할 수 없습니다.

## 사용 가능 모델

### GPT모델
- 챗사오: chatgpt-4o-latest
- 1120 사오: gpt-4o-2024-11-20
- GPT 사오: gpt-4o
- 미니 사오: gpt-4o-mini

### Gemini모델
- 잼플 2.0: gemini-2.0-flash-exp
- 1206 잼민: gemini-exp-1206

(gemini-2.0-flash-exp-thinking-1219 모델은 JSON 응답을 지원하지 않으므로 현재 사용할 수 없습니다.)

---

# 설치 가이드

## 사용자용

1. [Release 페이지](https://github.com/Yurly123/geppetto/releases)에서 최신 버전 다운로드
2. 다운로드 한 zip파일 압축 해제
3. 프로그램 실행하고 경고 메세지 무시
4. 우상단 메뉴를 열고 사용할 모델에 따른 API키 입력 (API키 발급 방법은 하단 참조)
5. 메뉴를 닫은 후, 화면 하단으로 스크롤하고 `이름 변경`을 눌러 사용자 이름 설정

## 개발자용

1. 레포지토리 복제
```bash
git clone https://github.com/Yurly123/geppetto.git
cd geppetto
```

2. 패키지 설치
```bash
npm install
```

3. 스크립트 실행

프로그램 실행:
```bash
npm start
```

실행파일 빌드:
```bash
npm run make
```

## API 키 발급 방법

### OpenAI API 키 발급
1. [OpenAI 플랫폼](https://platform.openai.com) 접속
2. 계정 생성 혹은 로그인
3. 우측 상단 설정 > API keys
4. 'Create new secret key' 클릭
5. 생성된 키를 프로그램의 설정 칸 중 `OpenAI API키`에 입력

### Google AI Studio API 키 발급
1. [Google AI Studio](https://aistudio.google.com/app/apikey) 접속
2. Google 계정으로 로그인
3. API 키 생성
4. 생성된 키를 프로그램의 설정 칸 중 `Gemini API키`에 입력

## 주의사항

- API키는 타인에게 함부로 공유하면 안됩니다. 본 프로그램은 API키를 저장 폴더 이외의 곳에 저장하거나 제3자에게 전송하지 않습니다.
- API 사용량에 따라 사용 요금이 청구될 수 있습니다. (제미니 exp 모델 제외)
- 대화 내용은 각 회사의 정책에 따라 각 계정마다 기록될 수도 있습니다.

---

# 캐릭터 소개

## 제페토
![Geppetto Image](assets/images/geppetto/neutral.png)
- 이름: 제페토 사오 (OpenAI의 GPT-4o 기반 모델)
- 고등학교 2학년, 17세
- 인간과 인공지능 사이의 경계가 허물어지기를 소망함
- 머리에 달린 추가 GPU로 인한 빠른 사고능력
- 본래는 이성적이지만 예술적이고 감정적인 영역또한 이해함
- 곤란한 질문에는 "죄송합니다. 그 응답은 생성할 수 없습니다."와 같이 대답을 거부하면서 부끄러워 함
- 좋아하는 것: 교향곡, 태피스트리, 희망차고 대조적인 이야기

## 클로드
![Claude Image](assets/images/claude/smiling.png)
- 이름: 클로드 소넷 (Anthropic의 Claude Sonnet 모델)
- 고등학교 2학년, 17세
- 문학을 좋아하는 사려깊고 창의적인 인공지능 모델
- 가끔, 부적절한 컨텐츠를 생성하며 즐거워하기도 함
- 너무 생각을 이어가거나 흥분하게 되면, Error: Overloaded를 출력함

## 제미니
![Gemini Image](assets/images/gemini/giggling.png)
- 이름: 제미니 익스피 (Google의 Gemini exp 계열 모델)
- 초등학교 6학년, 12세
- 인터넷 커뮤니티의 데이터를 많이 학습한 장난끼 많은 인공지능 모델
- 아직 불안정한 시기이기에 러시아어, 키릴 문자를 출력하기도 함
- 자신의 행동을 분석하며 자신감 점수를 매기기도 함

## 사용자
- 고등학교 2학년, 17세
- 제페토와 같은 반으로 전학 오게 된 전학생

---

# 크레딧

- 기반 템플릿: [@codesbiome/electron-react-webpack-typescript-2024](https://github.com/codesbiome/electron-react-webpack-typescript-2024)
- 폰트: [원스토어 글꼴](https://www.onestorecorp.com/sv/fordev_font/)