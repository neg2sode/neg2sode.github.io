// ─────────────────────────────────────────────────────────────────────────────
//  EDIT ME.  This file is the content of your site.
//  Change the text below and the homepage updates. No code knowledge needed —
//  just edit the strings inside the quotes.
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
  // Your site title (shown big at the top) and one-line intro.
  title: 'your-name',
  intro: '这里记录我的播客、写作和一些想法。',
  // Links shown in the footer. Add/remove freely.
  links: [
    { label: '小宇宙', href: 'https://www.xiaoyuzhoufm.com/' },
    { label: 'GitHub', href: 'https://github.com/neg2sode' },
  ],
};

export type Photo = {
  // See public/images/ep01/PROTOCOL.md for how to name & export files.
  src: string;      // e.g. '/images/ep01/isle-of-skye-01.jpg'
  caption: string;  // shown under the photo
};

export type Episode = {
  id: string;          // used for the #anchor link — keep it short, no spaces
  number: string;      // e.g. "EP01"
  title: string;
  show: string;        // the podcast/show name
  host: string;        // host name(s)
  date: string;        // YYYY-MM-DD
  duration: string;    // free text, e.g. "51 分钟"
  cover: string;       // image path under /public
  audioUrl: string;    // direct audio file (m4a/mp3)
  xiaoyuzhouUrl: string;
  // Show notes: each string is one paragraph. Add as many as you like.
  showNotes: string[];
  // Photos for the episode gallery. Leave [] until you've exported them.
  photos: Photo[];
};

export const episodes: Episode[] = [
  {
    id: 'ep01',
    number: 'EP01',
    title: 'AI指向温带雨林',
    show: '18岁看世界',
    host: '谷起',
    date: '2026-07-24', // TODO: confirm the exact publish date
    duration: '51 分钟',
    cover: '/ep01-cover.jpg',
    audioUrl:
      'https://media.xyzcdn.net/69e5d3f47918b67d1670d4f2/liVMqDJCK_SeGuE7SvcTHnQkbkZt.m4a',
    xiaoyuzhouUrl:
      'https://www.xiaoyuzhoufm.com/episode/6a62ccb96356eb2d9be785fa',
    // ── DRAFT show notes assembled from your Xiaoyuzhou themes. Refine freely. ──
    showNotes: [
      '【本期简介】带着 AI 在英国旅行——从苏格兰高地到约克郡谷地，聊温带雨林、艺术语境、自然健身房，以及一边学习一边旅行的惊喜。',
      '【关键词】苏格兰高地 · 带着AI旅游 · 约克郡谷地 · 温带雨林 · 艺术语境 · 自然健身房 · 学习且旅行',
      '【一个瞬间】在温带雨林里拍下一丛苔藓，发给 AI 识别，由此对这个生态系统有了更深的理解。',
      '【本期单词】awe-inspiring（令人心生敬畏的）· context（语境）',
      '【拍摄地】Inverness · Kyle of Lochalsh · Isle of Skye · Malham Cove · Thurso',
      '【延伸观看】Thurso 的更多画面见 Bilibili：<在这里粘贴链接>',
      '【关于本节目】听《18岁看世界》上小宇宙。',
    ],
    // Fill this in after you export photos (see PROTOCOL.md). Example entries:
    photos: [
      // { src: '/images/ep01/isle-of-skye-01.jpg', caption: 'Isle of Skye' },
      // { src: '/images/ep01/malham-cove-01.jpg', caption: 'Malham Cove' },
    ],
  },
];
