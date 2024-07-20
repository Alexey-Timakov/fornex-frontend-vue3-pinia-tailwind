<script setup lang="ts">
import BackupItem from '@/components/BackupItem.vue'
import AddBackup from '@/components/AddBackup.vue'
import RestoreBackup from '@/components/RestoreBackup.vue'
import { useStore } from '@/stores/store'
import { storeToRefs } from 'pinia'
import { useLoading } from 'vue-loading-overlay'
import RemoveBackup from '@/components/RemoveBackup.vue'
import type { TBackup } from '@/helpers/fetchData'
import { ref } from 'vue'

const appStore = useStore()

const chosenBackup = ref<TBackup | null>(null)

const { backups, modalOpened, currentUser } = storeToRefs(appStore)

const getBackups = async () => {
  const $loading = useLoading({
    canCancel: false,
    isFullPage: true,
    lockScroll: true
  }).show()

  if (currentUser.value) {
    await appStore.getInitialBackups(currentUser.value)
  }

  $loading.hide()
}

const openAddNewBackupWindow = async () => {
  appStore.setModal('add')
}

const openRemoveBackupWindow = (backup: TBackup) => {
  chosenBackup.value = backup
  appStore.setModal('rem')
}

const openRestoreBackupWindow = (backup: TBackup) => {
  chosenBackup.value = backup
  appStore.setModal('res')
}

getBackups()
</script>

<template>
  <div v-if="backups?.length">
    <h3 class="text-3xl mt-4 mb-4">Available backups: {{ backups.length }}</h3>
    <BackupItem
      v-for="b in backups"
      :key="b.id"
      :item="b"
      @remove-backup="openRemoveBackupWindow"
      @restore-backup="openRestoreBackupWindow"
    />
  </div>
  <div v-else>
    <h3 class="text-3xl mt-4 mb-4">There are no backups for current user</h3>
  </div>
  <div class="my-8">
    <button
      @click="openAddNewBackupWindow"
      class="text-3xl bg-slate-400 px-8 py-2 mb-8 active:bg-slate-500 duration-200"
    >
      Create new backup
    </button>

    <AddBackup v-if="modalOpened === 'add'" />
    <RemoveBackup v-if="modalOpened === 'rem'" :backup="chosenBackup!" />
    <RestoreBackup v-if="modalOpened === 'res'" :backup="chosenBackup!" />
  </div>
</template>
