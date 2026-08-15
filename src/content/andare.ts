// ─────────────────────────────────────────────────────────────────────────────
//  Andare (阳踏) support page content.
//  App Store requires a support URL; this page lives at /#/andare on the site.
//  Edit the strings below — no code knowledge needed. Bilingual on purpose:
//  English first (App Store reviewers / international users), Chinese second.
// ─────────────────────────────────────────────────────────────────────────────

export const andare = {
  name: 'Andare',
  nameZh: '阳踏',
  icon: '/andare/icon.png',
  showcase: '/andare/andare_showcase.jpg',
  tagline: 'Cadence for cycling, running and walking — from your iPhone alone.',
  taglineZh: '只需一台 iPhone，就能测出骑行、跑步与步行的踏频。',

  // About — one paragraph per array item (English / Chinese, same order).
  about: [
    'Andare derives your cadence (pedal strokes or steps per minute) from the iPhone’s motion sensors alone — no external sensor or watch required. It wraps that reading into a full workout tracker with live stats, GPS route maps, zone-coloured cadence charts and HealthKit sync.',
  ],
  aboutZh: [
    'Andare 仅通过 iPhone 自带的运动传感器计算踏频（每分钟踩踏或步频），无需外接传感器或手表。配合实时数据、GPS 路线地图、按区间着色的踏频图与 HealthKit 同步，构成一套完整的运动记录工具。',
  ],

  features: [
    {
      title: 'Sensor-only cadence',
      titleZh: '仅靠传感器测踏频',
      body: '100 Hz gyroscope sampling with FFT-based detection — no extra hardware.',
      bodyZh: '100 Hz 陀螺仪采样 + FFT 算法，无需额外硬件。',
    },
    {
      title: 'Cycling · running · walking',
      titleZh: '骑行 · 跑步 · 步行',
      body: 'Detection bands tuned per workout type, plus elevation, distance and calories.',
      bodyZh: '针对每种运动类型优化的检测区间，并记录海拔、距离与卡路里。',
    },
    {
      title: 'Live Activity',
      titleZh: '实时活动',
      body: 'Glanceable cadence in the Lock Screen and Dynamic Island while you ride or run.',
      bodyZh: '骑行或跑步时，在锁屏与灵动岛上实时查看踏频。',
    },
    {
      title: 'Route & charts',
      titleZh: '路线与图表',
      body: 'GPS route map and a zone-coloured cadence chart for every workout.',
      bodyZh: '每次运动都带 GPS 路线图与按区间着色的踏频图。',
    },
    {
      title: 'HealthKit sync',
      titleZh: 'HealthKit 同步',
      body: 'Workouts and stats are saved to Apple Health automatically.',
      bodyZh: '运动与数据自动写入「健康」App。',
    },
    {
      title: 'Made for you',
      titleZh: '个性化',
      body: 'Customisable stat tiles, cadence nudges and a built-in guide.',
      bodyZh: '可自定义数据卡片、踏频提醒，并内置使用指南。',
    },
  ],

  supportEmail: 'neg2sode@gmail.com',
  github: 'https://github.com/neg2sode/Andare',
  platform: 'iOS 18.2+',
  price: 'Free',
};
