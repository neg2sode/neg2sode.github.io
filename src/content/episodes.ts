// ─────────────────────────────────────────────────────────────────────────────
//  EDIT ME.  This file is the content of your site.
//  Change the text below and the homepage updates. No code knowledge needed —
//  just edit the strings inside the quotes.
//
//  Every piece of Chinese text has an English twin (`…En` / `…Zh`), so a
//  visitor who only reads English understands the whole page after switching.
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
  title: '雨林观察者的博客',
  titleEn: 'The Rainforest Observer',
  intro: '我目前只有播客(｡•́︿•̀｡)',
  introEn: 'Right now I only have a podcast (｡•́︿•̀｡)',
  // Avatar shown in the header (your photo at public/avatar.jpg).
  avatar: '/avatar.jpg',
  links: [
    { label: '小宇宙', labelEn: 'Xiaoyuzhou', href: 'https://www.xiaoyuzhoufm.com/' },
    { label: 'GitHub', labelEn: 'GitHub', href: 'https://github.com/neg2sode' },
  ],
};

// A show-notes body is an ordered list of blocks. They render top-to-bottom in
// this exact order, so photos sit between the paragraphs just like on Xiaoyuzhou.
export type Block =
  | { type: 'text'; text: string; textEn?: string } // one paragraph; \n for line breaks
  | { type: 'photo'; src: string; caption: string; captionEn?: string }
  | { type: 'bilibili'; bvid: string; href: string; caption?: string; captionEn?: string } // inset video player + caption
  | { type: 'link'; href: string; label: string; labelEn?: string };

export type Episode = {
  id: string; // #anchor / route id — short, no spaces
  number: string; // e.g. "EP01"
  title: string;
  titleEn: string;
  show: string;
  showEn: string;
  host: string;
  hostEn: string;
  date: string; // YYYY-MM-DD
  duration: string;
  durationEn: string; // same duration, English unit ("51 min")
  cover: string; // path under /public
  audioUrl: string; // direct audio file (m4a/mp3)
  xiaoyuzhouUrl: string;
  excerpt: string; // short teaser shown on the card
  excerptEn: string;
  body: Block[]; // full show notes, in order
};

export const episodes: Episode[] = [
  {
    id: 'ep01',
    number: 'EP01',
    title: 'AI指向温带雨林',
    titleEn: 'AI Points at the Temperate Rainforest',
    show: '18岁看世界',
    showEn: 'Seeing the World at 18',
    host: '谷起',
    hostEn: 'Guqi',
    date: '2026-07-24',
    duration: '51 分钟',
    durationEn: '51 min',
    cover: '/ep01-cover.png',
    audioUrl:
      'https://media.xyzcdn.net/69e5d3f47918b67d1670d4f2/liVMqDJCK_SeGuE7SvcTHnQkbkZt.m4a',
    xiaoyuzhouUrl:
      'https://www.xiaoyuzhoufm.com/episode/6a62ccb96356eb2d9be785fa',
    excerpt: '带着 AI 从苏格兰高地到约克郡谷地，聊温带雨林、艺术语境与一路的惊喜。',
    excerptEn:
      'Taking AI from the Scottish Highlands down to the Yorkshire Dales — temperate rainforest, the context around a work of art, and the surprises along the way.',
    body: [
      {
        type: 'text',
        text: '· 苏格兰高地\n· 带着AI旅游\n· 约克郡谷地\n· 温带雨林\n· 艺术语境\n· 自然健身房\n· 学习且旅行\n· 惊喜分给路上',
        textEn:
          '· The Scottish Highlands\n· Travelling with AI\n· The Yorkshire Dales\n· Temperate rainforest\n· The context of an artwork\n· Nature as a gym\n· Learning while travelling\n· Handing the surprises out along the road',
      },
      {
        type: 'text',
        text: '以上是谷起主播认为本期的主题',
        textEn: 'Those, in the host Guqi’s view, are the themes of this episode.',
      },
      {
        type: 'photo',
        src: '/images/ep01/01-inverness-lichen.jpeg',
        caption: '这是谷起在Inverness（一个英国城市）发现的lichen（地衣）！',
        captionEn:
          'The lichen (地衣) Guqi found in Inverness — a city in the north of the UK.',
      },
      {
        type: 'photo',
        src: '/images/ep01/02-kyle-of-lochalsh.jpeg',
        caption:
          '这是Kyle of Lochalsh（一个小镇）车站！隔着海湾对面的山就是Isle of Skye（天空岛/斯凯岛）',
        captionEn:
          'Kyle of Lochalsh station — a small town on the west coast. The mountains across the bay are the Isle of Skye (天空岛 / 斯凯岛).',
      },
      {
        type: 'photo',
        src: '/images/ep01/03-moss-temperate-rainforest.jpeg',
        caption:
          '这是谷起第一次感到雨林苔藓的神奇时拍下的照片！正是将这张照片发给AI解释后，他才认识到温带雨林这一概念',
        captionEn:
          'The photo Guqi took the first time rainforest moss struck him as magic. Sending this very photo to an AI to have it explained is how he first came across the idea of a temperate rainforest.',
      },
      {
        type: 'photo',
        src: '/images/ep01/04-malham-cove-limestone.jpeg',
        caption:
          '这是天刚开晴的时候谷起遇到的Malham Cove（Malham小镇的地标）！虽然地面上是坑坑洼洼的limestone（石灰石），但因为刚发现有信号，他便开始和家人视频通话了',
        captionEn:
          'Malham Cove — the landmark of the village of Malham — caught just as the sky cleared. The ground is pitted limestone (石灰石), but he had only just got a signal back, so he called his family on video instead.',
      },
      {
        type: 'photo',
        src: '/images/ep01/05-malham-cove-grike.jpeg',
        caption: '这是其中一处石头缝间看到的景象！每处都是一片不一样的天地',
        captionEn:
          'The view through one of the gaps between the rocks. Every crack opens onto a different little world.',
      },
      {
        type: 'bilibili',
        bvid: 'BV18Wgq6mEa1',
        href: 'https://www.bilibili.com/video/BV18Wgq6mEa1',
        caption:
          '以及这里有谷起在Thurso（一个小镇）看到的景象！他对发了狂着拍后留下这段感到非常自豪',
        captionEn:
          'And here is what Guqi saw in Thurso — a small town in the far north. He is rather proud of the clip he kept after shooting like a madman.',
      },
      {
        type: 'text',
        text: '一些英文名词（非常不全）：\nawe-inspiring: 震撼到说不出话来的感觉\ncontext: 语境',
        textEn:
          'A few English words (very incomplete):\nawe-inspiring: impressive enough to leave you speechless\ncontext: the situation a thing sits in — 语境',
      },
    ],
  },
];

// ── Neighbours: other things I make, linked from the top nav ──────────────────
export type Neighbour = {
  id: string;
  title: string;
  titleZh: string;
  href: string;
};

export const neighbours: Neighbour[] = [
  {
    id: 'orimono',
    title: 'Orimono',
    titleZh: 'Orimono',
    // A drum machine made of threads, running in the browser.
    href: 'https://neg2sode.github.io/orimono/',
  },
];
