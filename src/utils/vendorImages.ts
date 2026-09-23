/**
 * Vendor image utilities — maps vendor slugs to actual image files.
 *
 * Casino logos  → /images/casino/main_icon_{slug}.png
 * Casino bg     → /images/casino/bg_{n}.png  +  minibg_{n}.png
 * Slot logos    → /images/casino/main_slot_{slug}.png
 * Slot side art → /images/casino/slot_{n}.png
 */

// ─── Casino (Live Casino) ───────────────────────────────────────────────────

/** vendor display‑name → image slug used in main_icon_{slug}.png */
const CASINO_VENDOR_TO_SLUG: Record<string, string> = {
  // Korean
  '에볼루션': 'evolution',
  '프라그마틱 플레이': 'prag',
  '프라그마틱플레이': 'prag',
  '프라그마틱': 'prag',
  'AI 카지노': 'asia',
  'PA 라이브 카지노': 'playtech',
  'TG 스피드': 'taisan',
  'WM 카지노': 'wm',
  '닭싸움': 'bota',
  '올벳 라이브': 'vegas',
  '벳 게임즈 TV': 'betgame',
  '디비 라이브': 'betgame',
  '플레이텍 카지노': 'playtech',
  '마이크로게이밍 카지노': 'micro',
  '오리엔탈 게이밍': 'oriental',
  '비보 게이밍': 'vivo',
  '프리티 게이밍': 'sexy',
  '두원': 'dowinn',
  '두윈': 'dowinn',
  '드림게이밍': 'dream',
  '드림게임': 'dream',
  '마이크로게이밍': 'micro',
  '빅게이밍': 'big',
  '섹시게이밍': 'sexy',
  '섹시카지노': 'sexy',
  '아시아게이밍': 'asia',
  '에즈기': 'ezugi',
  '이주기': 'ezugi',
  '오리엔탈게이밍': 'oriental',
  '오리엔탈': 'oriental',
  '비보게이밍': 'vivo',
  '비보': 'vivo',
  '플레이텍': 'playtech',
  '스카이윈드': 'sky',
  '올벳': 'vegas',
  '엑스피지': 'asia',
  '윈퍼니티': 'vegas',
  '핫로드': 'biter',
  '디비': 'betgame',
  '사게이밍': 'asia',
  '프리티': 'sexy',
  '벳': 'betgame',
  '베가스': 'vegas',
  '타이산': 'taisan',
  '모티베이션': 'motivation',
  '보타': 'bota',
  '알씨지': 'rcg',
  '로얄': 'royal',
  // English
  'Evolution': 'evolution',
  'Pragmatic Play': 'prag',
  'PragmaticPlay': 'prag',
  'PragmaticPlay_LiveCasino': 'prag',
  'Dream Gaming': 'dream',
  'DreamGaming': 'dream',
  'DreamGame': 'dream',
  'Big Gaming': 'big',
  'BigGaming': 'big',
  'Ezugi': 'ezugi',
  'Microgaming': 'micro',
  'MicroGaming': 'micro',
  'Oriental Gaming': 'oriental',
  'OrientalGaming': 'oriental',
  'Playtech': 'playtech',
  'PlayTech': 'playtech',
  'Sexy Gaming': 'sexy',
  'SexyGaming': 'sexy',
  'SexyCasino': 'sexy',
  'Vivo Gaming': 'vivo',
  'VivoGaming': 'vivo',
  'WM Casino': 'wm',
  'WMCasino': 'wm',
  'Asia Gaming': 'asia',
  'AsiaGaming': 'asia',
  'Skywind': 'sky',
  'Skywind_LiveCasino': 'sky',
  'AllBet': 'vegas',
  'AllbetLive': 'vegas',
  'SA Gaming': 'asia',
  'SAGaming': 'asia',
  'Pretty Gaming': 'sexy',
  'PrettyGaming': 'sexy',
  'BetGames': 'betgame',
  'BetGamesTv': 'betgame',
  'Vegas': 'vegas',
  'Taisan': 'taisan',
  'TGSpeed': 'taisan',
  'Bota': 'bota',
  'CockFight': 'bota',
  'Dowinn': 'dowinn',
  'RCG': 'rcg',
  'Hotroad': 'biter',
  'HotRoad': 'biter',
  'Royal': 'royal',
  'EEAI': 'asia',
  'DBLive': 'betgame',
  'PlayAce': 'asia',
  'Winfinity': 'vegas',
  'XproGaming': 'asia',
};

/** Available casino icon slugs (main_icon_{slug}.png files exist) */
const CASINO_ICON_SLUGS = [
  'evolution', 'prag', 'dream', 'big', 'ezugi', 'micro', 'oriental',
  'playtech', 'sexy', 'vivo', 'wm', 'asia', 'sky', 'vegas', 'betgame',
  'dowinn', 'taisan', 'bota', 'motivation', 'rcg', 'biter', 'royal', 'coming', 'slot',
];

