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

const highlights = [
  "Matn va sanani sizga mos tarzda o'zgartiramiz",
  'Yuqori sifatli, nafis dizayn',
  'Telegram orqali tez va qulay buyurtma',
]

onMounted(() => store.load())
</script>

<template>
  <main class="min-h-screen bg-[#faf7f2] text-[#1f6f5f]">
    <section v-if="store.isLoading" class="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
      <div class="mb-8 h-4 w-16 animate-pulse rounded bg-stone-300" />

      <div class="grid gap-10 md:grid-cols-[minmax(0,460px)_1fr] md:items-start">
        <div class="animate-pulse">
          <div class="aspect-[3/4] w-full rounded-2xl bg-stone-200" />
          <div class="mt-3 flex gap-2">
            <div v-for="i in 3" :key="i" class="h-20 w-16 shrink-0 rounded-lg bg-stone-200" />
          </div>
        </div>

        <div class="animate-pulse space-y-4 md:pt-4">
          <div class="h-3 w-20 rounded bg-stone-200" />
          <div class="h-10 w-52 rounded bg-stone-200" />
          <div class="h-8 w-36 rounded bg-stone-200" />
          <div class="mt-6 space-y-2">
            <div class="h-4 w-full rounded bg-stone-200" />
            <div class="h-4 w-full rounded bg-stone-200" />
            <div class="h-4 w-3/4 rounded bg-stone-200" />
          </div>
          <div class="mt-8 h-14 w-full rounded-full bg-stone-200 sm:w-80" />
        </div>
      </div>
    </section>

    <section
      v-else-if="store.errorMessage"
      class="mx-auto max-w-3xl px-5 py-24 text-center text-[#1f6f5f]/70 sm:px-8"
    >
      {{ store.errorMessage }}
    </section>

    <section v-else-if="invitation" class="mx-auto max-w-6xl px-5 py-8 pb-32 sm:px-8 sm:py-10 sm:pb-10">
      <button
        type="button"
        class="mb-8 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#2fa084] transition hover:gap-2.5 hover:text-[#1f6f5f]"
        @click="goBack"
      >
        <svg viewBox="0 0 20 20" fill="none" class="h-3.5 w-3.5">
          <path
            d="M12.5 15L7.5 10L12.5 5"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Orqaga
      </button>

      <div class="grid gap-10 md:grid-cols-[minmax(0,460px)_1fr] md:items-start">
        <div>
          <div
            class="group relative overflow-hidden rounded-2xl border border-[#6fcf97]/60 bg-[#6fcf97]/10 shadow-[0_20px_45px_-25px_rgba(31,111,95,0.45)]"
          >
            <img
              :src="selectedPhoto"
              :alt="`${invitation.name} taklifnomasi`"
              class="aspect-[3/4] w-full object-cover transition duration-700 ease-out group-hover:scale-105"
            />
            <span
              v-if="invitation.badge"
              class="absolute left-4 top-4 rounded-full bg-[#1f6f5f] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white shadow-sm"
            >
              Mashhur
            </span>
          </div>
          <div v-if="photos.length > 1" class="mt-4 flex gap-3 overflow-x-auto pb-1">
            <button
              v-for="(photo, index) in photos"
              :key="photo"
              type="button"
              class="h-20 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-[#6fcf97]/20 transition focus:outline-none focus:ring-2 focus:ring-[#2fa084] focus:ring-offset-2"
              :class="
                selectedPhotoIndex === index
                  ? 'border-[#1f6f5f] opacity-100'
                  : 'border-transparent opacity-60 hover:opacity-100'
              "
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

        <div class="md:pt-2">
          <span
            class="inline-flex rounded-full border border-[#2fa084]/40 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#2fa084]"
          >
            {{ invitation.category }}
          </span>

          <h1 class="mt-4 font-serif text-4xl font-medium text-[#111] sm:text-5xl">
            {{ invitation.name }}
          </h1>

          <div class="mt-5 flex items-baseline gap-3">
            <p class="text-3xl font-bold text-[#1f6f5f]">
              {{ formatPrice(invitation.price) }}
            </p>
          </div>

          <div class="mt-3 h-px w-full max-w-xl bg-gradient-to-r from-[#6fcf97]/70 to-transparent" />

          <ul class="mt-6 space-y-3">
            <li
              v-for="highlight in highlights"
              :key="highlight"
              class="flex items-start gap-2.5 text-sm text-[#1f6f5f]/85"
            >
              <svg viewBox="0 0 20 20" fill="none" class="mt-0.5 h-4 w-4 shrink-0 text-[#2fa084]">
                <circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.4" />
                <path
                  d="M6.5 10.2L8.7 12.4L13.5 7.6"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {{ highlight }}
            </li>
          </ul>

          <p class="mt-6 max-w-xl text-sm leading-7 text-[#1f6f5f]/75">
            {{
              invitation.description ||
              "Ushbu raqamli taklifnoma to'y marosimingiz uchun zamonaviy va nafis ko'rinish beradi. Buyurtma berish uchun Telegram orqali yozing."
            }}
          </p>

          <a
            :href="telegramUrl"
            target="_blank"
            rel="noreferrer"
            class="mt-8 hidden w-full items-center justify-center gap-2 rounded-full bg-[#2fa084] px-6 py-3.5 text-center text-sm font-semibold text-white shadow-[0_12px_30px_-12px_rgba(47,160,132,0.7)] transition hover:bg-[#1f6f5f] focus:outline-none focus:ring-2 focus:ring-[#2fa084] focus:ring-offset-2 sm:inline-flex sm:w-auto sm:min-w-80"
          >
            <svg viewBox="0 0 24 24" fill="none" class="h-4 w-4">
              <path
                d="M21 4L2.5 11.5L9 13.5M21 4L18.5 20.5L9 13.5M21 4L9 13.5V19.5L12.2 16.3"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Telegram orqali sotib olish
          </a>
          <p class="mt-3 hidden text-xs text-[#1f6f5f]/60 sm:block">
            Xabar yuborgach, tez orada siz bilan bog'lanamiz.
          </p>
        </div>
      </div>

      <div
        class="fixed inset-x-0 bottom-0 z-30 border-t border-[#6fcf97]/40 bg-[#faf7f2]/95 px-5 py-3 backdrop-blur-sm sm:hidden"
      >
        <a
          :href="telegramUrl"
          target="_blank"
          rel="noreferrer"
          class="flex w-full items-center justify-center gap-2 rounded-full bg-[#2fa084] px-4 py-3 text-center text-sm font-semibold text-white shadow-[0_12px_30px_-12px_rgba(47,160,132,0.7)] transition hover:bg-[#1f6f5f] focus:outline-none focus:ring-2 focus:ring-[#2fa084] focus:ring-offset-2"
        >
          <svg viewBox="0 0 24 24" fill="none" class="h-4 w-4">
            <path
              d="M21 4L2.5 11.5L9 13.5M21 4L18.5 20.5L9 13.5M21 4L9 13.5V19.5L12.2 16.3"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Telegram orqali sotib olish
        </a>
      </div>
    </section>

    <section v-else class="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8">
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
