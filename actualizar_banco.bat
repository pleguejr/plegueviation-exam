@echo off
title Actualizar Banco de Preguntas - Plegueviation Exam
color 0b

echo =======================================================================
echo    PLEGUEVIATION EXAM - SINCRONIZADOR AUTOMATICO A GITHUB Y VERCEL
echo =======================================================================
echo.

echo [*] 1. Recompilando catalogo de preguntas desde la carpeta 'banks/'...
call ".\.venv\Scripts\python.exe" "cli\bin\build_banks.py"
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
