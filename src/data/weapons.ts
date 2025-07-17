import { Weapon } from '@/types/loadout';

// Define weapon categories with their sub-divisions
export const weaponCategories = [
  {
    id: 'assault',
    name: 'Assault Rifles',
    icon: 'assault',
    subDivisions: [
      {
        id: 'ar_automatic',
        name: 'Full-Auto ARs',
        weapons: ['ak47', 'ak117', 'type25', 'manowar', 'asval', 'cr56amax', 'm13', 'kilo141', 'oden', 'krig6', 'type19', 'vargo52', 'xm4', 'maddox', 'hvk30', 'kn44', 'hbra3', 'icr1', 'bk57', 'lk24', 'asm10']
      },
      {
        id: 'ar_burst',
        name: 'Burst ARs',
        weapons: ['m16', 'swordfish', 'fr556', 'ffar', 'an94']
      },
      {
        id: 'ar_semi',
        name: 'Semi-Auto ARs',
        weapons: ['fal', 'scarh', 'akbp', 'drh', 'f2000', 'em2', 'peacekeeper']
      }
    ]
  },
  {
    id: 'smg',
    name: 'SMGs',
    icon: 'smg',
    subDivisions: [
      {
        id: 'smg_light',
        name: 'Light SMGs',
        weapons: ['mp5', 'mp7', 'qq9', 'qxr', 'msmc', 'pharo', 'chicom', 'mx9', 'mac10', 'ksp45', 'lapa', 'uzi', 'tec9', 'switchblade', 'vmp']
      },
      {
        id: 'smg_heavy',
        name: 'Heavy SMGs',
        weapons: ['bizon', 'cordite', 'gks', 'hg40', 'iso', 'kiparis', 'pdw57', 'razorback', 'ak74u', 'aug', 'ppsh41', 'p90', 'striker45', 'scorpion']
      }
    ]
  },
  {
    id: 'sniper',
    name: 'Snipers',
    icon: 'sniper',
    subDivisions: [
      {
        id: 'sniper_bolt',
        name: 'Bolt-Action',
        weapons: ['dlq33', 'locus', 'outlaw', 'kilo_bolt', 'spr208', 'zrg20mm', 'rytec', 'hdr', 'tundra', 'koshka']
      },
      {
        id: 'sniper_semi',
        name: 'Semi-Auto',
        weapons: ['xpr50', 'svd', 'na45']
      }
    ]
  },
  {
    id: 'lmg',
    name: 'LMGs',
    icon: 'lmg',
    subDivisions: [
      {
        id: 'lmg_light',
        name: 'Light LMGs',
        weapons: ['m4lmg', 'ul736', 'hades', 'holger26']
      },
      {
        id: 'lmg_heavy',
        name: 'Heavy LMGs',
        weapons: ['rpd', 's36', 'chopper', 'raal', 'mg42', 'bruen', 'pkm']
      }
    ]
  },
  {
    id: 'shotgun',
    name: 'Shotguns',
    icon: 'shotgun',
    subDivisions: [
      {
        id: 'shotgun_pump',
        name: 'Pump-Action',
        weapons: ['by15', 'hs0405', 'krm262', 'model1887', 'r90', 'w1200']
      },
      {
        id: 'shotgun_semi',
        name: 'Semi-Auto',
        weapons: ['aa12', 'hs2126', 'm1216', 'origin12', 'striker', 'vlk', 'argus']
      }
    ]
  },
  {
    id: 'marksman',
    name: 'Marksman',
    icon: 'marksman',
    subDivisions: [
      {
        id: 'marksman_bolt',
        name: 'Bolt-Action',
        weapons: []
      },
      {
        id: 'marksman_semi',
        name: 'Semi-Auto',
        weapons: []
      }
    ]
  }
];

