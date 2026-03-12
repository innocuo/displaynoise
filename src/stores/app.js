import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', () => {
  const migrationStatus = ref('scaffolded');
  const targetFolders = ref(['docs', 'p5sketches']);

  const statusLabel = computed(() => {
    if (migrationStatus.value === 'scaffolded') {
      return 'Scaffold ready for sketch migration';
    }

    return 'Migration in progress';
  });

  return {
    migrationStatus,
    statusLabel,
    targetFolders,
  };
});
