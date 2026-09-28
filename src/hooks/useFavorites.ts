'use client';

import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'blender_handbook_favorites';
const EVENT_NAME = 'blender_favorites_changed';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadFavorites = useCallback(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      } else {
        setFavorites([]);
      }
    } catch {
      setFavorites([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    loadFavorites();

    const handleStorageChange = () => {
      loadFavorites();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(EVENT_NAME, handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(EVENT_NAME, handleStorageChange);
    };
  }, [loadFavorites]);

  const toggleFavorite = useCallback(
    (commandId: string) => {
      try {
        const stored = localStorage.getItem(FAVORITES_KEY);
        let list: string[] = stored ? JSON.parse(stored) : [];

        if (list.includes(commandId)) {
          list = list.filter((id) => id !== commandId);
        } else {
          list = [...list, commandId];
        }

        localStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
        setFavorites(list);
        window.dispatchEvent(new Event(EVENT_NAME));
      } catch (err) {
        console.error('Error saving favorite:', err);
      }
    },
    []
  );

  const isFavorite = useCallback(
    (commandId: string) => {
      return favorites.includes(commandId);
    },
    [favorites]
  );

  return { favorites, toggleFavorite, isFavorite, isLoaded };
}
