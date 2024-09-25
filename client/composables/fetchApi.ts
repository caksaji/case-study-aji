export const fetchApi = async (path, data) => {
  return await $fetch(`http://localhost:3001/${path}`, data)
}
