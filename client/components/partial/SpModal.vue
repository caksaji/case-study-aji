<template>
  <VueFinalModal
    v-slot="{ close }"
    class="flex justify-center items-center"
    overlay-class="backdrop-filter backdrop-blur-sm"
    overlay-transition="vfm-fade"
    :content-class="[
      'card flex flex-col fixed bottom-0 w-screen max-h-full py-6 border border-b-0 rounded-t-xl bg-white transform duration-300 dark:border-gray-700 dark:bg-gray-900',
      {
        'md:bottom-auto md:w-full md:border-b md:rounded-lg md:m-auto': !props.keepOnPhoneSize,
        'px-2': props.pxBody && props.keepOnPhoneSize,
        'px-4 md:px-6': props.pxBody && !props.keepOnPhoneSize
      },
      props.size && !props.keepOnPhoneSize ? `max-width-${props.size}` : ''
    ]"
    :content-style="{ maxHeight: 'calc(100vh - 66px)' }"
    :content-transition="props.keepOnPhoneSize || screenMaxWidth ? 'vfm-slide-down' : 'modalContentTransition'"
    :esc-to-close="props.closable"
    :background="!props.closable ? 'interactive' : 'non-interactive'"
    :swipe-to-close="props.closable && (props.keepOnPhoneSize || screenMaxWidth) ? 'down' : 'none'"
    prevent-navigation-gesture
  >
    <div v-if="props.keepOnPhoneSize || screenMaxWidth" class="flex-shrink-0 h-1.5 w-10 rounded-full -mt-2 mb-6 mx-auto bg-gray-400" />
    <div
      class="card-body pb-3"
      :class="{
        'px-2': !props.pxBody && props.keepOnPhoneSize,
        'px-4 md:px-6': !props.pxBody && !props.keepOnPhoneSize,
        'flex items-start justify-between w-full': props.x
      }"
    >
      <SectionTitle :title="props.title" />
      <div v-if="props.x" :class="{ 'absolute -top-16 right-4': props.keepOnPhoneSize || screenMaxWidth }">
        <div
          v-wave
          tabindex="0"
          class="relative rounded-full outline-0 mt-1.5 ring-gray-300 ring-opacity-90 cursor-pointer click-effect focus:ring"
          :class="{ 'p-2 bg-white border-gray-600 dark:border dark:border-gray-700 dark:bg-gray-900': props.keepOnPhoneSize || screenMaxWidth, 'p-1': !props.keepOnPhoneSize && !screenMaxWidth }"
          @click="close"
          @keydown.enter="close"
          @keydown.space="close"
        >
          <IconSvg name="xmark" class="h-6 w-6" />
        </div>
      </div>
    </div>
    <div class="card-body flex-grow overflow-y-auto" :class="{ '-mx-6': props.noXSpace }">
      <slot />
    </div>
    <div class="card-body pt-3 flex-shrink-0 flex items-center space-x-2" :class="[props.footerAlign == 'left' ? 'justify-start' : props.footerAlign == 'center' ? 'justify-center' :props.footerAlign == 'right' ? 'justify-end' : 'justify-center', { 'px-2': !props.pxBody && props.keepOnPhoneSize, 'px-4 md:px-6': !props.pxBody && !props.keepOnPhoneSize }]">
      <div v-if="!props.closable" class="absolute top-0 left-0 h-full w-full" style="z-index: 1;" />
      <slot name="footer-content" />
    </div>
  </VueFinalModal>
</template>

<script setup>
import { VueFinalModal } from 'vue-final-modal'
import SectionTitle from '~/components/partial/SectionTitle'
import IconSvg from '~/components/partial/IconSvg'

const props = defineProps({
  title: { type: String, default: null },
  footerAlign: { type: String, default: 'right' },
  x: { type: Boolean, default: false },
  closable: { type: Boolean, default: true },
  size: {
    type: String,
    default: 'md'
    // sm, md, lg, xl, full
  },
  keepOnPhoneSize: { type: Boolean, default: false },
  pxBody: { type: Boolean, default: true },
  noXSpace: { type: Boolean, default: false }
})

const screenMaxWidth = ref(null)

onMounted(() => {
  const { $screenSize } = useNuxtApp()
  screenMaxWidth.value = $screenSize('width', 'max', 'md')
})
</script>

<style lang="less">
  .modalContentTransition-enter-active,
  .modalContentTransition-leave-active { @apply transition duration-300 ease-in-out transform; }
  .modalContentTransition-enter,
  .modalContentTransition-leave-to { @apply scale-0; }
  .modalContentTransition-enter-to,
  .modalContentTransition-leave { @apply scale-100; }

  .card {
    @media (min-width: 768px) {
      &.max-width-sm { max-width: 24rem; }
      &.max-width-md { max-width: 30rem; }
      &.max-width-lg { max-width: 40rem; }
      &.max-width-xl { max-width: 50rem; }
      &.max-width-full { max-width: 70rem; }
    }
  }
</style>
