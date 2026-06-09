<script setup>
import { computed, ref } from 'vue'

import InvitationCard from '@/components/InvitationCard.vue'
import { invitations } from '@/data/invitations'

const categories = [
  { label: 'Hammasi', value: 'all' },
  { label: 'Klassik', value: 'klassik' },
  { label: 'Zamonaviy', value: 'zamonaviy' },
  { label: 'Tabiat', value: 'tabiat' },
  { label: 'Lux', value: 'lux' },
]

const activeCategory = ref('all')

const filteredInvitations = computed(() => {
  if (activeCategory.value === 'all') return invitations

  return invitations.filter((invitation) => invitation.category === activeCategory.value)
})
</script>

<template>
  <main class="min-h-screen bg-[#f5f0eb] text-[#3c2f2a]">
    <section class="mx-auto max-w-6xl px-5 pb-8 pt-14 text-center sm:px-8 sm:pt-20">
      <p class="text-sm font-semibold uppercase tracking-[0.18em] text-[#8a5a44]">
        To'y taklifnomalari katalogi
      </p>
      <h1 class="mt-4 text-4xl font-bold sm:text-5xl">Taklifnoma Do'koni</h1>
      <p class="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#6f5a51] sm:text-lg">
        Sevimli kuningiz uchun nafis, zamonaviy va esda qolarli raqamli taklifnomalarni tanlang.
      </p>
    </section>

    <section class="mx-auto max-w-6xl px-5 pb-12 sm:px-8">
      <div class="mb-8 flex flex-wrap justify-center gap-3">
        <button
          v-for="category in categories"
          :key="category.value"
          type="button"
          class="rounded-full border px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#8a5a44] focus:ring-offset-2"
          :class="
            activeCategory === category.value
              ? 'border-[#8a5a44] bg-[#8a5a44] text-white shadow-sm'
              : 'border-[#d8c8bb] bg-white/70 text-[#5f4b43] hover:border-[#8a5a44] hover:bg-white'
          "
          @click="activeCategory = category.value"
        >
          {{ category.label }}
        </button>
      </div>

      <div
        v-if="filteredInvitations.length"
        class="mx-auto grid w-fit grid-cols-1 justify-center justify-items-center gap-x-14 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
      >
        <InvitationCard
          v-for="invitation in filteredInvitations"
          :key="invitation.id"
          :invitation="invitation"
        />
      </div>

      <div
        v-else
        class="rounded-lg border border-[#d8c8bb] bg-white/70 p-8 text-center text-[#6f5a51]"
      >
        Bu kategoriya uchun taklifnomalar hozircha mavjud emas.
      </div>
    </section>
  </main>
</template>
