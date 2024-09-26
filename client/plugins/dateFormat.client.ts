export default defineNuxtPlugin(() => {
  return {
    provide: {
      date: (date) => {
        const sd = date.split('-')
        return new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(`${sd[1]}-${sd[0]}-${sd[2]}`))
      }
    }
  }
})
