# 제페토

인공지능과 대화하는 데스크탑 애플리케이션입니다.  
Node.js의 Electron기반으로 제작중입니다.  

## 설치

#### 사용자용:
아직 안 만듬

#### 개발자용:
먼저 레포 클론합니다.
```powershell
git clone https://github.com/Yurly123/geppetto.git
```
그러고 node 패키지 설치합니다.
```powershell
cd geppetto
npm i
```
그리고 `.env`에 `OPENAI_API_KEY`를 추가합니다.
```powershell
ni .env
```
```powershell
# /geppetto/.env

OPENAI_API_KEY = 'sk-...' # API키
```
마지막으로 실행합니다.
```powershell
npm start
```
만약에 실행파일 만들려면 이거 하세요:
```powershell
npm run make
```


## 크레딧

- 템플릿: [@codesbiome](https://github.com/codesbiome/electron-react-webpack-typescript-2024)
- 폰트: [원스토어 글꼴](https://www.onestorecorp.com/sv/fordev_font/)