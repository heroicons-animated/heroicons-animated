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
      <Motion is="path" ref="path1Ref" d="M6 6l12 12" />
      <Motion is="path" ref="path2Ref" d="M18 6l-12 12" />
    </svg>
  </div>
</template>

<script lang="ts">
export default {
  name: "XMarkIcon",
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
    opacity: 1,
    pathLength: 1,
    transition: { duration: 0.2 },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const path1Ref = ref();
const path2Ref = ref();
const motion1 = useMotion(path1Ref, {
  initial: pathVariants.normal,
  enter: pathVariants.normal,
});
const motion2 = useMotion(path2Ref, {
  initial: pathVariants.normal,
  enter: pathVariants.normal,
});

let isControlled = false;

const path2Animate = {
  opacity: [0, 1],
  pathLength: [0, 1],
  transition: { duration: 0.4, ease: "easeOut", delay: 0.2 },
};

const startAnimation = () => {
  motion1.apply(pathVariants.animate);
  motion2.apply(path2Animate);
};

const stopAnimation = () => {
  motion1.apply(pathVariants.normal);
  motion2.apply(pathVariants.normal);
};

const handleMouseEnter = () => {
  if (!isControlled) startAnimation();
};
const handleMouseLeave = () => {
  if (!isControlled) stopAnimation();
};
const setControlled = (value: boolean) => {
  isControlled = value;
};

defineExpose({ startAnimation, stopAnimation, setControlled });
</script>
