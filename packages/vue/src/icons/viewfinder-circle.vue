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
      <Motion
        is="path"
        ref="corner1Ref"
        d="M7.5 3.75H6C4.75736 3.75 3.75 4.75736 3.75 6V7.5"
      />
      <Motion
        is="path"
        ref="corner2Ref"
        d="M16.5 3.75H18C19.2426 3.75 20.25 4.75736 20.25 6V7.5"
      />
      <Motion
        is="path"
        ref="corner3Ref"
        d="M20.25 16.5V18C20.25 19.2426 19.2426 20.25 18 20.25H16.5"
      />
      <Motion
        is="path"
        ref="corner4Ref"
        d="M7.5 20.25H6C4.75736 20.25 3.75 19.2426 3.75 18V16.5"
      />
      <Motion
        is="path"
        ref="circleRef"
        d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
      />
    </svg>
  </div>
</template>

<script lang="ts">
export default {
  name: "ViewfinderCircleIcon",
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

const cornerNormal = { scale: 1, rotate: 0, opacity: 1 };
const cornerAnimate = {
  scale: 1.2,
  rotate: 45,
  opacity: 0,
  transition: { type: "spring", stiffness: 200, damping: 20 },
};
const circleNormal = { scale: 1, opacity: 1 };
const circleAnimate = {
  scale: 0.8,
  opacity: 0,
  transition: { duration: 0.3, delay: 0.1 },
};

const corner1Ref = ref();
const corner2Ref = ref();
const corner3Ref = ref();
const corner4Ref = ref();
const circleRef = ref();
const corner1 = useMotion(corner1Ref, {
  initial: cornerNormal,
  enter: cornerNormal,
});
const corner2 = useMotion(corner2Ref, {
  initial: cornerNormal,
  enter: cornerNormal,
});
const corner3 = useMotion(corner3Ref, {
  initial: cornerNormal,
  enter: cornerNormal,
});
const corner4 = useMotion(corner4Ref, {
  initial: cornerNormal,
  enter: cornerNormal,
});
const circleMotion = useMotion(circleRef, {
  initial: circleNormal,
  enter: circleNormal,
});

let isControlled = false;

const startAnimation = async () => {
  corner1.apply(cornerAnimate);
  corner2.apply(cornerAnimate);
  corner3.apply(cornerAnimate);
  corner4.apply(cornerAnimate);
  circleMotion.apply(circleAnimate);
  await new Promise((r) => setTimeout(r, 300));
  corner1.apply(cornerNormal);
  corner2.apply(cornerNormal);
  corner3.apply(cornerNormal);
  corner4.apply(cornerNormal);
  circleMotion.apply(circleNormal);
};

const stopAnimation = () => {
  corner1.apply(cornerNormal);
  corner2.apply(cornerNormal);
  corner3.apply(cornerNormal);
  corner4.apply(cornerNormal);
  circleMotion.apply(circleNormal);
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
