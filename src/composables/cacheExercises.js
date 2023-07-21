import { onMounted } from 'vue'
import { getCollection } from '@/composables/getCollection'

const cacheExercises = (cacheKey, dataExercises, loading) => {
  onMounted(async () => {
    const cachedData = sessionStorage.getItem(cacheKey)

    if (cachedData && JSON.parse(cachedData).length !== 0) {
      dataExercises.value = JSON.parse(cachedData)
    } else {
      await getAndCacheCollection()
    }
  })

  const getAndCacheCollection = async () => {
    await getCollection('exercises', '*', loading, dataExercises)
    sessionStorage.setItem(cacheKey, JSON.stringify(dataExercises.value))
  }
}

export { cacheExercises }
