<script setup lang="ts">
import type { TBackup } from '@/helpers/fetchData'
import ModalWrapper from '@/components/ModalWrapper.vue'
import { useStore } from '@/stores/store'
import { storeToRefs } from 'pinia'
import { useLoading } from 'vue-loading-overlay'

interface IRemoveBackup {
  backup: TBackup
}
const { backup } = defineProps<IRemoveBackup>()

const appStore = useStore()

const { modalOpened } = storeToRefs(appStore)

const removeBackup = async () => {
  const $loading = useLoading({
    canCancel: false,
    isFullPage: true,
    lockScroll: true
  }).show()

  await appStore.removeBackup(backup)

  appStore.setModal(null)

  $loading.hide()
}
</script>

<template>
  <ModalWrapper
    :is-open="modalOpened === 'rem'"
    @close="appStore.setModal(null)"
    @proceed="removeBackup"
  >
    <template #header>Remove backup</template>
    <template #content>
      <div class="text-2xl my-4">
        <h3 class="text-3xl">Confirm removing</h3>
        <p>Name: {{ backup.title }}</p>
        <p>Size: {{ backup.size_mb }} Mb</p>
        <p>Created: {{ new Date(+backup.date).toLocaleString() }}</p>
      </div>
    </template>
  </ModalWrapper>
</template>
