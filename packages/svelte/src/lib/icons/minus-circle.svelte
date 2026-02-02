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
  >
    <path
      d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
    />
    <path
      d="M15 12H9"
      class="minuscircle-line"
      class:minuscircle-line-animate={isAnimating}
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

.minuscircle-line {
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
  opacity: 1;
}

.minuscircle-line.minuscircle-line-animate {
  animation: minuscircle-line-draw 0.4s ease-in-out forwards;
}

@keyframes minuscircle-line-draw {
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
