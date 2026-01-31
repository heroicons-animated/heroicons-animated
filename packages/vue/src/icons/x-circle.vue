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
      <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      <Motion is="path" ref="path1Ref" d="m9.75 9.75 4.5 4.5" />
      <Motion is="path" ref="path2Ref" d="m14.25 9.75-4.5 4.5" />
    </svg>
  </div>
</template>

<script lang="ts">
export default {
  name: "XCircleIcon",
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

const pathVariants = {
  normal: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  animate: {
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const path2Variants = {
  normal: {
    ...pathVariants.normal,
  },
  animate: {
    ...pathVariants.animate,
    transition: { duration: 0.4, ease: "easeOut", delay: 0.2 },
  },
};

const path1Ref = ref();
const path2Ref = ref();
const motion1 = useMotion(path1Ref, {
  initial: pathVariants.normal,
  enter: pathVariants.normal,
});
const motion2 = useMotion(path2Ref, {
  initial: path2Variants.normal,
  enter: path2Variants.normal,
});

let isControlled = false;

const startAnimation = () => {
  motion1.apply(pathVariants.animate);
  motion2.apply(path2Variants.animate);
};

const stopAnimation = () => {
  motion1.apply(pathVariants.normal);
  motion2.apply(path2Variants.normal);
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
