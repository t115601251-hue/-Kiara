#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""下载所有网站的真实 favicon，保存为 PNG 格式到 icons/ 目录"""
import re, os, sys, io, struct, time
import urllib.request, urllib.error

WORKSPACE = r'E:\Awendang\自媒体素材库'
ICONS_DIR = os.path.join(WORKSPACE, 'icons')
os.makedirs(ICONS_DIR, exist_ok=True)

# 从 index.html 提取所有图标名和对应域名
with open(os.path.join(WORKSPACE, 'index.html'), 'r', encoding='utf-8') as f:
    html = f.read()
cards = re.findall(
    r'<a[^>]*link-card[^>]*href="([^"]+)"[^>]*>.*?<img[^>]*src="icons/([^"]+\.svg)"',
    html, re.DOTALL
)

# 构建域名到图标名的映射
icon_map = {}
for url, svg_name in cards:
    domain = re.sub(r'^https?://(www\.)?', '', url).split('/')[0]
    name = svg_name.replace('.svg', '')
    if name not in icon_map:
        icon_map[name] = domain

print(f'Total icons to download: {len(icon_map)}')
print('-' * 50)

USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'

def is_ico(data):
    return data[:4] == b'\x00\x00\x01\x00'

def is_png(data):
    return data[:8] == b'\x89PNG\r\n\x1a\n'

def is_svg(data):
    text = data[:200].decode('utf-8', errors='ignore').strip().lower()
    return text.startswith('<svg') or text.startswith('<?xml')

def ico_to_png(data):
    """Extract largest PNG from ICO file"""
    try:
        count = struct.unpack_from('<H', data, 4)[0]
        best_size = 0
        best_data = None
        offset = 6
        for i in range(count):
            w = data[offset] or 256
            h = data[offset + 1] or 256
            size = w * h
            entry_offset = struct.unpack_from('<I', data, offset + 12)[0]
            entry_size = struct.unpack_from('<I', data, offset + 8)[0]
            if size > best_size:
                best_size = size
                best_data = data[entry_offset:entry_offset + entry_size]
            offset += 16
        if best_data and is_png(best_data):
            return best_data
    except:
        pass
    return None

def download_favicon(domain, name):
    """Try multiple URLs to get the best favicon"""
    urls_to_try = [
        f'https://{domain}/favicon.ico',
        f'https://{domain}/favicon.png',
        f'https://{domain}/apple-touch-icon.png',
        f'https://www.{domain}/favicon.ico',
    ]

    # Google favicon service as fallback
    urls_to_try.append(f'https://www.google.com/s2/favicons?domain={domain}&sz=64')

    for url in urls_to_try:
        try:
            req = urllib.request.Request(url, headers={'User-Agent': USER_AGENT})
            resp = urllib.request.urlopen(req, timeout=10)
            data = resp.read()
            if len(data) < 100:
                continue

            # Handle ICO -> PNG conversion
            if is_ico(data):
                png_data = ico_to_png(data)
                if png_data:
                    fname = os.path.join(ICONS_DIR, f'{name}.png')
                    with open(fname, 'wb') as f: f.write(png_data)
                    return f'OK (ICO->PNG, {len(png_data)}B)'
                else:
                    # Save as ICO
                    fname = os.path.join(ICONS_DIR, f'{name}.ico')
                    with open(fname, 'wb') as f: f.write(data)
                    return f'OK (ICO, {len(data)}B)'

            elif is_png(data):
                fname = os.path.join(ICONS_DIR, f'{name}.png')
                with open(fname, 'wb') as f: f.write(data)
                return f'OK (PNG, {len(data)}B)'

            elif is_svg(data):
                fname = os.path.join(ICONS_DIR, f'{name}.svg')
                with open(fname, 'wb') as f: f.write(data)
                return f'OK (SVG, {len(data)}B)'

            else:
                # Unknown format, try saving as png
                fname = os.path.join(ICONS_DIR, f'{name}.png')
                with open(fname, 'wb') as f: f.write(data)
                return f'OK (unknown, {len(data)}B)'

        except urllib.error.HTTPError as e:
            continue
        except Exception as e:
            continue

    return 'FAIL'

success = 0
fail = 0

for name, domain in sorted(icon_map.items()):
    result = download_favicon(domain, name)
    if result.startswith('OK'):
        success += 1
        print(f'  [OK] {name:25s} {domain:40s} {result.split("(")[1].rstrip(")")}')
    else:
        fail += 1
        print(f'  [FAIL] {name:25s} {domain}')
    time.sleep(0.3)  # be polite

print('-' * 50)
print(f'Done: {success} success, {fail} failed')
