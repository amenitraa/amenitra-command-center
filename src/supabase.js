import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase credentials not found. Using local storage fallback.')
}

export const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey)
  : null

// Database helper that falls back to localStorage if Supabase isn't configured
export const db = {
  async getAll(table) {
    if (supabase) {
      const { data, error } = await supabase.from(table).select('*')
      if (error) { console.error(`Error fetching ${table}:`, error); return null }
      return data
    }
    // Fallback to localStorage
    const stored = localStorage.getItem(`cc-${table}`)
    return stored ? JSON.parse(stored) : null
  },

  async upsert(table, record) {
    if (supabase) {
      const { data, error } = await supabase.from(table).upsert(record, { onConflict: 'id' })
      if (error) console.error(`Error upserting ${table}:`, error)
      return data
    }
    // Fallback
    const stored = JSON.parse(localStorage.getItem(`cc-${table}`) || '[]')
    const idx = stored.findIndex(r => r.id === record.id)
    if (idx >= 0) stored[idx] = { ...stored[idx], ...record }
    else stored.push(record)
    localStorage.setItem(`cc-${table}`, JSON.stringify(stored))
    return record
  },

  async upsertAll(table, records) {
    if (supabase) {
      const { data, error } = await supabase.from(table).upsert(records, { onConflict: 'id' })
      if (error) console.error(`Error bulk upserting ${table}:`, error)
      return data
    }
    localStorage.setItem(`cc-${table}`, JSON.stringify(records))
    return records
  },

  async delete(table, id) {
    if (supabase) {
      const { error } = await supabase.from(table).delete().eq('id', id)
      if (error) console.error(`Error deleting from ${table}:`, error)
    } else {
      const stored = JSON.parse(localStorage.getItem(`cc-${table}`) || '[]')
      localStorage.setItem(`cc-${table}`, JSON.stringify(stored.filter(r => r.id !== id)))
    }
  }
}
