// Generate accurate brand-logo SVG icons
const fs = require('fs');
const path = require('path');

const dir = 'E:\\Awendang\\自媒体素材库\\icons';

function makeIcon(bg, inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
  <rect width="48" height="48" rx="10" fill="${bg}"/>
  ${inner}
</svg>`;
}

const icons = {

// ===== AI 大语言模型 =====

chatgpt: makeIcon('#10a37f',
  // OpenAI hexagonal flower — 6 overlapping petals
  `<g transform="translate(24,24)">
    <g transform="rotate(0)"><ellipse cx="0" cy="-8" rx="5" ry="10" fill="#fff" opacity="0.95"/></g>
    <g transform="rotate(60)"><ellipse cx="0" cy="-8" rx="5" ry="10" fill="#fff" opacity="0.85"/></g>
    <g transform="rotate(120)"><ellipse cx="0" cy="-8" rx="5" ry="10" fill="#fff" opacity="0.75"/></g>
    <g transform="rotate(180)"><ellipse cx="0" cy="-8" rx="5" ry="10" fill="#fff" opacity="0.85"/></g>
    <g transform="rotate(240)"><ellipse cx="0" cy="-8" rx="5" ry="10" fill="#fff" opacity="0.75"/></g>
    <g transform="rotate(300)"><ellipse cx="0" cy="-8" rx="5" ry="10" fill="#fff" opacity="0.95"/></g>
    <circle cx="0" cy="0" r="4" fill="#10a37f"/>
  </g>`),

claude: makeIcon('#d97706',
  // Anthropic diamond ribbon
  `<g transform="translate(24,26)">
    <path d="M-10,-12 L0,-2 L10,-12 L8,0 L12,8 L0,14 L-12,8 L-8,0 Z" fill="none" stroke="#fff" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M0,-2 L0,14" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>
  </g>`),

gemini: makeIcon('#1a73e8',
  // Google Gemini 4-point star/sparkle
  `<g transform="translate(24,24)">
    <path d="M0,-16 L3,-3 L16,0 L3,3 L0,16 L-3,3 L-16,0 L-3,-3 Z" fill="#fff" opacity="0.95"/>
    <circle cx="0" cy="0" r="3" fill="#1a73e8"/>
  </g>`),

deepseek: makeIcon('#4f46e5',
  // Blue whale silhouette (DeepSeek actual logo)
  `<g transform="translate(24,26)">
    <path d="M-14,0 Q-14,-14 0,-14 Q14,-14 14,-2 Q14,8 4,8 Q-2,8 -4,2 Q-6,8 -12,8 Q-14,8 -14,2 Z" fill="#fff" opacity="0.95"/>
    <circle cx="-6" cy="-4" r="1.5" fill="#4f46e5"/>
  </g>`),

doubao: makeIcon('#22c55e',
  // Green bean shape (豆包 actual logo)
  `<g transform="translate(24,24)">
    <ellipse cx="0" cy="0" rx="14" ry="16" fill="#fff" opacity="0.95"/>
    <ellipse cx="-5" cy="-4" rx="2" ry="2.5" fill="#22c55e"/>
    <ellipse cx="5" cy="-4" rx="2" ry="2.5" fill="#22c55e"/>
    <path d="M-4,5 Q0,9 4,5" fill="none" stroke="#22c55e" stroke-width="1.5" stroke-linecap="round"/>
  </g>`),

tongyi: makeIcon('#6366f1',
  // Alibaba Tongyi - stylized chat cloud
  `<g transform="translate(24,24)">
    <path d="M-12,-4 A8,8 0 0,1 -2,-12 A8,8 0 0,1 10,-6 A6,6 0 0,1 10,6 L-10,6 A6,6 0 0,1 -12,-4 Z" fill="#fff" opacity="0.9"/>
    <path d="M-6,10 L-2,2 L2,10 M-12,10 L-8,2 L-6,2" fill="none" stroke="#6366f1" stroke-width="1" stroke-linecap="round" opacity="0.5"/>
  </g>`),

kimi: makeIcon('#7c3aed',
  // Purple crescent moon + star (Kimi Moonshot)
  `<g transform="translate(24,24)">
    <path d="M-4,-14 A14,14 0 1,0 4,12 A12,12 0 0,1 -4,-14 Z" fill="#fff" opacity="0.95"/>
    <circle cx="10" cy="-10" r="2.5" fill="#fff" opacity="0.7"/>
    <circle cx="14" cy="-5" r="1.5" fill="#fff" opacity="0.4"/>
  </g>`),

grok: makeIcon('#111',
  // Grok diagonal slash (xAI)
  `<g transform="translate(24,24)">
    <rect x="-16" y="-16" width="32" height="32" rx="4" fill="none" stroke="#fff" stroke-width="2.5"/>
    <path d="M-10,10 L10,-10" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
  </g>`),

// ===== AIGC 导航 =====

aigc: makeIcon('#a855f7',
  `<g transform="translate(24,24)">
    <circle cx="0" cy="0" r="14" fill="none" stroke="#fff" stroke-width="2"/>
    <path d="M0,-5 L0,5 M-5,0 L5,0" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
    <path d="M-10,-10 L-5,-5 M10,-10 L5,-5 M-10,10 L-5,5 M10,10 L5,5" fill="none" stroke="#fff" stroke-width="1.2" opacity="0.5"/>
  </g>`),

altsociety: makeIcon('#ec4899',
  `<g transform="translate(24,24)">
    <path d="M-14,0 A10,10 0 0,1 14,0 A10,10 0 0,1 -14,0" fill="none" stroke="#fff" stroke-width="2"/>
    <circle cx="-6" cy="-2" r="2.5" fill="#fff"/>
    <circle cx="6" cy="-2" r="2.5" fill="#fff"/>
  </g>`),

resdownloader: makeIcon('#f59e0b',
  `<g transform="translate(24,24)">
    <path d="M0,-14 L0,8" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M-8,0 L0,8 L8,0" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M-14,14 L14,14" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
  </g>`),

chatexcel: makeIcon('#16a34a',
  `<g transform="translate(24,24)">
    <rect x="-14" y="-12" width="28" height="24" rx="2" fill="none" stroke="#fff" stroke-width="2"/>
    <path d="M-14,-4 L14,-4 M-14,4 L14,4" fill="none" stroke="#fff" stroke-width="1.2" opacity="0.5"/>
    <path d="M-2,-12 L-2,12 M6,-12 L6,12" fill="none" stroke="#fff" stroke-width="1.2" opacity="0.3"/>
  </g>`),

'cursor-prompts': makeIcon('#06b6d4',
  `<g transform="translate(24,24)">
    <rect x="-6" y="-8" width="16" height="16" rx="2" fill="none" stroke="#fff" stroke-width="2"/>
    <path d="M-14,6 L2,12 L14,-14" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>`),

paperme: makeIcon('#0891b2',
  `<g transform="translate(24,24)">
    <rect x="-10" y="-14" width="20" height="28" rx="2" fill="none" stroke="#fff" stroke-width="2"/>
    <path d="M-6,-6 L6,-6 M-6,0 L6,0 M-6,6 L0,6" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
  </g>`),

'hardcore-guide': makeIcon('#dc2626',
  `<g transform="translate(24,24)">
    <path d="M0,-16 L14,-4 L6,8 L-6,8 L-14,-4 Z" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round"/>
    <polygon points="0,-6 6,6 -6,6" fill="#fff" opacity="0.8"/>
  </g>`),

youmind: makeIcon('#7c3aed',
  `<g transform="translate(24,24)">
    <path d="M0,-14 A10,7 0 0,0 0,0 A10,7 0 0,1 0,14" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
    <circle cx="-12" cy="-14" r="2.5" fill="#fff" opacity="0.6"/>
    <circle cx="12" cy="-10" r="2" fill="#fff" opacity="0.4"/>
  </g>`),

// ===== AI 绘画 =====

liblibai: makeIcon('#ec4899',
  `<g transform="translate(24,24)">
    <rect x="-12" y="-12" width="18" height="18" rx="3" fill="none" stroke="#fff" stroke-width="2.2"/>
    <circle cx="-3" cy="-3" r="3.5" fill="none" stroke="#fff" stroke-width="1.5"/>
    <path d="M8,8 L14,14 M10,8 L14,12" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
  </g>`),

duiyou: makeIcon('#2563eb',
  // Alibaba 堆友 - 3D cube design
  `<g transform="translate(24,24)">
    <polygon points="0,-12 14,-4 14,10 0,16 -14,10 -14,-4" fill="none" stroke="#fff" stroke-width="2"/>
    <polygon points="0,-12 14,-4 0,2 -14,-4" fill="none" stroke="#fff" stroke-width="1.8"/>
    <polygon points="0,2 14,-4 14,10 0,16" fill="none" stroke="#fff" stroke-width="1" opacity="0.5"/>
  </g>`),

midjourney: makeIcon('#1a1a2e',
  // Midjourney sailboat logo
  `<g transform="translate(24,26)">
    <path d="M-8,10 L-8,-4 L8,-6 L-8,4" fill="#fff" opacity="0.9"/>
    <path d="M-8,4 L8,-6 L8,6 L-8,10" fill="#fff" opacity="0.5"/>
    <path d="M-14,10 L14,10" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
  </g>`),

recraft: makeIcon('#f97316',
  `<g transform="translate(24,24)">
    <circle cx="0" cy="0" r="14" fill="none" stroke="#fff" stroke-width="2"/>
    <path d="M-7,-4 L7,-4 L0,8 Z" fill="#fff" opacity="0.9"/>
  </g>`),

// ===== AI 视频 =====

klingai: makeIcon('#ef4444',
  // 可灵 Kling - stylized K
  `<g transform="translate(24,24)">
    <path d="M-10,-14 L-10,14" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M-10,0 L6,-12 M-4,0 L8,12" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
  </g>`),

jianying: makeIcon('#db2777',
  // 即梦 - film strip / dream
  `<g transform="translate(24,24)">
    <rect x="-14" y="-10" width="24" height="20" rx="2" fill="none" stroke="#fff" stroke-width="2"/>
    <path d="M-14,-5 L10,-5 M-14,0 L10,0 M-14,5 L10,5" fill="none" stroke="#fff" stroke-width="1" opacity="0.3"/>
    <circle cx="12" cy="6" r="2.5" fill="#fff"/>
  </g>`),

runway: makeIcon('#000',
  // Runway - stylized R
  `<g transform="translate(24,24)">
    <circle cx="0" cy="0" r="15" fill="none" stroke="#fff" stroke-width="2"/>
    <path d="M-6,-8 L-6,8 M-6,-4 L4,-4 A6,6 0 0 1 4,8 L-6,8" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>
  </g>`),

fogsight: makeIcon('#6366f1',
  // FogSight - eye in fog
  `<g transform="translate(24,24)">
    <path d="M-14,0 Q-8,-10 0,-10 Q8,-10 14,0 Q8,10 0,10 Q-8,10 -14,0 Z" fill="none" stroke="#fff" stroke-width="2"/>
    <circle cx="0" cy="0" r="5" fill="none" stroke="#fff" stroke-width="2"/>
    <circle cx="0" cy="0" r="2" fill="#fff"/>
  </g>`),

// ===== AI 音乐/音频 =====

suno: makeIcon('#0ea5e9',
  // Suno - sun + sound waves
  `<g transform="translate(24,24)">
    <circle cx="0" cy="-2" r="7" fill="none" stroke="#fff" stroke-width="2"/>
    <path d="M-12,4 L0,8 L12,4" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M-8,10 L0,13 L8,10" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M0,8 L0,16" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>
  </g>`),

'fish-audio': makeIcon('#8b5cf6',
  // Fish Audio - fish
  `<g transform="translate(24,24)">
    <path d="M-14,0 Q-6,-12 10,-8 Q16,-2 10,6 Q-6,8 -14,0 Z" fill="none" stroke="#fff" stroke-width="2"/>
    <circle cx="-4" cy="-2" r="2" fill="#fff"/>
    <path d="M14,-6 L20,-10 L16,-2 Z" fill="#fff" opacity="0.8"/>
  </g>`),

// ===== 内容合规检测 =====

cizhua: makeIcon('#dc2626',
  `<g transform="translate(24,24)">
    <path d="M0,-16 L16,-6 L16,10 L0,16 L-16,10 L-16,-6 Z" fill="none" stroke="#fff" stroke-width="2.2"/>
    <path d="M-6,-2 L6,-2 M0,-8 L0,8" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
  </g>`),

lingke: makeIcon('#f59e0b',
  `<g transform="translate(24,24)">
    <circle cx="-4" cy="-4" r="9" fill="none" stroke="#fff" stroke-width="2.2"/>
    <path d="M4,4 L16,16" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
  </g>`),

// ===== 配色工具 =====

qiantu: makeIcon('#ef4444',
  `<g transform="translate(24,24)">
    <circle cx="-7" cy="-7" r="6" fill="none" stroke="#fff" stroke-width="2"/>
    <circle cx="7" cy="-7" r="6" fill="none" stroke="#fff" stroke-width="2"/>
    <circle cx="0" cy="8" r="6" fill="none" stroke="#fff" stroke-width="2"/>
  </g>`),

coolors: makeIcon('#ec4899',
  `<g transform="translate(24,24)">
    <circle cx="0" cy="0" r="14" fill="none" stroke="#fff" stroke-width="2"/>
    <circle cx="0" cy="0" r="5" fill="none" stroke="#fff" stroke-width="1.5"/>
    <circle cx="0" cy="0" r="2" fill="#fff"/>
    <path d="M-10,-10 L-6,-6 M10,-10 L6,-6 M-10,10 L-6,6 M10,10 L6,6" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.4"/>
  </g>`),

// ===== 软件资源库 =====

s7zy: makeIcon('#6366f1',
  `<g transform="translate(24,24)">
    <path d="M-12,-10 L0,0 L12,-10" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M-12,10 L0,0 L12,10" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="0" cy="0" r="3" fill="#fff"/>
  </g>`),

ruancang: makeIcon('#7c3aed',
  `<g transform="translate(24,24)">
    <rect x="-14" y="-14" width="12" height="12" rx="2" fill="none" stroke="#fff" stroke-width="2"/>
    <rect x="2" y="-14" width="12" height="12" rx="2" fill="none" stroke="#fff" stroke-width="2"/>
    <rect x="-14" y="2" width="12" height="12" rx="2" fill="none" stroke="#fff" stroke-width="2"/>
    <rect x="2" y="2" width="12" height="12" rx="2" fill="none" stroke="#fff" stroke-width="2"/>
  </g>`),

// ===== 实用小工具 =====

tinypng: makeIcon('#22c55e',
  // TinyPNG panda logo
  `<g transform="translate(24,24)">
    <circle cx="0" cy="0" r="15" fill="none" stroke="#fff" stroke-width="2.2"/>
    <ellipse cx="-5" cy="-3" rx="3.5" ry="4" fill="#fff" opacity="0.8"/>
    <ellipse cx="5" cy="-3" rx="3.5" ry="4" fill="#fff" opacity="0.8"/>
    <ellipse cx="0" cy="6" rx="4" ry="3" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.7"/>
    <circle cx="-5" cy="-3" r="1.5" fill="#22c55e"/>
    <circle cx="5" cy="-3" r="1.5" fill="#22c55e"/>
  </g>`),

removebg: makeIcon('#0ea5e9',
  `<g transform="translate(24,24)">
    <rect x="-12" y="-10" width="18" height="20" rx="2" fill="none" stroke="#fff" stroke-width="2"/>
    <circle cx="-3" cy="0" r="5" fill="none" stroke="#fff" stroke-width="1.5" stroke-dasharray="2 2"/>
    <path d="M8,8 L18,-2" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M14,8 L18,4" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity="0.5"/>
  </g>`),

convertio: makeIcon('#f97316',
  `<g transform="translate(24,24)">
    <path d="M-8,-8 L0,-16 L8,-8" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M-8,8 L0,16 L8,8" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M0,-4 L0,4" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
  </g>`),

processon: makeIcon('#0891b2',
  `<g transform="translate(24,24)">
    <circle cx="0" cy="-10" r="4.5" fill="none" stroke="#fff" stroke-width="2"/>
    <path d="M0,-5.5 L0,2" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
    <path d="M-5,0 L-14,14 M5,0 L14,14 M0,0 L0,0" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
    <circle cx="-14" cy="14" r="3.5" fill="none" stroke="#fff" stroke-width="1.8"/>
    <circle cx="14" cy="14" r="3.5" fill="none" stroke="#fff" stroke-width="1.8"/>
  </g>`),

toolknit: makeIcon('#f97316',
  `<g transform="translate(24,24)">
    <rect x="-12" y="-14" width="12" height="12" rx="2" fill="none" stroke="#fff" stroke-width="2"/>
    <rect x="0" y="-6" width="14" height="20" rx="2" fill="none" stroke="#fff" stroke-width="2"/>
    <path d="M-6,-2 L0,-2 L0,6" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.4"/>
  </g>`),

// ===== 摸鱼 =====

'life-restart': makeIcon('#a855f7',
  `<g transform="translate(24,24)">
    <circle cx="0" cy="0" r="15" fill="none" stroke="#fff" stroke-width="2"/>
    <path d="M-11,-5 L-5,-1 L-1,-5 M3,-5 L7,-1 L11,-5" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M0,4 L0,11 M-6,11 L6,11" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M-4,8 L0,4 L4,8" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/>
  </g>`),

'useless-web': makeIcon('#ec4899',
  `<g transform="translate(24,24)">
    <circle cx="0" cy="0" r="12" fill="none" stroke="#fff" stroke-width="2"/>
    <path d="M-5,-5 Q0,-10 5,-5 Q10,-2 6,4 Q0,10 -6,4 Q-10,-2 -5,-5 Z" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.5"/>
    <circle cx="0" cy="0" r="2.5" fill="#fff"/>
  </g>`),

'retro-game': makeIcon('#dc2626',
  `<g transform="translate(24,24)">
    <rect x="-16" y="-8" width="32" height="18" rx="4" fill="none" stroke="#fff" stroke-width="2.2"/>
    <path d="M-8,-2 L-8,4 M-2,-2 L-2,4" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="8" cy="1" r="2.5" fill="#fff"/>
    <circle cx="13" cy="-3" r="1.5" fill="#fff" opacity="0.5"/>
  </g>`),

// ===== 其他实用工具 =====

'cli-im': makeIcon('#6366f1',
  // QR code pattern
  `<g transform="translate(24,24)">
    <rect x="-14" y="-14" width="8" height="8" fill="#fff" opacity="0.9"/>
    <rect x="-2" y="-14" width="8" height="8" fill="none" stroke="#fff" stroke-width="2"/>
    <rect x="6" y="-14" width="8" height="8" fill="#fff" opacity="0.9"/>
    <rect x="-14" y="-2" width="8" height="8" fill="none" stroke="#fff" stroke-width="2"/>
    <rect x="6" y="-2" width="4" height="4" fill="#fff" opacity="0.6"/>
    <rect x="-14" y="6" width="8" height="8" fill="#fff" opacity="0.9"/>
    <rect x="-2" y="6" width="8" height="8" fill="none" stroke="#fff" stroke-width="2"/>
    <rect x="6" y="6" width="8" height="8" fill="#fff" opacity="0.9"/>
  </g>`),

'33taici': makeIcon('#f59e0b',
  `<g transform="translate(24,24)">
    <rect x="-12" y="-10" width="20" height="20" rx="3" fill="none" stroke="#fff" stroke-width="2"/>
    <polygon points="-5,-5 -5,11 5,3" fill="#fff" opacity="0.9"/>
    <path d="M12,-6 L18,-6 L18,2" fill="none" stroke="#fff" stroke-width="1.2" opacity="0.4"/>
  </g>`),

ilovepdf: makeIcon('#ef4444',
  `<g transform="translate(24,24)">
    <rect x="-10" y="-14" width="16" height="26" rx="2" fill="none" stroke="#fff" stroke-width="2"/>
    <path d="M-6,-4 L6,-4 M-6,2 L6,2 M-6,8 L2,8" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M6,14 L10,10 L14,14" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
  </g>`),

huoshan: makeIcon('#ef4444',
  `<g transform="translate(24,24)">
    <path d="M0,-16 L16,8 L-16,8 Z" fill="none" stroke="#fff" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M-8,0 L0,8 L8,0" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
  </g>`),

xiaguo: makeIcon('#f97316',
  `<g transform="translate(24,24)">
    <path d="M-10,-6 L0,-14 L10,-6" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M-10,6 L0,14 L10,6" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="4" cy="0" r="2.5" fill="#fff"/>
  </g>`),

// ===== 自媒体矩阵 =====

vcat: makeIcon('#f59e0b',
  `<g transform="translate(24,24)">
    <circle cx="0" cy="4" r="13" fill="none" stroke="#fff" stroke-width="2.2"/>
    <circle cx="0" cy="-2" r="7" fill="none" stroke="#fff" stroke-width="2"/>
    <path d="M-6,-10 L-10,-16 M6,-10 L10,-16" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
    <circle cx="-3" cy="-3" r="1.2" fill="#fff"/>
    <circle cx="3" cy="-3" r="1.2" fill="#fff"/>
    <path d="M-3,7 Q0,10 3,7" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" opacity="0.5"/>
  </g>`),

dazdata: makeIcon('#6366f1',
  `<g transform="translate(24,24)">
    <rect x="-12" y="-14" width="24" height="28" rx="4" fill="none" stroke="#fff" stroke-width="2.2"/>
    <circle cx="0" cy="-2" r="5" fill="none" stroke="#fff" stroke-width="1.8"/>
    <path d="M-6,8 L6,8" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
  </g>`),

// ===== 数据热点 =====

'douyin-index': makeIcon('#000',
  // Douyin musical note logo
  `<g transform="translate(24,24)">
    <path d="M0,-16 Q-6,0 -4,8 A8,8 0 0,0 4,12 M0,-16 Q6,0 4,8 A8,8 0 0,1 -2,12" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M8,-12 Q4,-2 2,4" fill="none" stroke="#fe2c55" stroke-width="2" stroke-linecap="round"/>
  </g>`),

'baidu-hot': makeIcon('#dc2626',
  `<g transform="translate(24,24)">
    <circle cx="0" cy="0" r="15" fill="none" stroke="#fff" stroke-width="2"/>
    <path d="M-12,8 L-6,-8 L0,2 L6,-10 L12,6" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
  </g>`),

'weibo-hot': makeIcon('#f97316',
  `<g transform="translate(24,24)">
    <circle cx="0" cy="0" r="15" fill="none" stroke="#fff" stroke-width="2"/>
    <path d="M-12,8 L-6,-8 L0,2 L6,-10 L12,6" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
  </g>`),

oceanengine: makeIcon('#2563eb',
  `<g transform="translate(24,24)">
    <rect x="-14" y="4" width="7" height="12" rx="1" fill="none" stroke="#fff" stroke-width="1.8"/>
    <rect x="-3" y="-4" width="7" height="20" rx="1" fill="none" stroke="#fff" stroke-width="1.8"/>
    <rect x="8" y="-10" width="7" height="26" rx="1" fill="none" stroke="#fff" stroke-width="1.8"/>
  </g>`),

feigua: makeIcon('#16a34a',
  `<g transform="translate(24,24)">
    <circle cx="0" cy="0" r="13" fill="none" stroke="#fff" stroke-width="2"/>
    <circle cx="0" cy="0" r="5" fill="none" stroke="#fff" stroke-width="1.8"/>
    <circle cx="0" cy="0" r="1.5" fill="#fff"/>
    <path d="M0,-13 L0,-15 M0,13 L0,15 M-13,0 L-15,0 M13,0 L15,0" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
  </g>`),

xinhong: makeIcon('#dc2626',
  `<g transform="translate(24,24)">
    <rect x="-12" y="-14" width="16" height="24" rx="2" fill="none" stroke="#fff" stroke-width="2"/>
    <path d="M-6,-4 L6,-4 M-6,2 L6,2 M-6,8 L2,8" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M6,10 L14,4" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
    <path d="M10,10 L14,6" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity="0.5"/>
  </g>`),

// ===== 图片素材 =====

pexels: makeIcon('#0ea5e9',
  `<g transform="translate(24,24)">
    <rect x="-12" y="-10" width="18" height="16" rx="2" fill="none" stroke="#fff" stroke-width="2"/>
    <circle cx="-3" cy="-2" r="3.5" fill="none" stroke="#fff" stroke-width="1.5"/>
    <path d="M8,6 L14,12" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
  </g>`),

unsplash: makeIcon('#000',
  `<g transform="translate(24,24)">
    <rect x="-12" y="-12" width="24" height="18" rx="2" fill="none" stroke="#fff" stroke-width="2"/>
    <circle cx="-3" cy="-3" r="4" fill="#fff" opacity="0.8"/>
  </g>`),

pixabay: makeIcon('#16a34a',
  `<g transform="translate(24,24)">
    <path d="M-16,10 L-10,2 L-4,6 L0,-2 L8,4 L16,-4" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="6" cy="-6" r="2" fill="#fff"/>
  </g>`),

pxhere: makeIcon('#6366f1',
  `<g transform="translate(24,24)">
    <rect x="-12" y="-10" width="20" height="16" rx="2" fill="none" stroke="#fff" stroke-width="2"/>
    <path d="M-12,0 L-6,-4 L-2,2 L4,-6 L10,2" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"/>
    <circle cx="4" cy="-4" r="2" fill="#fff" opacity="0.6"/>
  </g>`),

// ===== 动图 GIF =====

giphy: makeIcon('#8b5cf6',
  `<g transform="translate(24,24)">
    <rect x="-14" y="-9" width="28" height="18" rx="3" fill="none" stroke="#fff" stroke-width="2"/>
    <polygon points="-8,-4 -8,6 0,1" fill="#fff"/>
    <polygon points="2,-4 2,6 10,1" fill="#fff"/>
  </g>`),

alphacoders: makeIcon('#0891b2',
  `<g transform="translate(24,24)">
    <rect x="-14" y="-10" width="28" height="20" rx="2" fill="none" stroke="#fff" stroke-width="2"/>
    <path d="M-14,10 L14,10" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.5"/>
    <rect x="-8" y="-6" width="6" height="6" fill="none" stroke="#fff" stroke-width="1.5"/>
    <rect x="2" y="-6" width="6" height="6" fill="none" stroke="#fff" stroke-width="1.5"/>
  </g>`),

shanmeng: makeIcon('#f59e0b',
  `<g transform="translate(24,24)">
    <path d="M0,-16 L3,-5 L14,0 L3,5 L0,16 L-3,5 L-14,0 L-3,-5 Z" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round"/>
    <circle cx="0" cy="0" r="3" fill="#fff" opacity="0.7"/>
  </g>`),

// ===== 视频素材 =====

coverr: makeIcon('#f97316',
  `<g transform="translate(24,24)">
    <rect x="-14" y="-9" width="28" height="18" rx="3" fill="none" stroke="#fff" stroke-width="2"/>
    <circle cx="0" cy="0" r="5.5" fill="none" stroke="#fff" stroke-width="2"/>
    <polygon points="-2,-3 -2,3 3,0" fill="#fff"/>
  </g>`),

mixkit: makeIcon('#7c3aed',
  `<g transform="translate(24,24)">
    <circle cx="0" cy="0" r="14" fill="none" stroke="#fff" stroke-width="2"/>
    <polygon points="-5,-6 -5,6 8,0" fill="#fff"/>
  </g>`),

'pexels-video': makeIcon('#0ea5e9',
  `<g transform="translate(24,24)">
    <rect x="-12" y="-9" width="20" height="18" rx="2" fill="none" stroke="#fff" stroke-width="2"/>
    <polygon points="-4,-4 -4,4 3,0" fill="#fff"/>
    <path d="M10,-6 L16,-8 L14,0 L16,8 L10,6" fill="none" stroke="#fff" stroke-width="1.2" opacity="0.4"/>
  </g>`),

// ===== 音频素材 =====

aigei: makeIcon('#ec4899',
  `<g transform="translate(24,24)">
    <circle cx="0" cy="0" r="12" fill="none" stroke="#fff" stroke-width="2"/>
    <path d="M-5,-4 L-5,4 M0,-6 L0,6 M5,-3 L5,3" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>
  </g>`),

'mixkit-sfx': makeIcon('#8b5cf6',
  `<g transform="translate(24,24)">
    <ellipse cx="-8" cy="0" rx="6" ry="11" fill="none" stroke="#fff" stroke-width="2"/>
    <ellipse cx="8" cy="0" rx="6" ry="11" fill="none" stroke="#fff" stroke-width="2"/>
    <path d="M-6,-13 L-6,-16 M6,-13 L6,-16" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
  </g>`),

yinxiao: makeIcon('#8b5cf6',
  `<g transform="translate(24,24)">
    <circle cx="0" cy="0" r="11" fill="none" stroke="#fff" stroke-width="2"/>
    <path d="M-3,-5 L-3,5 M2,-6 L2,6" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>
  </g>`),

taosheng: makeIcon('#06b6d4',
  `<g transform="translate(24,24)">
    <ellipse cx="0" cy="0" rx="11" ry="12" fill="none" stroke="#fff" stroke-width="2"/>
    <path d="M-4,-4 L-4,4 M2,-5 L2,5" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
  </g>`),

// ===== 视频素材额外 =====

zhiyu: makeIcon('#0ea5e9',
  `<g transform="translate(24,24)">
    <path d="M-10,8 Q-6,-4 0,2 Q6,8 10,-4" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>
    <circle cx="0" cy="4" r="3" fill="#fff" opacity="0.5"/>
  </g>`),

trailer: makeIcon('#dc2626',
  `<g transform="translate(24,24)">
    <rect x="-14" y="-9" width="28" height="18" rx="3" fill="none" stroke="#fff" stroke-width="2"/>
    <polygon points="-6,-4 -6,4 4,0" fill="#fff"/>
    <circle cx="10" cy="0" r="2" fill="#fff" opacity="0.4"/>
  </g>`),

// ===== 字体文字 =====

'100font': makeIcon('#22c55e',
  `<g transform="translate(24,24)">
    <text x="0" y="7" font-family="system-ui,sans-serif" font-size="26" font-weight="900" fill="#fff" text-anchor="middle">A</text>
  </g>`),

ziyouziti: makeIcon('#06b6d4',
  `<g transform="translate(24,24)">
    <text x="0" y="7" font-family="system-ui,serif" font-size="28" font-weight="700" fill="#fff" text-anchor="middle">字</text>
  </g>`),

haogefont: makeIcon('#dc2626',
  `<g transform="translate(24,24)">
    <circle cx="0" cy="0" r="14" fill="none" stroke="#fff" stroke-width="2.2"/>
    <text x="0" y="6" font-family="system-ui,sans-serif" font-size="18" font-weight="900" fill="#fff" text-anchor="middle">T</text>
  </g>`),

// ===== PPT 模板 =====

officeplus: makeIcon('#dc2626',
  `<g transform="translate(24,24)">
    <rect x="-12" y="-10" width="20" height="14" rx="2" fill="none" stroke="#fff" stroke-width="2"/>
    <rect x="-8" y="-6" width="12" height="6" fill="#fff" opacity="0.3"/>
    <path d="M10,-4 L16,0 L10,4" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </g>`),

// ===== 图标资源 =====

flaticon: makeIcon('#16a34a',
  `<g transform="translate(24,24)">
    <rect x="-14" y="-14" width="12" height="12" rx="3" fill="none" stroke="#fff" stroke-width="2"/>
    <rect x="2" y="-14" width="12" height="12" rx="3" fill="none" stroke="#fff" stroke-width="2"/>
    <rect x="-14" y="2" width="12" height="12" rx="3" fill="none" stroke="#fff" stroke-width="2"/>
    <rect x="2" y="2" width="12" height="12" rx="3" fill="none" stroke="#fff" stroke-width="2"/>
  </g>`),

// ===== 图片设计 =====

canva: makeIcon('#2563eb',
  `<g transform="translate(24,24)">
    <circle cx="-7" cy="-7" r="7" fill="none" stroke="#fff" stroke-width="2.2"/>
    <circle cx="7" cy="-7" r="7" fill="none" stroke="#fff" stroke-width="2.2"/>
    <circle cx="-7" cy="7" r="7" fill="none" stroke="#fff" stroke-width="2.2"/>
    <circle cx="7" cy="7" r="7" fill="none" stroke="#fff" stroke-width="2.2"/>
  </g>`),

gaoding: makeIcon('#ec4899',
  `<g transform="translate(24,24)">
    <path d="M-14,8 Q-6,-14 4,-8 Q12,2 14,-4" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="10" cy="-8" r="3" fill="#fff" opacity="0.5"/>
  </g>`),

chuangkit: makeIcon('#f97316',
  `<g transform="translate(24,24)">
    <path d="M-10,8 Q-12,-8 0,-10 Q12,-8 10,4 L-10,4 Z" fill="none" stroke="#fff" stroke-width="2.2" stroke-linejoin="round"/>
    <circle cx="-4" cy="-2" r="2" fill="#fff" opacity="0.6"/>
    <circle cx="4" cy="-2" r="2" fill="#fff" opacity="0.6"/>
  </g>`),

iconfont: makeIcon('#06b6d4',
  `<g transform="translate(24,24)">
    <path d="M0,-16 L16,-6 L16,10 L0,16 L-16,10 L-16,-6 Z" fill="none" stroke="#fff" stroke-width="2"/>
    <circle cx="0" cy="2" r="4" fill="none" stroke="#fff" stroke-width="1.5"/>
    <path d="M-4,2 L0,-2 L4,2" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
  </g>`),

'js-design': makeIcon('#8b5cf6',
  `<g transform="translate(24,24)">
    <polygon points="0,-14 14,-8 8,-2 14,8 0,14 -10,2 -6,-2 -10,-6" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round"/>
  </g>`),

// ===== 词云工具 =====

meijici: makeIcon('#0ea5e9',
  `<g transform="translate(24,24)">
    <path d="M-12,8 Q-14,-8 0,-10 Q14,-8 12,4 Q10,-2 4,-4 Q-4,-2 -6,4 Z" fill="none" stroke="#fff" stroke-width="2"/>
    <circle cx="-2" cy="-2" r="1.5" fill="#fff" opacity="0.5"/>
    <circle cx="6" cy="-4" r="1.5" fill="#fff" opacity="0.5"/>
    <circle cx="-6" cy="2" r="1.5" fill="#fff" opacity="0.4"/>
  </g>`),

ciyuntu: makeIcon('#a855f7',
  `<g transform="translate(24,24)">
    <path d="M-12,6 Q-14,-8 0,-10 Q14,-8 12,4 Q10,-2 4,-4 Q-4,-2 -6,4 Z" fill="none" stroke="#fff" stroke-width="2"/>
    <circle cx="-2" cy="-2" r="1.5" fill="#fff" opacity="0.5"/>
    <circle cx="6" cy="-4" r="1.5" fill="#fff" opacity="0.5"/>
    <circle cx="10" cy="-10" r="2" fill="#fff" opacity="0.6"/>
  </g>`),

ciyuntu2: makeIcon('#7c3aed',
  `<g transform="translate(24,24)">
    <ellipse cx="0" cy="0" rx="14" ry="10" fill="none" stroke="#fff" stroke-width="2.2"/>
    <path d="M-8,-4 Q-4,-8 0,-4 Q4,0 8,-2" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
    <path d="M-6,4 Q0,2 6,6" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity="0.4"/>
  </g>`),

// ===== AI 声音 (design section) =====

'fish-audio2': makeIcon('#6366f1',
  `<g transform="translate(24,24)">
    <path d="M-10,2 Q-4,-10 10,-6 Q14,0 10,8 Q-4,10 -10,2 Z" fill="none" stroke="#fff" stroke-width="2"/>
    <circle cx="-2" cy="-2" r="2" fill="#fff"/>
    <path d="M14,-6 L19,-11 L15,-4 Z" fill="#fff" opacity="0.8"/>
  </g>`),

// ===== 工作流图 =====

boardmix: makeIcon('#2563eb',
  `<g transform="translate(24,24)">
    <rect x="-12" y="-12" width="11" height="11" rx="2" fill="none" stroke="#fff" stroke-width="2"/>
    <rect x="1" y="1" width="14" height="14" rx="2" fill="none" stroke="#fff" stroke-width="1.8" opacity="0.5"/>
    <path d="M-1,-1 L1,1" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M-12,-12 L-16,-16 M-8,-8 L-10,-10" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" opacity="0.4"/>
  </g>`),

// ===== 表单工具 =====

jinshuju: makeIcon('#16a34a',
  `<g transform="translate(24,24)">
    <rect x="-12" y="-14" width="24" height="28" rx="3" fill="none" stroke="#fff" stroke-width="2.2"/>
    <path d="M-8,-4 L8,-4 M-8,2 L8,2 M-8,8 L4,8" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M6,14 L10,10" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
  </g>`),

};

// Generate all SVG files
for (const [key, svg] of Object.entries(icons)) {
  fs.writeFileSync(path.join(dir, key + '.svg'), svg.trim(), 'utf8');
  console.log('Created: ' + key + '.svg');
}
console.log('Done! Generated ' + Object.keys(icons).length + ' icons.');
