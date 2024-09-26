<template>
  <SpModal v-model="showModal" title="Delete Employee" size="sm" :closable="!loading">
    Are you sure to delete <span class="font-semibold">[{{ employeeCookie.nip }}] {{ employeeCookie.firstName }} {{ employeeCookie.lastName }}</span>?
    <br>This action <span class="font-semibold">cannot be undone</span>
    <template #footer-content>
      <SpButton color="white" :disabled="loading" @click="closeModal">
        Cancel
      </SpButton>
      <SpButton color="red" :loading="loading" :disabled="loading" @click="submitFormDelete">
        Delete employee
      </SpButton>
    </template>
  </SpModal>
</template>

<script setup>
import SpModal from '~/components/partial/SpModal'
import SpButton from '~/components/partial/SpButton'

const { $toast } = useNuxtApp()
const employeeCookie = useCookie('employee')
const employeeStore = useEmployeeStore()
const showModal = ref(false)
const loading = ref(false)

const emit = defineEmits(['completed'])

const submitFormDelete = async () => {
  loading.value = true
  await employeeStore.del(employeeCookie.value.id)
    .then(() => {
      $toast.success('An employee has been deleted')
      closeModal()
      emit('completed')
    })
    .catch((error) => {
      $toast.error(error.response._data)
      loading.value = false
    })
}
const closeModal = () => {
  showModal.value = false
  setTimeout(() => loading.value = false, 1000)
}

defineExpose({ showModal })
</script>
