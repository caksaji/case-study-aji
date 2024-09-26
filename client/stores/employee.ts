export const useEmployeeStore = defineStore('employee', () => {
  const all = ref({})
  const last = ref({})

  const setAll = data => all.value = data
  const setLast = data => last.value = data

  const getAll = async (data) => {
    try {
      const res = await fetchApi(`employees?_page=${data.page}&_per_page=10`, { method: 'get' })
      setAll(res)
    }
    catch (error) { setAll({}) }
  }
  const getLast = async (data) => {
    try {
      const res = await fetchApi(`employees?_page=${data}&_per_page=1`, { method: 'get' })
      setLast(res)
    }
    catch (error) { setLast({}) }
  }
  const add = async data => await fetchApi('employees', { method: 'post', body: data })
  const edit = async data => await fetchApi('employees', { method: 'put', body: data })

  return {
    all,
    last,
    getAll,
    getLast,
    add,
    edit
  }
})
