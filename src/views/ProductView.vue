<script setup>
import { computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import { invitations } from '@/data/invitations'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const router = useRouter()
const TELEGRAM_USERNAME = 'Ft_Cards_Fergana'

const invitation = computed(() => invitations.find((item) => item.id === Number(props.id)))

const formatPrice = (price) => `${new Intl.NumberFormat('uz-UZ').format(price)} so'm`
const telegramUrl = computed(() => {
  if (!invitation.value) return '#'

  const orderText = encodeURIComponent(
    `Salom! Men ${invitation.value.name} taklifnomasini olmoqchiman.`,
  )

  return `https://t.me/${TELEGRAM_USERNAME}?text=${orderText}`
})
</script>

<template>
  <main class="min-h-screen bg-white text-gray-900">
    <section v-if="invitation" class="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-16">
      <button
        type="button"
        class="mb-8 text-xs font-semibold uppercase tracking-widest text-gray-400 transition hover:text-gray-900"
        @click="router.back()"
      >
        &lt; Orqaga
      </button>

      <div class="grid gap-8 md:grid-cols-[minmax(0,420px)_1fr] md:items-start">
        <div class="overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
          <img
            :src="invitation.image"
            :alt="`${invitation.name} taklifnomasi`"
            class="aspect-[3/4] w-full object-cover"
          />
        </div>

        <div class="md:pt-6">
          <p class="text-xs font-semibold uppercase tracking-widest text-gray-300">
            {{ invitation.category }}
          </p>
          <div class="mt-3 flex flex-wrap items-center gap-3">
            <h1 class="font-serif text-4xl font-medium text-gray-900">
              {{ invitation.name }}
            </h1>
            <span
              v-if="invitation.badge"
              class="bg-black px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-white"
            >
              Mashhur
            </span>
          </div>

          <p class="mt-4 text-sm text-gray-400">
            {{ formatPrice(invitation.price) }}
          </p>

          <p class="mt-6 max-w-xl text-sm leading-7 text-gray-400">
            Ushbu raqamli taklifnoma to'y marosimingiz uchun zamonaviy va nafis ko'rinish beradi.
            Buyurtma berish uchun Telegram orqali yozing.
          </p>

          <a
            :href="telegramUrl"
            target="_blank"
            rel="noreferrer"
            class="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#229ed9] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#168ac0] focus:outline-none focus:ring-2 focus:ring-[#229ed9] focus:ring-offset-2 sm:w-auto sm:min-w-72"
          >
            Telegram orqali sotib olish
          </a>
        </div>
      </div>
    </section>

    <section v-else class="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8">
      <p class="text-xs font-semibold uppercase tracking-widest text-gray-400">
        Taklifnoma topilmadi
      </p>
      <h1 class="mt-4 font-serif text-4xl font-medium text-gray-900">
        Bunday mahsulot mavjud emas
      </h1>
      <RouterLink
        to="/"
        class="mt-8 inline-flex rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-black"
      >
        Katalogga qaytish
      </RouterLink>
    </section>
  </main>
</template>
