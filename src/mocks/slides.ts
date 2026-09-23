import type {
  CarouselSlide,
  CasinoCardItem,
  GameSlotCardItem,
  PopupBannerItem,
} from "@/types/game";
import type { GameCardProps } from "@/components/ui/GameCard";

export type BannerVideo = {
  src: string;
  href: string;
};

export const BANNER_VIDEOS: BannerVideo[] = [
  { src: "/videos/banner/banner_1.mp4", href: "/game_casino" },
  { src: "/videos/banner/banner_2.mp4", href: "/game_casino" },
  { src: "/videos/banner/banner_3.mp4", href: "/game_slot" },
];

export const CASINO_HOME_DATA: GameCardProps[] = [
  { name: "에볼루션", video: "/videos/casino/Evolution.mp4", href: "/game_casino" },
  { name: "섹시 바카라", video: "/videos/casino/sexy_casino.mp4", href: "/game_casino" },
  { name: "마이크로게이밍 라이브", video: "/videos/casino/MicroGamingCasino.mp4", href: "/game_casino" },
  { name: "프라그마틱 카지노", video: "/videos/casino/PragmaticLive.mp4", href: "/game_casino" },
  { name: "빅 게이밍 라이브", video: "/videos/casino/big_gaming_live.mp4", href: "/game_casino" },
  { name: "두윈", video: "/videos/casino/dowin.mp4", href: "/game_casino" },
  { name: "에이치알지", video: "/videos/casino/hrg.mp4", href: "/game_casino" },
  { name: "플레이텍 라이브", video: "/videos/casino/playtech_live.mp4", href: "/game_casino" },
  { name: "아시아 게이밍 라이브", video: "/videos/casino/asia_gaming.mp4", href: "/game_casino" },
];

export const CASINO_DATA: GameCardProps[] = [
  { name: "에볼루션", video: "/videos/casino/Evolution.mp4", href: "/game_casino" },
  { name: "마이크로게이밍 라이브", video: "/videos/casino/MicroGamingCasino.mp4", href: "/game_casino" },
  { name: "프라그마틱 카지노", video: "/videos/casino/PragmaticLive.mp4", href: "/game_casino" },
  { name: "섹시 바카라", video: "/videos/casino/sexy_casino.mp4", href: "/game_casino" },
  { name: "빅 게이밍 라이브", video: "/videos/casino/big_gaming_live.mp4", href: "/game_casino" },
  { name: "두윈", video: "/videos/casino/dowin.mp4", href: "/game_casino" },
  { name: "에이치알지", video: "/videos/casino/hrg.mp4", href: "/game_casino" },
  { name: "플레이텍 라이브", video: "/videos/casino/playtech_live.mp4", href: "/game_casino" },
  { name: "아시아 게이밍 라이브", video: "/videos/casino/asia_gaming.mp4", href: "/game_casino" },
  { name: "스카이윈드 라이브", video: "/videos/casino/skywind_live.mp4", href: "/game_casino" },
  { name: "빅 스텔라", video: "/videos/casino/stella.mp4", href: "/game_casino" },
  { name: "티지 스피드", video: "/videos/casino/tg_speed.mp4", href: "/game_casino" },
  { name: "비보", video: "/videos/casino/vivo.mp4", href: "/game_casino" },
  { name: "WM 카지노", video: "/videos/casino/wmcasino.mp4", href: "/game_casino" },
  { name: "드림 게이밍", video: "/videos/casino/DreamGaming.mp4", href: "/game_casino" },
];

