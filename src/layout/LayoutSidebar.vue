<script setup lang="ts">
import { routes } from '@/router'
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="grid grid-cols-1 items-start gap-8 p-4 text-2xl text-slate-500">
    <RouterLink
      active-class="text-slate-700 font-bold"
      v-for="r in routes"
      :key="r.path"
      :to="r.path"
      >{{ r.name }}</RouterLink
    >
  </nav>
</template>
