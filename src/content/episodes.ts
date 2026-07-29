// ─────────────────────────────────────────────────────────────────────────────
//  EDIT ME.  This file is the content of your site.
//  Change the text below and the homepage updates. No code knowledge needed —
//  just edit the strings inside the quotes.
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
  title: '雨林观察者的博客',
  intro: '这里记录我的播客、写作和一些想法。',
  links: [
    { label: '小宇宙', href: 'https://www.xiaoyuzhoufm.com/' },
    { label: 'GitHub', href: 'https://github.com/neg2sode' },
  ],
};

// A show-notes body is an ordered list of blocks. They render top-to-bottom in
// this exact order, so photos sit between the paragraphs just like on Xiaoyuzhou.
export type Block =
  | { type: 'text'; text: string } // one paragraph; use \n for line breaks
  | { type: 'photo'; src: string; caption: string } // NN-... file + its caption
  | { type: 'link'; href: string; label: string };

export type Episode = {
  id: string; // #anchor / route id — short, no spaces
  number: string; // e.g. "EP01"
  title: string;
  show: string;
  host: string;
  date: string; // YYYY-MM-DD
  duration: string;
  cover: string; // path under /public
  audioUrl: string; // direct audio file (m4a/mp3)
  xiaoyuzhouUrl: string;
  excerpt: string; // short teaser shown on the card
  body: Block[]; // full show notes, in order
};

export const episodes: Episode[] = [
  {
    id: 'ep01',
    number: 'EP01',
    title: 'AI指向温带雨林',
    show: '18岁看世界',
    host: '谷起',
    date: '2026-07-24',
    duration: '51 分钟',
    cover: '/ep01-cover.png',
    audioUrl:
      'https://media.xyzcdn.net/69e5d3f47918b67d1670d4f2/liVMqDJCK_SeGuE7SvcTHnQkbkZt.m4a',
    xiaoyuzhouUrl:
      'https://www.xiaoyuzhoufm.com/episode/6a62ccb96356eb2d9be785fa',
    excerpt: '带着 AI 从苏格兰高地到约克郡谷地，聊温带雨林、艺术语境与一路的惊喜。',
    body: [
      {
        type: 'text',
        text: '· 苏格兰高地\n· 带着AI旅游\n· 约克郡谷地\n· 温带雨林\n· 艺术语境\n· 自然健身房\n· 学习且旅行\n· 惊喜分给路上',
      },
      { type: 'text', text: '以上是谷起主播认为本期的主题' },
      {
        type: 'photo',
        src: '/images/ep01/01-inverness-lichen.jpeg',
        caption: '这是谷起在Inverness（一个英国城市）发现的lichen（地衣）！',
      },
      {
        type: 'photo',
        src: '/images/ep01/02-kyle-of-lochalsh.jpeg',
        caption:
          '这是Kyle of Lochalsh（一个小镇）车站！隔着海湾对面的山就是Isle of Skye（天空岛/斯凯岛）',
      },
      {
        type: 'photo',
        src: '/images/ep01/03-moss-temperate-rainforest.jpeg',
        caption:
          '这是谷起第一次感到雨林苔藓的神奇时拍下的照片！正是将这张照片发给AI解释后，他才认识到温带雨林这一概念',
      },
      {
        type: 'photo',
        src: '/images/ep01/04-malham-cove-limestone.jpeg',
        caption:
          '这是天刚开晴的时候谷起遇到的Malham Cove（Malham小镇的地标）！虽然地面上是坑坑洼洼的limestone（石灰石），但因为刚发现有信号，他便开始和家人视频通话了',
      },
      {
        type: 'photo',
        src: '/images/ep01/05-malham-cove-grike.jpeg',
        caption: '这是其中一处石头缝间看到的景象！每处都是一片不一样的天地',
      },
      {
        type: 'link',
        href: 'https://www.bilibili.com/video/BV18Wgq6mEa1',
        label: 'www.bilibili.com',
      },
      {
        type: 'text',
        text: '以及这里有谷起在Thurso（一个小镇）看到的景象！他对发了狂着拍后留下这段感到非常自豪',
      },
      {
        type: 'text',
        text: '一些英文名词（非常不全）：\nawe-inspiring: 震撼到说不出话来的感觉\ncontext: 语境',
      },
    ],
  },
];