export const SLOT_DATA: GameCardProps[] = [
  { name: "프라그마틱 플레이", image: "/images/slot/PMTS.webp", href: "/game_slot" },
  { name: "PG 소프트", image: "/images/slot/PGS.webp", gif: "/images/slot/PG.gif", useGif: true, href: "/game_slot" },
  { name: "온리플레이", image: "/images/slot/onlyplay.webp", href: "/game_slot" },
  { name: "에보플레이", image: "/images/slot/EVO.webp", href: "/game_slot" },
  { name: "팻 판다", image: "/images/slot/fat_panda.webp", href: "/game_slot" },
  { name: "FC 게임", image: "/images/slot/fc_game.webp", href: "/game_slot" },
  { name: "게임아트", image: "/images/slot/gameart.webp", href: "/game_slot" },
  { name: "타다", image: "/images/slot/TADA.webp", href: "/game_slot" },
  { name: "마이크로게이밍", image: "/images/slot/microgaming.webp", href: "/game_slot" },

  { name: "노리밋시티", image: "/images/slot/NoLimitCity.webp", href: "/game_slot" },
  { name: "모빌롯", image: "/images/slot/mobilots.webp", href: "/game_slot" },
  { name: "넷엔트", image: "/images/slot/NETE.webp", href: "/game_slot" },
  { name: "옥토", image: "/images/slot/octo.webp", href: "/game_slot" },
  { name: "노보매틱", image: "/images/slot/Novomatic.webp", href: "/game_slot" },
  { name: "드라군소프트", image: "/images/slot/dragoonsoft.webp", href: "/game_slot" },
  { name: "플레이엔고", image: "/images/slot/playgo.webp", href: "/game_slot" },
  { name: "플레이스타", image: "/images/slot/playstar.webp", href: "/game_slot" },
  { name: "플레이텍 슬롯", image: "/images/slot/playtechslot.webp", href: "/game_slot" },
  { name: "RTG", image: "/images/slot/RTG.webp", href: "/game_slot" },
  { name: "JDB", image: "/images/slot/JDB.webp", href: "/game_slot" },
  { name: "릴킹덤", image: "/images/slot/reelkingdom.webp", href: "/game_slot" },
  { name: "RLG", image: "/images/slot/RLG.webp", href: "/game_slot" },
  { name: "썬더킥", image: "/images/slot/thunderkick.webp", href: "/game_slot" },
  { name: "트리플PG", image: "/images/slot/triplepg.webp", href: "/game_slot" },
  { name: "WZD", image: "/images/slot/WZD.webp", href: "/game_slot" },
  { name: "이그드라실", image: "/images/slot/YGG.webp", href: "/game_slot" },
  { name: "하바네로", image: "/images/slot/HBNR.webp", href: "/game_slot" },
  { name: "에이스타", image: "/images/slot/astar.webp", href: "/game_slot" },
  { name: "BOG", image: "/images/slot/BOG.webp", href: "/game_slot" },
  { name: "HSD", image: "/images/slot/HSD.webp", href: "/game_slot" },
  { name: "CQ9", image: "/images/slot/CQ9.webp", href: "/game_slot" },
  { name: "1x2게이밍", image: "/images/slot/1x2gaming.webp", href: "/game_slot" },
  { name: "아바타UX", image: "/images/slot/avatarux.webp", href: "/game_slot" },
  { name: "빅타임게이밍", image: "/images/slot/BIGT.webp", href: "/game_slot" },
  { name: "블루프린트", image: "/images/slot/blueprintgaming.webp", href: "/game_slot" },
  { name: "클롯플레이", image: "/images/slot/clot_play.webp", href: "/game_slot" },
];

export const CASINO_POPUP_BANNERS: PopupBannerItem[] = [
  {
    id: "banner-1",
    imageUrl: "/images/casino_popup.png",
    imageAlt: "Banner 1",
  },
  {
    id: "banner-2",
    imageUrl: "/images/visual_label/visual_label_1.png",
    imageAlt: "Banner 2",
  },
  {
    id: "banner-3",
    imageUrl: "/images/visual_label/visual_label_2.png",
    imageAlt: "Banner 3",
  },
  {
    id: "banner-4",
    imageUrl: "/images/casino_visual/visual_bg_01.png",
    imageAlt: "Banner 4",
  },
];

export const BG_LIST = [
  'AG', 'BIGG', 'DG', 'EZ', 'MGS', 'PTG', 'SEX', 'VIVO', 'WM', 'AFB',
  'WE', 'OBX', 'SMP',
].map((file) => `/images/brand/${file}.webp`);

export const MINIBG_LIST = [
  'AG', 'BIGG', 'DG', 'EZ', 'MGS', 'PTG', 'SEX', 'VIVO', 'WM', 'AFB',
  'WE', 'OBX', 'SMP', 'BMG', 'DGM', 'T24', 'ONC', 'ONE', 'JL', 'KA',
  'ACE333', 'AB', 'AOG', 'CF', 'CGC', 'CRP', 'CTG', 'DBS', 'EXPS', 'G9',
  'GA', 'GD', 'HD', 'I8', 'KP', 'L22', 'MCL', 'MIM', 'MKW', 'MNL',
].map((file) => `/images/brand/${file}.webp`);

const CASINO_GAMES: { slug: string; href: string }[] = [
  { slug: "evolution", href: "/game_casino" },
  { slug: "prag", href: "/game_casino" },
  { slug: "dream", href: "/game_casino" },
  { slug: "big", href: "/game_casino" },
  { slug: "ezugi", href: "/game_casino" },
  { slug: "micro", href: "/game_casino" },
  { slug: "oriental", href: "/game_casino" },
  { slug: "playtech", href: "/game_casino" },
  { slug: "sexy", href: "/game_casino" },
  { slug: "vivo", href: "/game_casino" },
];

