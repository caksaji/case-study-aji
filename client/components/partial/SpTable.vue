<template>
  <div>
    <div
      v-if="screenMaxWidth || props.minShowTableAt === 'never'"
      class="grid grid-cols-12 gap-4 mb-4"
      :class="{
        'sm:hidden': props.minShowTableAt === 'sm',
        'md:hidden': props.minShowTableAt === 'md',
        'lg:hidden': props.minShowTableAt === 'lg'
      }"
    >
      <slot name="card" />
    </div>
    <div
      v-if="!screenMaxWidth && props.minShowTableAt !== 'never'"
      class="sp-table hidden border-t border-b border-gray-200 border-collapse dark:border-gray-700"
      :class="{
        'sm:block': props.minShowTableAt === 'sm',
        'md:block': props.minShowTableAt === 'md',
        'lg:block': props.minShowTableAt === 'lg'
      }"
    >
      <div class="divide-y divide-gray-200 dark:divide-gray-700">
        <div class="flex w-full bg-gray-100 text-gray-400 font-semibold dark:bg-gray-800">
          <slot name="thead" />
        </div>
        <slot v-if="!props.emptyData && !props.showSkeleton" name="tbody" />
      </div>
    </div>
    <div v-if="props.emptyData || props.showSkeleton" class="pb-4">
      <div v-if="props.showSkeleton">
        <div
          class="overflow-hidden"
          :class="{
            'sm:hidden': props.minShowTableAt === 'sm',
            'md:hidden': props.minShowTableAt === 'md',
            'lg:hidden': props.minShowTableAt === 'lg'
          }"
          style="height: calc((1px * 2) + (1rem * 2) + ((1.5rem * 2) + (1rem * 1)) + (1rem + 1.5rem));"
        >
          <div class="grid grid-cols-12 gap-4">
            <div v-for="index in 3" :key="index" class="col-span-12 sm:col-span-6 xl:col-span-4">
              <div class="p-4 border border-gray-400 dark:border-gray-600 rounded-md">
                <div class="flex w-full space-x-4">
                  <SkeletonBlock class="flex-shrink-0 h-16 w-16 rounded-md" />
                  <div class="w-full space-y-4">
                    <SkeletonBlock class="h-6 rounded-md" />
                    <SkeletonBlock class="h-6 w-1/3 rounded-md" />
                  </div>
                </div>
                <SkeletonBlock class="h-6 w-1/4 rounded-md mt-4 ml-auto" />
              </div>
            </div>
          </div>
        </div>
        <div
          class="hidden items-center space-x-4 w-full p-4"
          :class="{
            'sm:flex': props.minShowTableAt === 'sm',
            'md:flex': props.minShowTableAt === 'md',
            'lg:flex': props.minShowTableAt === 'lg'
          }"
        >
          <SkeletonBlock class="h-6 w-8 rounded-md" />
          <SkeletonBlock class="h-6 w-full rounded-md" />
        </div>
      </div>
      <ErrorData404 v-if="props.emptyData && !props.showSkeleton" class="mt-4">
        {{ props.emptyDataText }}
      </ErrorData404>
    </div>
    <div v-if="!props.emptyData && props.meta && props.meta.from && props.meta.to && props.meta.total && props.meta.current_page && props.meta.last_page && props.meta.last_page > 1" class="items-start justify-between w-full sm:flex">
      <div class="flex items-start justify-center divide-x divide-gray-200 dark:divide-gray-600">
        <div class="content-center h-12 px-4">
          <SpNumberFormat :value="10" /> lines per page
        </div>
        <div class="content-center h-12 px-4 border-gray-200 dark:border-gray-600">
          Line <SpNumberFormat :value="props.meta.from" /> - <SpNumberFormat :value="props.meta.to" /> of <SpNumberFormat :value="props.meta.total" /> lines
        </div>
      </div>
      <div class="flex items-start justify-center divide-gray-200 dark:divide-gray-600 sm:divide-x">
        <div
          v-wave="!props.showSkeleton"
          :tabindex="!props.showSkeleton ? 0 : -1"
          class="duration-300 outline-none focus:bg-gray-300 dark:focus:bg-gray-600"
          :class="{ 'hover:bg-gray-300 dark:hover:bg-gray-600': !props.showSkeleton, 'cursor-not-allowed': props.showSkeleton }"
          @click="changePage('prev')"
          @keydown.enter="changePage('prev')"
          @keydown.space="changePage('prev')"
        >
          <div class="flex items-center justify-center h-12 w-12" :class="{ ' cursor-pointer click-effect': !props.showSkeleton, 'cursor-not-allowed': props.showSkeleton }">
            <IconSvg name="nav-arrow-left" class="h-6 w-6" />
          </div>
        </div>
        <div class="content-center h-12 px-4">
          <SpNumberFormat :value="props.meta.current_page" /> of <SpNumberFormat :value="props.meta.last_page" /> pages
        </div>
        <div
          v-wave="!props.showSkeleton"
          :tabindex="!props.showSkeleton ? 0 : -1"
          class="duration-300 outline-none focus:bg-gray-300 dark:focus:bg-gray-600"
          :class="{ 'hover:bg-gray-300 dark:hover:bg-gray-600': !props.showSkeleton, 'cursor-not-allowed': props.showSkeleton }"
          @click="changePage('next')"
          @keydown.enter="changePage('next')"
          @keydown.space="changePage('next')"
        >
          <div class="flex items-center justify-center h-12 w-12" :class="{ ' cursor-pointer click-effect': !props.showSkeleton, 'cursor-not-allowed': props.showSkeleton }">
            <IconSvg name="nav-arrow-right" class="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SkeletonBlock from '~/components/partial/SkeletonBlock'
