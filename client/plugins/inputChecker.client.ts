export default defineNuxtPlugin(() => {
  return {
    provide: {
      checkNumberOnly: ($event) => {
        const keyCode = ($event.keyCode ? $event.keyCode : $event.which)
        if ((keyCode < 48 || keyCode > 57) && keyCode !== 16 && keyCode !== 17 && keyCode !== 37 && keyCode !== 39 && keyCode !== 8 && keyCode !== 9) {
          $event.preventDefault()
        }
      }
    }
  }
})
