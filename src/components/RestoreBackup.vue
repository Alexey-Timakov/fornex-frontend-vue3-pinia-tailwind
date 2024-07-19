<script setup lang="ts">
import type { TBackup } from '@/helpers/fetchData'
import ModalWrapper from '@/components/ModalWrapper.vue'
import { useStore } from '@/stores/store'
import { storeToRefs } from 'pinia'
import { useLoading } from 'vue-loading-overlay'
import { delay } from '@/helpers/delay'

interface IRestoreBackup {
  backup: TBackup
}
const { backup } = defineProps<IRestoreBackup>()

const appStore = useStore()

const { modalOpened } = storeToRefs(appStore)

const restoreBackup = async () => {
  const $loading = useLoading({
    canCancel: false,
    isFullPage: true,
    lockScroll: true
  }).show()

  await delay(3000)

  appStore.setModal(null)

  $loading.hide()
}
</script>

<template>
  <ModalWrapper
    :is-open="modalOpened === 'res'"
    @close="appStore.setModal(null)"
    @proceed="restoreBackup"
  >
    <template #header>Restore backup</template>
    <template #content>
      <div class="text-2xl my-4">
        <h3 class="text-3xl">Confirm restoring selected backup</h3>
        <p>Name: {{ backup.title }}</p>
        <p>Size: {{ backup.size_mb }} Mb</p>
        <p>Created: {{ new Date(+backup.date).toLocaleString() }}</p>
      </div>
    </template>
  </ModalWrapper>
</template>
