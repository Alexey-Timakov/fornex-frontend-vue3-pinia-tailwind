<script setup lang="ts">
import type { TBackup } from '@/helpers/fetchData'
import DataIcon from '../icons/Data.svg'
import RemoveIcon from '../icons/Remove.svg'
import RestoreIcon from '../icons/Restore.svg'

interface IBackupItem {
  item: TBackup
}

const { item } = defineProps<IBackupItem>()
</script>

<template>
  <div
    class="grid grid-cols-[3rem_3rem_1fr_7rem_15rem_3rem_3rem] mb-4 text-2xl font-thin items-center justify-items-stretch *:p-2 border-b-[0.1rem] *:border-r-[0.1rem]"
  >
    <span class="w-12 h-12 border-l-[0.1rem]">
      <DataIcon />
    </span>
    <p class="text-center">{{ item.id }}</p>
    <p>{{ item.title }}</p>
    <p class="text-center">{{ item.size_mb }} Mb</p>
    <p class="text-center">{{ new Date(+item.date).toLocaleString() }}</p>
    <span class="w-12 h-12">
      <RestoreIcon class="cursor-pointer" />
    </span>
    <span class="w-12 h-12">
      <RemoveIcon class="cursor-pointer" />
    </span>
  </div>
</template>
