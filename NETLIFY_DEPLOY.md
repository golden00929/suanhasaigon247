# Netlify 배포 가이드

## 🚀 Netlify 자동 배포 단계

### 1. Netlify 사이트 생성
1. [Netlify](https://netlify.com) 로그인
2. **"New site from Git"** 클릭
3. **GitHub** 연결 및 저장소 선택: `golden00929/suanhasaigon247`

### 2. 빌드 설정
Netlify가 자동으로 `netlify.toml`을 감지합니다:
```toml
[build]
  base = "frontend"
  publish = "frontend/dist"
  command = "npm run build"
```

### 3. 환경변수 설정
Netlify 대시보드에서 **Environment Variables** 설정:
```
VITE_API_URL = https://your-railway-app.up.railway.app/api
```

### 4. 배포 확인
- 빌드 성공 후 Netlify URL 확인
- 프론트엔드가 Railway API와 연결되는지 테스트

## 🔄 Railway API URL 업데이트

### Railway URL 확인 후:
1. Netlify 대시보드 → **Environment Variables**
2. `VITE_API_URL` 값을 실제 Railway URL로 변경
3. **Redeploy** 클릭

## ✅ 배포 후 테스트
- Health check: Frontend에서 API 상태 확인
- 네트워크 탭에서 CORS 오류 없는지 확인
- 백엔드 Railway 환경변수에서 `FRONTEND_URL` 업데이트 필요

## 🛠 트러블슈팅
- **빌드 실패**: Node.js 버전 18 확인
- **API 연결 실패**: Railway URL 및 CORS 설정 확인
- **환경변수 오류**: `VITE_` 접두사 확인