// ─── Slot ─────────────────────────────────────────────────────────────────

/** vendor name → { slug for main_slot_{slug}.png, slotIndex for slot_{n}.png } */
const SLOT_VENDOR_TO_IMAGE: Record<string, { slug: string; slotIndex: number }> = {
  // Korean
  '1x2 게이밍': { slug: '1x2gaming', slotIndex: 1 },
  '1X2 게이밍': { slug: '1x2gaming', slotIndex: 1 },
  'BT 게이밍': { slug: 'btg', slotIndex: 2 },
  'CP게임': { slug: 'cc88', slotIndex: 3 },
  'CP 게임': { slug: 'cc88', slotIndex: 3 },
  'CQ9': { slug: 'cq9', slotIndex: 4 },
  'cq9': { slug: 'cq9', slotIndex: 4 },
  '씨큐나인': { slug: 'cq9', slotIndex: 4 },
  '씨큐9': { slug: 'cq9', slotIndex: 4 },
  'JDB 슬롯': { slug: 'dragoon', slotIndex: 5 },
  'JiLi': { slug: 'ely', slotIndex: 6 },
  'JILI': { slug: 'ely', slotIndex: 6 },
  'LGD 게이밍': { slug: 'evoplay', slotIndex: 7 },
  'PA 슬롯': { slug: 'playtech', slotIndex: 24 },
  'PG소프트': { slug: 'pgsoft', slotIndex: 20 },
  'PG 소프트': { slug: 'pgsoft', slotIndex: 20 },
  'YES 빙고': { slug: 'bng', slotIndex: 1 },
  'YGG 드라실': { slug: 'ygg', slotIndex: 8 },
  '게임아트': { slug: 'gameart', slotIndex: 9 },
  '프라그마틱플레이 슬롯': { slug: 'prag', slotIndex: 25 },
  '프라그마틱플레이': { slug: 'prag', slotIndex: 25 },
  '프라그마틱': { slug: 'prag', slotIndex: 25 },
  '하바네로': { slug: 'habanero', slotIndex: 10 },
  'CQ9 슬롯': { slug: 'cq9', slotIndex: 4 },
  '마이크로게이밍 슬롯': { slug: 'micro', slotIndex: 14 },
  '마이크로게이밍': { slug: 'micro', slotIndex: 14 },
  '넷엔트': { slug: 'netent', slotIndex: 16 },
  '플레이 앤 고': { slug: 'playngo', slotIndex: 21 },
  '플레이앤고': { slug: 'playngo', slotIndex: 21 },
  '노리밋시티 슬롯': { slug: 'nolimit', slotIndex: 18 },
  '노리밋시티': { slug: 'nolimit', slotIndex: 18 },
  '스카이윈드': { slug: 'skywind', slotIndex: 30 },
  '에보플레이 슬롯': { slug: 'evoplay', slotIndex: 7 },
  '에보플레이': { slug: 'evoplay', slotIndex: 7 },
  '릴렉스': { slug: 'relax', slotIndex: 28 },
  '퀵스핀': { slug: 'quickspin', slotIndex: 26 },
  '레드타이거': { slug: 'redtiger', slotIndex: 27 },
  'Evo 레드타이거': { slug: 'redtiger', slotIndex: 27 },
  '플레이슨': { slug: 'playson', slotIndex: 22 },
  '와즈단': { slug: 'wazdan', slotIndex: 35 },
  '썬더킥': { slug: 'thunderkick', slotIndex: 34 },
  '분고': { slug: 'bng', slotIndex: 1 },
  'BTG 슬롯': { slug: 'btg', slotIndex: 2 },
  'BTG': { slug: 'btg', slotIndex: 2 },
  '플레이스타 슬롯': { slug: 'playstar', slotIndex: 23 },
  '플레이스타': { slug: 'playstar', slotIndex: 23 },
  '핵쏘우게이밍 슬롯': { slug: 'hack', slotIndex: 11 },
  '핵쏘우게이밍': { slug: 'hack', slotIndex: 11 },
  '블루프린트': { slug: 'blueprint', slotIndex: 12 },
  '넷게이밍': { slug: 'netent', slotIndex: 16 },
  '아시아 게이밍 슬롯': { slug: 'dragoon', slotIndex: 5 },
  '비게이밍 슬롯': { slug: 'bng', slotIndex: 13 },
  '부밍게임즈 슬롯': { slug: 'bng', slotIndex: 14 },
  '익스팬스 슬롯': { slug: 'ely', slotIndex: 6 },
  '플레이텍': { slug: 'playtech', slotIndex: 24 },
  '나가': { slug: 'naga', slotIndex: 15 },
  '스피닉스': { slug: 'spinix', slotIndex: 33 },
  '로얄': { slug: 'royal', slotIndex: 29 },
  '월드매치': { slug: 'world', slotIndex: 17 },
  '슬롯밀': { slug: 'slotmeal', slotIndex: 31 },
  '넥스트스핀': { slug: 'next', slotIndex: 17 },
  '피터슨스': { slug: 'peternsons', slotIndex: 19 },
  '히든버튼': { slug: 'hiddenbutton', slotIndex: 12 },
  '아바타': { slug: 'avatar', slotIndex: 18 },
  '스페이드': { slug: 'spade', slotIndex: 32 },
  '패스트스핀': { slug: 'fastspin', slotIndex: 8 },
  'KA 게이밍': { slug: 'kagaming', slotIndex: 13 },
  // English
  'PragmaticPlay': { slug: 'prag', slotIndex: 25 },
  'PragmaticPlay_Slot': { slug: 'prag', slotIndex: 25 },
  'Habanero': { slug: 'habanero', slotIndex: 10 },
  'Microgaming': { slug: 'micro', slotIndex: 14 },
  'MicrogamingSlot': { slug: 'micro', slotIndex: 14 },
  'NetEnt': { slug: 'netent', slotIndex: 16 },
  'PlaynGo': { slug: 'playngo', slotIndex: 21 },
  'NoLimitCity': { slug: 'nolimit', slotIndex: 18 },
  'Skywind': { slug: 'skywind', slotIndex: 30 },
  'Skywind_Slot': { slug: 'skywind', slotIndex: 30 },
  'Evoplay': { slug: 'evoplay', slotIndex: 7 },
  'RelaxGaming': { slug: 'relax', slotIndex: 28 },
  'QuickSpin': { slug: 'quickspin', slotIndex: 26 },
  'RedTiger': { slug: 'redtiger', slotIndex: 27 },
  'Playson': { slug: 'playson', slotIndex: 22 },
  'Wazdan': { slug: 'wazdan', slotIndex: 35 },
  'Thunderkick': { slug: 'thunderkick', slotIndex: 34 },
  'PGSoft': { slug: 'pgsoft', slotIndex: 20 },
  'Booongo': { slug: 'bng', slotIndex: 1 },
  'BigTimeGaming': { slug: 'btg', slotIndex: 2 },
  'BTGaming': { slug: 'btg', slotIndex: 2 },
  'PlayStar': { slug: 'playstar', slotIndex: 23 },
  'Hacksaw': { slug: 'hack', slotIndex: 11 },
  'GameArt': { slug: 'gameart', slotIndex: 9 },
  'Dragoon': { slug: 'dragoon', slotIndex: 5 },
  'DragoonSoft': { slug: 'dragoon', slotIndex: 5 },
  'KAGaming': { slug: 'kagaming', slotIndex: 13 },
  'FastSpin': { slug: 'fastspin', slotIndex: 8 },
  'YGGDrasil': { slug: 'ygg', slotIndex: 19 },
  'Yggdrasil': { slug: 'ygg', slotIndex: 19 },
  'Spade': { slug: 'spade', slotIndex: 32 },
  'Spadegaming': { slug: 'spade', slotIndex: 32 },
  'Blueprint': { slug: 'blueprint', slotIndex: 12 },
  'BlueprintGaming': { slug: 'blueprint', slotIndex: 12 },
  '1x2Gaming': { slug: '1x2gaming', slotIndex: 1 },
  '1X2Gaming': { slug: '1x2gaming', slotIndex: 1 },
  'Playtech': { slug: 'playtech', slotIndex: 24 },
  'PlaytechSlot': { slug: 'playtech', slotIndex: 24 },
  'Naga': { slug: 'naga', slotIndex: 15 },
  'CC88': { slug: 'cc88', slotIndex: 3 },
  'CPGames': { slug: 'cc88', slotIndex: 3 },
  'Spinix': { slug: 'spinix', slotIndex: 33 },
  'Royal': { slug: 'royal', slotIndex: 29 },
  'World': { slug: 'world', slotIndex: 20 },
  'WorldMatch': { slug: 'world', slotIndex: 20 },
  'Slotmill': { slug: 'slotmeal', slotIndex: 31 },
  'ELY': { slug: 'ely', slotIndex: 6 },
  'Next': { slug: 'next', slotIndex: 17 },
  'NextSpin': { slug: 'next', slotIndex: 17 },
  'Petersons': { slug: 'peternsons', slotIndex: 19 },
  'HiddenButton': { slug: 'hiddenbutton', slotIndex: 12 },
  'Avatar': { slug: 'avatar', slotIndex: 21 },
  'AvatarUX': { slug: 'avatar', slotIndex: 21 },
  'JDB': { slug: 'dragoon', slotIndex: 5 },
  'JDBSlot': { slug: 'dragoon', slotIndex: 5 },
  'LGD': { slug: 'evoplay', slotIndex: 7 },
  'LGDGaming': { slug: 'evoplay', slotIndex: 7 },
  'YesBingo': { slug: 'bng', slotIndex: 22 },
  '568Win': { slug: '568win', slotIndex: 1 },
};

