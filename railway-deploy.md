# Railway 배포 가이드 (Manual)

## 1. Railway 대시보드에서 배포

### Step 1: Railway 프로젝트 생성
1. [Railway.app](https://railway.app) 접속 및 로그인
2. "New Project" 클릭
3. "Deploy from GitHub repo" 선택
4. Repository: `golden00929/suanhasaigon247` 선택

### Step 2: 서비스 설정
1. "Add Service" → "GitHub Repo" 선택
2. Root Directory: `backend` 설정
3. Build Command: `npm install` (자동 감지됨)
4. Start Command: `npm start` (자동 감지됨)

### Step 3: 환경변수 설정
Railway 대시보드에서 다음 환경변수들을 설정하세요:

```bash
# 필수 환경변수
PORT=3001
NODE_ENV=production
JWT_SECRET=9sXpAXGYhS+uRjEIaTvw/PtBmLgFMygpPumd2vUY2Uo=
JWT_EXPIRES_IN=24h

# 데이터베이스 (PostgreSQL 플러그인 추가 후 자동 설정됨)
DATABASE_URL=postgresql://username:password@host:port/database

# CORS 설정 (Netlify 배포 후 업데이트 필요)
FRONTEND_URL=https://your-netlify-app.netlify.app

# 이메일 설정 (선택사항)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com

# 기본 인증 정보
ADMIN_PASSWORD=Admin123@456
EMPLOYEE_PASSWORD=Employee123@456
```

### Step 4: PostgreSQL 추가
1. Railway 프로젝트에서 "Add Plugin" 클릭
2. "PostgreSQL" 선택
3. DATABASE_URL이 자동으로 환경변수에 추가됨

### Step 5: 배포 확인
1. Deploy가 완료되면 Railway에서 제공하는 URL 확인
2. `https://your-app.up.railway.app/api/health` 접속하여 테스트

## 2. 배포 완료 후 확인사항

- ✅ Health check: `/api/health` 엔드포인트 응답 확인
- ✅ API info: `/api/info` 엔드포인트 응답 확인
- ✅ CORS 설정: Frontend URL 허용 확인

## 3. 트러블슈팅

### 배포 실패 시:
- `npm install` 오류: package.json 확인
- 포트 오류: PORT 환경변수 확인 (Railway는 자동 할당)
- DB 연결 오류: DATABASE_URL 확인

### 로그 확인:
Railway 대시보드에서 "Deployments" → "View Logs" 확인