<script lang="ts">
let { size = 28, class: className = "", ...restProps } = $props();

let isAnimating = $state(false);
let isControlled = $state(false);

export function startAnimation() {
  if (!isControlled) {
    isAnimating = true;
    setTimeout(() => {
      isAnimating = false;
    }, 500);
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
      class="chevron-path"
      class:chevron-animate={isAnimating}
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
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

/* translateY [0, 2, 0], times [0, 0.4, 1], 0.5s (matches React VARIANTS) */
.chevron-path.chevron-animate {
  animation: chevron-down-animate 0.5s ease-out forwards;
}

@keyframes chevron-down-animate {
  0% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(2px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
