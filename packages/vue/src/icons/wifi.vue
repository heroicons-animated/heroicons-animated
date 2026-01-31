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
      <path d="M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0" />
      <Motion
        is="path"
        ref="arc1Ref"
        d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0"
      />
      <Motion
        is="path"
        ref="arc2Ref"
        d="M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0"
      />
      <Motion
        is="path"
        ref="arc3Ref"
        d="M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0"
      />
    </svg>
  </div>
</template>

<script lang="ts">
export default {
  name: "WifiIcon",
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

const normal = {
  opacity: 1,
  scale: 1,
  transition: { duration: 0.2, ease: "easeOut" },
};
const createPulse = (delay: number) => ({
  opacity: [1, 0, 0, 1],
  scale: [1, 0, 0, 1],
  transition: {
    duration: 0.6,
    ease: "easeInOut",
    delay,
    opacity: { duration: 0.6, times: [0, 0.333, 0.666, 1], delay },
    scale: { duration: 0.6, times: [0, 0.333, 0.666, 1], delay },
  },
});

const arc1Ref = ref();
const arc2Ref = ref();
const arc3Ref = ref();
const motion1 = useMotion(arc1Ref, { initial: normal, enter: normal });
const motion2 = useMotion(arc2Ref, { initial: normal, enter: normal });
const motion3 = useMotion(arc3Ref, { initial: normal, enter: normal });

let isControlled = false;

const startAnimation = () => {
  motion1.apply(createPulse(0));
  motion2.apply(createPulse(0.2));
  motion3.apply(createPulse(0.4));
};

const stopAnimation = () => {
  motion1.apply(normal);
  motion2.apply(normal);
  motion3.apply(normal);
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
