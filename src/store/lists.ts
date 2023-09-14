import { defineStore } from 'pinia'
import { ref } from 'vue'

import { HTTP } from '@/api/index'
import { City, Country, Product } from '@/types'

export const useListsStore = defineStore('lists', () => {
  const cities = ref<City[]>([])
  const countries = ref<Country[]>([])
  const products = ref<Product[]>([])

  const populateLists = async () => {
    Promise.all([
      (products.value = await HTTP.get('/api/v1/products/')),
      (cities.value = await HTTP.get('/api/v1/users/cities/')),
      (countries.value = await HTTP.get('/api/v1/users/countries/')),
    ])
  }

  const getProductById = (id: number) =>
    products.value.find(product => product.id === id)

  return { products, populateLists, cities, countries, getProductById }
})
