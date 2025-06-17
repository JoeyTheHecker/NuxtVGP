import { defineStore } from 'pinia'
import type { Rocket } from '@/types/rocket'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: [] as Rocket[]
  }),
  actions: {
    toggleFavorite(rocket: any) {
      const index = this.favorites.findIndex(fav => fav.id === rocket.id)
      if (index > -1) {
        this.favorites.splice(index, 1)
      } else {
        this.favorites.push(rocket)
      }
    },
    isFavorite(id: string) {
      return this.favorites.some(fav => fav.id === id)
    },
    clearFavorites() {
      this.favorites = []
    }
  },
  persist: true
})
