<script lang="ts">
let { size = 28, class: className = "" } = $props();

let headPath: SVGPathElement;
let linePath: SVGPathElement;
let lineAnimation: Animation | null = null;

let isAnimating = $state(false);
let isControlled = $state(false);

export function startAnimation() {
  if (!isControlled) {
    isAnimating = true;

    // Animate line path morphing using Web Animations API
    if (linePath) {
      lineAnimation = linePath.animate(
        [{ d: "M3 12h18" }, { d: "M6 12h15" }, { d: "M3 12h18" }],
        {
          duration: 400,
          easing: "ease-in-out",
          fill: "forwards",
        }
      );
    }

    setTimeout(() => {
      isAnimating = false;
    }, 400);
  }
}

export function stopAnimation() {
  isAnimating = false;

  if (lineAnimation) {
    lineAnimation.cancel();
    lineAnimation = null;
  }

  if (linePath) {
    linePath.setAttribute("d", "M3 12h18");
  }
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
      bind:this={headPath}
      class="head-path"
      class:animate={isAnimating}
      d="M6.75 15.75 3 12m0 0 3.75-3.75"
    />
    <path bind:this={linePath} d="M3 12h18" />
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
  transition: transform 0.4s ease-in-out;
}

.head-path.animate {
  animation: head-translate 0.4s ease-in-out forwards;
}

@keyframes head-translate {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(3px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
