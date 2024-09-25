<template>
  <SkeletonBlock
    v-if="props.showSkeleton"
    :class="[
      {
        'h-9 rounded-md': !props.fab,
        'fixed bottom-4 right-4 h-12 w-12 rounded-full md:hidden': props.fab
      },
      skeletonWidth
    ]"
    :style="{ zIndex: props.fab ? 1 : 'unset' }"
  />
  <button
    v-else
    v-wave="!props.disabled"
    :disabled="props.disabled || props.loading"
    class="no-underline outline-none"
    :class="{
      'duration-300 transform focus:ring focus:ring-opacity-90 active:scale-90': !props.disabled,
      'inline-block text-center align-middle whitespace-nowrap space-x-2 focus:ring-offset-2 dark:ring-offset-gray-800': !props.noStyle,
      'fixed bottom-4 right-4 md:hidden': props.fab,
      'focus:ring-gray-800': props.noStyle,
      'cursor-pointer': !props.disabled && !props.loading,
      'cursor-not-allowed': props.disabled,
      'cursor-wait': props.loading,
      'opacity-75': props.disabled,
      'rounded-md': !props.round && !props.fab,
      'rounded-full': props.round || props.fab,
      'w-full': props.block,
      'focus:ring-prime-700': props.color === 'prime',
      'text-white bg-prime-600': props.color === 'prime' && !props.border,
      'hover:bg-prime-700': props.color === 'prime' && !props.border && !props.disabled,
      'focus:ring-red-600': props.color === 'red',
      'text-white bg-red-500': props.color === 'red' && !props.border,
      'hover:bg-red-600': props.color === 'red' && !props.border && !props.disabled,
      'focus:ring-blue-600': props.color === 'blue',
      'text-white bg-blue-500': props.color === 'blue' && !props.border,
      'hover:bg-blue-600': props.color === 'blue' && !props.border && !props.disabled,
      'border border-gray-300 text-gray-800 bg-white focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:focus:ring-gray-600': props.color === 'white',
      'hover:bg-gray-300 dark:hover:bg-gray-600': props.color === 'white' && !props.disabled,
      'text-prime-500': props.color === 'white' && props.textPrimeteal,
      'border focus:bg-opacity-20': props.border,
      'hover:bg-opacity-20': props.border && !props.disabled,
      'text-prime-500 border-prime-500 focus:bg-prime-600': props.color === 'prime' && props.border,
      'hover:bg-prime-600': props.color === 'prime' && props.border && !props.disabled,
      'text-red-500 border-red-500 focus:bg-red-600': props.color === 'red' && props.border,
      'hover:bg-red-600': props.color === 'red' && props.border && !props.disabled
    }"
    style="line-height: 1.5; font-size: calc(1rem - 2px);"
    :style="formatedStyle"
    @click="click"
  >
    <span v-if="props.noStyle"><slot /></span>
    <div v-else class="flex items-center justify-center space-x-2" :class="{ 'h-12 w-12': props.fab, 'w-full': !props.fab }">
      <SpinnerCircle v-if="props.loading" class="w-4 h-4" />
      <slot v-if="!props.loading" name="icon" />
      <span v-if="!props.iconOnly"><slot /></span>
    </div>
  </button>
</template>

<script setup>
import SkeletonBlock from '~/components/partial/SkeletonBlock'
import SpinnerCircle from '~/components/partial/SpinnerCircle'

const props = defineProps({
  showSkeleton: { type: Boolean, default: false },
  skeletonWidth: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  noStyle: { type: Boolean, default: false },
  size: {
    type: String,
    default: null // null, sm
  },
  round: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
  color: {
    type: String,
    default: null // prime, red, blue, white
  },
  textPrimeteal: { type: Boolean, default: false },
  border: { type: Boolean, default: false },
  iconOnly: { type: Boolean, default: false },
  fab: { type: Boolean, default: false }
})

const fragmentedRem = '(1rem / 4)'

const formatedStyle = computed(() => {
  let padding = null
  if (props.size === 'sm') {
    if ((props.border || props.color === 'white') && !props.iconOnly) {
      padding = `calc((${fragmentedRem} * 1) - 1px) calc((${fragmentedRem} * 3) - 1px)`
    }
    else if ((props.border || props.color === 'white') && props.iconOnly) {
      padding = `calc((${fragmentedRem} * 1) - 1px)`
    }
    else if (!props.border && props.color !== 'white' && props.iconOnly) {
      padding = `calc(${fragmentedRem})`
    }
    else {
      padding = `calc(${fragmentedRem} * 1) calc(${fragmentedRem} * 3)`
    }
  }
  else if (!props.size) {
    if (props.border || props.color === 'white') {
      padding = `calc((${fragmentedRem} * 2) - 1px) calc((${fragmentedRem} * 4) - 1px)`
    }
    else {
      padding = `calc(${fragmentedRem} * 2) calc(${fragmentedRem} * 4)`
    }
  }
  return {
    padding: !props.noStyle ? padding : 0,
    zIndex: props.fab ? 1 : 'unset'
  }
})

const emit = defineEmits(['click'])

const click = () => {
  emit('click')
}
</script>

<style lang="less">
  .click-effect { @apply transform duration-300 active:scale-90; }

  a, .link { @apply rounded-md outline-0 ring-prime-700/90 text-prime-600 underline duration-300 focus:ring dark:text-prime-400; }
</style>
