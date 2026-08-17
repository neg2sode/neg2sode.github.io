// ─────────────────────────────────────────────────────────────────────────────
//  Andare (阳踏) privacy policy content.
//  Lives at /#/andare/privacy on the site. App Store requires a privacy URL.
//  Edit the strings below — no code knowledge needed. Bilingual on purpose:
//  English first, Chinese second, one paragraph per array item (same order).
// ─────────────────────────────────────────────────────────────────────────────

export type PrivacySection = {
  title: string;
  titleZh: string;
  body: string[]; // English paragraphs
  bodyZh: string[]; // Chinese paragraphs, same order
};

export const andarePrivacy = {
  updated: '2026-08-17',
  sections: [
    {
      title: 'Overview',
      titleZh: '概述',
      body: [
        'Andare is a cadence and workout tracker for cycling, running and walking. It runs entirely on your iPhone and requires no account or sign-up. This policy explains what data Andare accesses, how it is used and how it is kept private.',
      ],
      bodyZh: [
        'Andare 是一款面向骑行、跑步与步行的踏频与运动记录应用，完全运行在你的 iPhone 上，无需账号或注册。本政策说明 Andare 会访问哪些数据、如何使用它们，以及如何保护你的隐私。',
      ],
    },
    {
      title: 'Data accessed on device',
      titleZh: '设备上访问的数据',
      body: [
        'Motion data — Andare reads your iPhone’s gyroscope and accelerometer to compute cadence. This motion data is processed on-device in real time and is never stored or transmitted.',
        'Location — When you record a workout, Andare uses GPS location to draw your route. Location is only read while a workout is active and is stored solely on your device.',
        'Health data — With your permission, Andare writes your workouts and statistics to Apple Health. It may also read the health data you authorise — such as height, weight, steps, daylight exposure, past cycling cadence, walking distance and workouts — to compute your statistics. All HealthKit data stays on-device with Apple Health and is never uploaded by Andare.',
      ],
      bodyZh: [
        '运动数据——Andare 读取 iPhone 的陀螺仪与加速度计来计算踏频。这些运动数据在设备端实时处理，不会被存储或传输。',
        '位置——记录运动时，Andare 会使用 GPS 定位来绘制路线。仅在运动进行期间读取位置，且只保存在你的设备上。',
        '健康数据——经你授权后，Andare 会将你的运动与统计信息写入「健康」App，并可能读取你授权的数据——例如身高、体重、步数、户外日照时间、过往骑行踏频、步行距离与运动记录——用于计算统计信息。所有 HealthKit 数据都随「健康」App 保留在设备本地，Andare 绝不会上传。',
      ],
    },
    {
      title: 'What Andare does not do',
      titleZh: 'Andare 不会做的事',
      body: [
        'Andare does not collect personal information, does not require an account and contains no advertising.',
        'Andare includes no third-party analytics, tracking or advertising SDKs.',
        'No workout, motion, location or health data ever leaves your device.',
      ],
      bodyZh: [
        'Andare 不收集个人信息，无需账号，也不含任何广告。',
        'Andare 不包含任何第三方分析、追踪或广告 SDK。',
        '运动、运动传感器、位置或健康数据永远不会离开你的设备。',
      ],
    },
    {
      title: 'Data storage',
      titleZh: '数据存储',
      body: [
        'Your workout history, routes and settings are stored locally on your device only. Deleting the Andare app removes all of its data.',
      ],
      bodyZh: [
        '你的运动记录、路线与设置仅保存在设备本地。卸载 Andare 即会删除其全部数据。',
      ],
    },
    {
      title: 'Debug log export',
      titleZh: '调试日志导出',
      body: [
        'For troubleshooting, Andare lets you export a debug log. The log contains app-internal information only (version, settings and error details). You can copy it, or open an email draft — Andare pre-fills basic device information (model and system version) that you can edit before sending. Nothing is sent automatically, and the log contains no location, motion or health data.',
      ],
      bodyZh: [
        '为便于排查问题，Andare 允许你导出调试日志。日志仅包含 App 内部信息（版本、设置与错误详情）。你可以复制它，或打开一封邮件草稿——Andare 会预填基本的设备信息（型号与系统版本），发送前你都可以编辑。一切均由你手动发起，日志不含位置、运动或健康数据。',
      ],
    },
    {
      title: 'Permissions',
      titleZh: '权限',
      body: [
        'Andare requests Motion & Fitness, Location and Health permissions only when a feature needs them. You can grant or revoke each one at any time in the Settings app, and Andare keeps working (with reduced features) if you decline.',
      ],
      bodyZh: [
        'Andare 只在功能需要时请求「运动与健身」「定位」与「健康」权限。你随时可以在「设置」App 中授予或撤销这些权限；即使拒绝，Andare 仍可继续使用（部分功能会受限）。',
      ],
    },
    {
      title: 'Changes to this policy',
      titleZh: '本政策的变更',
      body: [
        'I may update this privacy policy from time to time. When I do, the updated version will be posted on this page with a new date.',
      ],
      bodyZh: [
        '我可能会不定期更新本隐私政策。更新后的版本会连同新的日期一起发布在本页面。',
      ],
    },
    {
      title: 'Contact',
      titleZh: '联系我',
      body: [
        'If you have questions about this policy or your privacy while using Andare, contact me at neg2sode@outlook.com.',
      ],
      bodyZh: [
        '如对本政策或你在使用 Andare 时的隐私有任何疑问，请通过 neg2sode@outlook.com 联系我。',
      ],
    },
  ] satisfies PrivacySection[],
};
