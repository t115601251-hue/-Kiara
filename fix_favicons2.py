#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""第二轮修复：直接抓取网站真实 logo，不回退到 Google 缓存"""
import os, re, time, struct, ssl
import urllib.request, urllib.error

WORKSPACE = r'E:\Awendang\自媒体素材库'
ICONS_DIR = os.path.join(WORKSPACE, 'icons')

UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/125.0.0.0 Safari/537.36'

# Bypass SSL for sites with cert issues
ssl_ctx = ssl.create_default_context()
ssl_ctx.check_hostname = False
ssl_ctx.verify_mode = ssl.CERT_NONE

FIX_LIST = [
    ('boardmix',     'boardmix.cn',        'HTML-in-PNG'),
    ('chatexcel',    'chatexcel.com',      'HTML-in-PNG'),
    ('coolors',      'coolors.co',         'HTML-in-PNG'),
    ('doubao',       'www.doubao.com',     'HTML-in-PNG'),
    ('douyin-index', 'trendinsight.oceanengine.com', 'HTML-in-PNG'),
    ('fogsight',     'fogsight.ai',        'HTML-in-PNG'),
    ('jianying',     'jianying.com',       'HTML-in-PNG'),
    ('oceanengine',  'trendinsight.oceanengine.com', 'HTML-in-PNG'),
    ('tongyi',       'tongyi.aliyun.com',  'HTML-in-PNG'),
]

def is_image(data):
    if len(data) < 100:
        return False
    if data[:8] == b'\x89PNG\r\n\x1a\n':
        return True
    if data[:4] == b'\x00\x00\x01\x00':
        return True
    if data[:3] == b'GIF':
        return True
    if data[:2] == b'\xff\xd8':
        return True
    if data[:4] == b'RIFF':
        return True
    if data.strip()[:5] == b'<svg':
        return True
    # Check for HTML
    text = data[:200].decode('utf-8', errors='ignore').strip().lower()
    if text.startswith('<!doctype') or text.startswith('<html'):
        return False
    return len(data) > 200

def get_png_size(data):
    if data[:8] == b'\x89PNG\r\n\x1a\n' and len(data) >= 24:
        return int.from_bytes(data[16:20], 'big'), int.from_bytes(data[20:24], 'big')
    return 0, 0

def ico_to_png(data):
    try:
        count = struct.unpack_from('<H', data, 4)[0]
        best, best_sz = None, 0
        offset = 6
        for _ in range(count):
            w = data[offset] or 256
            h = data[offset + 1] or 256
            eoff = struct.unpack_from('<I', data, offset + 12)[0]
            esz = struct.unpack_from('<I', data, offset + 8)[0]
            if w * h > best_sz:
                best_sz = w * h
                best = data[eoff:eoff + esz]
            offset += 16
        if best and best[:8] == b'\x89PNG\r\n\x1a\n':
            return best
    except: pass
    return None

def download(name, domain):
    urls = [
        f'https://{domain}/favicon.ico',
        f'https://{domain}/apple-touch-icon.png',
        f'https://{domain}/apple-touch-icon-precomposed.png',
        f'https://{domain}/favicon-32x32.png',
        f'https://{domain}/favicon.png',
        f'https://logo.clearbit.com/{domain}',
        f'https://icon.horse/icon/{domain}',
    ]

    best_data, best_sz = None, 0

    for url in urls:
        try:
            req = urllib.request.Request(url, headers={'User-Agent': UA})
            resp = urllib.request.urlopen(req, timeout=15, context=ssl_ctx)
            # Handle redirects
            final_url = resp.geturl()
            data = resp.read()

            if not is_image(data):
                continue

            # Convert ICO to PNG
            if data[:4] == b'\x00\x00\x01\x00':
                png = ico_to_png(data)
                if png:
                    data = png
                else:
                    continue

            w, h = get_png_size(data)
            sz = w * h if w and h else len(data)

            if sz > best_sz:
                best_sz = sz
                best_data = data

        except Exception as e:
            continue

    return best_data

success = 0
for name, domain, reason in FIX_LIST:
    data = download(name, domain)
    if data:
        fname = os.path.join(ICONS_DIR, f'{name}.png')
        with open(fname, 'wb') as f:
            f.write(data)
        w, h = get_png_size(data)
        print(f'  [OK] {name:18s} -> {w}x{h} ({len(data)}B)')
        success += 1
    else:
        print(f'  [FAIL] {name:18s} (keeping SVG)')
    time.sleep(0.3)

print(f'\nFixed: {success}/{len(FIX_LIST)}')
