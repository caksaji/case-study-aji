<template>
  <div class="mx-auto" style="max-width: 1440px;">
    <div class="container relative min-h-screen pt-8 pb-32 md:pb-12">
      <slot />
      <ModalsContainer />
      <SpButton
        color="prime"
        size="sm"
        icon-only
        round
        class="absolute bottom-8 right-4"
        @click="swapColorMode"
      >
        <template #icon>
          <div class="p-2">
            <IconSvg v-if="colorMode.value === 'light'" name="sun-light" class="h-8 w-8" />
            <IconSvg v-else-if="colorMode.value === 'dark'" name="half-moon" class="h-8 w-8" />
          </div>
        </template>
      </SpButton>
    </div>
  </div>
</template>

<script setup>
import { ModalsContainer } from 'vue-final-modal'
import SpButton from '~/components/partial/SpButton'
import IconSvg from '~/components/partial/IconSvg'

const colorMode = useColorMode()

const swapColorMode = () => {
  if (colorMode.value === 'light') {
    colorMode.preference = 'dark'
  }
  else {
    colorMode.preference = 'light'
  }
  showSidebar.value = false
}
</script>
