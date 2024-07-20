import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchBackups, fetchProjects, type TBackup, type TProject } from "@/helpers/fetchData";
import { delay } from "@/helpers/delay";
import { checkUserInLs, loadPrevSession, saveCurrentSession } from "@/helpers/session";

export type TModal = "add" | "rem" | "res" | "load" | "out" | null;

interface IAppState {
  currentUser: Ref<string | null>;
  setUser: (user: string | null) => void;
  backups: Ref<TBackup[] | []>;
  projects: Ref<TProject[] | []>;
  modalOpened: Ref<TModal>;
  getProjects: () => Promise<void>;
  getInitialBackups: (user: string) => Promise<void>;
  clearBackups: () => void;
  addNewBackup: (newBackup: TBackup) => Promise<void>;
  removeBackup: (backup: TBackup) => Promise<void>;
  setModal: (modal: TModal) => void;
}

export const useStore = defineStore<string, IAppState>('store', () => {
  const currentUser = ref<string | null>(null);

  const backups = ref<TBackup[]>([]);

  const projects = ref<TProject[]>([]);

  const modalOpened = ref<TModal>(null);

  function setUser(user: string | null) {
    currentUser.value = user;
  }

  function setModal(modal: TModal) {
    modalOpened.value = modal;
  }

  async function getProjects() {
    const res = await fetchProjects();

    if (res && res.length) {
      await delay(2000);
      projects.value = res;

    }
  }

  function clearBackups() {
    backups.value = []
  }

  async function getInitialBackups(user: string) {
    const userStatus = checkUserInLs(user);

    if (userStatus) {
      const prevBackups = loadPrevSession()

      if (prevBackups) {
        backups.value = prevBackups;
        await delay(500);
        return;
      }
    }

    const res = await fetchBackups();

    if (res && res.length) {
      await delay(1000);
      backups.value = res;
      saveCurrentSession(user, backups.value);
    }
  }

  async function addNewBackup(newBackup: TBackup) {
    await delay(2000);
    backups.value.push(newBackup);
    saveCurrentSession(currentUser.value!, backups.value)
  }

  async function removeBackup(backup: TBackup) {
    await delay(2000);
    backups.value = backups.value.filter(b => b.id !== backup.id);
    saveCurrentSession(currentUser.value!, backups.value)
  }

  return {
    currentUser,
    setUser,
    projects,
    getProjects,
    backups,
    getInitialBackups,
    clearBackups,
    addNewBackup,
    removeBackup,
    modalOpened,
    setModal,
  }
})