#!/usr/bin/env python3
"""
serve.py - Servidor local de desarrollo y vista previa para Plegueviation Exam
Inicia un servidor local optimizado para PWA y muestra los enlaces para PC, iPhone e iPad.
"""

import sys
import os
import socket
import webbrowser
import subprocess
from pathlib import Path

def get_project_root() -> Path:
    return Path(__file__).resolve().parents[2]

def get_local_ip() -> str:
    """Obtiene la IP local de la red Wi-Fi para acceder desde iPad/iPhone."""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

def main():
    root = get_project_root()
    pwa_dir = root / "apps" / "web-pwa"
    local_ip = get_local_ip()
    
    # 1. Compilar bancos primero
    print("[*] Verificando y compilando catálogo de preguntas...")
    subprocess.run([sys.executable, str(root / "cli" / "bin" / "build_banks.py")], check=False)

    print("\n=======================================================")
    print(" ✈️  PLEGUEVIATION EXAM - SERVIDOR OPERACIONAL")
    print("=======================================================")
    print(f" [PC / Local]:    http://localhost:3000")
    print(f" [iPad / iPhone]: http://{local_ip}:3000")
    print("=======================================================")
    print(" [*] En tu iPad/iPhone, abre Safari, entra a la URL de arriba")
    print("     y pulsa 'Compartir' -> 'Añadir a pantalla de inicio'.")
    print(" [*] Presiona Ctrl+C para detener el servidor.\n")

    # Iniciar vite dev server
    os.chdir(pwa_dir)
    try:
        # Abrir navegador tras 1.5s
        import threading
        import time
        def open_browser():
            time.sleep(1.5)
            webbrowser.open("http://localhost:3000")
        
        threading.Thread(target=open_browser, daemon=True).start()
        
        # Ejecutar npm run dev
        cmd = "npm.cmd" if sys.platform == "win32" else "npm"
        subprocess.run([cmd, "run", "dev", "--", "--host"], check=True)
    except KeyboardInterrupt:
        print("\n[OK] Servidor detenido.")
    except Exception as e:
        print(f"[ERROR] Error al iniciar el servidor: {e}", file=sys.stderr)

if __name__ == "__main__":
    main()
