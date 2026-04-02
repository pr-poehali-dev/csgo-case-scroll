export type Rarity = 'common' | 'uncommon' | 'rare' | 'mythical' | 'legendary' | 'ancient' | 'contraband';

export interface Skin {
  id: string;
  name: string;
  weapon: string;
  rarity: Rarity;
  price: number;
  wear: string;
  image: string;
  exterior?: string;
}

export interface Case {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  skins: Skin[];
  isNew?: boolean;
  isHot?: boolean;
}

const CASE_IMAGES = {
  dreams: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/weapon_cases/crate_dreams_and_nightmares_medium.png',
  recoil: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/weapon_cases/crate_recoil_medium.png',
  revolution: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/weapon_cases/crate_revolution_medium.png',
  fracture: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/weapon_cases/crate_fracture_medium.png',
  snakebite: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/weapon_cases/crate_snakebite_medium.png',
  prisma2: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/weapon_cases/crate_prisma2_medium.png',
  prisma: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/weapon_cases/crate_prisma_medium.png',
  danger: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/weapon_cases/crate_danger_zone_medium.png',
  horizon: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/weapon_cases/crate_horizon_medium.png',
  clutch: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/weapon_cases/crate_clutch_medium.png',
  spectrum2: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/weapon_cases/crate_spectrum2_medium.png',
  spectrum: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/weapon_cases/crate_spectrum_medium.png',
  glove: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/weapon_cases/crate_gloves_medium.png',
  gamma2: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/weapon_cases/crate_gamma2_medium.png',
  gamma: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/weapon_cases/crate_gamma_medium.png',
  chroma3: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/weapon_cases/crate_chroma3_medium.png',
  chroma2: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/weapon_cases/crate_chroma2_medium.png',
  chroma: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/weapon_cases/crate_chroma_medium.png',
  falchion: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/weapon_cases/crate_falchion_medium.png',
  shadow: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/weapon_cases/crate_shadow_medium.png',
  revolver: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/weapon_cases/crate_revolver_medium.png',
  wildfire: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/weapon_cases/crate_community_10_medium.png',
  phoenix: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/weapon_cases/crate_community_6_medium.png',
  csgo: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/weapon_cases/crate_csgo_medium.png',
  esports: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/weapon_cases/crate_esports_medium.png',
};

const SKIN_IMAGES = {
  awp_dragon: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_awp_cu_medieval_dragon_awp_light_medium.png',
  awp_asiimov: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_awp_am_asiimov_light_medium.png',
  ak47_redline: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_ak47_hy_ak47_redline_light_medium.png',
  ak47_asiimov: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_ak47_aq_ak47_asiimov_light_medium.png',
  m4a4_howl: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_m4a1_am_howl_light_medium.png',
  m4a4_poseidon: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_m4a1_cu_m4a1_poseidon_light_medium.png',
  m4a1s_hyper: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_m4a1_silencer_cu_m4a1s_hyper_beast_light_medium.png',
  knife_butterfly: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_knife_butterfly_am_fade_light_medium.png',
  knife_karambit: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_knife_karambit_am_doppler_phase2_light_medium.png',
  glock_fade: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_glock_am_fade_t_light_medium.png',
  deagle_blaze: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_deagle_am_blaze_light_medium.png',
  usp_orion: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_usp_silencer_cu_usp_cyrex_light_medium.png',
  p250_asiimov: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_p250_am_asiimov_light_medium.png',
  famas_mecha: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_famas_cu_famas_mecha_light_medium.png',
  galil_cerberus: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_galilar_aq_bronze_morph_light_medium.png',
  sg553_integrale: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_sg556_cu_sg553_integrale_light_medium.png',
  knife_m9_marble: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_knife_m9_bayonet_am_marble_fade_light_medium.png',
  gloves_pandoras: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_handwrap_leathery_light_medium.png',
  mp9_wild: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_mp9_cu_mp9_wild_lily_light_medium.png',
  mac10_malachite: 'https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_mac10_am_malachite_light_medium.png',
};

