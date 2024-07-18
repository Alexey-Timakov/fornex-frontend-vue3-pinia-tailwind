<script setup lang="ts">
import BackupItem from '@/components/BackupItem.vue'
import { fetchBackups, type TBackup } from '@/helpers/fetchData'
import { ref } from 'vue'

const backups = ref<TBackup[]>([])

const getBackups = async () => {
  backups.value = (await fetchBackups()) || []
}

getBackups()
</script>

<template>
  <div v-if="backups?.length">
    <h3 class="text-3xl mt-4 mb-4">Available backups: {{ backups.length }}</h3>
    <BackupItem v-for="b in backups" :key="b.id" :item="b" />
  </div>
</template>
