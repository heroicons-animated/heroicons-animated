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
    <path d="M21 9H9a6 6 0 0 0 0 12h3" />
    <g class="arrow-group" class:arrowuturnright-animate={isAnimating}>
      <path d="m15 15 6-6m0 0-6-6m6 6" />
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

.arrow-group.arrowuturnright-animate {
  animation: arrowuturnright-animate 0.45s ease-in-out forwards;
}

@keyframes arrowuturnright-animate {
  0% {
    transform: scaleX(1) translateX(0);
  }
  50% {
    transform: scaleX(1.15) translateX(1.5px);
  }
  100% {
    transform: scaleX(1) translateX(0);
  }
}
</style>
