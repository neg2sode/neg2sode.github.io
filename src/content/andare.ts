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
  tagline: 'Cadence for cycling, running and walking, with just your iPhone.',
  taglineZh: '只需一台 iPhone，就能测出骑行、跑步与步行的踏频。',

  // About — one paragraph per array item (English / Chinese, same order).
  about: [
    'Andare derives your cadence (pedal strokes or steps per minute) from the iPhone’s motion sensors alone — no external sensor or watch required. It wraps that reading into a full workout tracker with live stats, GPS route maps, zone-coloured cadence charts and HealthKit sync.',
  ],
  aboutZh: [
    'Andare 仅通过 iPhone 自带的运动传感器计算踏频（每分钟踩踏或步频），无需外接传感器或手表。配合实时数据、GPS 路线地图、按区间着色的踏频图与 HealthKit 同步，构成一套完整的运动记录工具。',
  ],

  supportEmail: 'neg2sode@outlook.com',
  github: 'https://github.com/neg2sode/Andare',
  platform: 'iOS 18.2+',
  price: 'Free',
};
