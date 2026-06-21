<script setup>
import SiteFooter from '@/components/SiteFooter.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <div class="flex-1">
      <RouterView />
    </div>
    <SiteFooter />
  </div>
</template>
