<script lang="ts">
let { size = 28, class: className = "", ...restProps } = $props();

let isAnimating = $state(false);
let isControlled = $state(false);

export function startAnimation() {
  if (!isControlled) {
    isAnimating = true;
    setTimeout(() => {
      isAnimating = false;
    }, 400);
  }
}

export function stopAnimation() {
  isAnimating = false;
}

export function setControlled(value: boolean) {
  isControlled = value;
}

function handleMouseEnter() {
  if (!isControlled) {
    startAnimation();
  }
}

function handleMouseLeave() {
  if (!isControlled) {
    stopAnimation();
  }
}
</script>

<div
  {...restProps}
  class={className}
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
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
    class:equals-animate={isAnimating}
  >
    <path
      d="M4.499 8.248h15m-15 7.501h15"
      class="equals-path"
      class:equals-draw={isAnimating}
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

.equals-path {
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
  opacity: 1;
}

.equals-path.equals-draw {
  animation: equals-draw 0.4s linear forwards;
}
.equals-path:not(.equals-draw) {
  stroke-dashoffset: 0;
  opacity: 1;
}

@keyframes equals-draw {
  0% {
    stroke-dashoffset: 1;
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
}
</style>
