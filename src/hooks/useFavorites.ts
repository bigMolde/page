import { useState, useEffect } from 'react';
import { Favorite } from '../types';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('jump_comics_favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('jump_comics_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (type: 'product' | 'work', id: string) => {
    const newFavorite: Favorite = {
      id: Date.now().toString(),
      type,
      [type === 'product' ? 'product_id' : 'work_id']: id,
      created_at: new Date().toISOString()
    };

    setFavorites(prev => [...prev, newFavorite]);
  };

  const removeFromFavorites = (type: 'product' | 'work', id: string) => {
    setFavorites(prev => 
      prev.filter(fav => 
        !(fav.type === type && 
          (type === 'product' ? fav.product_id === id : fav.work_id === id))
      )
    );
  };

  const isFavorite = (type: 'product' | 'work', id: string) => {
    return favorites.some(fav => 
      fav.type === type && 
      (type === 'product' ? fav.product_id === id : fav.work_id === id)
    );
  };

  const getFavoriteProducts = () => {
    return favorites.filter(fav => fav.type === 'product');
  };

  const getFavoriteWorks = () => {
    return favorites.filter(fav => fav.type === 'work');
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    getFavoriteProducts,
    getFavoriteWorks,
  };
};