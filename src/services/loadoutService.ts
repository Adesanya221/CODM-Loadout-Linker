import { supabase, LoadoutData, LoadoutRecord } from '@/lib/supabase';
import VantaBackground from '../Backgrounds/VantaBackground';

export class LoadoutService {
  // Create a new loadout and return the shareable ID
  static async createLoadout(loadoutData: LoadoutData): Promise<string> {
    const { data, error } = await supabase
      .from('loadouts')
      .insert({ data: loadoutData })
      .select('id')
      .single();
    if (error) throw error;
    return data.id;
  }

  // Fetch a loadout by ID
  static async getLoadout(id: string): Promise<LoadoutRecord | null> {
    try {
      const { data, error } = await supabase
        .from('loadouts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No rows returned
          return null;
        }
        console.error('Error fetching loadout:', error);
        throw new Error('Failed to fetch loadout');
      }

      return data as LoadoutRecord;
    } catch (error) {
      console.error('Error in getLoadout:', error);
      throw error;
    }
  }

  // Get all loadouts (for future use - user's loadouts)
  static async getUserLoadouts(): Promise<LoadoutRecord[]> {
    try {
      const { data, error } = await supabase
        .from('loadouts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user loadouts:', error);
        throw new Error('Failed to fetch loadouts');
      }

      return data as LoadoutRecord[];
    } catch (error) {
      console.error('Error in getUserLoadouts:', error);
      throw error;
    }
  }

  // Generate shareable URL for a loadout
  static generateShareableUrl(loadoutId: string): string {
    const baseUrl = window.location.origin;
    return `${baseUrl}/loadout/${loadoutId}`;
  }

  // Copy shareable URL to clipboard
  static async copyShareableUrl(loadoutId: string): Promise<void> {
    const url = this.generateShareableUrl(loadoutId);
    
    try {
      await navigator.clipboard.writeText(url);
    } catch (error) {
      console.error('Failed to copy URL:', error);
      throw new Error('Failed to copy URL to clipboard');
    }
  }
} 