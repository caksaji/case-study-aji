<template>
  <div class="mx-auto" style="max-width: 1440px;">
    <div class="container min-h-screen pt-8 pb-32">
      <slot />
      <ModalsContainer />
      <div class="fixed bottom-8 left-0 w-screen">
        <div class="container flex justify-end w-full">
          <SpButton
            color="prime"
            size="sm"
            icon-only
            round
            @click="swapColorMode"
          >
            <template #icon>
              <div class="p-2">
                <IconSvg name="sun-light" class="h-8 w-8 dark:hidden" />
                <IconSvg name="half-moon" class="hidden h-8 w-8 dark:block" />
              </div>
            </template>
          </SpButton>
        </div>
      </div>
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
}
</script>
