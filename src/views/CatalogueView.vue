<script setup>
import { computed, onMounted, ref } from 'vue'

import { useInvitationsStore } from '@/stores/invitations'
import InvitationCard from '@/components/InvitationCard.vue'

const store = useInvitationsStore()
const activeCategory = ref('all')

const filteredInvitations = computed(() => {
  if (activeCategory.value === 'all') return store.invitations

  return store.invitations.filter((invitation) => invitation.category === activeCategory.value)
})

onMounted(() => store.load())
</script>

<template>
  <main class="min-h-screen bg-[#faf7f2] text-[#1f6f5f]">
    <section class="mx-auto max-w-6xl px-5 pb-10 pt-12 text-center sm:px-8 sm:pt-12">
      <p class="text-xs font-semibold uppercase tracking-[0.25em] text-[#2fa084]">
        Taklifnomalar katalogi
      </p>
      <h1 class="mt-3 text-6xl font-bold tracking-tight text-[#111] sm:text-7xl">FT CARDS</h1>
      <p class="mx-auto mt-4 max-w-xs text-sm text-[#111]/50">
        "Taklifnoma - baxtingizning ilk va eng go'zal muhridir."
      </p>
    </section>

    <section class="mx-auto max-w-6xl px-5 pb-12 sm:px-8">
      <div
        class="sticky top-0 z-20 -mx-5 mb-8 overflow-x-auto bg-[#faf7f2]/95 px-5 py-3 backdrop-blur-sm [scrollbar-width:none] sm:-mx-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
      >
        <div class="flex w-max min-w-full gap-3 sm:justify-center">
          <template v-if="store.isLoading">
            <div
              v-for="i in 5"
              :key="i"
              class="h-4 w-20 shrink-0 animate-pulse rounded bg-stone-300"
            />
          </template>
          <template v-else>
            <button
              v-for="category in store.categories"
              :key="category.value"
              type="button"
              class="shrink-0 border-b-2 px-3 pb-2 pt-1 text-sm font-semibold transition focus:outline-none"
              :class="
                activeCategory === category.value
                  ? 'border-[#2fa084] text-[#1f6f5f]'
                  : 'border-transparent text-[#1f6f5f] hover:text-[#1f6f5f]'
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
          <div class="aspect-[3/4] w-full bg-stone-200" />
          <div class="px-4 py-3">
            <div class="h-3 w-16 rounded bg-stone-200" />
            <div class="mt-2 h-5 w-36 rounded bg-stone-200" />
            <div class="mt-1 h-4 w-24 rounded bg-stone-200" />
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
