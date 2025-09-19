<template>
  <div class="animated-counter">
    <span ref="counterElement">{{ displayValue }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";

interface Props {
  value: number;
  duration?: number;
  formatter?: (value: number) => string;
}

const props = withDefaults(defineProps<Props>(), {
  duration: 2000,
  formatter: (value: number) => value.toLocaleString(),
});

const displayValue = ref("0");
const counterElement = ref<HTMLElement>();

const animateCounter = (endValue: number) => {
  const startValue = 0;
  const startTime = Date.now();

  const updateCounter = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / props.duration, 1);

    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const currentValue = Math.floor(
      startValue + (endValue - startValue) * easeOutQuart
    );

    displayValue.value = props.formatter(currentValue);

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      displayValue.value = props.formatter(endValue);
    }
  };

  requestAnimationFrame(updateCounter);
};

watch(
  () => props.value,
  (newValue) => {
    if (newValue && newValue > 0) {
      animateCounter(newValue);
    }
  },
  { immediate: true }
);

onMounted(() => {
  if (props.value && props.value > 0) {
    animateCounter(props.value);
  }
});
</script>

<style scoped>
.animated-counter {
  font-variant-numeric: tabular-nums;
}
</style>
