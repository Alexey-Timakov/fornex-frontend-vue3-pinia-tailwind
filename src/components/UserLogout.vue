<script setup lang="ts">
import ModalWrapper from '@/components/ModalWrapper.vue'
import { delay } from '@/helpers/delay'
import { logoutFromSession } from '@/helpers/session'
import router from '@/router'
import { useStore } from '@/stores/store'
import { storeToRefs } from 'pinia'
import { useLoading } from 'vue-loading-overlay'

const appStore = useStore()

const { modalOpened } = storeToRefs(appStore)

const logout = async () => {
  const $loading = useLoading({
    canCancel: false,
    isFullPage: true,
    lockScroll: true
  }).show()

  await delay(1000)

  appStore.setUser(null)
  appStore.clearBackups()
  logoutFromSession()
  appStore.setModal(null)

  router.push('/')

  $loading.hide()
}
</script>

<template>
  <ModalWrapper :is-open="modalOpened === 'out'" @close="appStore.setModal(null)" @proceed="logout">
    <template #header>Logout from current session</template>
    <template #content>
      <div class="text-2xl my-4">
        <h3 class="text-3xl">Confirm logout</h3>
      </div>
    </template>
  </ModalWrapper>
</template>
