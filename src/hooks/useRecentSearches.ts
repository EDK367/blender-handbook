'use client';

import { useState, useEffect, useCallback } from 'react';

const RECENT_SEARCHES_KEY = 'blender_handbook_recent_searches';
const MAX_SEARCHES = 8;

export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch {
      setRecentSearches([]);
    }
  }, []);

  const addSearch = useCallback((query: string) => {
    const clean = query.trim();
    if (!clean || clean.length < 2) return;

    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      let list: string[] = stored ? JSON.parse(stored) : [];

      list = [clean, ...list.filter((q) => q.toLowerCase() !== clean.toLowerCase())].slice(0, MAX_SEARCHES);

      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(list));
      setRecentSearches(list);
    } catch (err) {
      console.error('Error saving recent search:', err);
    }
  }, []);

  const clearSearches = useCallback(() => {
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
      setRecentSearches([]);
    } catch (err) {
      console.error('Error clearing recent searches:', err);
    }
  }, []);

  return { recentSearches, addSearch, clearSearches };
}
