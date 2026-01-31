<script lang="ts">
export const size = 28;
const className = "";
export { className as class };

let isAnimating = false;
let isControlled = false;

export function startAnimation() {
  if (!isControlled) {
    isAnimating = true;
    setTimeout(() => {
      isAnimating = false;
    }, 600);
  }
}

export function stopAnimation() {
  isAnimating = false;
}

export function setControlled(value: boolean) {
  isControlled = value;
}

function handleMouseEnter() {
  if (!isControlled) startAnimation();
}

function handleMouseLeave() {
  if (!isControlled) stopAnimation();
}
</script>

<div
  class={className}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  role="img"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="icon-svg"
  >
    <path
      class="xmark-line xmark-line-1"
      class:xmark-draw={isAnimating}
      d="M6 6l12 12"
    />
    <path
      class="xmark-line xmark-line-2"
      class:xmark-draw={isAnimating}
      d="M18 6l-12 12"
    />
  </svg>
</div>

<style>
div {
  display: inline-block;
}

.icon-svg {
  transform-box: fill-box;
  transform-origin: center;
}

.xmark-line {
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
  opacity: 1;
}

.xmark-line.xmark-draw {
  animation: xmark-draw 0.4s ease-out forwards;
}

.xmark-line-1.xmark-draw {
  animation-delay: 0s;
}

.xmark-line-2.xmark-draw {
  animation-delay: 0.2s;
}

@keyframes xmark-draw {
  0% {
    stroke-dashoffset: 1;
    opacity: 0;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
}
</style>