export const weapons: Weapon[] = [
  // Assault Rifles
  {
    id: 'ak47',
    name: 'AK‑47',
    category: 'assault',
    attachments: []
  },
  {
    id: 'ak117',
    name: 'AK‑117',
    category: 'assault',
    attachments: []
  },
  {
    id: 'akbp',
    name: 'AKBP',
    category: 'assault',
    attachments: []
  },
  {
    id: 'an94',
    name: 'AN‑94',
    category: 'assault',
    attachments: []
  },
  {
    id: 'asval',
    name: 'AS VAL',
    category: 'assault',
    attachments: []
  },
  {
    id: 'cr56amax',
    name: 'CR‑56 AMAX',
    category: 'assault',
    attachments: []
  },
  {
    id: 'em2',
    name: 'EM2',
    category: 'assault',
    attachments: []
  },
  {
    id: 'f2000',
    name: 'F2000',
    category: 'assault',
    attachments: []
  },
  {
    id: 'fal',
    name: 'FAL',
    category: 'assault',
    attachments: []
  },
  {
    id: 'famas',
    name: 'FAMAS',
    category: 'assault',
    attachments: []
  },
  {
    id: 'ffar',
    name: 'FFAR',
    category: 'assault',
    attachments: []
  },
  {
    id: 'scarh',
    name: 'SCAR‑H',
    category: 'assault',
    attachments: []
  },
  {
    id: 'swordfish',
    name: 'Swordfish',
    category: 'assault',
    attachments: []
  },
  {
    id: 'type19',
    name: 'Type 19',
    category: 'assault',
    attachments: []
  },
  {
    id: 'type25',
    name: 'Type 25',
    category: 'assault',
    attachments: []
  },
  {
    id: 'vargo52',
    name: 'Vargo 52',
    category: 'assault',
    attachments: []
  },
  {
    id: 'xm4',
    name: 'XM4',
    category: 'assault',
    attachments: []
  },
  {
    id: 'kilo141',
    name: 'Kilo 141',
    category: 'assault',
    attachments: []
  },
  {
    id: 'oden',
    name: 'Oden',
    category: 'assault',
    attachments: []
  },
  {
    id: 'm13',
    name: 'M13',
    category: 'assault',
    attachments: []
  },
  {
    id: 'maddox',
    name: 'Maddox',
    category: 'assault',
    attachments: []
  },
  {
    id: 'krig6',
    name: 'Krig 6',
    category: 'assault',
    attachments: []
  },
  {
    id: 'peacekeeper',
    name: 'Peacekeeper MK2',
    category: 'assault',
    attachments: []
  },
  {
    id: 'fr556',
    name: 'FR.556',
    category: 'assault',
    attachments: []
  },
  {
    id: 'hvk30',
    name: 'HVK‑30',
    category: 'assault',
    attachments: []
  },
  {
    id: 'drh',
    name: 'DR‑H',
    category: 'assault',
    attachments: []
  },
  {
    id: 'kn44',
    name: 'KN‑44',
    category: 'assault',
    attachments: []
  },
  {
    id: 'hbra3',
    name: 'HBRa3',
    category: 'assault',
    attachments: []
  },
  {
    id: 'icr1',
    name: 'ICR‑1',
    category: 'assault',
    attachments: []
  },
  {
    id: 'manowar',
    name: 'Man‑O‑War',
    category: 'assault',
    attachments: []
  },
  {
    id: 'bk57',
    name: 'BK57',
    category: 'assault',
    attachments: []
  },
  {
    id: 'lk24',
    name: 'LK24',
    category: 'assault',
    attachments: []
  },
  {
    id: 'asm10',
    name: 'ASM10',
    category: 'assault',
    attachments: []
  },
  {
    id: 'm16',
    name: 'M16',
    category: 'assault',
    attachments: []
  },
  
  // SMGs
  {
    id: 'ak74u',
    name: 'AK‑74u',
    category: 'smg',
    attachments: []
  },
  {
    id: 'aug',
    name: 'AUG',
    category: 'smg',
    attachments: []
  },
  {
    id: 'bizon',
    name: 'Bizon',
    category: 'smg',
    attachments: []
  },
  {
    id: 'chicom',
    name: 'Chicom CQB',
    category: 'smg',
    attachments: []
  },
  {
    id: 'cordite',
    name: 'Cordite',
    category: 'smg',
    attachments: []
  },
  {
    id: 'gks',
    name: 'GKS',
    category: 'smg',
    attachments: []
  },
  {
    id: 'hg40',
    name: 'HG‑40',
    category: 'smg',
    attachments: []
  },
  {
    id: 'iso',
    name: 'ISO',
    category: 'smg',
    attachments: []
  },
  {
    id: 'kiparis',
    name: 'Kiparis',
    category: 'smg',
    attachments: []
  },
  {
    id: 'ksp45',
    name: 'KSP‑45',
    category: 'smg',
    attachments: []
  },
  {
    id: 'lapa',
    name: 'LAPA',
    category: 'smg',
    attachments: []
  },
  {
    id: 'mac10',
    name: 'MAC‑10',
    category: 'smg',
    attachments: []
  },
  {
    id: 'mp5',
    name: 'MP5',
    category: 'smg',
    attachments: []
  },
  {
    id: 'mp7',
    name: 'MP7',
    category: 'smg',
    attachments: []
  },
  {
    id: 'msmc',
    name: 'MSMC',
    category: 'smg',
    attachments: []
  },
  {
    id: 'mx9',
    name: 'MX9',
    category: 'smg',
    attachments: []
  },
  {
    id: 'p90',
    name: 'P90',
    category: 'smg',
    attachments: []
  },
  {
    id: 'pdw57',
    name: 'PDW‑57',
    category: 'smg',
    attachments: []
  },
  {
    id: 'pharo',
    name: 'Pharo',
    category: 'smg',
    attachments: []
  },
  {
    id: 'ppsh41',
    name: 'PPSh‑41',
    category: 'smg',
    attachments: []
  },
  {
    id: 'qq9',
    name: 'QQ9',
    category: 'smg',
    attachments: []
  },
  {
    id: 'qxr',
    name: 'QXR',
    category: 'smg',
    attachments: []
  },
  {
    id: 'razorback',
    name: 'Razorback',
    category: 'smg',
    attachments: []
  },
  {
    id: 'scorpion',
    name: 'Skorpion EVO',
    category: 'smg',
    attachments: []
  },
  {
    id: 'striker45',
    name: 'Striker 45',
    category: 'smg',
    attachments: []
  },
  {
    id: 'switchblade',
    name: 'Switchblade X9',
    category: 'smg',
    attachments: []
  },
  {
    id: 'tec9',
    name: 'TEC‑9',
    category: 'smg',
    attachments: []
  },
  {
    id: 'uzi',
    name: 'Uzi',
    category: 'smg',
    attachments: []
  },
  {
    id: 'vmp',
    name: 'VMP',
    category: 'smg',
    attachments: []
  },
  {
    id: 'uss9',
    name: 'USS‑9',
    category: 'smg',
    attachments: []
  },
  {
    id: 'cx9',
    name: 'CX9',
    category: 'smg',
    attachments: []
  },
  {
    id: 'fennec',
    name: 'Fennec',
    category: 'smg',
    attachments: []
  },
  
  // LMGs
  {
    id: 'm4lmg',
    name: 'M4LMG',
    category: 'lmg',
    attachments: []
  },
  {
    id: 'rpd',
    name: 'RPD',
    category: 'lmg',
    attachments: []
  },
  {
    id: 'ul736',
    name: 'UL736',
    category: 'lmg',
    attachments: []
  },
  {
    id: 's36',
    name: 'S36',
    category: 'lmg',
    attachments: []
  },
  {
    id: 'chopper',
    name: 'Chopper',
    category: 'lmg',
    attachments: []
  },
  {
    id: 'hades',
    name: 'Hades',
    category: 'lmg',
    attachments: []
  },
  {
    id: 'raal',
    name: 'RAAL MG',
    category: 'lmg',
    attachments: []
  },
  {
    id: 'mg42',
    name: 'MG42',
    category: 'lmg',
    attachments: []
  },
  {
    id: 'bruen',
    name: 'Bruen MK9',
    category: 'lmg',
    attachments: []
  },
  {
    id: 'pkm',
    name: 'PKM',
    category: 'lmg',
    attachments: []
  },
  {
    id: 'holger26',
    name: 'Holger 26',
    category: 'lmg',
    attachments: []
  },
  
  // Sniper Rifles
  {
    id: 'tundra',
    name: 'LW3‑Tundra',
    category: 'sniper',
    attachments: []
  },
  {
    id: 'zrg20mm',
    name: 'ZRG 20mm',
    category: 'sniper',
    attachments: []
  },
  {
    id: 'hdr',
    name: 'HDR',
    category: 'sniper',
    attachments: []
  },
  {
    id: 'koshka',
    name: 'Koshka',
    category: 'sniper',
    attachments: []
  },
  {
    id: 'svd',
    name: 'SVD',
    category: 'sniper',
    attachments: []
  },
  {
    id: 'rytec',
    name: 'Rytec AMR',
    category: 'sniper',
    attachments: []
  },
  {
    id: 'spr208',
    name: 'SP‑R 208',
    category: 'sniper',
    attachments: []
  },
  {
    id: 'na45',
    name: 'NA‑45',
    category: 'sniper',
    attachments: []
  },
  {
    id: 'kilo_bolt',
    name: 'Kilo Bolt‑Action',
    category: 'sniper',
    attachments: []
  },
  {
    id: 'outlaw',
    name: 'Outlaw',
    category: 'sniper',
    attachments: []
  },
  {
    id: 'locus',
    name: 'Locus',
    category: 'sniper',
    attachments: []
  },
  {
    id: 'dlq33',
    name: 'DL Q33',
    category: 'sniper',
    attachments: []
  },
  {
    id: 'xpr50',
    name: 'XPR‑50',
    category: 'sniper',
    attachments: []
  },
  
  // Shotguns
  {
    id: 'aa12',
    name: 'AA‑12',
    category: 'shotgun',
    attachments: []
  },
  {
    id: 'argus',
    name: 'Argus',
    category: 'shotgun',
    attachments: []
  },
  {
    id: 'by15',
    name: 'BY15',
    category: 'shotgun',
    attachments: []
  },
  {
    id: 'hs0405',
    name: 'HS0405',
    category: 'shotgun',
    attachments: []
  },
  {
    id: 'hs2126',
    name: 'HS2126',
    category: 'shotgun',
    attachments: []
  },
  {
    id: 'krm262',
    name: 'KRM‑262',
    category: 'shotgun',
    attachments: []
  },
  {
    id: 'm1216',
    name: 'M1216',
    category: 'shotgun',
    attachments: []
  },
  {
    id: 'model1887',
    name: 'Model 1887',
    category: 'shotgun',
    attachments: []
  },
  {
    id: 'origin12',
    name: 'Origin 12',
    category: 'shotgun',
    attachments: []
  },
  {
    id: 'r90',
    name: 'R9‑0 Shotgun',
    category: 'shotgun',
    attachments: []
  },
  {
    id: 'striker',
    name: 'Striker',
    category: 'shotgun',
    attachments: []
  },
  {
    id: 'vlk',
    name: 'VLK Rogue',
    category: 'shotgun',
    attachments: []
  },
  {
    id: 'w1200',
    name: 'W1200',
    category: 'shotgun',
    attachments: []
  }
];

