<template>
  <div class="mx-auto" style="max-width: 1440px;">
    <div class="container pt-8 pb-32 md:pb-12">
      <slot />
      <ModalsContainer />
    </div>
  </div>
</template>

<script setup>
import { ModalsContainer } from 'vue-final-modal'
</script>
