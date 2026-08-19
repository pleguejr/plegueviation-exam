@echo off
title Actualizar Banco de Preguntas - Plegueviation Exam
cd /d "%~dp0"
color 0b

echo =======================================================================
echo    PLEGUEVIATION EXAM - SINCRONIZADOR AUTOMATICO A GITHUB Y VERCEL
echo =======================================================================
echo.

:: 1. Deteccion de Python
set "PYTHON_EXE="
if exist ".venv\Scripts\python.exe" (
    set "PYTHON_EXE=.venv\Scripts\python.exe"
) else (
    where python >nul 2>&1
    if %errorlevel% equ 0 (
        set "PYTHON_EXE=python"
    ) else (
        echo [ERROR] No se encontro Python en este equipo.
        pause
        exit /b 1
    )
)

echo [*] 1. Recompilando catalogo de preguntas desde la carpeta 'banks/'...
"%PYTHON_EXE%" "cli\bin\build_banks.py"
if %errorlevel% neq 0 (
    echo [ERROR] Fallo al compilar los bancos de preguntas.
    pause
    exit /b %errorlevel%
)

echo.
echo [*] 2. Subiendo cambios a tu repositorio privado de GitHub...
git add .
git commit -m "update: actualizacion de bancos de preguntas (%date% %time%)"
git push origin main

if %errorlevel% neq 0 (
    echo.
    echo [AVISO] No se pudo hacer push a GitHub. Verifica tu conexion a internet.
    pause
    exit /b %errorlevel%
)

echo.
echo =======================================================================
echo  [EXITO] Banco de preguntas sincronizado con GitHub y Vercel.
echo  En ~20 segundos estara disponible en tu iPad, iPhone y navegadores.
echo =======================================================================
echo.
timeout /t 5
