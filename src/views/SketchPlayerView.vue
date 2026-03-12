<script setup>
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

import P5Canvas from '@/components/P5Canvas.vue';
import { getSketchEntryById, getSketchLoader } from '@/sketches';

const route = useRoute();

const sketchEntry = computed(() => getSketchEntryById(route.params.id));
const sketchLoader = computed(() => getSketchLoader(sketchEntry.value));
const sketchOptions = computed(() => ({
  requiresSound: Boolean(sketchEntry.value?.requiresSound),
}));
</script>

<template>
  <section v-if="sketchEntry" class="panel sketch-player-layout">
    <div class="sketch-player-header">
      <div>
        <p class="eyebrow">Sketch</p>
        <h2>{{ sketchEntry.title }}</h2>
      </div>

      <RouterLink class="back-link" to="/">Back Home</RouterLink>
    </div>

    <p class="lead">{{ sketchEntry.summary }}</p>
    <P5Canvas v-if="sketchLoader" :sketch-loader="sketchLoader" :sketch-options="sketchOptions" />
  </section>

  <section v-else class="panel">
    <div class="sketch-player-header">
      <div>
        <p class="eyebrow">Missing</p>
        <h2>Sketch not found</h2>
      </div>

      <RouterLink class="back-link" to="/">Back Home</RouterLink>
    </div>
  </section>
</template>