import SpNumberFormat from '~/components/partial/SpNumberFormat'
import IconSvg from '~/components/partial/IconSvg'
import ErrorData404 from '~/components/partial/ErrorData404'

const props = defineProps({
  showSkeleton: { type: Boolean, default: false },
  emptyData: { type: Boolean, default: false },
  emptyDataText: { type: String, default: 'Oops, there is no available data'
  },
  meta: { type: Object, default: () => ({ from: null, to: null, total: null, current_page: null, last_page: null }) },
  minShowTableAt: { type: String, default: 'lg' } // sm, md, lg, never
})

const screenMaxWidth = ref(null)

onMounted (() => {
  const { $screenSize } = useNuxtApp()
  if (props.minShowTableAt !== 'never') {
    screenMaxWidth.value = $screenSize('width', 'max', props.minShowTableAt)
  }
})

const emit = defineEmits(['changePage'])

const changePage = (to) => {
  if (to === 'prev' && !props.showSkeleton && props.meta.current_page > 1) {
    emit('changePage', props.meta.current_page - 1)
  }
  else if (to === 'next' && !props.showSkeleton && props.meta.current_page < props.meta.last_page) {
    emit('changePage', props.meta.current_page + 1)
  }
}
</script>

<style lang="less">
  .card-col {
    &:not(.custom-col) {
      @apply col-span-12 sm:col-span-6 xl:col-span-4;
    }
    .card-border {
      @apply p-4 border border-gray-400 dark:border-gray-600 rounded-md;
      .title { @apply font-semibold; }
    }
  }

  .sp-table  {
    .tbody {
      @apply flex w-full duration-300 odd:bg-gray-100 hover:bg-prime-100 dark:odd:bg-gray-800 dark:hover:bg-prime-900;
    }
    .tcell {
      @apply py-3 pr-4 flex-shrink-0 first:pl-4;
      &:not(.shrink) { @apply flex-shrink-0; }
      &.shrink { @apply flex-shrink; }
      &.detail {
        @apply duration-300;
        &:not(.shown) { @apply h-0 py-0; }
      }
    }
  }
</style>
