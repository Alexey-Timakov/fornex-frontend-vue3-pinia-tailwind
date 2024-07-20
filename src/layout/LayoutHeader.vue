<script setup lang="ts">
import { routes } from '@/router'
import { useStore } from '@/stores/store'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ExitIcon from '@/icons/Exit.svg'
import EnterIcon from '@/icons/Enter.svg'
import UserLogout from '@/components/UserLogout.vue'

const route = useRoute()
const appStore = useStore()

const pageTitle = ref(routes.filter((r) => r.path === route.fullPath)[0].name)

watch(
  () => route.fullPath,
  (newPath, oldPath) => {
    pageTitle.value = routes.filter((r) => r.path === newPath)[0].name
  }
)

const openLogoutWindow = async () => {
  appStore.setModal('out')
}
</script>

<template>
  <div class="grid grid-cols-[1fr_auto_3rem] gap-4 items-center text-3xl">
    <span>
      {{ pageTitle }}
    </span>
    <span class="">
      {{ appStore.currentUser }}
    </span>
    <span class="p-2">
      <ExitIcon
        v-if="appStore.currentUser !== null"
        class="cursor-pointer hover:fill-red-500"
        :onclick="openLogoutWindow"
      />
      <EnterIcon v-else />
    </span>
  </div>
  <UserLogout v-if="appStore.modalOpened === 'out'" />
</template>
