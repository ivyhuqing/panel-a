// /lib/api.ts
import { supabase } from './supabaseClient';

export async function updateUploadField(id: string, field: string, value: any) {
  const { error } = await supabase
    .from('supplier_assets')
    .update({ [field]: value })
    .eq('id', id);

  if (error) {
    console.error(`Failed to update ${field} for ID ${id}:`, error.message);
  }
}
