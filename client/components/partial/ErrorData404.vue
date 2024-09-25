<template>
  <div class="w-full">
    <div class="w-full bg-contain bg-no-repeat bg-center h-24 md:h-16" :style="{ backgroundImage: 'url(/img/error-data404.svg)' }" />
    <div class="text-center">
      <slot />
    </div>
  </div>
</template>
