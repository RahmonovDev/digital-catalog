<script setup>
const props = defineProps({
  invitation: {
    type: Object,
    required: true,
  },
})

const TELEGRAM_USERNAME = 'Ft_Cards_Fergana'

const formatPrice = (price) => `${new Intl.NumberFormat('uz-UZ').format(price)} so'm`
const orderText = encodeURIComponent(
  `Salom! Men ${props.invitation.name} taklifnomasini olmoqchiman.`,
)

const telegramUrl = `https://t.me/${TELEGRAM_USERNAME}?text=${orderText}`
</script>

<template>
  <article
    class="flex h-full w-full max-w-72 flex-col overflow-hidden rounded-xl bg-white shadow-md duration-500 hover:scale-105 hover:shadow-xl"
  >
    <div class="relative h-56 w-full overflow-hidden rounded-t-xl bg-[#eadfd6]">
      <img
        :src="invitation.image"
        :alt="`${invitation.name} taklifnomasi`"
        class="h-full w-full object-cover"
      />
      <span
        v-if="invitation.badge"
        class="absolute left-3 top-3 rounded-full bg-[#8a5a44] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-sm"
      >
        Mashhur
      </span>
    </div>

    <div class="flex flex-1 flex-col px-4 py-2.5">
      <div>
        <span class="mr-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
          {{ invitation.category }}
        </span>
        <h2 class="mt-1 block truncate text-lg font-bold capitalize text-black">
          {{ invitation.name }}
        </h2>
        <p class="my-2 text-lg font-semibold text-black">{{ formatPrice(invitation.price) }}</p>
      </div>

      <div class="mt-auto flex flex-col gap-3">
        <a
          :href="telegramUrl"
          target="_blank"
          rel="noreferrer"
          class="rounded-full bg-[#229ed9] px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#168ac0] focus:outline-none focus:ring-2 focus:ring-[#229ed9] focus:ring-offset-2"
        >
          Telegram orqali sotib olish
        </a>
      </div>
    </div>
  </article>
</template>
