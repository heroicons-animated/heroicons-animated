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
        d="M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
      />
      <Motion
        is="path"
        ref="wave1Ref"
        d="M16.463 8.288a5.25 5.25 0 0 1 0 7.424"
      />
      <Motion is="path" ref="wave2Ref" d="M19.114 5.636a9 9 0 0 1 0 12.728" />
    </svg>
  </div>
</template>

<script lang="ts">
export default {
  name: "SpeakerWaveIcon",
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

// Match React: opacity/scale pulse with delay 0.2*(index-1), duration 0.2, repeat 1 reverse
const normal = { opacity: 1, scale: 1 };
const animateWave1 = {
  opacity: [1, 0, 1],
  scale: [1, 0, 1],
  transition: { duration: 0.4, ease: "easeInOut", times: [0, 0.5, 1] },
};
const animateWave2 = {
  opacity: [1, 0, 1],
  scale: [1, 0, 1],
  transition: {
    duration: 0.4,
    ease: "easeInOut",
    times: [0, 0.5, 1],
    delay: 0.2,
  },
};

const wave1Ref = ref();
const wave2Ref = ref();
const motion1 = useMotion(wave1Ref, { initial: normal, enter: normal });
const motion2 = useMotion(wave2Ref, { initial: normal, enter: normal });

let isControlled = false;

const startAnimation = () => {
  motion1.apply(animateWave1);
  motion2.apply(animateWave2);
};

const stopAnimation = () => {
  motion1.apply(normal);
  motion2.apply(normal);
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
