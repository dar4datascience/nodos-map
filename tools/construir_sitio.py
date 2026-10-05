"""Arma dist/ con solo lo que se publica del sitio (v4.28).

Deja fuera las versiones viejas (index.v*.html), los bocetos, las notas internas y,
desde la simplificación a mapa + acerca de, las páginas y archivos del Laboratorio y
de Mi espacio (cuenta, sesión, ejemplos del lab), que no van al sitio público.
El .nojekyll que se genera evita que GitHub Pages omita los archivos que empiezan
por guion bajo (p. ej. data/busqueda/titulos/_indice.json).

Uso:  python tools/construir_sitio.py
Luego: npx wrangler deploy --assets dist --name nodosmap --compatibility-date 2026-09-01
       (desde la raíz del repo, con CLOUDFLARE_ACCOUNT_ID de la cuenta del dominio)
       o el flujo de GitHub Actions que publica dist/ en GitHub Pages.
"""
import os
import shutil
import sys

RAIZ = os.path.join(os.path.dirname(__file__), '..')
SITIO = os.path.join(RAIZ, 'sitio')
DIST = os.path.join(RAIZ, 'dist')
ARCHIVOS = ['index.html', 'acerca.html', 'privacidad.html', 'terminos.html', 'contacto.html',
            'favicon.svg', 'ventanas-dia.svg', 'ventanas-noche.svg', 'mit-license.png', '_headers']
CARPETAS = ['compartido', 'vendor', 'data']
# vecindario_preview.v1.json (24 MB): ya no lo descarga el mapa (v4.38.5); sigue en el repo, como salida del pipeline.
# sesion.js, cuenta.css, bloom.js y supabase-js solo los usan las páginas que ya no se publican.
FUERA = {'LEEME.md', 'vecindario_preview.v1.json', 'sesion.js', 'cuenta.css', 'bloom.js', 'supabase-js-2.117.2.js'}
LIMITE_ARCHIVO = 25 * 1024 * 1024  # Cloudflare Pages
LIMITE_ARCHIVOS = 20000

if os.path.exists(DIST):
    shutil.rmtree(DIST)
os.makedirs(DIST)
for a in ARCHIVOS:
    shutil.copy2(os.path.join(SITIO, a), DIST)
for c in CARPETAS:
    shutil.copytree(os.path.join(SITIO, c), os.path.join(DIST, c), ignore=shutil.ignore_patterns(*FUERA, '__pycache__'))
open(os.path.join(DIST, '.nojekyll'), 'w').close()

n, total, grandes = 0, 0, []
for raiz, _, archivos in os.walk(DIST):
    for a in archivos:
        t = os.path.getsize(os.path.join(raiz, a)); n += 1; total += t
        if t > LIMITE_ARCHIVO: grandes.append((a, t))
print('dist: %d archivos, %.0f MB' % (n, total / 1e6))
if grandes or n > LIMITE_ARCHIVOS:
    for a, t in grandes: print('excede 25 MiB:', a, t)
    sys.exit(1)
