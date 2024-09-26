<template>
  <div class="space-y-4">
    <SectionTitle title="Add New Employee" />
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12">
        <SpInputText v-model="input.firstName.value" label="First name" placeholder="Example: Ferdian" :error="input.firstName.error" :show-skeleton="showSkeleton" :disabled="loading" />
      </div>
      <div class="col-span-12">
        <SpInputText v-model="input.lastName.value" label="Last name" placeholder="Example: Salwi" :error="input.lastName.error" :show-skeleton="showSkeleton" :disabled="loading" />
      </div>
      <div class="col-span-12">
        <SpSelect
          label="Division"
          placeholder="Select a division"
          :list="listDivision"
          :value="input.division.value"
          label-field="name"
          :error="input.division.error"
          :show-skeleton="showSkeleton"
          :disabled="loading"
          @change="selection => input.division.value = selection"
        />
      </div>
      <div v-if="input.division.value" class="col-span-12">
        <SpSelect
          label="Position"
          placeholder="Select a position"
          :list="listPosition"
          :value="input.position.value"
          label-field="name"
          :error="input.position.error"
          :show-skeleton="showSkeleton"
          :disabled="loading"
          @change="selection => input.position.value = selection"
        />
      </div>
      <div class="col-span-12">
        <SpInputText
          v-model="input.salary.value"
          label="Salary"
          placeholder="Example: 1000"
          imputmode="tel"
          :error="input.salary.error"
          icon="left"
          class="relative"
          :show-skeleton="showSkeleton"
          :disabled="loading"
          @keydown="$checkNumberOnly"
        >
          <template #icon>
            <span class="-mt-0.5">IDR</span>
          </template>
        </SpInputText>
      </div>
      <div class="col-span-12">
        <SpInputText v-model="input.address.value" label="Address" placeholder="Example: Nganjuk, Jawa Timur" :error="input.address.error" :show-skeleton="showSkeleton" :disabled="loading" />
      </div>
      <div class="col-span-12">
        <VueDatePicker
          v-model="input.birthDate.value"
          autocomplete="off"
          :clearable="false"
          model-type="dd-MM-yyyy"
          :format="formatDate"
          locale="id-ID"
          :max-date="new Date()"
          prevent-min-max-navigation
          hide-offset-dates
          :month-change-on-scroll="false"
          :enable-time-picker="false"
          arrow-navigation
          auto-apply
          :dark="colorMode.value === 'dark'"
          :disabled="loading"
        >
          <template #dp-input="{ value, openMenu }">
            <SpInputText
              label="Birth date"
              imitation
              :imitation-value="input.birthDate.value ? true : false"
              placeholder="Select a birth date"
              :show-skeleton="showSkeleton"
              :error="input.birthDate.error"
              :disabled="loading"
              @keydown.enter="openMenu"
            >
              <template #imitationValue>
                {{ value }}
              </template>
            </SpInputText>
          </template>
        </VueDatePicker>
      </div>
      <div v-if="!showSkeleton" class="col-span-12 flex justify-end gap-2">
        <SpButton color="white" :disabled="loading" @click="router.back()">
          Cancel
        </SpButton>
        <SpButton color="prime" :disabled="loading" :loading="loading" @click="checkForm">
          Add new employee
        </SpButton>
      </div>
    </div>
    <div v-if="loading" class="fixed top-0 left-0 h-screen w-screen" style="margin: 0;" />
  </div>
</template>

<script setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import SectionTitle from '~/components/partial/SectionTitle'
import SpInputText from '~/components/partial/SpInputText'
import SpSelect from '~/components/partial/SpSelect'
import SpButton from '~/components/partial/SpButton'

definePageMeta({
  layout: 'bts'
})

useHead({ title: 'Add new employee' })

const newestEmployeeCookie = useCookie('newestEmployee')
const { $checkNumberOnly, $toast } = useNuxtApp()
const colorMode = useColorMode()
const router = useRouter()
const employeeStore = useEmployeeStore()
const showSkeleton = ref(true)
const loading = ref(false)
const input = ref({
  firstName: { value: null, error: null },
  lastName: { value: null, error: null },
  division: { value: null, error: null },
  position: { value: null, error: null },
  salary: { value: null, error: null },
  address: { value: null, error: null },
  birthDate: { value: null, error: null }
})
const listDivision = ref([])
const listPosition = ref([])

onMounted(() => {
  if (newestEmployeeCookie.value) {
    listDivision.value = [
      { id: 'Division 1', name: 'Division 1' },
      { id: 'Division 2', name: 'Division 2' },
      { id: 'Division 3', name: 'Division 3' }
    ]
    listPosition.value = [
      { id: 'Position 1', name: 'Position 1' },
      { id: 'Position 2', name: 'Position 2' },
      { id: 'Position 3', name: 'Position 3' },
      { id: 'Position 4', name: 'Position 4' },
      { id: 'Position 5', name: 'Position 5' }
    ]
    showSkeleton.value = false
  }
  else {
    navigateTo('/', { replace: true })
  }
})

const formatDate = (date) => {
  let formatted = `${date.getDate()} ${new Intl.DateTimeFormat('id-ID', { month: 'short' }).format(new Date(`1970-${date.getMonth() + 1}-01`))} ${date.getFullYear()}`
  return formatted
}
const checkForm = () => {
  if (input.value.firstName.value && input.value.lastName.value && input.value.division.value && input.value.position.value && input.value.salary.value && input.value.address.value && input.value.birthDate.value) {
    submitForm()
  }
  input.value.firstName.error = input.value.firstName.value ? null : 'First name is required'
  input.value.lastName.error = input.value.lastName.value ? null : 'Last name is required'
  input.value.division.error = input.value.division.value ? null : 'Division is required'
  input.value.position.error = input.value.position.value ? null : 'Position is required'
  input.value.salary.error = input.value.salary.value ? null : 'Salary is required'
  input.value.address.error = input.value.address.value ? null : 'Dddress is required'
  input.value.birthDate.error = input.value.birthDate.value ? null : 'Birth date is required'
}
const submitForm = async () => {
  loading.value = true
  const today = new Date ()
  const joinOn = `${today.getDate()}-${(today.getMonth() + 1) >= 10 ? today.getMonth() + 1 : '0' + (today.getMonth() + 1)}-${today.getFullYear()}`
  let number = 1
  if (joinOn === newestEmployeeCookie.value.date) {
    number = newestEmployeeCookie.value.number + 1
  }
  let numberString = number.toString()
  if (numberString.length === 1) {
    numberString = `00${numberString}`
  }
  else if (numberString.length === 2) {
    numberString = `0${numberString}`
  }
  const sCode = `AQI-${joinOn.split('-').join('')}-${numberString}`
  const data = {
    nip: sCode,
    joinDate: joinOn,
    firstName: input.value.firstName.value,
    lastName: input.value.lastName.value,
    division: input.value.division.value.name,
    position: input.value.position.value.name,
    salary: input.value.salary.value,
    address: input.value.address.value,
    birthDate: input.value.birthDate.value
  }
  await employeeStore.add(data)
    .then(() => {
      $toast.success('Successfully added a new employee')
      router.back()
    })
  loading.value = false
}
</script>
