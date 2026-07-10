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

const formatPrice = (price) => `${new Intl.NumberFormat('uz-UZ').format(price)} so'm`
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
    class="flex h-full w-full max-w-sm cursor-pointer flex-col overflow-hidden rounded-xl bg-white shadow-md duration-500 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#2fa084] focus:ring-offset-2 sm:max-w-72"
    role="link"
    tabindex="0"
    @click="openProduct"
    @keydown.enter="openProduct"
  >
    <div
      class="relative aspect-[3/4] w-full overflow-hidden rounded-t-xl bg-[#6fcf97]/30"
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
        class="absolute left-3 top-3 rounded-full bg-[#1f6f5f] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-sm"
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

    <div class="px-4 py-3">
      <span class="text-xs font-semibold uppercase tracking-wide text-[#2fa084]">
        {{ invitation.category }}
      </span>
      <h2 class="mt-1 block truncate text-lg font-bold capitalize text-[#111]">
        {{ invitation.name }}
      </h2>
      <p class="mt-1 text-base font-semibold text-[#111]">
        {{ formatPrice(invitation.price) }}
      </p>
    </div>
  </article>
</template>
