#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""修复问题 favicon：重试获取真实 logo"""
import os, re, time, struct, urllib.request, urllib.error

WORKSPACE = r'E:\Awendang\自媒体素材库'
ICONS_DIR = os.path.join(WORKSPACE, 'icons')

UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'

# Problem icons to fix: (name, domain, reason)
FIX_LIST = [
    # HTML-in-PNG files
    ('deepseek', 'chat.deepseek.com', 'html-in-png'),
    ('grok', 'grok.com', 'html-in-png'),
    # Too small
    ('giphy', 'giphy.com', '16x16-too-small'),
    ('shanmeng', 'soogif.com', '16x16-too-small'),
    # Still SVG (no favicon downloaded)
    ('cursor-prompts', 'prompt123.cn', 'no-favicon'),
    ('iconfont', 'iconfont.cn', 'no-favicon'),
    ('life-restart', 'liferestart.syaro.io', 'no-favicon'),
    ('meijici', 'meijici.com', 'no-favicon'),
    ('xinhong', 'xhdata.com', 'no-favicon'),
    # Small but borderline - try for bigger
    ('altsociety', 'altsociety.ai', '32x32-small'),
    ('100font', '100font.com', '48x48-small'),
    ('hardcore-guide', 'yinghezhinan.com', '32x32-small'),
]

def check_png(data):
    if len(data) < 8: return False
    return data[:8] == b'\x89PNG\r\n\x1a\n'

def check_html(data):
    text = data[:200].decode('utf-8', errors='ignore').strip().lower()
    return text.startswith('<!doctype') or text.startswith('<html') or text.startswith('<!doc')

def get_png_size(data):
    if check_png(data) and len(data) >= 24:
        w = int.from_bytes(data[16:20], 'big')
        h = int.from_bytes(data[20:24], 'big')
        return w, h
    return 0, 0

def ico_to_png(data):
    try:
        count = struct.unpack_from('<H', data, 4)[0]
        best = None
        best_size = 0
        offset = 6
        for i in range(count):
            w = data[offset] or 256
            h = data[offset + 1] or 256
            entry_offset = struct.unpack_from('<I', data, offset + 12)[0]
            entry_size = struct.unpack_from('<I', data, offset + 8)[0]
            if w * h > best_size:
                best_size = w * h
                best = data[entry_offset:entry_offset + entry_size]
            offset += 16
        if best and check_png(best):
            return best
    except:
        pass
    return None

def download(name, domain):
    """Try multiple URL patterns to get best favicon"""
    paths = [
        f'https://{domain}/favicon.ico',
        f'https://{domain}/apple-touch-icon.png',
        f'https://{domain}/apple-touch-icon-precomposed.png',
        f'https://{domain}/favicon-32x32.png',
        f'https://{domain}/favicon-64x64.png',
        f'https://{domain}/favicon.png',
        f'https://www.google.com/s2/favicons?domain={domain}&sz=128',
        f'https://www.google.com/s2/favicons?domain={domain}&sz=64',
    ]
    best_data = None
    best_w = 0

    for url in paths:
        try:
            req = urllib.request.Request(url, headers={'User-Agent': UA})
            resp = urllib.request.urlopen(req, timeout=12)
            data = resp.read()
            if len(data) < 50 or check_html(data):
                continue
            if data[:4] == b'\x00\x00\x01\x00':  # ICO
                png = ico_to_png(data)
                if png:
                    data = png
                else:
                    continue
            if check_png(data):
                w, h = get_png_size(data)
                if w >= 32 and w * h > best_w:
                    best_w = w * h
                    best_data = data
        except:
            continue

    return best_data

success = 0
for name, domain, reason in FIX_LIST:
    data = download(name, domain)
    if data:
        fname = os.path.join(ICONS_DIR, f'{name}.png')
        # Remove old formats
        for old in [f'{name}.svg', f'{name}.ico', f'{name}.png']:
            op = os.path.join(ICONS_DIR, old)
            if os.path.exists(op) and op != fname:
                os.remove(op)
        with open(fname, 'wb') as f:
            f.write(data)
        w, h = get_png_size(data)
        print(f'  [OK] {name:20s} -> {w}x{h} ({len(data)}B)  [{reason}]')
        success += 1
    else:
        print(f'  [FAIL] {name:20s}  [{reason}]')
    time.sleep(0.4)

print(f'\nFixed: {success}/{len(FIX_LIST)}')
