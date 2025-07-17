import { createClient } from '@supabase/supabase-js';
import { SUPABASE_CONFIG } from '@/config/supabase';

const supabaseUrl = 'https://svgpjurodurenxzbqkox.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2Z3BqdXJvZHVyZW54emJxa294Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMjI1NTIsImV4cCI6MjA2Nzg5ODU1Mn0.pgvoUqkmrNtidXsFK6UlEBzBHGHAATz0HJrcAeNWE_U'; // Replace with your actual anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our loadout data
export interface LoadoutData {
  title: string;
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
  created_at: string;
  updated_at: string;
}