const CASINO_ICON_MAP: Record<string, string> = {
  evolution: "/images/casino/main_icon_evolution.png",
  prag: "/images/casino/main_icon_prag.png",
  dream: "/images/casino/main_icon_dream.png",
  big: "/images/casino/main_icon_big.png",
  ezugi: "/images/casino/main_icon_ezugi.png",
  micro: "/images/casino/main_icon_micro.png",
  oriental: "/images/casino/main_icon_oriental.png",
  playtech: "/images/casino/main_icon_playtech.png",
  sexy: "/images/casino/main_icon_sexy.png",
  vivo: "/images/casino/main_icon_vivo.png",
};

export const CASINO_CARDS: CasinoCardItem[] = CASINO_GAMES.map((casino, i) => ({
  bgImage: `/images/casino/bg_${(i % 23) + 1}.png`,
  minibgImage: `/images/casino/minibg_${(i % 17) + 1}.png`,
  mainIcon: CASINO_ICON_MAP[casino.slug] || "/images/casino/main_icon_evolution.png",
  href: casino.href,
}));

const SLOT_GAMES: { title: string; slug: string; slotIndex?: number; isMaintenance?: boolean; href?: string }[] = [
  { title: "BNG", slug: "bng", slotIndex: 1, href: "#" },
  { title: "BTG", slug: "btg", slotIndex: 2, href: "#" },
  { title: "CC88", slug: "cc88", slotIndex: 3, href: "#" },
  { title: "CQ9", slug: "cq9", slotIndex: 4, href: "#" },
  { title: "Dragoon", slug: "dragoon", slotIndex: 5, href: "#" },
  { title: "Ely", slug: "ely", slotIndex: 6, href: "#" },
  { title: "Evoplay", slug: "evoplay", slotIndex: 7, href: "#" },
  { title: "Fastspin", slug: "fastspin", slotIndex: 8, href: "#" },
  { title: "게임아트", slug: "gameart", slotIndex: 9, href: "#" },
  { title: "Habanero", slug: "habanero", slotIndex: 10, href: "#" },
  { title: "Hack", slug: "hack", slotIndex: 11, href: "#" },
  { title: "Hidden Button", slug: "hiddenbutton", slotIndex: 12, href: "#" },
  { title: "KA Gaming", slug: "kagaming", slotIndex: 13, href: "#" },
  { title: "마이크로게이밍", slug: "micro", slotIndex: 14, isMaintenance: true, href: "#" },
  { title: "Naga", slug: "naga", slotIndex: 15, href: "#" },
  { title: "NetEnt", slug: "netent", slotIndex: 16, href: "#" },
  { title: "Next", slug: "next", slotIndex: 17, href: "#" },
  { title: "Nolimit", slug: "nolimit", slotIndex: 18, href: "#" },
  { title: "Petersons", slug: "peternsons", slotIndex: 19, href: "#" },
  { title: "PG Soft", slug: "pgsoft", slotIndex: 20, href: "#" },
  { title: "Play'n GO", slug: "playngo", slotIndex: 21, href: "#" },
  { title: "Playson", slug: "playson", slotIndex: 22, href: "#" },
  { title: "Playstar", slug: "playstar", slotIndex: 23, href: "#" },
  { title: "Playtech", slug: "playtech", slotIndex: 24, href: "#" },
  { title: "프라그마틱", slug: "prag", slotIndex: 25, isMaintenance: true, href: "#" },
  { title: "Quickspin", slug: "quickspin", slotIndex: 26, href: "#" },
  { title: "Red Tiger", slug: "redtiger", slotIndex: 27, href: "#" },
  { title: "Relax", slug: "relax", slotIndex: 28, href: "#" },
  { title: "Royal", slug: "royal", slotIndex: 29, href: "#" },
  { title: "Skywind", slug: "skywind", slotIndex: 30, href: "#" },
  { title: "Slotmeal", slug: "slotmeal", slotIndex: 31, href: "#" },
  { title: "Spade", slug: "spade", slotIndex: 32, href: "#" },
  { title: "Spinix", slug: "spinix", slotIndex: 33, href: "#" },
  { title: "Thunderkick", slug: "thunderkick", slotIndex: 34, href: "#" },
  { title: "Wazdan", slug: "wazdan", slotIndex: 35, href: "#" },
  { title: "World Match", slug: "world", href: "#" },
  { title: "Yggdrasil", slug: "ygg", href: "#" },
  { title: "YL", slug: "yl", href: "#" },
];

export const SLOT_CARDS: GameSlotCardItem[] = SLOT_GAMES.map(({ title, slug, slotIndex, isMaintenance, href }) => ({
  title,
  slug,
  slotIndex,
  isMaintenance,
  href,
}));

export const BETHISTORY_SLIDES: CarouselSlide[] = [
  {
    bgImage: "/images/bethistory_visual/visual_bg_sports_global.png",
    entityImage: "/images/bethistory_visual/visual_entity_sports_global.png",
    labelImage: "/images/visual_label/visual_label_1.png",
    bgColor: "#0a1628",
  },
];
