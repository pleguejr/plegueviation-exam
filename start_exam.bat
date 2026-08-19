@echo off
title Plegueviation Exam - Simulador Operacional
cd /d "%~dp0"
color 0b

echo =======================================================================
echo    PLEGUEVIATION EXAM - INICIO DE SIMULADOR OPERACIONAL
echo =======================================================================
echo.

:: 1. Deteccion y configuracion automatica de Python
set "PYTHON_EXE="
if exist ".venv\Scripts\python.exe" (
    set "PYTHON_EXE=.venv\Scripts\python.exe"
) else (
    where python >nul 2>&1
    if %errorlevel% equ 0 (
        echo [*] Configurando entorno virtual por primera vez...
        python -m venv .venv
        if exist ".venv\Scripts\python.exe" (
            set "PYTHON_EXE=.venv\Scripts\python.exe"
            echo [*] Instalando dependencias de Python...
            call ".venv\Scripts\pip.exe" install -r requirements.txt pypdf pymupdf
        ) else (
            set "PYTHON_EXE=python"
        )
    ) else (
        echo [ERROR] No se encontro Python en este equipo. Por favor instala Python 3.10 o superior.
        pause
        exit /b 1
    )
)

:: 2. Deteccion y configuracion automatica de Node.js / PWA
if not exist "apps\web-pwa\node_modules" (
    echo [*] Instalando dependencias de la aplicacion web (primera ejecucion)...
    cd apps\web-pwa
    call npm.cmd install
    cd ..\..
)

:: 3. Iniciar servidor local PWA
echo.
echo [*] Iniciando servidor y abriendo simulador en tu navegador...
"%PYTHON_EXE%" cli\bin\serve.py

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Hubo un problema al iniciar el servidor local.
    pause
)
