<script setup lang="ts">
import { RouterView } from 'vue-router'
import LayoutHeader from '@/layout/LayoutHeader.vue'
import LayoutSidebar from '@/layout/LayoutSidebar.vue'
</script>

<template>
  <div class="layout grid">
    <header class="header bg-slate-100 border-b-[0.1rem] p-4">
      <LayoutHeader />
    </header>
    <aside class="aside bg-slate-100 border-r-[0.1rem] p-4">
      <LayoutSidebar />
    </aside>
    <div class="view bg-slate-100 p-4 lg:px-20">
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
