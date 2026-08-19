@echo off
title Plegueviation Exam - Simulador Operacional
cd /d "%~dp0"
echo ===================================================
echo   Iniciando Plegueviation Exam PWA
echo   (Binter & Flota Captain Prep)
echo ===================================================
echo.
if not exist ".venv\Scripts\python.exe" (
    echo [ERROR] No se encontro el entorno virtual en .venv.
    pause
    exit /b 1
)
".venv\Scripts\python.exe" cli\bin\serve.py
pause
