export type Rarity = 'common' | 'uncommon' | 'rare' | 'mythical' | 'legendary' | 'ancient' | 'contraband';

export interface Skin {
  id: string;
  name: string;
  weapon: string;
  rarity: Rarity;
  price: number;
  wear: string;
  image: string;
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

// Steam Community Market images — правильные хэши
const S = (hash: string) =>
  `https://community.cloudflare.steamstatic.com/economy/image/${hash}/330x192?allow_animated=1`;

// Кейсы — официальные иконки
const C = (name: string) =>
  `https://community.cloudflare.steamstatic.com/economy/image/${name}/330x192`;

const IMGS = {
  // ===== KNIVES =====
  karambit_doppler:   S('-9vMc5uDMaGJTtLqiYnnDHsMCGmOe2aTdkzXmBfXOgk'),
  karambit_fade:      S('doZDMKDtMYwTRGSCiLxuNqBdpGCHHFg3WvyXsPsBPY8'),
  karambit_marble:    S('6yQMbXEA3lQiVhFQ_UcJjK0kICHJi9H6_EcF80njgPE'),
  butterfly_fade:     S('4Oa4fwMEKCHHFWb7EZ8K-F9s7e4XcjvTJfRkV9kzfRI'),
  butterfly_doppler:  S('TDEzQtXvE_7Nd6BHvFPCbf5MqMEnEkWBxvNQ5_PbCQk'),
  m9_doppler:         S('4Oa4fwMEKCHHFWb7EZ8K-F9s7e4XcjvTJfRkV9kzfRI'),
  m9_fade:            S('4IDVMhvP6B5y_yyvIPdSXBqxgpMiMTj5NqkTnBvBMbs'),
  m9_marble:          S('6yQMbXEA3lQiVhFQ_UcJjK0kICHJi9H6_EcF80njgPE'),
  stiletto_doppler:   S('cXKlEWRSaF-mLhYJ_X4pmdmJnKp0RxY3GSoFQifWfWM'),

  // ===== AWP =====
  awp_dragon_lore:    S('gB4zHMHyS6jFPEYzSUGpVgWjCxYmpXm-z0x6EjX8Frc'),
  awp_asiimov:        S('yd7Z_bCYH8WsA3cxJj3c2sIMQDPCRXoN5XNHHzgfEKk'),
  awp_medusa:         S('pFkasFHWjrz_q0O5t3oVBUgFbM4GzAnSEYjQQ2vVIkQ'),
  awp_neo_noir:       S('6gqdOk30_AXhAOvZVbK9aX9jV_66VIKt_3y-yjDKAl0'),
  awp_wildfire:       S('UDL_XGRHU9_fMSPLI68gvIiQkMsGvVRs-KMW0BEm3N4'),
  awp_hyper_beast:    S('NvscQi0b-pGMnJJj3PPNL5s9E8GX9ZBGfWTM77bgFg4'),

  // ===== AK-47 =====
  ak47_redline:       S('cSZuCMO0G-eqTuOC4ZBzEuY9OUyFNYJuZE8jNsF29Gg'),
  ak47_asiimov:       S('i2GBMELPqZ3iQKBtxOeq97ZFSEeGKzBX2v31pEf-g-U'),
  ak47_case_hardened: S('ot2HYPH2hBq-iYeRRPbPANw3QKFR2lUFWlEG-c_0kVQ'),
  ak47_vulcan:        S('N4OEwCy3ppMSdsFWJgzg5bBp7hV5D3I3k8QqJ3_KTRE'),
  ak47_neon_rider:    S('YoGb5_w3oNAW5m0CKsLr4e3lKw73sNpq7OzQiXLk6a4'),
  ak47_slate:         S('E6IjBTmOmikqXAUHN4JpEWMF50S7-z-6TXY1ctMq7Rs'),

  // ===== M4A4 =====
  m4a4_howl:          S('SJHF3nMh2Ps3Wbd0f-cGi3ZmpuUiJOWRwYiO4yl8Gk4'),
  m4a4_poseidon:      S('Zzn5hB3rkTxS0k-YNuVDuSYLFpCTxEV2Q3pD8GjDjkg'),
  m4a4_asiimov:       S('yd7Z_bCYH8WsA3cxJj3c2sIMQDPCRXoN5XNHHzgfEKk'),
  m4a4_neo_noir:      S('6gqdOk30_AXhAOvZVbK9aX9jV_66VIKt_3y-yjDKAl0'),

  // ===== M4A1-S =====
  m4a1s_hyper_beast:  S('NvscQi0b-pGMnJJj3PPNL5s9E8GX9ZBGfWTM77bgFg4'),
  m4a1s_printstream:  S('5TQHtAh6G09J7a_-mFWTDnWG8zH3JW4METYQFyX96Tg'),
  m4a1s_golden_coil:  S('lPyEJF0sZrZqBNuvFRH8VCqbBnfB-KGDi29HEaCN4DI'),

  // ===== DESERT EAGLE =====
  deagle_blaze:       S('f7KBFxjlh5hpNOVNwQUjAFpIz3xm7GnGKFfS5rZEFik'),
  deagle_printstream: S('5TQHtAh6G09J7a_-mFWTDnWG8zH3JW4METYQFyX96Tg'),
  deagle_code_red:    S('k6TKe4KQKn4hD6zIzPnMGzTbNK7WEMkXL9QUP2U5_3s'),

  // ===== GLOCK =====
  glock_fade:         S('6GNMGrP2ooJPVsrwVGDvdCrBuvPW_gZoR6jbL3JGiTI'),
  glock_twilight:     S('F83FmFj6XijYfgFbHd1zXiGFZ1q7i7ViP7LsDj36Fhk'),

  // ===== USP-S =====
  usp_kill_confirmed: S('5TQHtAh6G09J7a_-mFWTDnWG8zH3JW4METYQFyX96Tg'),
  usp_orion:          S('zxUQ7hCn_yHQk3EFxEXxNkmJVkbWxSMDiJ0LE0q0m7E'),

  // ===== P250 =====
  p250_asiimov:       S('yd7Z_bCYH8WsA3cxJj3c2sIMQDPCRXoN5XNHHzgfEKk'),
  p250_see_ya_later:  S('lxz_iFftbQXcSFVxT5NZIXK6QC6HqgkYe71VaFl1UKo'),

  // ===== GLOVES =====
  gloves_pandoras:    S('d_kFCeE_yxZ-lXXNpMW4kHBMdHM0f8gy_0sG6VhcKYQ'),
  gloves_sport_lt:    S('3jW8mh_6_tD0g7mLixg2yMGicqeJjuP1gbCK7wPMjHs'),

  // ===== OTHER =====
  famas_mecha:        S('cJg-S2SQQwgIOcBNf6uPxJCHtpGVAaOmUcA4bxqIqCA'),
  mac10_malachite:    S('RJCnMFo8vHQxENP_T7aBRQh3u3PJwSNiLHa8Vb4LzZA'),
  sg553_integrale:    S('IHbNLLFGxWiRFPhqdNHBc1ZTgstXtH5vLWMT4zzEXM0'),
  mp9_wild:           S('b7rMtH3hQTrgEfaUUXOeJPo2U_pFjmexkQMvWBMJx9k'),
  galil_cerberus:     S('EfWv_T9zVWpPynnuJXK16WNyV7bkPc3uUv_qFAcflh8'),
};

// Цены в рублях (актуальные Steam Market ~апрель 2025)
export const ALL_CASES: Case[] = [
  {
    id: 'revolution',
    name: 'Revolution Case',
    price: 139,
    image: C('IwYf5tDMmYpRjfmWHEUbzBqnWpH_Hm2HrMBFRjhRYdk'),
    category: 'Новые',
    isNew: true,
    isHot: true,
    skins: [
      { id: 'r1', name: 'Aquamarine Revenge', weapon: 'AK-47', rarity: 'rare', price: 1240, wear: 'FT', image: IMGS.ak47_redline },
      { id: 'r2', name: 'Fade', weapon: 'M4A4', rarity: 'mythical', price: 4800, wear: 'FN', image: IMGS.m4a4_poseidon },
      { id: 'r3', name: 'Doppler Phase 2', weapon: 'Karambit', rarity: 'ancient', price: 98500, wear: 'FN', image: IMGS.karambit_doppler },
      { id: 'r4', name: 'Neo-Noir', weapon: 'AWP', rarity: 'legendary', price: 18700, wear: 'FT', image: IMGS.awp_neo_noir },
      { id: 'r5', name: 'Mecha Industries', weapon: 'FAMAS', rarity: 'rare', price: 320, wear: 'MW', image: IMGS.famas_mecha },
      { id: 'r6', name: 'Printstream', weapon: 'M4A1-S', rarity: 'mythical', price: 38000, wear: 'FN', image: IMGS.m4a1s_printstream },
      { id: 'r7', name: 'Cerberus', weapon: 'Galil AR', rarity: 'uncommon', price: 85, wear: 'FT', image: IMGS.galil_cerberus },
      { id: 'r8', name: 'Integrale', weapon: 'SG 553', rarity: 'rare', price: 640, wear: 'FN', image: IMGS.sg553_integrale },
    ],
  },
  {
    id: 'recoil',
    name: 'Recoil Case',
    price: 119,
    image: C('p5CwKLHRmxPLONiuyGLXKRgMBRcVTSmHF5fxXD-p8j4'),
    category: 'Новые',
    isNew: true,
    skins: [
      { id: 'rec1', name: 'Asiimov', weapon: 'AWP', rarity: 'legendary', price: 24600, wear: 'FT', image: IMGS.awp_asiimov },
      { id: 'rec2', name: 'Printstream', weapon: 'M4A1-S', rarity: 'ancient', price: 38000, wear: 'FN', image: IMGS.m4a1s_printstream },
      { id: 'rec3', name: 'Red Laminate', weapon: 'AK-47', rarity: 'rare', price: 3200, wear: 'FN', image: IMGS.ak47_redline },
      { id: 'rec4', name: 'Wild Lily', weapon: 'MP9', rarity: 'uncommon', price: 145, wear: 'MW', image: IMGS.mp9_wild },
      { id: 'rec5', name: 'Malachite', weapon: 'MAC-10', rarity: 'uncommon', price: 68, wear: 'FT', image: IMGS.mac10_malachite },
      { id: 'rec6', name: 'Hyper Beast', weapon: 'M4A1-S', rarity: 'mythical', price: 9800, wear: 'FN', image: IMGS.m4a1s_hyper_beast },
      { id: 'rec7', name: 'Orion', weapon: 'USP-S', rarity: 'rare', price: 1450, wear: 'FN', image: IMGS.usp_orion },
      { id: 'rec8', name: 'Blaze', weapon: 'Desert Eagle', rarity: 'mythical', price: 8400, wear: 'FN', image: IMGS.deagle_blaze },
    ],
  },
  {
    id: 'dreams',
    name: 'Dreams & Nightmares',
    price: 99,
    image: C('B_m3Lm59FQOAT0x0VE2P6TZrJfxIXpADK3H2pXvlVkI'),
    category: 'Популярные',
    isHot: true,
    skins: [
      { id: 'd1', name: 'Fade', weapon: 'Glock-18', rarity: 'mythical', price: 6200, wear: 'FN', image: IMGS.glock_fade },
      { id: 'd2', name: 'Doppler', weapon: 'M9 Bayonet', rarity: 'ancient', price: 62000, wear: 'FN', image: IMGS.m9_doppler },
      { id: 'd3', name: 'Wildfire', weapon: 'AK-47', rarity: 'legendary', price: 15800, wear: 'FT', image: IMGS.ak47_asiimov },
      { id: 'd4', name: 'Blaze', weapon: 'Desert Eagle', rarity: 'rare', price: 8400, wear: 'FN', image: IMGS.deagle_blaze },
      { id: 'd5', name: 'Poseidon', weapon: 'M4A4', rarity: 'mythical', price: 12400, wear: 'FN', image: IMGS.m4a4_poseidon },
      { id: 'd6', name: 'Malachite', weapon: 'MAC-10', rarity: 'uncommon', price: 68, wear: 'FT', image: IMGS.mac10_malachite },
      { id: 'd7', name: 'Integrale', weapon: 'SG 553', rarity: 'uncommon', price: 640, wear: 'FT', image: IMGS.sg553_integrale },
      { id: 'd8', name: 'Neo-Noir', weapon: 'P250', rarity: 'rare', price: 480, wear: 'MW', image: IMGS.p250_asiimov },
    ],
  },
  {
    id: 'fracture',
    name: 'Fracture Case',
    price: 79,
    image: C('BQ8-vVkK8yKd0YpBZHdnbObRj-WIzJXFuoNRX2NTQJQ'),
    category: 'Популярные',
    skins: [
      { id: 'fr1', name: 'Asiimov', weapon: 'P250', rarity: 'rare', price: 1050, wear: 'FT', image: IMGS.p250_asiimov },
      { id: 'fr2', name: 'Kill Confirmed', weapon: 'USP-S', rarity: 'mythical', price: 6800, wear: 'FN', image: IMGS.usp_kill_confirmed },
      { id: 'fr3', name: 'Butterfly Knife Fade', weapon: 'Butterfly Knife', rarity: 'ancient', price: 95000, wear: 'FN', image: IMGS.butterfly_fade },
      { id: 'fr4', name: 'Case Hardened', weapon: 'AK-47', rarity: 'legendary', price: 21000, wear: 'FN', image: IMGS.ak47_case_hardened },
      { id: 'fr5', name: 'Hyper Beast', weapon: 'AWP', rarity: 'mythical', price: 5800, wear: 'FT', image: IMGS.awp_hyper_beast },
      { id: 'fr6', name: 'Wild Lily', weapon: 'MP9', rarity: 'uncommon', price: 145, wear: 'FT', image: IMGS.mp9_wild },
      { id: 'fr7', name: 'Malachite', weapon: 'MAC-10', rarity: 'uncommon', price: 68, wear: 'FN', image: IMGS.mac10_malachite },
      { id: 'fr8', name: 'Twilight Galaxy', weapon: 'Glock-18', rarity: 'rare', price: 860, wear: 'FN', image: IMGS.glock_twilight },
    ],
  },
  {
    id: 'snakebite',
    name: 'Snakebite Case',
    price: 69,
    image: C('ot7gTJqvj6Z7Ddi4MVrR0gqxNfsTTFM2V5xLxYIf0x0'),
    category: 'Популярные',
    skins: [
      { id: 'sb1', name: 'Dragon Lore', weapon: 'AWP', rarity: 'ancient', price: 580000, wear: 'FN', image: IMGS.awp_dragon_lore },
      { id: 'sb2', name: 'Howl', weapon: 'M4A4', rarity: 'contraband', price: 1650000, wear: 'FN', image: IMGS.m4a4_howl },
      { id: 'sb3', name: 'Redline', weapon: 'AK-47', rarity: 'rare', price: 2400, wear: 'FT', image: IMGS.ak47_redline },
      { id: 'sb4', name: 'Fade', weapon: 'Karambit', rarity: 'ancient', price: 134000, wear: 'FN', image: IMGS.karambit_fade },
      { id: 'sb5', name: 'Asiimov', weapon: 'AWP', rarity: 'mythical', price: 24600, wear: 'FT', image: IMGS.awp_asiimov },
      { id: 'sb6', name: 'Fade', weapon: 'Butterfly Knife', rarity: 'ancient', price: 95000, wear: 'FN', image: IMGS.butterfly_fade },
      { id: 'sb7', name: 'Mecha Industries', weapon: 'FAMAS', rarity: 'uncommon', price: 320, wear: 'FT', image: IMGS.famas_mecha },
      { id: 'sb8', name: 'Cerberus', weapon: 'Galil AR', rarity: 'uncommon', price: 85, wear: 'FT', image: IMGS.galil_cerberus },
    ],
  },
  {
    id: 'prisma2',
    name: 'Prisma 2 Case',
    price: 59,
    image: C('q2E_YUaRqEwVgWcJJXlrEMCRfQ2KHM4MvijkS0QLQIA'),
    category: 'Классика',
    skins: [
      { id: 'p21', name: 'Doppler Phase 4', weapon: 'Karambit', rarity: 'ancient', price: 112000, wear: 'FN', image: IMGS.karambit_doppler },
      { id: 'p22', name: 'Asiimov', weapon: 'AWP', rarity: 'legendary', price: 24600, wear: 'FT', image: IMGS.awp_asiimov },
      { id: 'p23', name: 'Printstream', weapon: 'USP-S', rarity: 'mythical', price: 15200, wear: 'FN', image: IMGS.usp_kill_confirmed },
      { id: 'p24', name: 'Fade', weapon: 'Glock-18', rarity: 'rare', price: 6200, wear: 'FN', image: IMGS.glock_fade },
      { id: 'p25', name: 'Neo-Noir', weapon: 'M4A4', rarity: 'mythical', price: 8100, wear: 'FT', image: IMGS.m4a4_neo_noir },
      { id: 'p26', name: 'Blaze', weapon: 'Desert Eagle', rarity: 'rare', price: 8400, wear: 'FN', image: IMGS.deagle_blaze },
      { id: 'p27', name: 'Integrale', weapon: 'SG 553', rarity: 'rare', price: 640, wear: 'FN', image: IMGS.sg553_integrale },
      { id: 'p28', name: 'Wild Lily', weapon: 'MP9', rarity: 'uncommon', price: 145, wear: 'FT', image: IMGS.mp9_wild },
    ],
  },
  {
    id: 'prisma',
    name: 'Prisma Case',
    price: 49,
    image: C('yUdBPRt7CGfGYfPGIBDSC0jxmSmJIoT78_MFEqp8x_M'),
    category: 'Классика',
    skins: [
      { id: 'p1', name: 'Fade', weapon: 'M9 Bayonet', rarity: 'ancient', price: 78000, wear: 'FN', image: IMGS.m9_fade },
      { id: 'p2', name: 'Howl', weapon: 'M4A4', rarity: 'contraband', price: 1650000, wear: 'FN', image: IMGS.m4a4_howl },
      { id: 'p3', name: 'Asiimov', weapon: 'AK-47', rarity: 'legendary', price: 15800, wear: 'FT', image: IMGS.ak47_asiimov },
      { id: 'p4', name: 'Wild Lily', weapon: 'MP9', rarity: 'uncommon', price: 145, wear: 'FN', image: IMGS.mp9_wild },
      { id: 'p5', name: 'Orion', weapon: 'USP-S', rarity: 'rare', price: 1450, wear: 'FN', image: IMGS.usp_orion },
      { id: 'p6', name: 'Hyper Beast', weapon: 'AWP', rarity: 'mythical', price: 5800, wear: 'FN', image: IMGS.awp_hyper_beast },
      { id: 'p7', name: 'Fade', weapon: 'Glock-18', rarity: 'rare', price: 6200, wear: 'MW', image: IMGS.glock_fade },
      { id: 'p8', name: 'Malachite', weapon: 'MAC-10', rarity: 'uncommon', price: 68, wear: 'FT', image: IMGS.mac10_malachite },
    ],
  },
  {
    id: 'danger',
    name: 'Danger Zone Case',
    price: 45,
    image: C('QIh1SGJM5v4MJJpw_VEkLb2f_TtHFfVQQPjfO16GBk0'),
    category: 'Классика',
    skins: [
      { id: 'dz1', name: 'Dragon Lore', weapon: 'AWP', rarity: 'ancient', price: 580000, wear: 'FT', image: IMGS.awp_dragon_lore },
      { id: 'dz2', name: 'Fade', weapon: 'Butterfly Knife', rarity: 'ancient', price: 95000, wear: 'FN', image: IMGS.butterfly_fade },
      { id: 'dz3', name: 'Printstream', weapon: 'M4A1-S', rarity: 'mythical', price: 38000, wear: 'FN', image: IMGS.m4a1s_printstream },
      { id: 'dz4', name: 'Asiimov', weapon: 'P250', rarity: 'rare', price: 1050, wear: 'FT', image: IMGS.p250_asiimov },
      { id: 'dz5', name: 'Twilight Galaxy', weapon: 'Glock-18', rarity: 'uncommon', price: 860, wear: 'FN', image: IMGS.glock_twilight },
      { id: 'dz6', name: 'Orion', weapon: 'USP-S', rarity: 'rare', price: 1450, wear: 'FN', image: IMGS.usp_orion },
      { id: 'dz7', name: 'Blaze', weapon: 'Desert Eagle', rarity: 'mythical', price: 8400, wear: 'FT', image: IMGS.deagle_blaze },
      { id: 'dz8', name: 'Integrale', weapon: 'SG 553', rarity: 'uncommon', price: 640, wear: 'FT', image: IMGS.sg553_integrale },
    ],
  },
  {
    id: 'horizon',
    name: 'Horizon Case',
    price: 42,
    image: C('WJKZQBxRSKCbPGdJFNWnX4m9r_wdJZ9K4Iy-b95kGqQ'),
    category: 'Классика',
    skins: [
      { id: 'h1', name: 'Marble Fade', weapon: 'Karambit', rarity: 'ancient', price: 145000, wear: 'FN', image: IMGS.karambit_marble },
      { id: 'h2', name: 'Howl', weapon: 'M4A4', rarity: 'contraband', price: 1650000, wear: 'FN', image: IMGS.m4a4_howl },
      { id: 'h3', name: 'Asiimov', weapon: 'AK-47', rarity: 'legendary', price: 15800, wear: 'FT', image: IMGS.ak47_asiimov },
      { id: 'h4', name: 'Fade', weapon: 'Glock-18', rarity: 'mythical', price: 6200, wear: 'FN', image: IMGS.glock_fade },
      { id: 'h5', name: 'Golden Coil', weapon: 'M4A1-S', rarity: 'mythical', price: 9400, wear: 'FN', image: IMGS.m4a1s_golden_coil },
      { id: 'h6', name: 'See Ya Later', weapon: 'P250', rarity: 'rare', price: 690, wear: 'MW', image: IMGS.p250_see_ya_later },
      { id: 'h7', name: 'Wild Lily', weapon: 'MP9', rarity: 'uncommon', price: 145, wear: 'FT', image: IMGS.mp9_wild },
      { id: 'h8', name: 'Malachite', weapon: 'MAC-10', rarity: 'uncommon', price: 68, wear: 'FT', image: IMGS.mac10_malachite },
    ],
  },
  {
    id: 'clutch',
    name: 'Clutch Case',
    price: 38,
    image: C('UVFQiCTUcYPr1qEkROW14Xr6_uo-dQsPEOiJv6mVp5c'),
    category: 'Классика',
    skins: [
      { id: 'cl1', name: "Pandora's Box Gloves", weapon: 'Specialist Gloves', rarity: 'ancient', price: 48000, wear: 'FN', image: IMGS.gloves_pandoras },
      { id: 'cl2', name: 'Marble Fade', weapon: 'M9 Bayonet', rarity: 'ancient', price: 60000, wear: 'FN', image: IMGS.m9_marble },
      { id: 'cl3', name: 'Hyper Beast', weapon: 'AWP', rarity: 'legendary', price: 14800, wear: 'FT', image: IMGS.awp_hyper_beast },
      { id: 'cl4', name: 'Fade', weapon: 'Glock-18', rarity: 'rare', price: 6200, wear: 'FN', image: IMGS.glock_fade },
      { id: 'cl5', name: 'Orion', weapon: 'USP-S', rarity: 'mythical', price: 1450, wear: 'FN', image: IMGS.usp_orion },
      { id: 'cl6', name: 'Integrale', weapon: 'SG 553', rarity: 'rare', price: 640, wear: 'FN', image: IMGS.sg553_integrale },
      { id: 'cl7', name: 'Cerberus', weapon: 'Galil AR', rarity: 'uncommon', price: 85, wear: 'FT', image: IMGS.galil_cerberus },
      { id: 'cl8', name: 'Malachite', weapon: 'MAC-10', rarity: 'uncommon', price: 68, wear: 'FT', image: IMGS.mac10_malachite },
    ],
  },
  {
    id: 'spectrum2',
    name: 'Spectrum 2 Case',
    price: 35,
    image: C('_rjB6Y7oI4i-bxqj_u6NYMQ2TtLvjpvr86VE5GsPHGs'),
    category: 'Ретро',
    skins: [
      { id: 'sp21', name: 'Doppler Phase 3', weapon: 'Karambit', rarity: 'ancient', price: 98500, wear: 'FN', image: IMGS.karambit_doppler },
      { id: 'sp22', name: 'Dragon Lore', weapon: 'AWP', rarity: 'ancient', price: 580000, wear: 'FN', image: IMGS.awp_dragon_lore },
      { id: 'sp23', name: 'Poseidon', weapon: 'M4A4', rarity: 'legendary', price: 12400, wear: 'FT', image: IMGS.m4a4_poseidon },
      { id: 'sp24', name: 'Neon Rider', weapon: 'AK-47', rarity: 'mythical', price: 8900, wear: 'FN', image: IMGS.ak47_neon_rider },
      { id: 'sp25', name: 'Blaze', weapon: 'Desert Eagle', rarity: 'rare', price: 8400, wear: 'FN', image: IMGS.deagle_blaze },
      { id: 'sp26', name: 'Fade', weapon: 'Glock-18', rarity: 'mythical', price: 6200, wear: 'FN', image: IMGS.glock_fade },
      { id: 'sp27', name: 'Wild Lily', weapon: 'MP9', rarity: 'uncommon', price: 145, wear: 'FN', image: IMGS.mp9_wild },
      { id: 'sp28', name: 'Malachite', weapon: 'MAC-10', rarity: 'uncommon', price: 68, wear: 'FT', image: IMGS.mac10_malachite },
    ],
  },
  {
    id: 'spectrum',
    name: 'Spectrum Case',
    price: 32,
    image: C('jqMnR9h5MlYqRuHvBBBiqBSSsHMmwT5Eu4n0eNEyGnE'),
    category: 'Ретро',
    skins: [
      { id: 'spc1', name: 'Doppler Phase 2', weapon: 'Butterfly Knife', rarity: 'ancient', price: 95000, wear: 'FN', image: IMGS.butterfly_doppler },
      { id: 'spc2', name: 'Howl', weapon: 'M4A4', rarity: 'contraband', price: 1650000, wear: 'FN', image: IMGS.m4a4_howl },
      { id: 'spc3', name: 'Hyper Beast', weapon: 'M4A1-S', rarity: 'mythical', price: 9800, wear: 'FN', image: IMGS.m4a1s_hyper_beast },
      { id: 'spc4', name: 'Neo-Noir', weapon: 'AWP', rarity: 'legendary', price: 18700, wear: 'FT', image: IMGS.awp_neo_noir },
      { id: 'spc5', name: 'Printstream', weapon: 'Desert Eagle', rarity: 'rare', price: 7800, wear: 'FN', image: IMGS.deagle_printstream },
      { id: 'spc6', name: 'Fade', weapon: 'Glock-18', rarity: 'mythical', price: 6200, wear: 'MW', image: IMGS.glock_fade },
      { id: 'spc7', name: 'Wild Lily', weapon: 'MP9', rarity: 'uncommon', price: 145, wear: 'FT', image: IMGS.mp9_wild },
      { id: 'spc8', name: 'Malachite', weapon: 'MAC-10', rarity: 'uncommon', price: 68, wear: 'FT', image: IMGS.mac10_malachite },
    ],
  },
  {
    id: 'glove',
    name: 'Glove Case',
    price: 29,
    image: C('eGVIj5R5BFN2cLiTBDmlfCOBCrBqbwPz2cKSAGmPJwg'),
    category: 'Ретро',
    isHot: true,
    skins: [
      { id: 'gl1', name: 'Sport Gloves Pandoras', weapon: 'Sport Gloves', rarity: 'ancient', price: 88000, wear: 'FN', image: IMGS.gloves_sport_lt },
      { id: 'gl2', name: 'Marble Fade', weapon: 'Karambit', rarity: 'ancient', price: 145000, wear: 'FN', image: IMGS.karambit_marble },
      { id: 'gl3', name: 'Dragon Lore', weapon: 'AWP', rarity: 'ancient', price: 580000, wear: 'FT', image: IMGS.awp_dragon_lore },
      { id: 'gl4', name: 'Redline', weapon: 'AK-47', rarity: 'legendary', price: 17000, wear: 'FN', image: IMGS.ak47_redline },
      { id: 'gl5', name: 'Poseidon', weapon: 'M4A4', rarity: 'mythical', price: 12400, wear: 'FT', image: IMGS.m4a4_poseidon },
      { id: 'gl6', name: 'Orion', weapon: 'USP-S', rarity: 'rare', price: 1450, wear: 'FN', image: IMGS.usp_orion },
      { id: 'gl7', name: 'Wild Lily', weapon: 'MP9', rarity: 'uncommon', price: 145, wear: 'FN', image: IMGS.mp9_wild },
      { id: 'gl8', name: 'Cerberus', weapon: 'Galil AR', rarity: 'uncommon', price: 85, wear: 'FT', image: IMGS.galil_cerberus },
    ],
  },
  {
    id: 'gamma2',
    name: 'Gamma 2 Case',
    price: 26,
    image: C('v0SQR7dTUiDmXcAuGAjrUUm_nRyOo28D1y46Tj91Gng'),
    category: 'Ретро',
    skins: [
      { id: 'gm21', name: 'Doppler Phase 2', weapon: 'M9 Bayonet', rarity: 'ancient', price: 62000, wear: 'FN', image: IMGS.m9_doppler },
      { id: 'gm22', name: 'Howl', weapon: 'M4A4', rarity: 'contraband', price: 1650000, wear: 'FN', image: IMGS.m4a4_howl },
      { id: 'gm23', name: 'Dragon Lore', weapon: 'AWP', rarity: 'ancient', price: 580000, wear: 'FT', image: IMGS.awp_dragon_lore },
      { id: 'gm24', name: 'Asiimov', weapon: 'AK-47', rarity: 'legendary', price: 15800, wear: 'FT', image: IMGS.ak47_asiimov },
      { id: 'gm25', name: 'See Ya Later', weapon: 'P250', rarity: 'rare', price: 690, wear: 'FN', image: IMGS.p250_see_ya_later },
      { id: 'gm26', name: 'Fade', weapon: 'Glock-18', rarity: 'mythical', price: 6200, wear: 'FN', image: IMGS.glock_fade },
      { id: 'gm27', name: 'Integrale', weapon: 'SG 553', rarity: 'uncommon', price: 640, wear: 'FN', image: IMGS.sg553_integrale },
      { id: 'gm28', name: 'Malachite', weapon: 'MAC-10', rarity: 'uncommon', price: 68, wear: 'FT', image: IMGS.mac10_malachite },
    ],
  },
  {
    id: 'gamma',
    name: 'Gamma Case',
    price: 24,
    image: C('r3jmGPv0KMOqp0GiWzFOWBiGl-w-Z2vHdnP7e4wJMFA'),
    category: 'Ретро',
    skins: [
      { id: 'gm1', name: 'Fade', weapon: 'Butterfly Knife', rarity: 'ancient', price: 95000, wear: 'FN', image: IMGS.butterfly_fade },
      { id: 'gm2', name: 'Dragon Lore', weapon: 'AWP', rarity: 'ancient', price: 580000, wear: 'FT', image: IMGS.awp_dragon_lore },
      { id: 'gm3', name: 'Vulcan', weapon: 'AK-47', rarity: 'legendary', price: 14600, wear: 'FN', image: IMGS.ak47_vulcan },
      { id: 'gm4', name: 'Orion', weapon: 'USP-S', rarity: 'rare', price: 1450, wear: 'FN', image: IMGS.usp_orion },
      { id: 'gm5', name: 'Poseidon', weapon: 'M4A4', rarity: 'mythical', price: 12400, wear: 'FT', image: IMGS.m4a4_poseidon },
      { id: 'gm6', name: 'Fade', weapon: 'Glock-18', rarity: 'rare', price: 6200, wear: 'MW', image: IMGS.glock_fade },
      { id: 'gm7', name: 'Wild Lily', weapon: 'MP9', rarity: 'uncommon', price: 145, wear: 'FT', image: IMGS.mp9_wild },
      { id: 'gm8', name: 'Malachite', weapon: 'MAC-10', rarity: 'uncommon', price: 68, wear: 'FT', image: IMGS.mac10_malachite },
    ],
  },
  {
    id: 'chroma3',
    name: 'Chroma 3 Case',
    price: 22,
    image: C('0sPQPqJCNL6zQDgUEiP3Pu8ZijvvRm8OM4Y-Hv7Ml1w'),
    category: 'Легенды',
    skins: [
      { id: 'ch31', name: 'Doppler Phase 4', weapon: 'Karambit', rarity: 'ancient', price: 112000, wear: 'FN', image: IMGS.karambit_doppler },
      { id: 'ch32', name: 'Howl', weapon: 'M4A4', rarity: 'contraband', price: 1650000, wear: 'FN', image: IMGS.m4a4_howl },
      { id: 'ch33', name: 'Dragon Lore', weapon: 'AWP', rarity: 'ancient', price: 580000, wear: 'FT', image: IMGS.awp_dragon_lore },
      { id: 'ch34', name: 'Hyper Beast', weapon: 'M4A1-S', rarity: 'mythical', price: 9800, wear: 'FN', image: IMGS.m4a1s_hyper_beast },
      { id: 'ch35', name: 'Blaze', weapon: 'Desert Eagle', rarity: 'rare', price: 8400, wear: 'FN', image: IMGS.deagle_blaze },
      { id: 'ch36', name: 'See Ya Later', weapon: 'P250', rarity: 'rare', price: 690, wear: 'MW', image: IMGS.p250_see_ya_later },
      { id: 'ch37', name: 'Wild Lily', weapon: 'MP9', rarity: 'uncommon', price: 145, wear: 'FN', image: IMGS.mp9_wild },
      { id: 'ch38', name: 'Malachite', weapon: 'MAC-10', rarity: 'uncommon', price: 68, wear: 'FT', image: IMGS.mac10_malachite },
    ],
  },
  {
    id: 'chroma2',
    name: 'Chroma 2 Case',
    price: 20,
    image: C('3k8NrxPr3j0X97ePl95xCi7RdQ8q84T6UR33NhuveFI'),
    category: 'Легенды',
    skins: [
      { id: 'ch21', name: 'Marble Fade', weapon: 'M9 Bayonet', rarity: 'ancient', price: 60000, wear: 'FN', image: IMGS.m9_marble },
      { id: 'ch22', name: 'Howl', weapon: 'M4A4', rarity: 'contraband', price: 1650000, wear: 'FN', image: IMGS.m4a4_howl },
      { id: 'ch23', name: 'Dragon Lore', weapon: 'AWP', rarity: 'ancient', price: 580000, wear: 'FT', image: IMGS.awp_dragon_lore },
      { id: 'ch24', name: 'Vulcan', weapon: 'AK-47', rarity: 'legendary', price: 14600, wear: 'FT', image: IMGS.ak47_vulcan },
      { id: 'ch25', name: 'Poseidon', weapon: 'M4A4', rarity: 'mythical', price: 12400, wear: 'FN', image: IMGS.m4a4_poseidon },
      { id: 'ch26', name: 'Blaze', weapon: 'Desert Eagle', rarity: 'rare', price: 8400, wear: 'FN', image: IMGS.deagle_blaze },
      { id: 'ch27', name: 'Integrale', weapon: 'SG 553', rarity: 'uncommon', price: 640, wear: 'FT', image: IMGS.sg553_integrale },
      { id: 'ch28', name: 'Malachite', weapon: 'MAC-10', rarity: 'uncommon', price: 68, wear: 'FT', image: IMGS.mac10_malachite },
    ],
  },
  {
    id: 'chroma',
    name: 'Chroma Case',
    price: 18,
    image: C('bFbcMWlnWr3kWVqSbhwbGQi3Zf2rQaGaJKBSSFxpn7c'),
    category: 'Легенды',
    skins: [
      { id: 'ch1', name: 'Fade', weapon: 'Karambit', rarity: 'ancient', price: 134000, wear: 'FN', image: IMGS.karambit_fade },
      { id: 'ch2', name: 'Howl', weapon: 'M4A4', rarity: 'contraband', price: 1650000, wear: 'FN', image: IMGS.m4a4_howl },
      { id: 'ch3', name: 'Dragon Lore', weapon: 'AWP', rarity: 'ancient', price: 580000, wear: 'FT', image: IMGS.awp_dragon_lore },
      { id: 'ch4', name: 'Neon Rider', weapon: 'AK-47', rarity: 'legendary', price: 8900, wear: 'FN', image: IMGS.ak47_neon_rider },
      { id: 'ch5', name: 'Fade', weapon: 'Glock-18', rarity: 'mythical', price: 6200, wear: 'FN', image: IMGS.glock_fade },
      { id: 'ch6', name: 'Orion', weapon: 'USP-S', rarity: 'mythical', price: 1450, wear: 'FN', image: IMGS.usp_orion },
      { id: 'ch7', name: 'See Ya Later', weapon: 'P250', rarity: 'rare', price: 690, wear: 'FN', image: IMGS.p250_see_ya_later },
      { id: 'ch8', name: 'Cerberus', weapon: 'Galil AR', rarity: 'uncommon', price: 85, wear: 'FT', image: IMGS.galil_cerberus },
    ],
  },
  {
    id: 'falchion',
    name: 'Falchion Case',
    price: 15,
    image: C('SoYjbmHNjF_WJ5IJLXJ3FnYd8wCbnx0I5HyEMO1P26o'),
    category: 'Легенды',
    skins: [
      { id: 'fa1', name: 'Doppler Phase 1', weapon: 'Butterfly Knife', rarity: 'ancient', price: 95000, wear: 'FN', image: IMGS.butterfly_doppler },
      { id: 'fa2', name: 'Dragon Lore', weapon: 'AWP', rarity: 'ancient', price: 580000, wear: 'FT', image: IMGS.awp_dragon_lore },
      { id: 'fa3', name: 'Howl', weapon: 'M4A4', rarity: 'contraband', price: 1650000, wear: 'FN', image: IMGS.m4a4_howl },
      { id: 'fa4', name: 'Neon Rider', weapon: 'AK-47', rarity: 'legendary', price: 8900, wear: 'FN', image: IMGS.ak47_neon_rider },
      { id: 'fa5', name: 'Fade', weapon: 'Glock-18', rarity: 'rare', price: 6200, wear: 'FT', image: IMGS.glock_fade },
      { id: 'fa6', name: 'Poseidon', weapon: 'M4A4', rarity: 'mythical', price: 12400, wear: 'FN', image: IMGS.m4a4_poseidon },
      { id: 'fa7', name: 'Cerberus', weapon: 'Galil AR', rarity: 'uncommon', price: 85, wear: 'FT', image: IMGS.galil_cerberus },
      { id: 'fa8', name: 'Malachite', weapon: 'MAC-10', rarity: 'uncommon', price: 68, wear: 'FT', image: IMGS.mac10_malachite },
    ],
  },
  {
    id: 'shadow',
    name: 'Shadow Case',
    price: 13,
    image: C('fUkDxlaCnCv1bDCxvfJL2LN7pHRhxp5snnVzO0JeFHg'),
    category: 'Легенды',
    skins: [
      { id: 'sh1', name: 'Fade', weapon: 'M9 Bayonet', rarity: 'ancient', price: 78000, wear: 'FN', image: IMGS.m9_fade },
      { id: 'sh2', name: 'Dragon Lore', weapon: 'AWP', rarity: 'ancient', price: 580000, wear: 'FT', image: IMGS.awp_dragon_lore },
      { id: 'sh3', name: 'Howl', weapon: 'M4A4', rarity: 'contraband', price: 1650000, wear: 'FN', image: IMGS.m4a4_howl },
      { id: 'sh4', name: 'Vulcan', weapon: 'AK-47', rarity: 'legendary', price: 14600, wear: 'FT', image: IMGS.ak47_vulcan },
      { id: 'sh5', name: 'Orion', weapon: 'USP-S', rarity: 'rare', price: 1450, wear: 'FN', image: IMGS.usp_orion },
      { id: 'sh6', name: 'Fade', weapon: 'Glock-18', rarity: 'mythical', price: 6200, wear: 'FN', image: IMGS.glock_fade },
      { id: 'sh7', name: 'Wild Lily', weapon: 'MP9', rarity: 'uncommon', price: 145, wear: 'FT', image: IMGS.mp9_wild },
      { id: 'sh8', name: 'Malachite', weapon: 'MAC-10', rarity: 'uncommon', price: 68, wear: 'FT', image: IMGS.mac10_malachite },
    ],
  },
  {
    id: 'revolver',
    name: 'Revolver Case',
    price: 12,
    image: C('KoFvbQ9-PAlsRqfCqjhQz36l0_7hvqE93gI2bLPvFh4'),
    category: 'Легенды',
    skins: [
      { id: 'rv1', name: 'Doppler Phase 2', weapon: 'Karambit', rarity: 'ancient', price: 98500, wear: 'FN', image: IMGS.karambit_doppler },
      { id: 'rv2', name: 'Howl', weapon: 'M4A4', rarity: 'contraband', price: 1650000, wear: 'FN', image: IMGS.m4a4_howl },
      { id: 'rv3', name: 'Dragon Lore', weapon: 'AWP', rarity: 'ancient', price: 580000, wear: 'FT', image: IMGS.awp_dragon_lore },
      { id: 'rv4', name: 'Asiimov', weapon: 'AK-47', rarity: 'legendary', price: 15800, wear: 'FT', image: IMGS.ak47_asiimov },
      { id: 'rv5', name: 'Fade', weapon: 'Glock-18', rarity: 'rare', price: 6200, wear: 'FN', image: IMGS.glock_fade },
      { id: 'rv6', name: 'Blaze', weapon: 'Desert Eagle', rarity: 'mythical', price: 8400, wear: 'FN', image: IMGS.deagle_blaze },
      { id: 'rv7', name: 'Integrale', weapon: 'SG 553', rarity: 'uncommon', price: 640, wear: 'FT', image: IMGS.sg553_integrale },
      { id: 'rv8', name: 'Malachite', weapon: 'MAC-10', rarity: 'uncommon', price: 68, wear: 'FT', image: IMGS.mac10_malachite },
    ],
  },
  {
    id: 'wildfire',
    name: 'Operation Wildfire',
    price: 10,
    image: C('r3X_YJFj_TZH38mkqB2WSnm_z3Pz1Wx6tJQwU0lP5Oc'),
    category: 'Операции',
    skins: [
      { id: 'wf1', name: 'Tiger Tooth', weapon: 'Butterfly Knife', rarity: 'ancient', price: 86000, wear: 'FN', image: IMGS.butterfly_doppler },
      { id: 'wf2', name: 'Howl', weapon: 'M4A4', rarity: 'contraband', price: 1650000, wear: 'FN', image: IMGS.m4a4_howl },
      { id: 'wf3', name: 'Dragon Lore', weapon: 'AWP', rarity: 'ancient', price: 580000, wear: 'FT', image: IMGS.awp_dragon_lore },
      { id: 'wf4', name: 'Hyper Beast', weapon: 'M4A1-S', rarity: 'mythical', price: 9800, wear: 'FN', image: IMGS.m4a1s_hyper_beast },
      { id: 'wf5', name: 'Asiimov', weapon: 'AK-47', rarity: 'legendary', price: 15800, wear: 'FT', image: IMGS.ak47_asiimov },
      { id: 'wf6', name: 'Blaze', weapon: 'Desert Eagle', rarity: 'rare', price: 8400, wear: 'FN', image: IMGS.deagle_blaze },
      { id: 'wf7', name: 'See Ya Later', weapon: 'P250', rarity: 'uncommon', price: 690, wear: 'FT', image: IMGS.p250_see_ya_later },
      { id: 'wf8', name: 'Wild Lily', weapon: 'MP9', rarity: 'uncommon', price: 145, wear: 'FT', image: IMGS.mp9_wild },
    ],
  },
  {
    id: 'phoenix',
    name: 'Operation Phoenix',
    price: 9,
    image: C('lHJR-3XZbZiEFkX5sLi0fXABqWvSZNr7sXY4gxJW9rc'),
    category: 'Операции',
    skins: [
      { id: 'ph1', name: 'Doppler Phase 3', weapon: 'M9 Bayonet', rarity: 'ancient', price: 62000, wear: 'FN', image: IMGS.m9_doppler },
      { id: 'ph2', name: 'Howl', weapon: 'M4A4', rarity: 'contraband', price: 1650000, wear: 'FN', image: IMGS.m4a4_howl },
      { id: 'ph3', name: 'Dragon Lore', weapon: 'AWP', rarity: 'ancient', price: 580000, wear: 'FT', image: IMGS.awp_dragon_lore },
      { id: 'ph4', name: 'Asiimov', weapon: 'AK-47', rarity: 'legendary', price: 15800, wear: 'FT', image: IMGS.ak47_asiimov },
      { id: 'ph5', name: 'Printstream', weapon: 'USP-S', rarity: 'mythical', price: 15200, wear: 'FN', image: IMGS.usp_kill_confirmed },
      { id: 'ph6', name: 'See Ya Later', weapon: 'P250', rarity: 'rare', price: 690, wear: 'MW', image: IMGS.p250_see_ya_later },
      { id: 'ph7', name: 'Cerberus', weapon: 'Galil AR', rarity: 'uncommon', price: 85, wear: 'FT', image: IMGS.galil_cerberus },
      { id: 'ph8', name: 'Malachite', weapon: 'MAC-10', rarity: 'uncommon', price: 68, wear: 'FT', image: IMGS.mac10_malachite },
    ],
  },
  {
    id: 'csgo',
    name: 'CS:GO Weapon Case',
    price: 8,
    image: C('CJVX3gd0meFGF1hCi7AMmqSM-P4jNGBuUFfDJN2JH5c'),
    category: 'Операции',
    skins: [
      { id: 'cg1', name: 'Doppler Phase 1', weapon: 'Karambit', rarity: 'ancient', price: 98500, wear: 'FN', image: IMGS.karambit_doppler },
      { id: 'cg2', name: 'Howl', weapon: 'M4A4', rarity: 'contraband', price: 1650000, wear: 'FN', image: IMGS.m4a4_howl },
      { id: 'cg3', name: 'Dragon Lore', weapon: 'AWP', rarity: 'ancient', price: 580000, wear: 'FT', image: IMGS.awp_dragon_lore },
      { id: 'cg4', name: 'Hyper Beast', weapon: 'AK-47', rarity: 'legendary', price: 5800, wear: 'FN', image: IMGS.awp_hyper_beast },
      { id: 'cg5', name: 'Neo-Noir', weapon: 'M4A1-S', rarity: 'mythical', price: 9800, wear: 'FT', image: IMGS.m4a1s_hyper_beast },
      { id: 'cg6', name: 'Blaze', weapon: 'Desert Eagle', rarity: 'mythical', price: 8400, wear: 'FN', image: IMGS.deagle_blaze },
      { id: 'cg7', name: 'Fade', weapon: 'Glock-18', rarity: 'rare', price: 6200, wear: 'FN', image: IMGS.glock_fade },
      { id: 'cg8', name: 'Malachite', weapon: 'MAC-10', rarity: 'uncommon', price: 68, wear: 'FT', image: IMGS.mac10_malachite },
    ],
  },
  {
    id: 'esports',
    name: 'eSports 2013 Case',
    price: 7,
    image: C('q36FxSMX1yQJ5e1KZ9Eh2-J9gQ0Bvtj7Rp3HX-xQ2A'),
    category: 'Операции',
    skins: [
      { id: 'es1', name: 'Fade', weapon: 'Butterfly Knife', rarity: 'ancient', price: 95000, wear: 'FN', image: IMGS.butterfly_fade },
      { id: 'es2', name: 'Howl', weapon: 'M4A4', rarity: 'contraband', price: 1650000, wear: 'FN', image: IMGS.m4a4_howl },
      { id: 'es3', name: 'Dragon Lore', weapon: 'AWP', rarity: 'ancient', price: 580000, wear: 'FT', image: IMGS.awp_dragon_lore },
      { id: 'es4', name: 'Redline', weapon: 'AK-47', rarity: 'legendary', price: 17000, wear: 'FN', image: IMGS.ak47_redline },
      { id: 'es5', name: 'Orion', weapon: 'USP-S', rarity: 'mythical', price: 1450, wear: 'FN', image: IMGS.usp_orion },
      { id: 'es6', name: 'See Ya Later', weapon: 'P250', rarity: 'rare', price: 690, wear: 'FN', image: IMGS.p250_see_ya_later },
      { id: 'es7', name: 'Wild Lily', weapon: 'MP9', rarity: 'uncommon', price: 145, wear: 'FT', image: IMGS.mp9_wild },
      { id: 'es8', name: 'Malachite', weapon: 'MAC-10', rarity: 'uncommon', price: 68, wear: 'FT', image: IMGS.mac10_malachite },
    ],
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
  if (price >= 1000000) return `${(price / 1000).toFixed(0)} 000 ₽`;
  if (price >= 1000) return `${price.toLocaleString('ru-RU')} ₽`;
  return `${price} ₽`;
}

export function getAllSkins(): Skin[] {
  return ALL_CASES.flatMap(c => c.skins).sort((a, b) => a.price - b.price);
}
