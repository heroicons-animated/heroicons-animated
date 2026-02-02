<script lang="ts">
let { size = 28, class: className = "" } = $props();

let isAnimating = $state(false);
let isControlled = $state(false);

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
    class:server-bounce={isAnimating}
  >
    <path
      d="M21.75 17.25v-.228a4.5 4.5 0 0 0-.12-1.03l-2.268-9.64a3.375 3.375 0 0 0-3.285-2.602H7.923a3.375 3.375 0 0 0-3.285 2.602l-2.268 9.64a4.5 4.5 0 0 0-.12 1.03v.228m19.5 0a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3m19.5 0a3 3 0 0 0-3-3H5.25a3 3 0 0 0-3 3"
    />
    <path
      class="server-lights"
      class:server-lights-blink={isAnimating}
      d="M18.75 17.25h.008v.008h-.008v-.008Zm-3 0h.008v.008h-.008v-.008Z"
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

.icon-svg.server-bounce {
  animation: server-bounce 0.4s ease-in-out forwards;
}

@keyframes server-bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
}

.server-lights {
  opacity: 1;
}

.server-lights.server-lights-blink {
  animation: server-lights-blink 0.6s ease-in-out forwards;
}

@keyframes server-lights-blink {
  0%,
  25%,
  50%,
  75%,
  100% {
    opacity: 1;
  }
  12.5%,
  37.5%,
  62.5%,
  87.5% {
    opacity: 0.4;
  }
}
</style>
