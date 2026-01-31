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
      <path
        d="M12 12a8.912 8.912 0 0 1-.318-.079c-1.585-.424-2.904-1.247-3.76-2.236-.873-1.009-1.265-2.19-.968-3.301.59-2.2 3.663-3.29 6.863-2.432A8.186 8.186 0 0 1 16.5 5.21M6.42 17.81c.857.99 2.176 1.812 3.761 2.237 3.2.858 6.274-.23 6.863-2.431.233-.868.044-1.779-.465-2.617"
      />
      <Motion is="path" ref="lineRef" d="M3.75 12h16.5" />
    </svg>
  </div>
</template>

<script lang="ts">
export default {
  name: "StrikethroughIcon",
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

const lineVariants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    transition: { duration: 0.4 },
  },
};

const lineRef = ref();
const motionInstance = useMotion(lineRef, {
  initial: lineVariants.normal,
  enter: lineVariants.normal,
});

let isControlled = false;

const startAnimation = () => {
  motionInstance.apply(lineVariants.animate);
};

const stopAnimation = () => {
  motionInstance.apply(lineVariants.normal);
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
