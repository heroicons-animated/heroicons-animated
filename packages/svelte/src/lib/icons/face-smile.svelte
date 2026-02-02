<script lang="ts">
let { size = 28, class: className = "", ...restProps } = $props();

let isAnimating = $state(false);
let isControlled = $state(false);

export function startAnimation() {
  if (!isControlled) {
    isAnimating = true;
    setTimeout(() => {
      isAnimating = false;
    }, 800);
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
    class="icon-svg facesmile-svg"
    class:facesmile-svg-animate={isAnimating}
  >
    <circle cx="12" cy="12" r="9" />
    <path
      d="M15.182 15.182C13.4246 16.9393 10.5754 16.9393 8.81802 15.182"
      class="facesmile-mouth"
      class:facesmile-mouth-animate={isAnimating}
    />
    <path
      d="M9.75 9.75C9.75 10.1642 9.58211 10.5 9.375 10.5C9.16789 10.5 9 10.1642 9 9.75C9 9.33579 9.16789 9 9.375 9C9.58211 9 9.75 9.33579 9.75 9.75Z"
      class="facesmile-eye"
      class:facesmile-eye-animate={isAnimating}
    />
    <path
      d="M15 9.75C15 10.1642 14.8321 10.5 14.625 10.5C14.4179 10.5 14.25 10.1642 14.25 9.75C14.25 9.33579 14.4179 9 14.625 9C14.8321 9 15 9.33579 15 9.75Z"
      class="facesmile-eye"
      class:facesmile-eye-animate={isAnimating}
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

/* Match React: svg scale [1,1.15,1.05,1.1] rotate [0,-3,3,0] 0.8s times 0/0.3/0.6/1 */
.facesmile-svg.facesmile-svg-animate {
  animation: facesmile-svg-bounce 0.8s ease-in-out forwards;
}
@keyframes facesmile-svg-bounce {
  0% {
    transform: scale(1) rotate(0deg);
  }
  30% {
    transform: scale(1.15) rotate(-3deg);
  }
  60% {
    transform: scale(1.05) rotate(3deg);
  }
  100% {
    transform: scale(1.1) rotate(0deg);
  }
}

/* Mouth: pathLength [0.3,1,1] 0.5s delay 0.1 (d morph not in CSS) */
.facesmile-mouth {
  stroke-dasharray: 1;
}
.facesmile-mouth.facesmile-mouth-animate {
  animation: facesmile-mouth-draw 0.5s ease-in-out 0.1s forwards;
}
@keyframes facesmile-mouth-draw {
  0% {
    stroke-dashoffset: 0.7;
  }
  50% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

/* Both eyes: scale [1,1.5,0.8,1.2] 0.5s times 0/0.3/0.6/1 */
.facesmile-eye.facesmile-eye-animate {
  animation: facesmile-eye-bounce 0.5s ease-in-out forwards;
}
@keyframes facesmile-eye-bounce {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.5);
  }
  60% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1.2);
  }
}
</style>
