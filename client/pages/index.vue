<template>
  <div class="space-y-4">
    <div class="flex w-full">
      <SectionTitle title="Employee List" />
      <SpButton
        v-if="!showSkeleton"
        color="prime"
        :loading="loadingAdd"
        :disabled="loadingAdd"
        class="ml-auto"
        @click="openAddForm"
      >
        Add employee
      </SpButton>
    </div>
    <div>
      <SpTable
        :show-skeleton="showSkeleton"
        :empty-data="listEmplopyee.data && listEmplopyee.data.length > 0 ? false : true"
        empty-data-text="Oops, there is no employee found"
        :meta="{
          from: ((listEmplopyee.next ? listEmplopyee.next - 1 : listEmplopyee.last) * 10) - 9,
          to: (listEmplopyee.next ? listEmplopyee.next - 1 : listEmplopyee.last) * 10 <= listEmplopyee.items ? (listEmplopyee.next ? listEmplopyee.next - 1 : listEmplopyee.last) * 10 : listEmplopyee.items,
          total: listEmplopyee.items,
          current_page: listEmplopyee.next ? listEmplopyee.next - 1 : listEmplopyee.last,
          last_page: listEmplopyee.last
        }"
        @change-page="changePage"
      >
        <template #card>
          <div v-for="(em, index) in listEmplopyee.data" :key="index" class="card-col">
            <div class="card-border bg-white dark:bg-gray-800">
              <div class="title w-full">
                {{ em.nip }}
              </div>
              <div>
                {{ em.firstName }}, {{ em.lastName }}
              </div>
              <div>
                {{ em.division }}, {{ em.position }}
              </div>
              <div class="divide-y divide-gray-400 dark:divide-gray-500">
                <div class="flex gap-2 items-center w-full py-2">
                  <IconSvg name="calendar-plus" class="h-5 w-5" />
                  <span>{{ date(em.joinDate) }}</span>
                </div>
                <div class="flex gap-2 items-center w-full py-2">
                  <IconSvg name="receive-dollars" class="h-5 w-5" />
                  <SpNumberFormat :value="em.salary" type="currency" />
                </div>
                <div class="flex gap-2 items-center w-full py-2">
                  <IconSvg name="home-alt" class="h-5 w-5" />
                  <span>{{ em.address }}</span>
                </div>
                <div class="flex gap-2 items-center w-full py-2">
                  <IconSvg name="birthday-cake" class="h-5 w-5" />
                  <span>{{ date(em.birthDate) }}</span>
                </div>
              </div>
              <div class="flex justify-end gap-2 w-full">
                <SpButton color="prime" border @click="openDetail(em.id)">
                  Detail
                </SpButton>
              </div>
            </div>
          </div>
        </template>
        <template #thead>
          <span class="tcell w-52">NIP</span>
          <span class="tcell w-52">Division</span>
          <span class="tcell w-32">Join date</span>
          <span class="tcell w-36 text-center">Salary</span>
          <span class="tcell w-full shrink">Address</span>
          <span class="tcell w-32">Birth date</span>
          <span class="tcell w-24" />
        </template>
        <template #tbody>
          <div v-for="(em, index) in listEmplopyee.data" :key="index" class="tbody">
            <div class="tcell w-52">
              <div class="font-semibold">
                {{ em.nip }}
              </div>
              {{ em.firstName }}, {{ em.lastName }}
            </div>
            <span class="tcell w-52">{{ em.division }},<br>{{ em.position }}</span>
            <span class="tcell w-32">{{ date(em.joinDate) }}</span>
            <span class="tcell w-36 text-right"><SpNumberFormat :value="em.salary" type="currency" /></span>
            <span class="tcell w-full shrink">{{ em.address }}</span>
            <span class="tcell w-32">{{ date(em.birthDate) }}</span>
            <div class="tcell flex justify-end gap-2 w-24">
              <div>
                <SpButton color="prime" border @click="openDetail(em.id)">
                  Detail
                </SpButton>
              </div>
            </div>
          </div>
        </template>
      </SpTable>
    </div>
  </div>
</template>

<script setup>
import SectionTitle from '~/components/partial/SectionTitle'
import SpButton from '~/components/partial/SpButton'
import SpTable from '~/components/partial/SpTable'
import IconSvg from '~/components/partial/IconSvg'
import SpNumberFormat from '~/components/partial/SpNumberFormat'

definePageMeta({ layout: 'bts' })

useHead({ title: 'Employee list' })

const newestEmployeeCookie = useCookie('newestEmployee')
const employeeCookie = useCookie('employee')
const employeeStore = useEmployeeStore()
const showSkeleton = ref(true)
const filter = ref({ page: 1 })
const listEmplopyee = ref({})
const loadingAdd = ref(false)

onMounted(() => {
  newestEmployeeCookie.value = null
  employeeCookie.value = null
  loadData()
})

const loadData = async () => {
  showSkeleton.value = true
  await employeeStore.getAll(filter.value)
    .then(() => {
      listEmplopyee.value = JSON.parse(JSON.stringify(employeeStore.all))
      showSkeleton.value = false
    })
}
const date = (date) => {
  const sd = date.split('-')
  return new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(`${sd[1]}-${sd[0]}-${sd[2]}`))
}
const changePage = async (to) => {
  filter.value.page = to
  loadData()
}
const openAddForm = async () => {
  loadingAdd.value = true
  await employeeStore.getLast(listEmplopyee.value.items)
    .then(() => {
      const le = employeeStore.last.data[0]
      newestEmployeeCookie.value = { date: le.joinDate, number: Number(le.nip.split('-')[2]) }
      navigateTo('/add')
      loadingAdd.value = false
    })
}
const openDetail = (data) => {
  employeeCookie.value = { id: data }
  navigateTo('/detail')
}
</script>
