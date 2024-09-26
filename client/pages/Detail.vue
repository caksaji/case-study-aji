<template>
  <div class="space-y-4">
    <SectionTitle title="Employee Detail" />
    <div v-if="!showSkeleton" class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
      <div class="col-span-1">
        <div class="p-4 rounded-md bg-white shadow-md dark:bg-gray-800">
          <div class="font-semibold">
            First name
          </div>
          <span class="pl-4">{{ employeeStore.single.firstName }}</span>
        </div>
      </div>
      <div class="col-span-1">
        <div class="p-4 rounded-md bg-white shadow-md dark:bg-gray-800">
          <div class="font-semibold">
            Last name
          </div>
          <span class="pl-4">{{ employeeStore.single.lastName }}</span>
        </div>
      </div>
      <div class="col-span-1">
        <div class="p-4 rounded-md bg-white shadow-md dark:bg-gray-800">
          <div class="font-semibold">
            NIP
          </div>
          <span class="pl-4">{{ employeeStore.single.nip }}</span>
        </div>
      </div>
      <div class="col-span-1">
        <div class="p-4 rounded-md bg-white shadow-md dark:bg-gray-800">
          <div class="font-semibold">
            Division
          </div>
          <span class="pl-4">{{ employeeStore.single.division }}</span>
        </div>
      </div>
      <div class="col-span-1">
        <div class="p-4 rounded-md bg-white shadow-md dark:bg-gray-800">
          <div class="font-semibold">
            Position
          </div>
          <span class="pl-4">{{ employeeStore.single.position }}</span>
        </div>
      </div>
      <div class="col-span-1">
        <div class="p-4 rounded-md bg-white shadow-md dark:bg-gray-800">
          <div class="font-semibold">
            Salary
          </div>
          <span class="pl-4"><SpNumberFormat :value="employeeStore.single.salary" type="currency" /></span>
        </div>
      </div>
      <div class="col-span-1">
        <div class="p-4 rounded-md bg-white shadow-md dark:bg-gray-800">
          <div class="font-semibold">
            Joined on
          </div>
          <span class="pl-4">{{ $date(employeeStore.single.joinDate) }}</span>
        </div>
      </div>
      <div class="col-span-1">
        <div class="p-4 rounded-md bg-white shadow-md dark:bg-gray-800">
          <div class="font-semibold">
            Address
          </div>
          <span class="pl-4">{{ employeeStore.single.address }}</span>
        </div>
      </div>
      <div class="col-span-1">
        <div class="p-4 rounded-md bg-white shadow-md dark:bg-gray-800">
          <div class="font-semibold">
            Birth date
          </div>
          <span class="pl-4">{{ $date(employeeStore.single.birthDate) }}</span>
        </div>
      </div>
    </div>
    <div class="flex gap-2 justify-end w-full">
      <SpButton color="white" @click="router.back()">
        Back
      </SpButton>
      <template v-if="!showSkeleton">
        <SpButton color="prime" @click="navigateTo('/update')">
          Update
        </SpButton>
        <SpButton color="red">
          Delete
        </SpButton>
      </template>
    </div>
  </div>
</template>

<script setup>
import SectionTitle from '~/components/partial/SectionTitle'
import SpButton from '~/components/partial/SpButton'
import SpNumberFormat from '~/components/partial/SpNumberFormat'

definePageMeta({ layout: 'bts' })

useHead({ title: 'Employee detail' })

const { $date } = useNuxtApp()
const router = useRouter()
const employeeCookie = useCookie('employee')
const employeeStore = useEmployeeStore()
const showSkeleton = ref(true)

onMounted( async () => {
  if (employeeCookie.value) {
    await employeeStore.getSingle(employeeCookie.value.id)
    .then(() => {
      employeeCookie.value = employeeStore.single
      showSkeleton.value = false
    })
  }
  else {
    navigateTo('/', { replace: true })
  }
})
</script>
