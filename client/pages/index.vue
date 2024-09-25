<template>
  <div class="space-y-4">
    <SectionTitle title="Employee List" />
    <div>
      <SpTable
        min-show-table-at="zero"
        :show-skeleton="showSkeleton"
        :empty-data="listTask ? false : true"
        empty-data-text="Oops, there is no employee found"
      >
        <template #thead>
          <span class="tcell w-28">Kode</span>
          <span class="tcell w-full shrink">Tugas</span>
          <span class="tcell w-52">Status</span>
          <span class="tcell w-28">Untuk</span>
          <span class="tcell w-52">Durasi</span>
          <span class="tcell w-24">Kategori</span>
        </template>
        <template #tbody>
          <div v-for="(item, index) in listTask" :key="index" class="tbody">
            <span class="tcell w-28">{{ item.code }}</span>
            <span class="tcell w-full shrink">{{ item.code }}</span>
            <span class="tcell w-52">{{ item.code }}</span>
            <span class="tcell w-28">{{ item.code }}</span>
            <span class="tcell w-52">{{ item.code }}</span>
            <span class="tcell w-24">{{ item.code }}</span>
          </div>
        </template>
      </SpTable>
    </div>
  </div>
</template>

<script setup>
import SectionTitle from '~/components/partial/SectionTitle'
import SpButton from '~/components/partial/SpButton'
import IconSvg from '~/components/partial/IconSvg'
import SpTable from '~/components/partial/SpTable'

definePageMeta({
  layout: 'bts'
})

useHead({ title: 'Employee list' })

const colorMode = useColorMode()
const showSkeleton = ref(true)
const listTask = ref([])

onMounted(() => loadData())

const getAllTask = computed(() => {
  return {
    data: {
      name: 'Static Task',
      date: ['2024-10-01', '2025-11-31'],
      assignee: [
        { id: 'asgn-1', name: 'ASGN 1' },
        { id: 'asgn-2', name: 'ASGN 2' }
      ],
      codePrefix: 'STT',
      task: [
        {
          code: '123',
          taskName: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, sunt.',
          status: 'unassigned',
          assignee: null,
          date: ['2024-10-02', '2024-10-04'],
          category: null,
          description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, sunt.'
        }
      ]
    }
  }
})

const loadData = async () => {
  showSkeleton.value = true
  listTask.value = JSON.parse(JSON.stringify(getAllTask.value.data.task))
  showSkeleton.value = false
}
const formatDate = (date) => {
  let formatted = null
  if (date[0] === date[1]) {
    formatted = `${date[0].getDate()} ${formatMonth(date[0].getMonth() + 1)} ${date[0].getFullYear()}`
  }
  else if ((date[0].getMonth() + 1) === (date[1].getMonth() + 1)) {
    formatted = `${date[0].getDate()} - ${date[1].getDate()} ${formatMonth(date[0].getMonth() + 1)} ${date[0].getFullYear()}`
  }
  else if (date[0].getFullYear() === date[1].getFullYear()) {
    formatted = `${date[0].getDate()} ${formatMonth(date[0].getMonth() + 1)} - ${date[1].getDate()} ${formatMonth(date[1].getMonth() + 1)} ${date[0].getFullYear()}`
  }
  else {
    formatted = `${date[0].getDate()} ${formatMonth(date[0].getMonth() + 1)} ${date[0].getFullYear()} - ${date[1].getDate()} ${formatMonth(date[1].getMonth() + 1)} ${date[1].getFullYear()}`
  }
  let diffInTime = date[1].getTime() - date[0].getTime()
  let diffInDay = Math.round(diffInTime / (1000 * 3600 * 24))

  return `${formatted}\n(${diffInDay + 1} hari)`
}
const formatMonth = (month) => {
  const newDate = new Date(`1970-${month}-01`)
  return new Intl.DateTimeFormat('id-ID', { month: 'short' }).format(newDate)
}
</script>
