<template>
  <div
    :class="props.class"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    v-bind="$attrs"
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
      <path d="M3 9h12a6 6 0 0 1 0 12h-3" />
      <Motion is="g" ref="arrowGroupRef">
        <path d="M9 15 3 9m0 0 6-6" />
      </Motion>
    </svg>
  </div>
</template>

<script lang="ts">
export default {
  name: "ArrowUturnLeftIcon",
};
</script>

<script setup lang="ts">
import { useMotion } from "@vueuse/motion";
import { ref } from "vue";

export interface Props {
  size?: number;
  class?: string;
  [key: string]: any;
}

const props = withDefaults(defineProps<Props>(), {
  size: 28,
});

const stretchVariants = {
  normal: { scaleX: 1, x: 0 },
  animate: {
    scaleX: [1, 1.15, 1],
    x: [0, -1.5, 0],
    transition: {
      duration: 0.45,
      ease: "easeInOut",
    },
  },
};

const arrowGroupRef = ref();
const motionInstance = useMotion(arrowGroupRef, {
  initial: stretchVariants.normal,
  enter: stretchVariants.normal,
});

let isControlled = false;

const startAnimation = () => {
  motionInstance.apply(stretchVariants.animate);
};

const stopAnimation = () => {
  motionInstance.apply(stretchVariants.normal);
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