// Helper function to get weapon by ID
export function getWeaponById(id: string): Weapon | undefined {
  return weapons.find(weapon => weapon.id === id);
}

// Helper function to get weapons by subdivision
export function getWeaponsBySubdivision(categoryId: string, subdivisionId: string): Weapon[] {
  const category = weaponCategories.find(cat => cat.id === categoryId);
  if (!category) return [];
  
  const subdivision = category.subDivisions.find(sub => sub.id === subdivisionId);
  if (!subdivision) return [];
  
  return subdivision.weapons
    .map(weaponId => getWeaponById(weaponId))
    .filter((weapon): weapon is Weapon => weapon !== undefined);
}

// Organize attachments by categories
export const attachmentCategories = [
  {
    id: 'optics',
    name: 'Optics',
    attachments: [
      'Red Dot Sight',
      'Holographic Sight',
      'Tactical Scope',
      'ACOG Scope',
      '3X Tactical Scope',
      '4X Tactical Scope',
      'Classic Red Dot',
      'OWC Ranger',
      'Classic Holographic',
      'RTC 2.0 Holographic'
    ]
  },
  {
    id: 'muzzles',
    name: 'Muzzles',
    attachments: [
      'Suppressor',
      'Tactical Suppressor',
      'Monolithic Suppressor',
      'OWC Light Suppressor',
      'RTC Light Muzzle Brake',
      'MIP Light Flash Guard',
      'Compensator',
      'Muzzle Brake'
    ]
  },
  {
    id: 'barrels',
    name: 'Barrels',
    attachments: [
      'OWC Ranger Barrel',
      'MIP Extended Light Barrel',
      'YKM Integral Suppressor',
      'MIP Light Barrel (Short)',
      'OWC Marksman'
    ]
  },
  {
    id: 'underbarrels',
    name: 'Underbarrels',
    attachments: [
      'Foregrip',
      'Ranger Foregrip',
      'Operator Foregrip',
      'Tactical Foregrip A',
      'Strike Foregrip',
      'Merc Foregrip',
      'Bipod'
    ]
  },
  {
    id: 'ammunition',
    name: 'Ammunition',
    attachments: [
      'Extended Mag',
      'Fast Mag',
      'Extended Mag A',
      'Large Extended Mag B',
      '5.56 NATO 30-Round Mag',
      '7.62 NATO 25-Round Mag',
      'OWC 5.56 NATO 30-Round Mag'
    ]
  },
  {
    id: 'reargrip',
    name: 'Rear Grip',
    attachments: [
      'Granulated Grip Tape',
      'Rubberized Grip Tape',
      'Stippled Grip Tape'
    ]
  },
  {
    id: 'stocks',
    name: 'Stocks',
    attachments: [
      'Stock',
      'No Stock',
      'YKM Combat Stock',
      'YKM Light Stock',
      'RTC Steady Stock',
      'MIP Strike Stock'
    ]
  },
  {
    id: 'lasers',
    name: 'Lasers',
    attachments: [
      'Tactical Laser',
      'OWC Laser - Tactical',
      'MIP Laser 5mW',
      'RTC Laser 1mW'
    ]
  },
  {
    id: 'perks',
    name: 'Perks',
    attachments: [
      'FMJ',
      'High Caliber',
      'Sleight of Hand',
      'Wounding',
      'Full Ammo',
      'Disable',
      'Enhanced Bolt'
    ]
  }
];

// Flat list of all attachments for backward compatibility
export const attachments = attachmentCategories.flatMap(category => category.attachments);
