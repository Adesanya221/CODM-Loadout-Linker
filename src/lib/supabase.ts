import { createClient } from '@supabase/supabase-js';
import { SUPABASE_CONFIG } from '@/config/supabase';

export const supabase = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);

// Types for our loadout data
export interface LoadoutData {
  title: string;
  user_id?: string;
  weapon: {
    id: string;
    name: string;
    category: string;
    attachments: string[];
  };
  perks: {
    red?: {
      id: string;
      name: string;
      category: string;
      icon: string;
    };
    green?: {
      id: string;
      name: string;
      category: string;
      icon: string;
    };
    blue?: {
      id: string;
      name: string;
      category: string;
      icon: string;
    };
  };
  scorestreaks: Array<{
    id: string;
    name: string;
    cost: number;
    icon: string;
  }>;
  createdAt?: string;
}

export interface LoadoutRecord {
  id: string;
  data: LoadoutData;
  user_id: string;
  created_at: string;
  updated_at: string;
}



