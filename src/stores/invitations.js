import { defineStore } from 'pinia'
import { ref } from 'vue'

import { fetchCategories, fetchInvitations } from '@/api/invitations'

export const useInvitationsStore = defineStore('invitations', () => {
  const invitations = ref([])
  const categories = ref([{ label: 'Hammasi', value: 'all' }])
  const isLoading = ref(false)
  const errorMessage = ref('')
  const loaded = ref(false)

  async function load() {
    if (loaded.value) return

    isLoading.value = true
    try {
      const [fetchedInvitations, fetchedCategories] = await Promise.all([
        fetchInvitations(),
        fetchCategories(),
      ])
      invitations.value = fetchedInvitations
      categories.value = fetchedCategories
      loaded.value = true
    } catch (error) {
      errorMessage.value = "Taklifnomalarni yuklab bo'lmadi."
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }

  return { invitations, categories, isLoading, errorMessage, load }
})
