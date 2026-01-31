<template>
  <div
    :class="props.class"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="props.size"
      :height="props.size"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <Motion is="path" ref="pathRef" d="m9 20.247 6-16.5" />
    </svg>
  </div>
</template>

<script lang="ts">
export default {
  name: "SlashIcon",
};
</script>

<script setup lang="ts">
import { useMotion } from "@vueuse/motion";
import { ref } from "vue";

export interface Props {
  size?: number;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 28,
});

const variants = {
  normal: {
    pathLength: 1,
    pathOffset: 0,
    opacity: 1,
    transition: { duration: 0.4, opacity: { duration: 0.1 } },
  },
  animate: {
    pathLength: [0, 1],
    pathOffset: [1, 0],
    opacity: [0, 1],
    transition: { duration: 0.6, ease: "linear", opacity: { duration: 0.1 } },
  },
};

const pathRef = ref();
const motionInstance = useMotion(pathRef, {
  initial: variants.normal,
  enter: variants.normal,
});

let isControlled = false;

const startAnimation = () => {
  motionInstance.apply(variants.animate);
};

const stopAnimation = () => {
  motionInstance.apply(variants.normal);
};

const handleMouseEnter = () => {
  if (!isControlled) {
    startAnimation();
  }
};

const handleMouseLeave = () => {
  if (!isControlled) {
    stopAnimation();
  }
};

const setControlled = (value: boolean) => {
  isControlled = value;
};

defineExpose({
  startAnimation,
  stopAnimation,
  setControlled,
});
</script>
