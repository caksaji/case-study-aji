<template>
  <SpModal v-model="showModal" title="Keluar" size="sm">
    Yakin keluar? Kamu harus masuk lagi untuk menggunakan aplikasi ini
    <template #footer-content>
      <SpButton color="white" @click="showModal = false">
        Batal
      </SpButton>
      <SpButton color="red" @click="logout">
        Keluar
      </SpButton>
    </template>
  </SpModal>
</template>

<script setup>
import SpModal from '~/components/partial/SpModal'
import SpButton from '~/components/partial/SpButton'

const authTokenCookie = useCookie('authToken')
const loggedinUserCookie = useCookie('loggedinUser')
const { $toast } = useNuxtApp()
const showModal = ref(false)

const logout = () => {
  authTokenCookie.value = null
  loggedinUserCookie.value = null
  $toast.success('Berhasil keluar, sampai jumpa lagi 👋')
  navigateTo('/masuk', { replace: true })
}

defineExpose({ showModal })
</script>
