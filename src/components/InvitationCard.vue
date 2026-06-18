<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  invitation: {
    type: Object,
    required: true,
  },
})

const router = useRouter()
const TELEGRAM_USERNAME = 'Ft_Cards_Fergana'

const formatPrice = (price) => `${new Intl.NumberFormat('uz-UZ').format(price)} so'm`
const orderText = encodeURIComponent(
  `Salom! Men ${props.invitation.name} taklifnomasini olmoqchiman.`,
)

const telegramUrl = `https://t.me/${TELEGRAM_USERNAME}?text=${orderText}`
const photos = computed(() => {
  if (Array.isArray(props.invitation.photos) && props.invitation.photos.length) {
    return props.invitation.photos
  }

  return props.invitation.image ? [props.invitation.image] : []
})
const activePhotoIndex = ref(0)
const touchStartX = ref(0)
const touchEndX = ref(0)
const swiped = ref(false)
const previewImage = computed(() => photos.value[activePhotoIndex.value] || '')

const setPhoto = (index) => {
  activePhotoIndex.value = index
}

const showPreviousPhoto = () => {
  if (photos.value.length < 2) return

  activePhotoIndex.value =
    activePhotoIndex.value === 0 ? photos.value.length - 1 : activePhotoIndex.value - 1
}

const showNextPhoto = () => {
  if (photos.value.length < 2) return

  activePhotoIndex.value =
    activePhotoIndex.value === photos.value.length - 1 ? 0 : activePhotoIndex.value + 1
}

const startSwipe = (event) => {
  touchStartX.value = event.changedTouches[0].clientX
  touchEndX.value = touchStartX.value
  swiped.value = false
}

const endSwipe = (event) => {
  touchEndX.value = event.changedTouches[0].clientX
  const distance = touchEndX.value - touchStartX.value

  if (Math.abs(distance) < 40) return

  swiped.value = true
  if (distance > 0) showPreviousPhoto()
  else showNextPhoto()
}

const openProduct = () => {
  if (swiped.value) {
    swiped.value = false
    return
  }

  router.push({ name: 'product', params: { id: props.invitation.id } })
}
</script>

<template>
  <article
    class="flex h-full w-full max-w-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-white shadow-md duration-500 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
    role="link"
    tabindex="0"
    @click="openProduct"
    @keydown.enter="openProduct"
  >
    <div
      class="relative h-56 w-full overflow-hidden rounded-t-xl bg-[#eadfd6]"
      @touchstart.stop="startSwipe"
      @touchend.stop="endSwipe"
    >
      <img
        :src="previewImage"
        :alt="`${invitation.name} taklifnomasi`"
        class="h-full w-full select-none object-cover"
        draggable="false"
      />
      <span
        v-if="invitation.badge"
        class="absolute left-3 top-3 rounded-full bg-[#8a5a44] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-sm"
      >
        Mashhur
      </span>
      <div
        v-if="photos.length > 1"
        class="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/20 px-2 py-1"
      >
        <button
          v-for="(_, index) in photos"
          :key="index"
          type="button"
          class="h-2 w-2 rounded-full transition focus:outline-none focus:ring-2 focus:ring-white"
          :class="activePhotoIndex === index ? 'bg-white' : 'bg-white/50'"
          :aria-label="`${index + 1}-rasmni ko'rsatish`"
          @click.stop="setPhoto(index)"
        />
      </div>
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
          @click.stop
        >
          Telegram orqali sotib olish
        </a>
      </div>
    </div>
  </article>
</template>
