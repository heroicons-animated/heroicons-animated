<script lang="ts">
let { size = 28, class: className = "" } = $props();

let isAnimating = $state(false);
let isControlled = $state(false);

export function startAnimation() {
  if (!isControlled) {
    isAnimating = true;
    setTimeout(() => {
      isAnimating = false;
    }, 450);
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
    <path d="M15 3v12a6 6 0 0 1-12 0v-3" />
    <g class="arrow-group" class:arrowuturnup-animate={isAnimating}>
      <path d="m9 9 6-6m0 0 6 6m-6-6" />
    </g>
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

.arrow-group {
  transform-box: fill-box;
  transform-origin: center;
  transition: transform 0.45s ease-in-out;
}

.arrow-group.arrowuturnup-animate {
  animation: arrowuturnup-animate 0.45s ease-in-out forwards;
}

@keyframes arrowuturnup-animate {
  0% {
    transform: scaleY(1) translateY(0);
  }
  50% {
    transform: scaleY(1.15) translateY(-1.5px);
  }
  100% {
    transform: scaleY(1) translateY(0);
  }
}
</style>
