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
      <path d="M6 18.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
      <Motion
        is="path"
        ref="wave1Ref"
        d="M12.75 19.5v-.75a7.5 7.5 0 0 0-7.5-7.5H4.5"
      />
      <Motion
        is="path"
        ref="wave2Ref"
        d="M4.5 4.5h.75c7.87 0 14.25 6.38 14.25 14.25v.75"
      />
    </svg>
  </div>
</template>

<script lang="ts">
export default {
  name: "RssIcon",
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

const createWaveVariants = (delay: number) => ({
  normal: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  animate: {
    opacity: [1, 0, 1],
    scale: [1, 0, 1],
    transition: {
      duration: 0.4,
      ease: "easeInOut",
      delay,
      times: [0, 0.5, 1],
    },
  },
});

const wave1Ref = ref();
const wave2Ref = ref();
const motion1 = useMotion(wave1Ref, {
  initial: createWaveVariants(0).normal,
  enter: createWaveVariants(0).normal,
});
const motion2 = useMotion(wave2Ref, {
  initial: createWaveVariants(0.2).normal,
  enter: createWaveVariants(0.2).normal,
});

let isControlled = false;

const startAnimation = () => {
  motion1.apply(createWaveVariants(0).animate);
  motion2.apply(createWaveVariants(0.2).animate);
};

const stopAnimation = () => {
  motion1.apply(createWaveVariants(0).normal);
  motion2.apply(createWaveVariants(0.2).normal);
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
