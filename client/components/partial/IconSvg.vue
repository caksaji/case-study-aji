<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    class="flex-shrink-0 stroke-2 stroke-current transform"
    :class="{ 'rotate-180': props.name === 'log-out' }"
    style="stroke-linecap: round; stroke-linejoin: round;"
  >
    <template v-if="props.name === 'user'">
      <path d="M5 20V19C5 15.134 8.13401 12 12 12V12C15.866 12 19 15.134 19 19V20" />
      <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" />
    </template>
    <template v-else-if="props.name === 'lock'">
      <path d="M16 12H17.4C17.7314 12 18 12.2686 18 12.6V19.4C18 19.7314 17.7314 20 17.4 20H6.6C6.26863 20 6 19.7314 6 19.4V12.6C6 12.2686 6.26863 12 6.6 12H8M16 12V8C16 6.66667 15.2 4 12 4C8.8 4 8 6.66667 8 8V12M16 12H8" />
    </template>
    <template v-else-if="props.name === 'nav-arrow-down'">
      <path d="M6 9L12 15L18 9" />
    </template>
    <template v-else-if="props.name === 'nav-arrow-right'">
      <path d="M9 6L15 12L9 18" />
    </template>
    <template v-else-if="props.name === 'nav-arrow-left'">
      <path d="M15 6L9 12L15 18" />
    </template>
    <template v-else-if="props.name === 'warning-triangle'">
      <path d="M20.0429 21H3.95705C2.41902 21 1.45658 19.3364 2.22324 18.0031L10.2662 4.01533C11.0352 2.67792 12.9648 2.67791 13.7338 4.01532L21.7768 18.0031C22.5434 19.3364 21.581 21 20.0429 21Z" />
      <path d="M12 9V13" />
      <path d="M12 17.01L12.01 16.9989" />
    </template>
    <template v-else-if="props.name === 'log-out'">
      <path d="M12 12H19M19 12L16 15M19 12L16 9" />
      <path d="M19 6V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V18" />
    </template>
    <template v-else-if="props.name === 'menu'">
      <path d="M3 5H21" />
      <path d="M3 12H21" />
      <path d="M3 19H21" />
    </template>
    <template v-else-if="props.name === 'xmark'">
      <path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" />
    </template>
    <template v-else-if="props.name === 'edit-pencil'">
      <path d="M14.3632 5.65156L15.8431 4.17157C16.6242 3.39052 17.8905 3.39052 18.6716 4.17157L20.0858 5.58579C20.8668 6.36683 20.8668 7.63316 20.0858 8.41421L18.6058 9.8942M14.3632 5.65156L4.74749 15.2672C4.41542 15.5993 4.21079 16.0376 4.16947 16.5054L3.92738 19.2459C3.87261 19.8659 4.39148 20.3848 5.0115 20.33L7.75191 20.0879C8.21972 20.0466 8.65806 19.8419 8.99013 19.5099L18.6058 9.8942M14.3632 5.65156L18.6058 9.8942" />
    </template>
    <template v-else-if="props.name === 'info-circle'">
      <path d="M12 11.5V16.5" />
      <path d="M12 7.51L12.01 7.49889" />
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
    </template>
    <template v-else-if="props.name === 'sun-light'">
      <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" />
      <path d="M22 12L23 12" />
      <path d="M12 2V1" />
      <path d="M12 23V22" />
      <path d="M20 20L19 19" />
      <path d="M20 4L19 5" />
      <path d="M4 20L5 19" />
      <path d="M4 4L5 5" />
      <path d="M1 12L2 12" />
    </template>
    <template v-else-if="props.name === 'half-moon'">
      <path d="M3 11.5066C3 16.7497 7.25034 21 12.4934 21C16.2209 21 19.4466 18.8518 21 15.7259C12.4934 15.7259 8.27411 11.5066 8.27411 3C5.14821 4.55344 3 7.77915 3 11.5066Z" />
    </template>
  </svg>
</template>

<script setup>
const props = defineProps({
  name: { type: String, default: null, required: true }
})
</script>
