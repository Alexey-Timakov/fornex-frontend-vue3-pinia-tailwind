<script setup lang="ts">
import type { TBackup, TProject } from '@/helpers/fetchData'
import ModalWrapper from '@/components/ModalWrapper.vue'
import { useStore } from '@/stores/store'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useLoading } from 'vue-loading-overlay'

const appStore = useStore()

const { backups, projects, modalOpened } = storeToRefs(appStore)

const selected = ref<TProject>()

const getProjects = async () => {
  await appStore.getProjects()
}

const addNewBackup = async () => {
  const $loading = useLoading({
    canCancel: false,
    isFullPage: true,
    lockScroll: true
  }).show()

  const newBackup: TBackup = {
    date: Date.now().toString(),
    id: (+backups.value[backups.value.length - 1].id + 1).toString(),
    size_mb: Math.floor(Math.random() * 300).toString(),
    title: selected.value?.name || 'unknown'
  }

  await appStore.addNewBackup(newBackup)
  appStore.setModal(null)
  $loading.hide()
}

getProjects()
</script>

<template>
  <ModalWrapper
    :is-open="modalOpened === 'add'"
    @close="appStore.setModal(null)"
    @proceed="addNewBackup"
  >
    <template #header>Create new backup</template>
    <template #content>
      <form class="flex flex-col text-2xl">
        <label class="my-4" for="projects">Choose a project:</label>
        <select
          v-if="projects.length > 0"
          :disabled="projects.length === 0"
          class="*:my-4 bg-slate-200 p-2 outline-slate-400"
          id="projects"
          v-model="selected"
        >
          <option v-for="p in projects" :key="p.id" :value="p">
            {{ p.name }}
          </option>
        </select>
        <select v-else disabled class="*:my-4 bg-slate-200 p-2 outline-slate-400">
          <option selected>Loading...</option>
        </select>
      </form>
    </template>
  </ModalWrapper>
</template>