export const ALL_CASES: Case[] = [
  {
    id: 'revolution',
    name: 'Revolution Case',
    price: 139,
    image: CASE_IMAGES.revolution,
    category: 'Новые',
    isNew: true,
    isHot: true,
    skins: [
      { id: 'r1', name: 'Aquamarine Revenge', weapon: 'AK-47', rarity: 'rare', price: 320, wear: 'FT', image: CASE_IMAGES.revolution },
      { id: 'r2', name: 'Fade', weapon: 'M4A4', rarity: 'mythical', price: 1200, wear: 'FN', image: CASE_IMAGES.revolution },
      { id: 'r3', name: 'Doppler Phase 2', weapon: 'Karambit', rarity: 'ancient', price: 38500, wear: 'FN', image: SKIN_IMAGES.knife_karambit },
      { id: 'r4', name: 'Neo-Noir', weapon: 'AWP', rarity: 'legendary', price: 4200, wear: 'FT', image: CASE_IMAGES.revolution },
      { id: 'r5', name: 'Mecha Industries', weapon: 'FAMAS', rarity: 'rare', price: 85, wear: 'MW', image: SKIN_IMAGES.famas_mecha },
      { id: 'r6', name: 'Golden Koi', weapon: 'P250', rarity: 'mythical', price: 520, wear: 'FN', image: SKIN_IMAGES.p250_asiimov },
      { id: 'r7', name: 'Cerberus', weapon: 'Galil AR', rarity: 'uncommon', price: 42, wear: 'FT', image: SKIN_IMAGES.galil_cerberus },
      { id: 'r8', name: 'Integrale', weapon: 'SG 553', rarity: 'rare', price: 180, wear: 'FN', image: SKIN_IMAGES.sg553_integrale },
    ]
  },
  {
    id: 'recoil',
    name: 'Recoil Case',
    price: 119,
    image: CASE_IMAGES.recoil,
    category: 'Новые',
    isNew: true,
    skins: [
      { id: 'rec1', name: 'Asiimov', weapon: 'AWP', rarity: 'legendary', price: 7800, wear: 'FT', image: SKIN_IMAGES.awp_asiimov },
      { id: 'rec2', name: 'Printstream', weapon: 'M4A1-S', rarity: 'ancient', price: 24000, wear: 'FN', image: CASE_IMAGES.recoil },
      { id: 'rec3', name: 'Red Laminate', weapon: 'AK-47', rarity: 'rare', price: 950, wear: 'FN', image: SKIN_IMAGES.ak47_redline },
      { id: 'rec4', name: 'Wild Lily', weapon: 'MP9', rarity: 'uncommon', price: 65, wear: 'MW', image: SKIN_IMAGES.mp9_wild },
      { id: 'rec5', name: 'Malachite', weapon: 'MAC-10', rarity: 'uncommon', price: 28, wear: 'FT', image: SKIN_IMAGES.mac10_malachite },
      { id: 'rec6', name: 'Hyper Beast', weapon: 'M4A1-S', rarity: 'mythical', price: 3200, wear: 'FN', image: SKIN_IMAGES.m4a1s_hyper },
      { id: 'rec7', name: 'Orion', weapon: 'USP-S', rarity: 'rare', price: 480, wear: 'FN', image: SKIN_IMAGES.usp_orion },
      { id: 'rec8', name: 'Blaze', weapon: 'Desert Eagle', rarity: 'mythical', price: 2800, wear: 'FN', image: SKIN_IMAGES.deagle_blaze },
    ]
  },
  {
    id: 'dreams',
    name: 'Dreams & Nightmares',
    price: 99,
    image: CASE_IMAGES.dreams,
    category: 'Популярные',
    isHot: true,
    skins: [
      { id: 'd1', name: 'Fade', weapon: 'Glock-18', rarity: 'mythical', price: 1850, wear: 'FN', image: SKIN_IMAGES.glock_fade },
      { id: 'd2', name: 'Doppler', weapon: 'M9 Bayonet', rarity: 'ancient', price: 19500, wear: 'FN', image: SKIN_IMAGES.knife_m9_marble },
      { id: 'd3', name: 'Wildfire', weapon: 'AK-47', rarity: 'legendary', price: 5400, wear: 'FT', image: SKIN_IMAGES.ak47_asiimov },
      { id: 'd4', name: 'Blaze', weapon: 'P250', rarity: 'rare', price: 240, wear: 'FN', image: SKIN_IMAGES.p250_asiimov },
      { id: 'd5', name: 'Poseidon', weapon: 'M4A4', rarity: 'mythical', price: 4100, wear: 'FN', image: SKIN_IMAGES.m4a4_poseidon },
      { id: 'd6', name: 'Cerberus', weapon: 'FAMAS', rarity: 'uncommon', price: 35, wear: 'BS', image: SKIN_IMAGES.famas_mecha },
      { id: 'd7', name: 'Integrale', weapon: 'Galil AR', rarity: 'uncommon', price: 55, wear: 'FT', image: SKIN_IMAGES.galil_cerberus },
      { id: 'd8', name: 'Neo-Noir', weapon: 'P250', rarity: 'rare', price: 160, wear: 'MW', image: SKIN_IMAGES.p250_asiimov },
    ]
  },
  {
    id: 'fracture',
    name: 'Fracture Case',
    price: 79,
    image: CASE_IMAGES.fracture,
    category: 'Популярные',
    skins: [
      { id: 'fr1', name: 'Asiimov', weapon: 'P250', rarity: 'rare', price: 340, wear: 'FT', image: SKIN_IMAGES.p250_asiimov },
      { id: 'fr2', name: 'Blaze', weapon: 'USP-S', rarity: 'mythical', price: 2200, wear: 'FN', image: SKIN_IMAGES.usp_orion },
      { id: 'fr3', name: 'Butterfly Knife Fade', weapon: 'Butterfly Knife', rarity: 'ancient', price: 32000, wear: 'FN', image: SKIN_IMAGES.knife_butterfly },
      { id: 'fr4', name: 'Red Laminate', weapon: 'AK-47', rarity: 'legendary', price: 6800, wear: 'FN', image: SKIN_IMAGES.ak47_redline },
      { id: 'fr5', name: 'Hyper Beast', weapon: 'AWP', rarity: 'mythical', price: 1900, wear: 'FT', image: SKIN_IMAGES.awp_asiimov },
      { id: 'fr6', name: 'Malachite', weapon: 'MP9', rarity: 'uncommon', price: 45, wear: 'FT', image: SKIN_IMAGES.mp9_wild },
      { id: 'fr7', name: 'Wild Lily', weapon: 'MAC-10', rarity: 'uncommon', price: 30, wear: 'FN', image: SKIN_IMAGES.mac10_malachite },
      { id: 'fr8', name: 'Poseidon', weapon: 'Glock-18', rarity: 'rare', price: 280, wear: 'FN', image: SKIN_IMAGES.glock_fade },
    ]
  },
  {
    id: 'snakebite',
    name: 'Snakebite Case',
    price: 69,
    image: CASE_IMAGES.snakebite,
    category: 'Популярные',
    skins: [
      { id: 'sb1', name: 'Dragon Lore', weapon: 'AWP', rarity: 'ancient', price: 185000, wear: 'FN', image: SKIN_IMAGES.awp_dragon },
      { id: 'sb2', name: 'Howl', weapon: 'M4A4', rarity: 'contraband', price: 520000, wear: 'FN', image: SKIN_IMAGES.m4a4_howl },
      { id: 'sb3', name: 'Redline', weapon: 'AK-47', rarity: 'rare', price: 750, wear: 'FT', image: SKIN_IMAGES.ak47_redline },
      { id: 'sb4', name: 'Fade', weapon: 'Karambit', rarity: 'ancient', price: 42000, wear: 'FN', image: SKIN_IMAGES.knife_karambit },
      { id: 'sb5', name: 'Blaze', weapon: 'AWP', rarity: 'mythical', price: 3500, wear: 'FN', image: SKIN_IMAGES.awp_asiimov },
      { id: 'sb6', name: 'Fade', weapon: 'Butterfly Knife', rarity: 'ancient', price: 28000, wear: 'FN', image: SKIN_IMAGES.knife_butterfly },
      { id: 'sb7', name: 'Hyper Beast', weapon: 'FAMAS', rarity: 'uncommon', price: 55, wear: 'BS', image: SKIN_IMAGES.famas_mecha },
      { id: 'sb8', name: 'Cerberus', weapon: 'Galil AR', rarity: 'uncommon', price: 48, wear: 'FT', image: SKIN_IMAGES.galil_cerberus },
    ]
  },
  {
    id: 'prisma2',
    name: 'Prisma 2 Case',
    price: 59,
    image: CASE_IMAGES.prisma2,
    category: 'Классика',
    skins: [
      { id: 'p21', name: 'Doppler Phase 4', weapon: 'Karambit', rarity: 'ancient', price: 36000, wear: 'FN', image: SKIN_IMAGES.knife_karambit },
      { id: 'p22', name: 'Asiimov', weapon: 'AWP', rarity: 'legendary', price: 8200, wear: 'FT', image: SKIN_IMAGES.awp_asiimov },
      { id: 'p23', name: 'Printstream', weapon: 'USP-S', rarity: 'mythical', price: 4800, wear: 'FN', image: SKIN_IMAGES.usp_orion },
      { id: 'p24', name: 'Golden Koi', weapon: 'Glock-18', rarity: 'rare', price: 420, wear: 'MW', image: SKIN_IMAGES.glock_fade },
      { id: 'p25', name: 'Neo-Noir', weapon: 'M4A4', rarity: 'mythical', price: 2600, wear: 'FT', image: SKIN_IMAGES.m4a4_poseidon },
      { id: 'p26', name: 'Malachite', weapon: 'Desert Eagle', rarity: 'rare', price: 360, wear: 'FN', image: SKIN_IMAGES.deagle_blaze },
      { id: 'p27', name: 'Wild Lily', weapon: 'SG 553', rarity: 'rare', price: 195, wear: 'FN', image: SKIN_IMAGES.sg553_integrale },
      { id: 'p28', name: 'Redline', weapon: 'FAMAS', rarity: 'uncommon', price: 38, wear: 'FT', image: SKIN_IMAGES.famas_mecha },
    ]
  },
  {
    id: 'prisma',
    name: 'Prisma Case',
    price: 49,
    image: CASE_IMAGES.prisma,
    category: 'Классика',
    skins: [
      { id: 'p1', name: 'Fade', weapon: 'M9 Bayonet', rarity: 'ancient', price: 25000, wear: 'FN', image: SKIN_IMAGES.knife_m9_marble },
      { id: 'p2', name: 'Howl', weapon: 'M4A4', rarity: 'contraband', price: 480000, wear: 'FN', image: SKIN_IMAGES.m4a4_howl },
      { id: 'p3', name: 'Blaze', weapon: 'AK-47', rarity: 'legendary', price: 5100, wear: 'FT', image: SKIN_IMAGES.ak47_redline },
      { id: 'p4', name: 'Hyper Beast', weapon: 'MP9', rarity: 'uncommon', price: 58, wear: 'FN', image: SKIN_IMAGES.mp9_wild },
      { id: 'p5', name: 'Orion', weapon: 'P250', rarity: 'rare', price: 290, wear: 'FN', image: SKIN_IMAGES.p250_asiimov },
      { id: 'p6', name: 'Poseidon', weapon: 'AWP', rarity: 'mythical', price: 3900, wear: 'FN', image: SKIN_IMAGES.awp_asiimov },
      { id: 'p7', name: 'Neo-Noir', weapon: 'Glock-18', rarity: 'rare', price: 220, wear: 'MW', image: SKIN_IMAGES.glock_fade },
      { id: 'p8', name: 'Malachite', weapon: 'MAC-10', rarity: 'uncommon', price: 32, wear: 'FT', image: SKIN_IMAGES.mac10_malachite },
    ]
  },
  {
    id: 'danger',
    name: 'Danger Zone Case',
    price: 45,
    image: CASE_IMAGES.danger,
    category: 'Классика',
    skins: [
      { id: 'dz1', name: 'Dragon Lore', weapon: 'AWP', rarity: 'ancient', price: 165000, wear: 'FT', image: SKIN_IMAGES.awp_dragon },
      { id: 'dz2', name: 'Fade', weapon: 'Butterfly Knife', rarity: 'ancient', price: 31000, wear: 'FN', image: SKIN_IMAGES.knife_butterfly },
      { id: 'dz3', name: 'Printstream', weapon: 'M4A1-S', rarity: 'mythical', price: 4500, wear: 'FN', image: SKIN_IMAGES.m4a1s_hyper },
      { id: 'dz4', name: 'Asiimov', weapon: 'P250', rarity: 'rare', price: 310, wear: 'FT', image: SKIN_IMAGES.p250_asiimov },
      { id: 'dz5', name: 'Red Laminate', weapon: 'Glock-18', rarity: 'uncommon', price: 75, wear: 'FN', image: SKIN_IMAGES.glock_fade },
      { id: 'dz6', name: 'Neo-Noir', weapon: 'USP-S', rarity: 'rare', price: 410, wear: 'FN', image: SKIN_IMAGES.usp_orion },
      { id: 'dz7', name: 'Wildfire', weapon: 'Desert Eagle', rarity: 'mythical', price: 1800, wear: 'FT', image: SKIN_IMAGES.deagle_blaze },
      { id: 'dz8', name: 'Malachite', weapon: 'SG 553', rarity: 'uncommon', price: 42, wear: 'BS', image: SKIN_IMAGES.sg553_integrale },
    ]
  },
  {
    id: 'horizon',
    name: 'Horizon Case',
    price: 42,
    image: CASE_IMAGES.horizon,
    category: 'Классика',
    skins: [
      { id: 'h1', name: 'Doppler Phase 1', weapon: 'Karambit', rarity: 'ancient', price: 29000, wear: 'FN', image: SKIN_IMAGES.knife_karambit },
      { id: 'h2', name: 'Howl', weapon: 'M4A4', rarity: 'contraband', price: 450000, wear: 'FN', image: SKIN_IMAGES.m4a4_howl },
      { id: 'h3', name: 'Asiimov', weapon: 'AK-47', rarity: 'legendary', price: 6200, wear: 'FT', image: SKIN_IMAGES.ak47_asiimov },
      { id: 'h4', name: 'Fade', weapon: 'Glock-18', rarity: 'mythical', price: 1750, wear: 'FN', image: SKIN_IMAGES.glock_fade },
      { id: 'h5', name: 'Orion', weapon: 'M4A1-S', rarity: 'mythical', price: 3100, wear: 'FN', image: SKIN_IMAGES.m4a1s_hyper },
      { id: 'h6', name: 'Golden Koi', weapon: 'P250', rarity: 'rare', price: 265, wear: 'MW', image: SKIN_IMAGES.p250_asiimov },
      { id: 'h7', name: 'Malachite', weapon: 'MP9', rarity: 'uncommon', price: 28, wear: 'FT', image: SKIN_IMAGES.mp9_wild },
      { id: 'h8', name: 'Wild Lily', weapon: 'FAMAS', rarity: 'uncommon', price: 22, wear: 'FT', image: SKIN_IMAGES.famas_mecha },
    ]
  },
  {
    id: 'clutch',
    name: 'Clutch Case',
    price: 38,
    image: CASE_IMAGES.clutch,
    category: 'Классика',
    skins: [
      { id: 'cl1', name: 'Pandora\'s Box Gloves', weapon: 'Specialist Gloves', rarity: 'ancient', price: 15000, wear: 'FN', image: SKIN_IMAGES.gloves_pandoras },
      { id: 'cl2', name: 'Fade', weapon: 'M9 Bayonet', rarity: 'ancient', price: 22000, wear: 'FN', image: SKIN_IMAGES.knife_m9_marble },
      { id: 'cl3', name: 'Hyper Beast', weapon: 'AWP', rarity: 'legendary', price: 4800, wear: 'FT', image: SKIN_IMAGES.awp_asiimov },
      { id: 'cl4', name: 'Printstream', weapon: 'Glock-18', rarity: 'rare', price: 380, wear: 'FN', image: SKIN_IMAGES.glock_fade },
      { id: 'cl5', name: 'Blaze', weapon: 'USP-S', rarity: 'mythical', price: 2100, wear: 'FN', image: SKIN_IMAGES.usp_orion },
      { id: 'cl6', name: 'Integrale', weapon: 'SG 553', rarity: 'rare', price: 210, wear: 'FN', image: SKIN_IMAGES.sg553_integrale },
      { id: 'cl7', name: 'Cerberus', weapon: 'Galil AR', rarity: 'uncommon', price: 50, wear: 'FT', image: SKIN_IMAGES.galil_cerberus },
      { id: 'cl8', name: 'Red Laminate', weapon: 'MAC-10', rarity: 'uncommon', price: 35, wear: 'BS', image: SKIN_IMAGES.mac10_malachite },
    ]
  },
  {
    id: 'spectrum2',
    name: 'Spectrum 2 Case',
    price: 35,
    image: CASE_IMAGES.spectrum2,
    category: 'Ретро',
    skins: [
      { id: 'sp21', name: 'Doppler Phase 3', weapon: 'Karambit', rarity: 'ancient', price: 33000, wear: 'FN', image: SKIN_IMAGES.knife_karambit },
      { id: 'sp22', name: 'Dragon Lore', weapon: 'AWP', rarity: 'ancient', price: 175000, wear: 'FN', image: SKIN_IMAGES.awp_dragon },
      { id: 'sp23', name: 'Asiimov', weapon: 'M4A4', rarity: 'legendary', price: 4600, wear: 'FT', image: SKIN_IMAGES.m4a4_poseidon },
      { id: 'sp24', name: 'Orion', weapon: 'AK-47', rarity: 'mythical', price: 2900, wear: 'FN', image: SKIN_IMAGES.ak47_redline },
      { id: 'sp25', name: 'Blaze', weapon: 'P250', rarity: 'rare', price: 350, wear: 'FN', image: SKIN_IMAGES.p250_asiimov },
      { id: 'sp26', name: 'Fade', weapon: 'Glock-18', rarity: 'mythical', price: 1650, wear: 'FN', image: SKIN_IMAGES.glock_fade },
      { id: 'sp27', name: 'Wild Lily', weapon: 'MP9', rarity: 'uncommon', price: 48, wear: 'FN', image: SKIN_IMAGES.mp9_wild },
      { id: 'sp28', name: 'Malachite', weapon: 'FAMAS', rarity: 'uncommon', price: 25, wear: 'FT', image: SKIN_IMAGES.famas_mecha },
    ]
  },
  {
    id: 'spectrum',
    name: 'Spectrum Case',
    price: 32,
    image: CASE_IMAGES.spectrum,
    category: 'Ретро',
    skins: [
      { id: 'spc1', name: 'Butterfly Knife Fade', weapon: 'Butterfly Knife', rarity: 'ancient', price: 30000, wear: 'FN', image: SKIN_IMAGES.knife_butterfly },
      { id: 'spc2', name: 'Howl', weapon: 'M4A4', rarity: 'contraband', price: 430000, wear: 'FN', image: SKIN_IMAGES.m4a4_howl },
      { id: 'spc3', name: 'Hyper Beast', weapon: 'M4A1-S', rarity: 'mythical', price: 3400, wear: 'FN', image: SKIN_IMAGES.m4a1s_hyper },
      { id: 'spc4', name: 'Neo-Noir', weapon: 'AWP', rarity: 'legendary', price: 4200, wear: 'FT', image: SKIN_IMAGES.awp_asiimov },
      { id: 'spc5', name: 'Printstream', weapon: 'Desert Eagle', rarity: 'rare', price: 620, wear: 'FN', image: SKIN_IMAGES.deagle_blaze },
      { id: 'spc6', name: 'Orion', weapon: 'Glock-18', rarity: 'rare', price: 280, wear: 'MW', image: SKIN_IMAGES.glock_fade },
      { id: 'spc7', name: 'Red Laminate', weapon: 'MP9', rarity: 'uncommon', price: 62, wear: 'FT', image: SKIN_IMAGES.mp9_wild },
      { id: 'spc8', name: 'Malachite', weapon: 'MAC-10', rarity: 'uncommon', price: 29, wear: 'BS', image: SKIN_IMAGES.mac10_malachite },
    ]
  },
  {
    id: 'glove',
    name: 'Glove Case',
    price: 29,
    image: CASE_IMAGES.glove,
    category: 'Ретро',
    isHot: true,
    skins: [
      { id: 'gl1', name: 'Pandora\'s Box Gloves', weapon: 'Sport Gloves', rarity: 'ancient', price: 28000, wear: 'FN', image: SKIN_IMAGES.gloves_pandoras },
      { id: 'gl2', name: 'Slaughter', weapon: 'Karambit', rarity: 'ancient', price: 18000, wear: 'FN', image: SKIN_IMAGES.knife_karambit },
      { id: 'gl3', name: 'Dragon Lore', weapon: 'AWP', rarity: 'ancient', price: 170000, wear: 'FT', image: SKIN_IMAGES.awp_dragon },
      { id: 'gl4', name: 'Fade', weapon: 'AK-47', rarity: 'legendary', price: 5600, wear: 'FN', image: SKIN_IMAGES.ak47_redline },
      { id: 'gl5', name: 'Blaze', weapon: 'M4A4', rarity: 'mythical', price: 2400, wear: 'FT', image: SKIN_IMAGES.m4a4_poseidon },
      { id: 'gl6', name: 'Asiimov', weapon: 'USP-S', rarity: 'rare', price: 520, wear: 'FN', image: SKIN_IMAGES.usp_orion },
      { id: 'gl7', name: 'Orion', weapon: 'MP9', rarity: 'uncommon', price: 55, wear: 'FN', image: SKIN_IMAGES.mp9_wild },
      { id: 'gl8', name: 'Malachite', weapon: 'Galil AR', rarity: 'uncommon', price: 38, wear: 'FT', image: SKIN_IMAGES.galil_cerberus },
    ]
  },
  {
    id: 'gamma2',
    name: 'Gamma 2 Case',
    price: 26,
    image: CASE_IMAGES.gamma2,
    category: 'Ретро',
    skins: [
      { id: 'gm21', name: 'Doppler Phase 2', weapon: 'M9 Bayonet', rarity: 'ancient', price: 21000, wear: 'FN', image: SKIN_IMAGES.knife_m9_marble },
      { id: 'gm22', name: 'Howl', weapon: 'M4A4', rarity: 'contraband', price: 390000, wear: 'FN', image: SKIN_IMAGES.m4a4_howl },
      { id: 'gm23', name: 'Dragon Lore', weapon: 'AWP', rarity: 'ancient', price: 160000, wear: 'FT', image: SKIN_IMAGES.awp_dragon },
      { id: 'gm24', name: 'Asiimov', weapon: 'AK-47', rarity: 'legendary', price: 5800, wear: 'FT', image: SKIN_IMAGES.ak47_asiimov },
      { id: 'gm25', name: 'Printstream', weapon: 'P250', rarity: 'rare', price: 325, wear: 'FN', image: SKIN_IMAGES.p250_asiimov },
      { id: 'gm26', name: 'Blaze', weapon: 'Glock-18', rarity: 'mythical', price: 1550, wear: 'FN', image: SKIN_IMAGES.glock_fade },
      { id: 'gm27', name: 'Wild Lily', weapon: 'SG 553', rarity: 'uncommon', price: 65, wear: 'FN', image: SKIN_IMAGES.sg553_integrale },
      { id: 'gm28', name: 'Red Laminate', weapon: 'FAMAS', rarity: 'uncommon', price: 33, wear: 'FT', image: SKIN_IMAGES.famas_mecha },
    ]
  },
  {
    id: 'gamma',
    name: 'Gamma Case',
    price: 24,
    image: CASE_IMAGES.gamma,
    category: 'Ретро',
    skins: [
      { id: 'gm1', name: 'Fade', weapon: 'Butterfly Knife', rarity: 'ancient', price: 27000, wear: 'FN', image: SKIN_IMAGES.knife_butterfly },
      { id: 'gm2', name: 'Dragon Lore', weapon: 'AWP', rarity: 'ancient', price: 155000, wear: 'FT', image: SKIN_IMAGES.awp_dragon },
      { id: 'gm3', name: 'Hyper Beast', weapon: 'AK-47', rarity: 'legendary', price: 4900, wear: 'FN', image: SKIN_IMAGES.ak47_redline },
      { id: 'gm4', name: 'Orion', weapon: 'USP-S', rarity: 'rare', price: 445, wear: 'FN', image: SKIN_IMAGES.usp_orion },
      { id: 'gm5', name: 'Poseidon', weapon: 'M4A4', rarity: 'mythical', price: 2700, wear: 'FT', image: SKIN_IMAGES.m4a4_poseidon },
      { id: 'gm6', name: 'Neo-Noir', weapon: 'Glock-18', rarity: 'rare', price: 240, wear: 'MW', image: SKIN_IMAGES.glock_fade },
      { id: 'gm7', name: 'Malachite', weapon: 'MP9', rarity: 'uncommon', price: 42, wear: 'FT', image: SKIN_IMAGES.mp9_wild },
      { id: 'gm8', name: 'Cerberus', weapon: 'MAC-10', rarity: 'uncommon', price: 27, wear: 'BS', image: SKIN_IMAGES.mac10_malachite },
    ]
  },
  {
    id: 'chroma3',
    name: 'Chroma 3 Case',
    price: 22,
    image: CASE_IMAGES.chroma3,
    category: 'Легенды',
    skins: [
      { id: 'ch31', name: 'Doppler Phase 4', weapon: 'Karambit', rarity: 'ancient', price: 34000, wear: 'FN', image: SKIN_IMAGES.knife_karambit },
      { id: 'ch32', name: 'Howl', weapon: 'M4A4', rarity: 'contraband', price: 410000, wear: 'FN', image: SKIN_IMAGES.m4a4_howl },
      { id: 'ch33', name: 'Dragon Lore', weapon: 'AWP', rarity: 'ancient', price: 148000, wear: 'FT', image: SKIN_IMAGES.awp_dragon },
      { id: 'ch34', name: 'Asiimov', weapon: 'M4A1-S', rarity: 'mythical', price: 2800, wear: 'FN', image: SKIN_IMAGES.m4a1s_hyper },
      { id: 'ch35', name: 'Blaze', weapon: 'Desert Eagle', rarity: 'rare', price: 580, wear: 'FN', image: SKIN_IMAGES.deagle_blaze },
      { id: 'ch36', name: 'Fade', weapon: 'P250', rarity: 'rare', price: 395, wear: 'MW', image: SKIN_IMAGES.p250_asiimov },
      { id: 'ch37', name: 'Red Laminate', weapon: 'MP9', rarity: 'uncommon', price: 52, wear: 'FN', image: SKIN_IMAGES.mp9_wild },
      { id: 'ch38', name: 'Wild Lily', weapon: 'FAMAS', rarity: 'uncommon', price: 20, wear: 'FT', image: SKIN_IMAGES.famas_mecha },
    ]
  },
  {
    id: 'chroma2',
    name: 'Chroma 2 Case',
    price: 20,
    image: CASE_IMAGES.chroma2,
    category: 'Легенды',
    skins: [
      { id: 'ch21', name: 'Marble Fade', weapon: 'M9 Bayonet', rarity: 'ancient', price: 19000, wear: 'FN', image: SKIN_IMAGES.knife_m9_marble },
      { id: 'ch22', name: 'Howl', weapon: 'M4A4', rarity: 'contraband', price: 370000, wear: 'FN', image: SKIN_IMAGES.m4a4_howl },
      { id: 'ch23', name: 'Dragon Lore', weapon: 'AWP', rarity: 'ancient', price: 140000, wear: 'FT', image: SKIN_IMAGES.awp_dragon },
      { id: 'ch24', name: 'Neo-Noir', weapon: 'AK-47', rarity: 'legendary', price: 5300, wear: 'FT', image: SKIN_IMAGES.ak47_asiimov },
      { id: 'ch25', name: 'Poseidon', weapon: 'USP-S', rarity: 'mythical', price: 2500, wear: 'FN', image: SKIN_IMAGES.usp_orion },
      { id: 'ch26', name: 'Orion', weapon: 'Desert Eagle', rarity: 'rare', price: 460, wear: 'FN', image: SKIN_IMAGES.deagle_blaze },
      { id: 'ch27', name: 'Asiimov', weapon: 'Galil AR', rarity: 'uncommon', price: 85, wear: 'FT', image: SKIN_IMAGES.galil_cerberus },
      { id: 'ch28', name: 'Malachite', weapon: 'MAC-10', rarity: 'uncommon', price: 24, wear: 'BS', image: SKIN_IMAGES.mac10_malachite },
    ]
  },
  {
    id: 'chroma',
    name: 'Chroma Case',
    price: 18,
    image: CASE_IMAGES.chroma,
    category: 'Легенды',
    skins: [
      { id: 'ch1', name: 'Fade', weapon: 'Karambit', rarity: 'ancient', price: 38000, wear: 'FN', image: SKIN_IMAGES.knife_karambit },
      { id: 'ch2', name: 'Howl', weapon: 'M4A4', rarity: 'contraband', price: 360000, wear: 'FN', image: SKIN_IMAGES.m4a4_howl },
      { id: 'ch3', name: 'Dragon Lore', weapon: 'AWP', rarity: 'ancient', price: 135000, wear: 'FT', image: SKIN_IMAGES.awp_dragon },
      { id: 'ch4', name: 'Wildfire', weapon: 'M4A1-S', rarity: 'legendary', price: 4400, wear: 'FN', image: SKIN_IMAGES.m4a1s_hyper },
      { id: 'ch5', name: 'Blaze', weapon: 'Glock-18', rarity: 'mythical', price: 1900, wear: 'FN', image: SKIN_IMAGES.glock_fade },
      { id: 'ch6', name: 'Fade', weapon: 'USP-S', rarity: 'mythical', price: 3200, wear: 'FN', image: SKIN_IMAGES.usp_orion },
      { id: 'ch7', name: 'Printstream', weapon: 'P250', rarity: 'rare', price: 370, wear: 'FN', image: SKIN_IMAGES.p250_asiimov },
      { id: 'ch8', name: 'Cerberus', weapon: 'SG 553', rarity: 'uncommon', price: 30, wear: 'FT', image: SKIN_IMAGES.sg553_integrale },
    ]
  },
  {
    id: 'falchion',
    name: 'Falchion Case',
    price: 15,
    image: CASE_IMAGES.falchion,
    category: 'Легенды',
    skins: [
      { id: 'fa1', name: 'Doppler Phase 1', weapon: 'Butterfly Knife', rarity: 'ancient', price: 24000, wear: 'FN', image: SKIN_IMAGES.knife_butterfly },
      { id: 'fa2', name: 'Dragon Lore', weapon: 'AWP', rarity: 'ancient', price: 130000, wear: 'FT', image: SKIN_IMAGES.awp_dragon },
      { id: 'fa3', name: 'Howl', weapon: 'M4A4', rarity: 'contraband', price: 340000, wear: 'FN', image: SKIN_IMAGES.m4a4_howl },
      { id: 'fa4', name: 'Redline', weapon: 'M4A1-S', rarity: 'legendary', price: 6000, wear: 'FN', image: SKIN_IMAGES.m4a1s_hyper },
      { id: 'fa5', name: 'Asiimov', weapon: 'Glock-18', rarity: 'rare', price: 310, wear: 'FT', image: SKIN_IMAGES.glock_fade },
      { id: 'fa6', name: 'Poseidon', weapon: 'Desert Eagle', rarity: 'mythical', price: 2200, wear: 'FN', image: SKIN_IMAGES.deagle_blaze },
      { id: 'fa7', name: 'Wild Lily', weapon: 'Galil AR', rarity: 'uncommon', price: 40, wear: 'FT', image: SKIN_IMAGES.galil_cerberus },
      { id: 'fa8', name: 'Malachite', weapon: 'SG 553', rarity: 'uncommon', price: 22, wear: 'BS', image: SKIN_IMAGES.sg553_integrale },
    ]
  },
  {
    id: 'shadow',
    name: 'Shadow Case',
    price: 13,
    image: CASE_IMAGES.shadow,
    category: 'Легенды',
    skins: [
      { id: 'sh1', name: 'Fade', weapon: 'M9 Bayonet', rarity: 'ancient', price: 20000, wear: 'FN', image: SKIN_IMAGES.knife_m9_marble },
      { id: 'sh2', name: 'Dragon Lore', weapon: 'AWP', rarity: 'ancient', price: 128000, wear: 'FT', image: SKIN_IMAGES.awp_dragon },
      { id: 'sh3', name: 'Howl', weapon: 'M4A4', rarity: 'contraband', price: 320000, wear: 'FN', image: SKIN_IMAGES.m4a4_howl },
      { id: 'sh4', name: 'Blaze', weapon: 'AK-47', rarity: 'legendary', price: 4700, wear: 'FT', image: SKIN_IMAGES.ak47_asiimov },
      { id: 'sh5', name: 'Hyper Beast', weapon: 'USP-S', rarity: 'rare', price: 495, wear: 'FN', image: SKIN_IMAGES.usp_orion },
      { id: 'sh6', name: 'Neo-Noir', weapon: 'Glock-18', rarity: 'mythical', price: 1600, wear: 'FN', image: SKIN_IMAGES.glock_fade },
      { id: 'sh7', name: 'Asiimov', weapon: 'MP9', rarity: 'uncommon', price: 72, wear: 'FT', image: SKIN_IMAGES.mp9_wild },
      { id: 'sh8', name: 'Redline', weapon: 'FAMAS', rarity: 'uncommon', price: 19, wear: 'FT', image: SKIN_IMAGES.famas_mecha },
    ]
  },
  {
    id: 'revolver',
    name: 'Revolver Case',
    price: 12,
    image: CASE_IMAGES.revolver,
    category: 'Легенды',
    skins: [
      { id: 'rv1', name: 'Doppler Phase 2', weapon: 'Karambit', rarity: 'ancient', price: 36000, wear: 'FN', image: SKIN_IMAGES.knife_karambit },
      { id: 'rv2', name: 'Howl', weapon: 'M4A4', rarity: 'contraband', price: 300000, wear: 'FN', image: SKIN_IMAGES.m4a4_howl },
      { id: 'rv3', name: 'Dragon Lore', weapon: 'AWP', rarity: 'ancient', price: 125000, wear: 'FT', image: SKIN_IMAGES.awp_dragon },
      { id: 'rv4', name: 'Asiimov', weapon: 'AK-47', rarity: 'legendary', price: 6500, wear: 'FT', image: SKIN_IMAGES.ak47_asiimov },
      { id: 'rv5', name: 'Wildfire', weapon: 'Glock-18', rarity: 'rare', price: 280, wear: 'FN', image: SKIN_IMAGES.glock_fade },
      { id: 'rv6', name: 'Fade', weapon: 'Desert Eagle', rarity: 'mythical', price: 2000, wear: 'FN', image: SKIN_IMAGES.deagle_blaze },
      { id: 'rv7', name: 'Malachite', weapon: 'SG 553', rarity: 'uncommon', price: 55, wear: 'FT', image: SKIN_IMAGES.sg553_integrale },
      { id: 'rv8', name: 'Cerberus', weapon: 'MAC-10', rarity: 'uncommon', price: 18, wear: 'BS', image: SKIN_IMAGES.mac10_malachite },
    ]
  },
  {
    id: 'wildfire',
    name: 'Operation Wildfire Case',
    price: 10,
    image: CASE_IMAGES.wildfire,
    category: 'Операции',
    skins: [
      { id: 'wf1', name: 'Butterfly Knife Tiger Tooth', weapon: 'Butterfly Knife', rarity: 'ancient', price: 22000, wear: 'FN', image: SKIN_IMAGES.knife_butterfly },
      { id: 'wf2', name: 'Howl', weapon: 'M4A4', rarity: 'contraband', price: 280000, wear: 'FN', image: SKIN_IMAGES.m4a4_howl },
      { id: 'wf3', name: 'Dragon Lore', weapon: 'AWP', rarity: 'ancient', price: 120000, wear: 'FT', image: SKIN_IMAGES.awp_dragon },
      { id: 'wf4', name: 'Hyper Beast', weapon: 'M4A1-S', rarity: 'mythical', price: 2900, wear: 'FN', image: SKIN_IMAGES.m4a1s_hyper },
      { id: 'wf5', name: 'Blaze', weapon: 'AK-47', rarity: 'legendary', price: 5100, wear: 'FT', image: SKIN_IMAGES.ak47_asiimov },
      { id: 'wf6', name: 'Asiimov', weapon: 'Desert Eagle', rarity: 'rare', price: 680, wear: 'FN', image: SKIN_IMAGES.deagle_blaze },
      { id: 'wf7', name: 'Orion', weapon: 'P250', rarity: 'uncommon', price: 78, wear: 'FT', image: SKIN_IMAGES.p250_asiimov },
      { id: 'wf8', name: 'Malachite', weapon: 'MP9', rarity: 'uncommon', price: 16, wear: 'FT', image: SKIN_IMAGES.mp9_wild },
    ]
  },
  {
    id: 'phoenix',
    name: 'Operation Phoenix Case',
    price: 9,
    image: CASE_IMAGES.phoenix,
    category: 'Операции',
    skins: [
      { id: 'ph1', name: 'Doppler Phase 3', weapon: 'M9 Bayonet', rarity: 'ancient', price: 17000, wear: 'FN', image: SKIN_IMAGES.knife_m9_marble },
      { id: 'ph2', name: 'Howl', weapon: 'M4A4', rarity: 'contraband', price: 260000, wear: 'FN', image: SKIN_IMAGES.m4a4_howl },
      { id: 'ph3', name: 'Dragon Lore', weapon: 'AWP', rarity: 'ancient', price: 115000, wear: 'FT', image: SKIN_IMAGES.awp_dragon },
      { id: 'ph4', name: 'Asiimov', weapon: 'AK-47', rarity: 'legendary', price: 7200, wear: 'FT', image: SKIN_IMAGES.ak47_asiimov },
      { id: 'ph5', name: 'Printstream', weapon: 'USP-S', rarity: 'mythical', price: 3800, wear: 'FN', image: SKIN_IMAGES.usp_orion },
      { id: 'ph6', name: 'Fade', weapon: 'P250', rarity: 'rare', price: 430, wear: 'MW', image: SKIN_IMAGES.p250_asiimov },
      { id: 'ph7', name: 'Cerberus', weapon: 'Galil AR', rarity: 'uncommon', price: 60, wear: 'FT', image: SKIN_IMAGES.galil_cerberus },
      { id: 'ph8', name: 'Wild Lily', weapon: 'MAC-10', rarity: 'uncommon', price: 14, wear: 'BS', image: SKIN_IMAGES.mac10_malachite },
    ]
  },
  {
    id: 'csgo',
    name: 'CS:GO Weapon Case',
    price: 8,
    image: CASE_IMAGES.csgo,
    category: 'Операции',
    skins: [
      { id: 'cg1', name: 'Doppler Phase 1', weapon: 'Karambit', rarity: 'ancient', price: 29000, wear: 'FN', image: SKIN_IMAGES.knife_karambit },
      { id: 'cg2', name: 'Howl', weapon: 'M4A4', rarity: 'contraband', price: 250000, wear: 'FN', image: SKIN_IMAGES.m4a4_howl },
      { id: 'cg3', name: 'Dragon Lore', weapon: 'AWP', rarity: 'ancient', price: 110000, wear: 'FT', image: SKIN_IMAGES.awp_dragon },
      { id: 'cg4', name: 'Hyper Beast', weapon: 'AK-47', rarity: 'legendary', price: 5800, wear: 'FN', image: SKIN_IMAGES.ak47_redline },
      { id: 'cg5', name: 'Neo-Noir', weapon: 'M4A1-S', rarity: 'mythical', price: 3000, wear: 'FT', image: SKIN_IMAGES.m4a1s_hyper },
      { id: 'cg6', name: 'Blaze', weapon: 'Desert Eagle', rarity: 'mythical', price: 2600, wear: 'FN', image: SKIN_IMAGES.deagle_blaze },
      { id: 'cg7', name: 'Asiimov', weapon: 'Glock-18', rarity: 'rare', price: 295, wear: 'FN', image: SKIN_IMAGES.glock_fade },
      { id: 'cg8', name: 'Redline', weapon: 'FAMAS', rarity: 'uncommon', price: 12, wear: 'FT', image: SKIN_IMAGES.famas_mecha },
    ]
  },
  {
    id: 'esports',
    name: 'eSports 2013 Case',
    price: 7,
    image: CASE_IMAGES.esports,
    category: 'Операции',
    skins: [
      { id: 'es1', name: 'Fade', weapon: 'Butterfly Knife', rarity: 'ancient', price: 26000, wear: 'FN', image: SKIN_IMAGES.knife_butterfly },
      { id: 'es2', name: 'Howl', weapon: 'M4A4', rarity: 'contraband', price: 230000, wear: 'FN', image: SKIN_IMAGES.m4a4_howl },
      { id: 'es3', name: 'Dragon Lore', weapon: 'AWP', rarity: 'ancient', price: 105000, wear: 'FT', image: SKIN_IMAGES.awp_dragon },
      { id: 'es4', name: 'Redline', weapon: 'AK-47', rarity: 'legendary', price: 7500, wear: 'FN', image: SKIN_IMAGES.ak47_redline },
      { id: 'es5', name: 'Orion', weapon: 'USP-S', rarity: 'mythical', price: 3600, wear: 'FN', image: SKIN_IMAGES.usp_orion },
      { id: 'es6', name: 'Wildfire', weapon: 'P250', rarity: 'rare', price: 390, wear: 'FN', image: SKIN_IMAGES.p250_asiimov },
      { id: 'es7', name: 'Red Laminate', weapon: 'MP9', rarity: 'uncommon', price: 68, wear: 'FT', image: SKIN_IMAGES.mp9_wild },
      { id: 'es8', name: 'Malachite', weapon: 'FAMAS', rarity: 'uncommon', price: 10, wear: 'BS', image: SKIN_IMAGES.famas_mecha },
    ]
  },
];

export const RARITY_COLORS: Record<Rarity, string> = {
  common: '#b0c3d9',
  uncommon: '#5e98d9',
  rare: '#4b69ff',
  mythical: '#8847ff',
  legendary: '#d32ce6',
  ancient: '#eb4b4b',
  contraband: '#e4ae39',
};

export const RARITY_NAMES: Record<Rarity, string> = {
  common: 'Потребительское',
  uncommon: 'Промышленное',
  rare: 'Армейское',
  mythical: 'Запрещённое',
  legendary: 'Засекреченное',
  ancient: 'Тайное',
  contraband: 'Контрабанда',
};

export const WEAR_NAMES: Record<string, string> = {
  FN: 'Прямо с завода',
  MW: 'Немного поношенное',
  FT: 'После полевых испытаний',
  WW: 'Поношенное',
  BS: 'Закалённое в боях',
};

export function formatPrice(price: number): string {
  if (price >= 1000) {
    return `${(price / 100).toFixed(0)} ₽`;
  }
  return `${price} ₽`;
}

export function getAllSkins(): Skin[] {
  return ALL_CASES.flatMap(c => c.skins).sort((a, b) => a.price - b.price);
}
