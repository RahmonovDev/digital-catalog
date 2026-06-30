<script setup>
import { computed, onMounted, ref } from 'vue'

import { useInvitationsStore } from '@/stores/invitations'
import InvitationCard from '@/components/InvitationCard.vue'

const profileImage = '/profile.jpg'
const store = useInvitationsStore()
const activeCategory = ref('all')

const filteredInvitations = computed(() => {
  if (activeCategory.value === 'all') return store.invitations

  return store.invitations.filter((invitation) => invitation.category === activeCategory.value)
})

onMounted(() => store.load())
</script>

<template>
  <main class="min-h-screen bg-[#eeeeee] text-[#1f6f5f]">
    <section class="mx-auto max-w-6xl px-5 pb-8 pt-14 text-center sm:px-8 sm:pt-10">
      <p class="text-sm font-semibold uppercase tracking-[0.18em] text-[#111]">
        Taklifnomalar katalogi
      </p>
      <img
        :src="profileImage"
        alt="FT Cards profil rasmi"
        class="mx-auto mt-4 h-24 w-24 rounded-full border-4 border-white object-cover shadow-md sm:h-28 sm:w-28"
      />
      <h1 class="mt-4 text-4xl font-bold sm:text-5xl">FT CARDS</h1>
      <p class="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#111]/80 sm:text-lg">
        "Taklifnoma - baxtingizning ilk va eng go'zal muhridir."
      </p>
    </section>

    <section class="mx-auto max-w-6xl px-5 pb-12 sm:px-8">
      <div
        class="sticky top-0 z-20 -mx-5 mb-8 overflow-x-auto bg-[#eeeeee]/95 px-5 py-3 backdrop-blur-sm [scrollbar-width:none] sm:-mx-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
      >
        <div class="flex w-max min-w-full gap-3 sm:justify-center">
          <template v-if="store.isLoading">
            <div
              v-for="i in 5"
              :key="i"
              class="h-10 w-24 shrink-0 animate-pulse rounded-full bg-gray-300"
            />
          </template>
          <template v-else>
            <button
              v-for="category in store.categories"
              :key="category.value"
              type="button"
              class="shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#2fa084] focus:ring-offset-2"
              :class="
                activeCategory === category.value
                  ? 'border-[#2fa084] bg-[#2fa084] text-white shadow-sm'
                  : 'border-[#6fcf97] bg-white/70 text-[#1f6f5f] hover:border-[#2fa084] hover:bg-white'
              "
              @click="activeCategory = category.value"
            >
              {{ category.label }}
            </button>
          </template>
        </div>
      </div>

      <div
        v-if="store.isLoading"
        class="mx-auto grid w-full grid-cols-1 justify-center justify-items-center gap-x-14 gap-y-12 sm:w-fit sm:grid-cols-2 lg:grid-cols-3"
      >
        <div
          v-for="i in 6"
          :key="i"
          class="w-full max-w-sm animate-pulse overflow-hidden rounded-xl bg-white shadow-md sm:max-w-72"
        >
          <div class="h-60 bg-gray-200 sm:h-56" />
          <div class="px-4 py-3">
            <div class="h-3 w-16 rounded bg-gray-200" />
            <div class="mt-2 h-5 w-36 rounded bg-gray-200" />
            <div class="my-2 h-5 w-24 rounded bg-gray-200" />
            <div class="mt-3 h-10 w-full rounded-full bg-gray-200" />
          </div>
        </div>
      </div>

      <div
        v-else-if="store.errorMessage"
        class="rounded-lg border border-[#6fcf97] bg-white/70 p-8 text-center text-[#1f6f5f]/80"
      >
        {{ store.errorMessage }}
      </div>

      <div
        v-else-if="filteredInvitations.length"
        class="mx-auto grid w-full grid-cols-1 justify-center justify-items-center gap-x-14 gap-y-12 sm:w-fit sm:grid-cols-2 lg:grid-cols-3"
      >
        <InvitationCard
          v-for="invitation in filteredInvitations"
          :key="invitation.id"
          :invitation="invitation"
        />
      </div>

      <div
        v-else
        class="rounded-lg border border-[#6fcf97] bg-white/70 p-8 text-center text-[#1f6f5f]/80"
      >
        Bu kategoriya uchun taklifnomalar hozircha mavjud emas.
      </div>
    </section>
  </main>
</template>
