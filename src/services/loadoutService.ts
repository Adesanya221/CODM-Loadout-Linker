import { supabase, LoadoutData, LoadoutRecord } from '@/lib/supabase';

export class LoadoutService {
  // Create a new loadout and return the shareable ID
  static async createLoadout(loadoutData: LoadoutData): Promise<string> {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User must be authenticated to create a loadout');
    
    const { data, error } = await supabase
      .from('loadouts')
      .insert({ 
        data: { ...loadoutData, user_id: user.id },
        user_id: user.id 
      })
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

  // Get user loadouts for the current user
  static async getUserLoadouts(): Promise<LoadoutRecord[]> {
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User must be authenticated to fetch loadouts');
      
      const { data, error } = await supabase
        .from('loadouts')
        .select('*')
        .eq('user_id', user.id)
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
    try {
      const url = new URL(`/loadout/${loadoutId}`, window.location.origin);
      return url.toString();
    } catch (_) {
      // Fallback to simple concatenation if URL construction fails for any reason
      const baseUrl = typeof window !== 'undefined' && window.location ? window.location.origin : '';
      return `${baseUrl}/loadout/${loadoutId}`;
    }
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