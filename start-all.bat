@echo off
echo ============================================================
echo   SIH26034 - AI Legal Metrology Compliance Checker
echo   Starting all three services...
echo ============================================================
echo.

:: Start Vite frontend (port 5173)
echo [1/3] Starting Vite Dev Server on http://localhost:5173 ...
start "Frontend - Vite" cmd /c "cd /d d:\THRIVA && npm run dev"

:: Wait 2 seconds
timeout /t 2 /nobreak >nul

:: Start Express API backend (port 5000)
echo [2/3] Starting Express API Server on http://localhost:5000 ...
start "Backend - Express API" cmd /c "cd /d d:\THRIVA\server && node server.js"

:: Wait 2 seconds
timeout /t 2 /nobreak >nul

:: Start Python FastAPI AI service (port 8000)
echo [3/3] Starting Python FastAPI AI Service on http://localhost:8000 ...
start "AI Service - FastAPI" cmd /c "cd /d d:\THRIVA\ai_service && python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload"

echo.
echo ============================================================
echo   All services started! Open your browser:
echo   Frontend  →  http://localhost:5173
echo   API Docs  →  http://localhost:8000/docs
echo   Express   →  http://localhost:5000/api/health
echo ============================================================
pause