/** All available main_slot_{slug}.png slugs */
const SLOT_LOGO_SLUGS = [
  '1x2gaming', '568win', 'avatar', 'blueprint', 'bng', 'btg', 'cc88', 'cq9',
  'dragoon', 'ely', 'evoplay', 'fastspin', 'gameart', 'habanero', 'hack',
  'hiddenbutton', 'kagaming', 'micro', 'naga', 'netent', 'next', 'nolimit',
  'peternsons', 'pgsoft', 'playngo', 'playson', 'playstar', 'playtech',
  'prag', 'quickspin', 'redtiger', 'relax', 'royal', 'skywind', 'slotmeal',
  'spade', 'spinix', 'thunderkick', 'wazdan', 'world', 'ygg', 'yl',
];

// ─── Public API — Casino ────────────────────────────────────────────────────

/** Resolve casino vendor display‑name to its slug */
export function getCasinoVendorSlug(vendorName: string): string {
  if (CASINO_VENDOR_TO_SLUG[vendorName]) return CASINO_VENDOR_TO_SLUG[vendorName];
  const lower = vendorName.toLowerCase();
  for (const [key, val] of Object.entries(CASINO_VENDOR_TO_SLUG)) {
    if (key.toLowerCase() === lower) return val;
  }
  for (const [key, val] of Object.entries(CASINO_VENDOR_TO_SLUG)) {
    if (vendorName.includes(key) || key.includes(vendorName)) return val;
  }
  return 'evolution';
}

