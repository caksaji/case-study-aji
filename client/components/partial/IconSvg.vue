<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    class="flex-shrink-0 stroke-2 stroke-current"
    style="stroke-linecap: round; stroke-linejoin: round;"
  >
    <template v-if="props.name === 'nav-arrow-down'">
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
    <template v-else-if="props.name === 'xmark'">
      <path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" />
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
    <template v-else-if="props.name === 'calendar-plus'">
      <path d="M13 21H5C3.89543 21 3 20.1046 3 19V10H21V13M15 4V2M15 4V6M15 4H10.5" />
      <path d="M3 10V6C3 4.89543 3.89543 4 5 4H7" />
      <path d="M7 2V6" />
      <path d="M21 10V6C21 4.89543 20.1046 4 19 4H18.5" />
      <path d="M14.9922 18H17.9922M21 18H17.9922M17.9922 18V15M17.9922 18V21" />
    </template>
    <template v-else-if="props.name === 'receive-dollars'">
      <path d="M10 8.23077C9.20085 7.49308 7.79346 6.97998 6.5 6.94785M3 15.2308C3.75189 16.1562 5.1499 16.684 6.5 16.7288M6.5 6.94785C4.96102 6.90962 3.58333 7.55229 3.58333 9.3077C3.58333 12.5385 10 10.9231 10 14.1538C10 15.9965 8.2922 16.7882 6.5 16.7288M6.5 6.94785V5M6.5 16.7288V19" />
      <path d="M21 12H13M13 12L16.84 8M13 12L16.84 16" />
    </template>
    <template v-else-if="props.name === 'home-alt'">
      <path d="M10 18V15C10 13.8954 10.8954 13 12 13V13C13.1046 13 14 13.8954 14 15V18" />
      <path d="M2 8L11.7317 3.13416C11.9006 3.04971 12.0994 3.0497 12.2683 3.13416L22 8" />
      <path d="M20 11V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V11" />
    </template>
    <template v-else-if="props.name === 'birthday-cake'">
      <path d="M4 16.5V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V16.5" />
      <path d="M3 14V13C3 11.8954 3.89543 11 5 11H19C20.1046 11 21 11.8954 21 13V14" />
      <path d="M12 8L12 11" />
      <path d="M12 8C13.2624 8 14 7.03185 14 5.375C14 3.71815 12 2 12 2C12 2 10 3.71815 10 5.375C10 7.03185 10.7376 8 12 8Z" />
      <path d="M9 14C9 15.6569 7.65685 17 6 17C4.34315 17 3 15.6569 3 14" />
      <path d="M15 14C15 15.6569 13.6569 17 12 17C10.3431 17 9 15.6569 9 14" />
      <path d="M21 14C21 15.6569 19.6569 17 18 17C16.3431 17 15 15.6569 15 14" />
    </template>
  </svg>
</template>

<script setup>
const props = defineProps({
  name: { type: String, default: null, required: true }
})
</script>
