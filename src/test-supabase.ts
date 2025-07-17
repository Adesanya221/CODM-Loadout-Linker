import { supabase } from './lib/supabase';

async function testSupabaseConnection() {
  try {
    console.log('Testing Supabase connection...');
    
    // Test basic connection by trying to query the loadouts table
    const { data, error } = await supabase
      .from('loadouts')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Supabase connection failed:', error);
      return false;
    }
    
    console.log('✅ Supabase connection successful!');
    console.log('✅ Database table accessible');
    return true;
  } catch (error) {
    console.error('❌ Error testing Supabase:', error);
    return false;
  }
}

// Run the test
testSupabaseConnection(); 