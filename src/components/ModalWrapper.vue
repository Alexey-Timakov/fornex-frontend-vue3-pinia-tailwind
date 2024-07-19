<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'

interface IModalProps {
  isOpen: boolean
}

const { isOpen } = defineProps<IModalProps>()

const emits = defineEmits<{
  close: []
  proceed: []
}>()

const target = ref(null)
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed z-[9998] top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="w-[50rem] p-10 min-h-[20rem] bg-white shadow-md" ref="target">
      <div class="text-5xl">
        <slot name="header"></slot>
      </div>
      <div class="">
        <slot name="content"></slot>
      </div>
      <div class="">
        <slot name="footer">
          <div class="grid grid-cols-2 gap-8 justify-between mt-8 text-2xl">
            <button
              class="text-3xl bg-lime-400 px-8 py-2 mb-8 active:bg-lime-500 duration-200"
              @click.stop="emits('proceed')"
            >
              Ok
            </button>
            <button
              class="text-3xl bg-red-400 px-8 py-2 mb-8 active:red-lime-500 duration-200"
              @click.stop="emits('close')"
            >
              Cancel
            </button>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>
