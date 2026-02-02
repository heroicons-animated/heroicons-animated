<script lang="ts">
let { size = 28, class: className = "" } = $props();

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
      class="head-path"
      class:animate={isAnimating}
      d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25"
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

.head-path {
  transform-box: fill-box;
  transform-origin: center;
  transition: transform 0.5s ease-in-out;
}

.head-path.animate {
  animation: head-move 0.5s ease-in-out forwards;
}

@keyframes head-move {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-3px, -3px);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>
