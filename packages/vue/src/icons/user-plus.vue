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
        d="M13.75 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
      />
      <Motion is="path" ref="vertRef" d="M18 7.5v6" />
      <Motion is="path" ref="horizRef" d="M15 10.5h6" />
    </svg>
  </div>
</template>

<script lang="ts">
export default {
  name: "UserPlusIcon",
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

const vertVariants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    transition: {
      delay: 0.3,
      duration: 0.2,
      opacity: { duration: 0.1, delay: 0.3 },
    },
  },
};
const horizVariants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    transition: {
      delay: 0.6,
      duration: 0.2,
      opacity: { duration: 0.1, delay: 0.6 },
    },
  },
};

const vertRef = ref();
const horizRef = ref();
const motionVert = useMotion(vertRef, {
  initial: vertVariants.normal,
  enter: vertVariants.normal,
});
const motionHoriz = useMotion(horizRef, {
  initial: horizVariants.normal,
  enter: horizVariants.normal,
});

let isControlled = false;

const startAnimation = () => {
  motionVert.apply(vertVariants.animate);
  motionHoriz.apply(horizVariants.animate);
};

const stopAnimation = () => {
  motionVert.apply(vertVariants.normal);
  motionHoriz.apply(horizVariants.normal);
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
