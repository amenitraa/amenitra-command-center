// Universal storage: works in Claude artifacts, localStorage, or Supabase
const _hasClaudeStorage = (typeof window !== 'undefined' && window.storage && typeof window.storage.get === 'function');

export const DB = {
  async get(k) {
    try {
      if (_hasClaudeStorage) {
        const r = await window.storage.get(k);
        return r ? JSON.parse(r.value) : null;
      }
      const s = localStorage.getItem(k);
      return s ? JSON.parse(s) : null;
    } catch { return null; }
  },
  async set(k, v) {
    try {
      if (_hasClaudeStorage) {
        await window.storage.set(k, JSON.stringify(v));
      } else {
        localStorage.setItem(k, JSON.stringify(v));
      }
    } catch(e) { console.error(e); }
  }
};
