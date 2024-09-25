<template>
  {{ formattedNumber }}
</template>

<script setup>
const props = defineProps({
  value: { type: [String, Number], default: null },
  lang: { type: String, default: 'id' },
  type: { type: String, default: 'number' } // number, currency
})

const formattedNumber = computed(() => {
  const val = String(props.value).split('').reverse()
  const formattedVal = []
  let res = null
  for (let i = 0; i < val.length; i++) {
    if (i % 3 === 0 && i > 0) {
      formattedVal.unshift('.')
    }
    formattedVal.unshift(val[i])
  }
  if (props.lang === 'id') {
    if (props.type === 'number') {
      res = formattedVal.join('')
    }
    else if (props.type === 'currency') {
      res = `IDR ${formattedVal.join('')}`
    }
  }
  return res
})
</script>
