# 배포 가이드 (Deployment Guide)

## Railway (Backend) 배포

1. [Railway](https://railway.app)에 로그인
2. "New Project" → "Deploy from GitHub repo" 선택
3. `quotation-management` 저장소 선택
4. Root Directory를 `backend`로 설정
5. 환경변수 설정:
   ```
   DATABASE_URL=postgresql://username:password@host:port/database
   JWT_SECRET=your-jwt-secret
   JWT_EXPIRES_IN=24h
   PORT=3001
   NODE_ENV=production
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   SMTP_FROM=your-email@gmail.com
   FRONTEND_URL=https://your-netlify-app.netlify.app
   ADMIN_PASSWORD=your-secure-admin-password
   EMPLOYEE_PASSWORD=your-secure-employee-password
   ```

## Netlify (Frontend) 배포

1. [Netlify](https://netlify.com)에 로그인
2. "New site from Git" → GitHub 연결
3. `quotation-management` 저장소 선택
4. Build settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`
5. 환경변수 설정:
   ```
   VITE_API_URL=https://your-railway-app.up.railway.app/api
   ```

## 추가 설정

### Railway에서 PostgreSQL 추가:
1. Railway 프로젝트에서 "Add Plugin" → "PostgreSQL" 선택
2. DATABASE_URL이 자동으로 설정됨
3. Prisma migration 실행: `npx prisma migrate deploy`

### 도메인 설정:
1. Railway: Custom domain 설정
2. Netlify: Custom domain 설정
3. Frontend .env.production에서 VITE_API_URL 업데이트