<template>
  <div class="dashboard-card">
    <div class="flex items-center justify-between">
      <div class="flex-1">
        <p class="stat-label">{{ title }}</p>
        <div :class="['stat-value', colorClass]">
          <AnimatedCounter :value="value" />
        </div>
        <div v-if="change !== undefined" class="flex items-center mt-1">
          <component
            :is="changeIcon"
            class="w-4 h-4 mr-1"
            :class="changeColorClass"
          />
          <span :class="['text-sm font-medium', changeColorClass]">
            {{ Math.abs(change) }}% {{ changeDirection }}
          </span>
        </div>
      </div>
      <div :class="['p-3 rounded-full', iconBgClass]">
        <component :is="icon" :class="['w-6 h-6', iconColorClass]" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  UserGroupIcon,
  ExclamationTriangleIcon,
  HeartIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/vue/24/outline";
import AnimatedCounter from "./AnimatedCounter.vue";

interface Props {
  title: string;
  value: number;
  icon: string;
  color: string;
  change?: number;
}

const props = defineProps<Props>();

const iconMap = {
  users: UserGroupIcon,
  warning: ExclamationTriangleIcon,
  heart: HeartIcon,
};

const colorClass = computed(() => {
  const colorMap: Record<string, string> = {
    blue: "text-blue-600 dark:text-blue-400",
    red: "text-red-600 dark:text-red-400",
    green: "text-green-600 dark:text-green-400",
    yellow: "text-yellow-600 dark:text-yellow-400",
  };
  return colorMap[props.color] || "text-gray-600 dark:text-gray-400";
});

const iconBgClass = computed(() => {
  const bgMap: Record<string, string> = {
    blue: "bg-blue-100 dark:bg-blue-900",
    red: "bg-red-100 dark:bg-red-900",
    green: "bg-green-100 dark:bg-green-900",
    yellow: "bg-yellow-100 dark:bg-yellow-900",
  };
  return bgMap[props.color] || "bg-gray-100 dark:bg-gray-800";
});

const iconColorClass = computed(() => {
  const iconColorMap: Record<string, string> = {
    blue: "text-blue-600 dark:text-blue-400",
    red: "text-red-600 dark:text-red-400",
    green: "text-green-600 dark:text-green-400",
    yellow: "text-yellow-600 dark:text-yellow-400",
  };
  return iconColorMap[props.color] || "text-gray-600 dark:text-gray-400";
});

const icon = computed(() => {
  return iconMap[props.icon as keyof typeof iconMap] || UserGroupIcon;
});

const changeDirection = computed(() => {
  if (props.change === undefined) return "";
  return props.change >= 0 ? "increase" : "decrease";
});

const changeIcon = computed(() => {
  if (props.change === undefined) return null;
  return props.change >= 0 ? ArrowUpIcon : ArrowDownIcon;
});

const changeColorClass = computed(() => {
  if (props.change === undefined) return "";
  return props.change >= 0
    ? "text-green-600 dark:text-green-400"
    : "text-red-600 dark:text-red-400";
});
</script>
