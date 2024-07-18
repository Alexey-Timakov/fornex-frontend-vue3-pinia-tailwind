<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="layout grid">
    <header class="header bg-slate-100 border-b-[0.1rem] p-4">
      <div>Header</div>
    </header>
    <aside class="aside bg-slate-100 border-r-[0.1rem] p-4">
      <nav>
        <RouterLink to="/">Login</RouterLink>
        <RouterLink to="/backups">Backups</RouterLink>
      </nav>
    </aside>
    <div class="view bg-slate-100 p-4 lg:px-20">
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
