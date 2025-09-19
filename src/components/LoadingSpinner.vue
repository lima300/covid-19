<template>
  <div class="flex flex-col items-center justify-center py-12">
    <div class="relative">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"
      ></div>
      <div
        class="absolute top-0 left-0 rounded-full h-12 w-12 border-t-2 border-primary-300 animate-ping"
      ></div>
    </div>
    <p class="mt-4 text-gray-600 dark:text-gray-400 text-sm font-medium">
      {{ message }}
    </p>
    <div
      v-if="showProgress"
      class="mt-2 w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-1"
    >
      <div
        class="bg-primary-600 h-1 rounded-full transition-all duration-300 ease-out"
        :style="{ width: `${progress}%` }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  message?: string;
  showProgress?: boolean;
  progress?: number;
}

withDefaults(defineProps<Props>(), {
  message: "Loading...",
  showProgress: false,
  progress: 0,
});
</script>
