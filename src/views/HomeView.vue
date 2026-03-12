<script setup>
import { sketchEntries } from "@/sketches";
</script>

<template>
  <section class="panel">
    <div class="sketch-list">
      <RouterLink
        v-for="entry in sketchEntries"
        :key="entry.id"
        class="sketch-list-item"
        :to="{ name: 'sketch-player', params: { id: entry.id } }"
      >
        <strong>{{ entry.title }}</strong>
        <span>{{ entry.summary }}</span>
      </RouterLink>
    </div>
  </section>
</template>
