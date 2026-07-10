<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import { useInvitationsStore } from '@/stores/invitations'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const router = useRouter()
const TELEGRAM_USERNAME = 'Ft_Cards_Fergana'
const store = useInvitationsStore()

const invitation = computed(() => store.invitations.find((item) => item.id === Number(props.id)))
const selectedPhotoIndex = ref(0)
const photos = computed(() => {
  if (!invitation.value) return []
  if (Array.isArray(invitation.value.photos) && invitation.value.photos.length) {
    return invitation.value.photos
  }

  return invitation.value.image ? [invitation.value.image] : []
})
const selectedPhoto = computed(() => photos.value[selectedPhotoIndex.value] || '')

watch(
  () => props.id,
  () => {
    selectedPhotoIndex.value = 0
  },
)

const formatPrice = (price) => `${new Intl.NumberFormat('uz-UZ').format(price)} so'm`
const telegramUrl = computed(() => {
  if (!invitation.value) return '#'

  const orderText = encodeURIComponent(
    `Salom! Men shu taklifnomani olmoqchiman.\n${window.location.href}`,
  )

  return `https://t.me/${TELEGRAM_USERNAME}?text=${orderText}`
})

const goBack = () => {
  if (window.history.state?.back) {
    router.back()
  } else {
    router.push('/')
  }
}

onMounted(() => store.load())
</script>

<template>
  <main class="min-h-screen bg-[#faf7f2] text-[#1f6f5f]">
    <section v-if="store.isLoading" class="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-10">
      <div class="mb-8 h-4 w-16 animate-pulse rounded bg-stone-300" />

      <div class="grid gap-8 md:grid-cols-[minmax(0,420px)_1fr] md:items-start">
        <div class="animate-pulse">
          <div class="aspect-[3/4] w-full rounded-lg bg-stone-200" />
          <div class="mt-3 flex gap-2">
            <div v-for="i in 3" :key="i" class="h-20 w-16 shrink-0 rounded-md bg-stone-200" />
          </div>
        </div>

        <div class="animate-pulse space-y-4 md:pt-6">
          <div class="h-3 w-20 rounded bg-stone-200" />
          <div class="h-10 w-52 rounded bg-stone-200" />
          <div class="h-5 w-28 rounded bg-stone-200" />
          <div class="mt-6 space-y-2">
            <div class="h-4 w-full rounded bg-stone-200" />
            <div class="h-4 w-full rounded bg-stone-200" />
            <div class="h-4 w-3/4 rounded bg-stone-200" />
          </div>
          <div class="mt-8 h-12 w-full rounded-full bg-stone-200 sm:w-72" />
        </div>
      </div>
    </section>

    <section
      v-else-if="store.errorMessage"
      class="mx-auto max-w-3xl px-5 py-20 text-center text-[#1f6f5f]/70 sm:px-8"
    >
      {{ store.errorMessage }}
    </section>

    <section v-else-if="invitation" class="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-10">
      <button
        type="button"
        class="mb-8 text-xs font-semibold uppercase tracking-widest text-[#2fa084] transition hover:text-[#1f6f5f]"
        @click="goBack"
      >
        &lt; Orqaga
      </button>

      <div class="grid gap-8 md:grid-cols-[minmax(0,420px)_1fr] md:items-start">
        <div>
          <div class="overflow-hidden rounded-lg border border-[#6fcf97] bg-[#6fcf97]/20">
            <img
              :src="selectedPhoto"
              :alt="`${invitation.name} taklifnomasi`"
              class="aspect-[3/4] w-full object-cover"
            />
          </div>
          <div v-if="photos.length > 1" class="mt-3 flex gap-2 overflow-x-auto">
            <button
              v-for="(photo, index) in photos"
              :key="photo"
              type="button"
              class="h-20 w-16 shrink-0 overflow-hidden rounded-md border bg-[#6fcf97]/20 transition focus:outline-none focus:ring-2 focus:ring-[#2fa084] focus:ring-offset-2"
              :class="selectedPhotoIndex === index ? 'border-[#1f6f5f]' : 'border-[#6fcf97]'"
              @click="selectedPhotoIndex = index"
            >
              <img
                :src="photo"
                :alt="`${invitation.name} rasmi ${index + 1}`"
                class="h-full w-full object-cover"
              />
            </button>
          </div>
        </div>

        <div class="md:pt-6">
          <p class="text-xs font-semibold uppercase tracking-widest text-[#2fa084]">
            {{ invitation.category }}
          </p>
          <div class="mt-3 flex flex-wrap items-center gap-3">
            <h1 class="font-serif text-4xl font-medium text-[#111]">
              {{ invitation.name }}
            </h1>
            <span
              v-if="invitation.badge"
              class="bg-[#1f6f5f] px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-white"
            >
              Mashhur
            </span>
          </div>

          <p class="mt-4 text-sm text-[#111]">
            {{ formatPrice(invitation.price) }}
          </p>

          <a
            :href="telegramUrl"
            target="_blank"
            rel="noreferrer"
            class="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#2fa084] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#1f6f5f] focus:outline-none focus:ring-2 focus:ring-[#2fa084] focus:ring-offset-2 sm:w-auto sm:min-w-72"
          >
            Telegram orqali sotib olish
          </a>

          <p class="mt-6 max-w-xl text-sm leading-7 text-[#1f6f5f]/75">
            {{
              invitation.description ||
              "Ushbu raqamli taklifnoma to'y marosimingiz uchun zamonaviy va nafis ko'rinish beradi. Buyurtma berish uchun Telegram orqali yozing."
            }}
          </p>
        </div>
      </div>
    </section>

    <section v-else class="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8">
      <p class="text-xs font-semibold uppercase tracking-widest text-[#2fa084]">
        Taklifnoma topilmadi
      </p>
      <h1 class="mt-4 font-serif text-4xl font-medium text-[#1f6f5f]">
        Bunday mahsulot mavjud emas
      </h1>
      <RouterLink
        to="/"
        class="mt-8 inline-flex rounded-full bg-[#2fa084] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1f6f5f]"
      >
        Katalogga qaytish
      </RouterLink>
    </section>
  </main>
</template>
