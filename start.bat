@echo off
echo === DungHoang.com - Starting Dev Server ===
echo.

where node >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js chua duoc cai dat!
    echo Tai tai: https://nodejs.org/en/download
    pause
    exit /b 1
)

if not exist "node_modules" (
    echo Dang cai packages...
    npm install
)

echo.
echo Mo trinh duyet tai: http://localhost:3000
echo.
npm run dev
