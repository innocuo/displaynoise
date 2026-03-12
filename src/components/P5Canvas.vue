<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

const props = defineProps({
  sketchLoader: {
    type: Function,
    required: true,
  },
  sketchOptions: {
    type: Object,
    default: () => ({}),
  },
});

const container = ref(null);
const errorMessage = ref('');

let currentInstance = null;
let p5Constructor = null;
let soundLoaded = false;
let mountToken = 0;

const hasError = computed(() => errorMessage.value.length > 0);

function teardown() {
  if (currentInstance) {
    currentInstance.remove();
    currentInstance = null;
  }
}

async function mountSketch() {
  mountToken += 1;
  const token = mountToken;

  errorMessage.value = '';
  teardown();

  if (!container.value) {
    return;
  }

  try {
    if (!p5Constructor) {
      const p5Module = await import('p5');
      p5Constructor = p5Module.default;
      globalThis.p5 = p5Constructor;
    }

    if (props.sketchOptions.requiresSound && !soundLoaded) {
      await import('p5.sound');
      soundLoaded = true;
    }

    const sketchFactory = await props.sketchLoader(props.sketchOptions);

    if (token !== mountToken || !container.value) {
      return;
    }

    currentInstance = new p5Constructor(sketchFactory, container.value);
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Unable to load sketch.';
  }
}

onMounted(() => {
  mountSketch();
});

watch(
  () => [props.sketchLoader, props.sketchOptions],
  () => {
    mountSketch();
  },
);

onBeforeUnmount(() => {
  teardown();
});
</script>

<template>
  <div class="sketch-stage">
    <div ref="container" class="sketch-canvas-host" />
    <p v-if="hasError" class="sketch-error">{{ errorMessage }}</p>
  </div>
</template>
