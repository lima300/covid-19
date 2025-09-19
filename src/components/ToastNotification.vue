<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="fixed top-4 right-4 z-50 max-w-sm w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 animate-slide-up"
    >
      <div class="p-4">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <CheckCircleIcon
              v-if="type === 'success'"
              class="w-5 h-5 text-green-400"
            />
            <ExclamationTriangleIcon
              v-else-if="type === 'warning'"
              class="w-5 h-5 text-yellow-400"
            />
            <XCircleIcon
              v-else-if="type === 'error'"
              class="w-5 h-5 text-red-400"
            />
            <InformationCircleIcon v-else class="w-5 h-5 text-blue-400" />
          </div>
          <div class="ml-3 w-0 flex-1">
            <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
              {{ title }}
            </p>
            <p
              v-if="message"
              class="mt-1 text-sm text-gray-500 dark:text-gray-400"
            >
              {{ message }}
            </p>
          </div>
          <div class="ml-4 flex-shrink-0 flex">
            <button
              @click="close"
              class="rounded-md inline-flex text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <XMarkIcon class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";

interface Props {
  type?: "success" | "warning" | "error" | "info";
  title: string;
  message?: string;
  duration?: number;
  autoClose?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "info",
  duration: 5000,
  autoClose: true,
});

const emit = defineEmits<{
  close: [];
}>();

const visible = ref(false);

const close = () => {
  visible.value = false;
  setTimeout(() => {
    emit("close");
  }, 300);
};

onMounted(() => {
  visible.value = true;

  if (props.autoClose) {
    setTimeout(() => {
      close();
    }, props.duration);
  }
});
</script>
