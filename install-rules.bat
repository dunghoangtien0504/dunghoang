@echo off
echo ==================================================
echo DUNGHOANG.COM - BO CAI DAT AI AGENTS TU DONG
echo ==================================================
echo.
echo Vui long chon cong cu ban muon cai dat:
echo [1] Cai dat Cursor Rules (cho Cursor Editor)
echo [2] Cai dat Claude Code (cho dong lenh Claude CLI)
echo [3] Cai dat Antigravity Workspace (cho Antigravity Agent)
echo [4] Cai dat CA 3 CONG CU
echo.
set /p choice="Nhap lua chon cua ban (1-4): "

if "%choice%"=="1" (
    echo.
    echo Dang cai dat Cursor Rules...
    node scripts/package-skills.mjs --install
)
if "%choice%"=="2" (
    echo.
    echo Dang cai dat cho Claude Code...
    node scripts/package-skills.mjs --install-claude
)
if "%choice%"=="3" (
    echo.
    echo Dang cai dat cho Antigravity Workspace...
    node scripts/package-skills.mjs --install-antigravity
)
if "%choice%"=="4" (
    echo.
    echo Dang cai dat cho ca 3 cong cu...
    node scripts/package-skills.mjs --install
    node scripts/package-skills.mjs --install-claude
    node scripts/package-skills.mjs --install-antigravity
)

echo.
echo ==================================================
echo Hoan tat cai dat! Chuc ban x2 hieu suat lam viec.
echo ==================================================
pause
