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
        d="M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
      />
      <Motion
        is="path"
        ref="wave1Ref"
        d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304"
        style="transform-origin: 12px 12px"
      />
      <Motion
        is="path"
        ref="wave2Ref"
        d="M7.227 16.773a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546"
        style="transform-origin: 12px 12px"
      />
      <Motion
        is="path"
        ref="wave3Ref"
        d="M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788"
        style="transform-origin: 12px 12px"
      />
    </svg>
  </div>
</template>

<script lang="ts">
export default {
  name: "SignalIcon",
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
  },
  animate: {
    opacity: [1, 0, 1],
    scale: [1, 0, 1],
    transition: {
      delay,
      duration: 0.4,
      ease: "easeInOut",
    },
  },
});

const wave1Ref = ref();
const wave2Ref = ref();
const wave3Ref = ref();

const motion1 = useMotion(wave1Ref, {
  initial: createWaveVariants(0).normal,
  enter: createWaveVariants(0).normal,
});
const motion2 = useMotion(wave2Ref, {
  initial: createWaveVariants(0.2).normal,
  enter: createWaveVariants(0.2).normal,
});
const motion3 = useMotion(wave3Ref, {
  initial: createWaveVariants(0.4).normal,
  enter: createWaveVariants(0.4).normal,
});

let isControlled = false;

const startAnimation = () => {
  motion1.apply(createWaveVariants(0).animate);
  motion2.apply(createWaveVariants(0.2).animate);
  motion3.apply(createWaveVariants(0.4).animate);
};

const stopAnimation = () => {
  motion1.apply(createWaveVariants(0).normal);
  motion2.apply(createWaveVariants(0.2).normal);
  motion3.apply(createWaveVariants(0.4).normal);
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
