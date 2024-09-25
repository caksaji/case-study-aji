<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
useHead({ titleTemplate: titleChunk => titleChunk ? `${titleChunk} | LoDy` : 'LoDy' })
</script>
