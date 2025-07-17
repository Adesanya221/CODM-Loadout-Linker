
export interface Weapon {
  id: string;
  name: string;
  category: 'assault' | 'smg' | 'sniper' | 'lmg' | 'shotgun' | 'marksman';
  attachments: string[];
}

export interface Perk {
  id: string;
  name: string;
  category: 'red' | 'green' | 'blue';
  icon: string;
}

export interface Scorestreak {
  id: string;
  name: string;
  cost: number;
}

export interface Loadout {
  id?: string;
  title: string;
  weapon: Weapon;
  perks: {
    red: Perk;
    green: Perk;
    blue: Perk;
  };
  scorestreaks: Scorestreak[];
  createdAt?: string;
}
