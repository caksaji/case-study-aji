export default defineNuxtPlugin(() => {
  return {
    provide: {
      screenSize: (dimension, method, size: string) => {
        let result = null
        const availableSize = {
          zero: 0,
          sm: 640,
          md: 768,
          lg: 1024,
          xl: 1280
        }
        if (window) {
          if (dimension === 'width') {
            if (method === 'min') {
              result = window.innerWidth >= availableSize[size]
            }
            if (method === 'max') {
              result = window.innerWidth < availableSize[size]
            }
          }
          if (dimension === 'height') {
            if (method === 'min') {
              result = window.innerHeight >= availableSize[size]
            }
            if (method === 'max') {
              result = window.innerHeight < availableSize[size]
            }
          }
        }
        return result
      }
    }
  }
})
