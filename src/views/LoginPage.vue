<script setup lang="ts">
import { delay } from '@/helpers/delay'
import { logoutFromSession } from '@/helpers/session'
import router from '@/router'
import { useStore } from '@/stores/store'
import { ref } from 'vue'
import { useLoading } from 'vue-loading-overlay'

const userName = ref<string>('')

const appStore = useStore()

const login = () => {
  appStore.setUser(userName.value)
  router.push('/backups')
}

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

  $loading.hide()
}
</script>

<template>
  <div class="flex flex-col h-full items-center">
    <form
      v-if="appStore.currentUser === null"
      @submit.prevent="login"
      class="flex flex-col w-[50rem] text-2xl py-20 px-40 mt-40 shadow-md"
    >
      <label class="my-4 text-3xl mb-10" for="name">Login:</label>
      <input
        class="my-4 bg-slate-200 px-4 py-2 outline-slate-400"
        type="text"
        name="name"
        id="name"
        placeholder="Name"
        v-model="userName"
      />
      <button
        :disabled="userName.length === 0"
        type="submit"
        class="text-3xl bg-slate-500 text-white px-8 py-2 mt-8 active:bg-slate-600 disabled:bg-slate-300 duration-200"
      >
        Enter
      </button>
    </form>

    <div v-else class="flex flex-col w-[50rem] text-2xl py-20 px-40 mt-40 shadow-md">
      <h3 class="text-3xl mb-4">Wow! Not so fast, cowboy!</h3>
      <p>You are currently have an active session</p>
      <button class="text-3xl bg-red-500 px-8 py-2 mt-8 text-white" @click="logout">
        Leave session
      </button>
    </div>
  </div>
</template>
