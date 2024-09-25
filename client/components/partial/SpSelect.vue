<template>
  <div>
    <div v-if="!props.showSkeleton && showOption" class="fixed top-0 left-0 h-screen w-screen" @click="cancel" />
    <SpInputText
      v-model="inputSearch"
      :show-skeleton="props.showSkeleton"
      :skeleton-width="props.skeletonWidth"
      :label="props.label"
      :placeholder="props.placeholder"
      icon="right"
      :disabled="props.disabled"
      :error="props.error"
      class="relative"
      @click="clickInput"
      @focus="showOption = true"
      @input="search"
      @keydown.esc="cancel"
      @keydown.tab="cancel"
      @keydown.enter="select(filteredList[hoverIndex])"
      @keydown.up="navigateSelection"
      @keydown.down="navigateSelection"
      @blur="hoverIndex = 0"
    >
      <template #icon>
        <IconSvg v-if="!props.icon && !clearable" name="nav-arrow-down" class="h-6 w-6 transform duration-300" :class="{ '-rotate-180': showOption }" @click="showOption = !showOption" />
        <IconSvg v-else-if="!props.icon && clearable && !selection" name="nav-arrow-down" class="h-6 w-6 transform duration-300" :class="{ '-rotate-180': showOption }" @click="showOption = !showOption" />
        <IconSvg
          v-else-if="!props.icon && clearable && selection"
          v-wave
          name="xmark"
          tabindex="0"
          class="h-6 w-6 rounded-full outline-0 cursor-pointer ring-prime-600 ring-opacity-90 focus:ring click-effect"
          @click="select('')"
        />
        <slot v-else name="icon" />
      </template>
    </SpInputText>
    <div v-if="!disabled && !props.showSkeleton" class="relative">
      <div class="flex flex-col w-full border-gray-300 rounded-md bg-white overflow-x-hidden duration-300 dark:bg-gray-800 dark:border-gray-800" :class="{ 'py-1 border overflow-y-auto': showOption, 'border-0 overflow-y-hidden': !showOption, 'absolute top-0 left-0 z-10': absoluteOptionPosition }" :style="{ maxHeight: showOption ? '187px' : 0 }">
        <template v-if="filteredList.length > 0">
          <div
            v-for="(option, index) in filteredList"
            :key="index"
            :ref="el => optRef[index] = el"
            class="w-full py-1 px-4 duration-300 cursor-default hover:bg-gray-200 dark:hover:bg-gray-700"
            :class="{ 'bg-gray-200 dark:bg-gray-700': hoverIndex === index, 'bg-prime-600 text-white': selection && selection.text === option.text }"
            @mouseover="hoverIndex = index"
            @click="select(option)"
          >
            <div>
              {{ option.text }}
            </div>
          </div>
        </template>
        <span v-else class="py-1 px-4">Ups, data tidak ditemukan</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import SpInputText from '~/components/partial/SpInputText'
import IconSvg from '~/components/partial/IconSvg'

const props = defineProps({
  showSkeleton: { type: Boolean, default: false },
  skeletonWidth: { type: String, default: null },
  list: { type: Array, default: () => [] },
  label: { type: String, default: null },
  value: { type: [String, Object], default: null },
  placeholder: { type: String, default: null },
  error: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  absoluteOptionPosition: { type: Boolean, default: false },
  labelField: { type: String, default: 'text' },
  unselectId: { type: String, default: 'all' },
  unselectLabel: { type: [String, Number], default: null },
  preSelect: { type: Boolean, default: false },
  icon: { type: Boolean, default: false },
  clearable: { type: Boolean, default: false }
})

const optRef = ref([])
const localList = ref([])
const searchMode = ref(false)
const inputSearch = ref('')
const selection = ref(null)
const showOption = ref(false)
const hoverIndex = ref(0)
const searchTimer = ref(null)

const filteredList = computed(() => {
  let tempList = [...localList.value]
  if (searchMode.value) {
    tempList = tempList.filter((item) => {
      return item.text
        .toString()
        .toUpperCase()
        .includes(inputSearch.value.toUpperCase())
    })
  }
  return tempList
})

watch(
  () => props.list,
  () => updateList()
)
watch(
  () => props.value,
  () => select(props.value)
)
watch(inputSearch, () => hoverIndex.value = 0)

onMounted(() => {
  updateList()
  if (props.unselectLabel) {
    localList.value.unshift({ id: props.unselectId, text: props.unselectLabel })
  }
  if (props.preSelect) {
    select(filteredList.value[0])
  }
})

const emit = defineEmits(['search', 'change', 'cancel'])

const updateList = () => {
  if (props.unselectLabel) {
    if (localList.value.length === 1) {
      addLocalList()
    }
    if (localList.value.length > 1) {
      localList.value.splice(1, localList.value.length - 1)
      addLocalList()
    }
  }
  if (!props.unselectLabel) {
    if (localList.value.length === 0) {
      addLocalList()
    }
    if (localList.value.length > 1) {
      localList.value = []
      addLocalList()
    }
  }
}
const addLocalList = () => {
  props.list.map(item => localList.value.push({ ...item, text: item[props.labelField] }))
}
const search = () => {
  searchMode.value = true
  clearTimeout(searchTimer)
  searchTimer.value = setTimeout(() => {
    emit('search', inputSearch)
  }, 1000)
}
const clickInput = () => {
  if (!props.disabled) {
    hoverIndex.value = 0
    selection.value = null
    showOption.value = true
  }
}
const select = (option) => {
  inputSearch.value = option ? option[props.labelField] : null
  showOption.value = false
  searchMode.value = false
  hoverIndex.value = 0
  if (selection.value !== option) {
    selection.value = option
    emit('change', option)
  }
}
const cancel = () => {
  showOption.value = false
  searchMode.value = false
  inputSearch.value = selection.value ? selection.value.text : null
  hoverIndex.value = 0
  emit('cancel')
}
const navigateSelection = (event) => {
  const keyCode = (event.keyCode ? event.keyCode : event.which)
  if (filteredList.value.length > 0) {
    if (keyCode === 38 && hoverIndex.value > 0) {
      hoverIndex.value--
    }
    else if (keyCode === 40 && hoverIndex.value + 1 < filteredList.value.length) {
      hoverIndex.value++
    }
    scrollToSelection()
  }
}
const scrollToSelection = () => {
  const opt = optRef.value[hoverIndex.value]
  if (opt) {
    opt.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }
}

defineExpose({ clickInput })
</script>
