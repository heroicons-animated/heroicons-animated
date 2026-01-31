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
    }, 650);
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
      d="M4.125 19.5h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z"
    />
    <path
      class="viewcolumns-line viewcolumns-line-0"
      class:viewcolumns-draw={isAnimating}
      d="M9 4.5v15"
    />
    <path
      class="viewcolumns-line viewcolumns-line-1"
      class:viewcolumns-draw={isAnimating}
      d="M15 4.5v15"
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

.viewcolumns-line {
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
  opacity: 1;
}

.viewcolumns-line.viewcolumns-draw {
  animation: viewcolumns-draw 0.3s linear forwards;
}

.viewcolumns-line-0.viewcolumns-draw {
  animation-delay: 0.2s;
}

.viewcolumns-line-1.viewcolumns-draw {
  animation-delay: 0.35s;
}

@keyframes viewcolumns-draw {
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