/** /images/casino/main_icon_{slug}.png */
export function getCasinoLogoUrl(slugOrName: string, index = 0): string {
  const slug = CASINO_VENDOR_TO_SLUG[slugOrName] || slugOrName;
  if (CASINO_ICON_SLUGS.includes(slug)) {
    return `/images/casino/main_icon_${slug}.png`;
  }
  const fallback = CASINO_ICON_SLUGS[index % CASINO_ICON_SLUGS.length];
  return `/images/casino/main_icon_${fallback}.png`;
}

/** /images/casino/bg_{n}.png  — casino card background (1‑based) */
export function getCasinoBgUrl(index: number): string {
  const n = (index % 23) + 1;
  return `/images/casino/bg_${n}.png`;
}

/** /images/casino/minibg_{n}.png  — casino card side art (1‑based, 1–17) */
export function getCasinoMinibgUrl(index: number): string {
  const n = (index % 17) + 1;
  return `/images/casino/minibg_${n}.png`;
}

export function getCasinoFallbackLogoUrl(): string {
  return `/images/casino/main_icon_evolution.png`;
}

// ─── Public API — Slot ──────────────────────────────────────────────────────

/** Resolve slot vendor name to { slug, slotIndex } */
export function getSlotVendorImageInfo(vendorName: string, fallbackIndex: number): { slug: string; slotIndex: number } {
  if (SLOT_VENDOR_TO_IMAGE[vendorName]) return SLOT_VENDOR_TO_IMAGE[vendorName];
  const lower = vendorName.toLowerCase();
  for (const [key, val] of Object.entries(SLOT_VENDOR_TO_IMAGE)) {
    if (key.toLowerCase() === lower) return val;
  }
  for (const [key, val] of Object.entries(SLOT_VENDOR_TO_IMAGE)) {
    if (vendorName.includes(key) || lower.includes(key.toLowerCase())) return val;
  }
  for (const [key, val] of Object.entries(SLOT_VENDOR_TO_IMAGE)) {
    if ((key.includes(vendorName) || key.toLowerCase().includes(lower)) && vendorName.length > 2) return val;
  }
  const fallbackSlug = SLOT_LOGO_SLUGS[fallbackIndex % SLOT_LOGO_SLUGS.length];
  return { slug: fallbackSlug, slotIndex: (fallbackIndex % 35) + 1 };
}

/** /images/casino/main_slot_{slug}.png */
export function getSlotLogoUrl(slug: string): string {
  if (SLOT_LOGO_SLUGS.includes(slug)) {
    return `/images/casino/main_slot_${slug}.png`;
  }
  return `/images/casino/main_slot_prag.png`;
}

/** /images/casino/slot_{n}.png  — slot card side art (1‑based, 1–35) */
export function getSlotLogoUrlByIndex(index: number): string {
  const n = ((index - 1 + 35) % 35) + 1;
  return `/images/casino/slot_${n}.png`;
}

export function getSlotFallbackLogoUrl(): string {
  return `/images/casino/main_slot_prag.png`;
}
