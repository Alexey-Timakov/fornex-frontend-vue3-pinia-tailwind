import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchBackups, fetchProjects, type TBackup, type TProject } from "@/helpers/fetchData";
import { delay } from "@/helpers/delay";

export type TModal = "add" | "rem" | "res" | "load" | null;

interface IAppState {
  user: Ref<string | null>;
  backups: Ref<TBackup[] | []>;
  projects: Ref<TProject[] | []>;
  modalOpened: Ref<TModal>;
  isProcessing: Ref<boolean>;
  getProjects: () => Promise<void>;
  getInitialBackups: () => Promise<void>;
  addNewBackup: (newBackup: TBackup) => Promise<void>;
  removeBackup: (backup: TBackup) => Promise<void>;
  setModal: (modal: TModal) => void;
}

export const useStore = defineStore<string, IAppState>('store', () => {
  const user = ref(null);

  const backups = ref<TBackup[]>([]);

  const projects = ref<TProject[]>([]);

  const isProcessing = ref<boolean>(false);

  const modalOpened = ref<TModal>(null);

  function setModal(modal: TModal) {
    modalOpened.value = modal;
  }

  async function getProjects() {
    isProcessing.value = true;
    const res = await fetchProjects();

    if (res && res.length) {
      await delay(2000);
      projects.value = res;

    }
    isProcessing.value = false;
  }

  async function getInitialBackups() {
    isProcessing.value = true;
    const res = await fetchBackups();

    if (res && res.length) {
      await delay(500);
      backups.value = res;

    }
    isProcessing.value = false;
  }

  async function addNewBackup(newBackup: TBackup) {
    isProcessing.value = true;
    await delay(2000);
    backups.value.push(newBackup);
    isProcessing.value = false;
  }

  async function removeBackup(backup: TBackup) {
    isProcessing.value = true;
    await delay(2000);
    backups.value = backups.value.filter(b => b.id !== backup.id);
    isProcessing.value = false;
  }

  return {
    user,
    backups,
    projects,
    modalOpened,
    isProcessing,
    getInitialBackups,
    getProjects,
    addNewBackup,
    removeBackup,
    setModal
  }
})