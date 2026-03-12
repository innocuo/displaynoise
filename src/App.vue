<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="app-shell">
    <header class="app-header">
      <div>
        <h1>displaynoise</h1>
      </div>

      <nav class="app-nav" aria-label="Primary">
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </header>
    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>
