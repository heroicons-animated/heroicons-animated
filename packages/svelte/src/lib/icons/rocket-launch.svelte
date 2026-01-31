<script lang="ts">
export const size = 28;
const className = "";
export { className as class };

let isAnimating = false;
let isControlled = false;

export function startAnimation() {
  if (!isControlled) {
    isAnimating = true;
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
    class:rocketlaunch-float={isAnimating}
  >
    <path
      d="M15.5904 14.3696C15.6948 14.8128 15.75 15.275 15.75 15.75C15.75 19.0637 13.0637 21.75 9.75 21.75V16.9503M15.5904 14.3696C19.3244 11.6411 21.75 7.22874 21.75 2.25C16.7715 2.25021 12.3595 4.67586 9.63122 8.40975M15.5904 14.3696C13.8819 15.6181 11.8994 16.514 9.75 16.9503M9.63122 8.40975C9.18777 8.30528 8.72534 8.25 8.25 8.25C4.93629 8.25 2.25 10.9363 2.25 14.25H7.05072M9.63122 8.40975C8.38285 10.1183 7.48701 12.1007 7.05072 14.25M9.75 16.9503C9.64659 16.9713 9.54279 16.9912 9.43862 17.0101C8.53171 16.291 7.70991 15.4692 6.99079 14.5623C7.00969 14.4578 7.02967 14.3537 7.05072 14.25M16.5 9C16.5 9.82843 15.8284 10.5 15 10.5C14.1716 10.5 13.5 9.82843 13.5 9C13.5 8.17157 14.1716 7.5 15 7.5C15.8284 7.5 16.5 8.17157 16.5 9Z"
    />
    <path
      class="rocketlaunch-fire"
      class:rocketlaunch-fire-flicker={isAnimating}
      d="M4.81191 16.6408C3.71213 17.4612 3 18.7724 3 20.25C3 20.4869 3.0183 20.7195 3.05356 20.9464C3.28054 20.9817 3.51313 21 3.75 21C5.22758 21 6.53883 20.2879 7.35925 19.1881"
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

.icon-svg.rocketlaunch-float {
  animation: rocketlaunch-float 6s ease-in-out infinite alternate;
}

@keyframes rocketlaunch-float {
  0% {
    transform: translate(0, 0);
  }
  15% {
    transform: translate(0, -3px);
  }
  30% {
    transform: translate(-3px, 0);
  }
  45% {
    transform: translate(2px, -2px);
  }
  60% {
    transform: translate(-2px, -3px);
  }
  75% {
    transform: translate(1px, -1px);
  }
  90% {
    transform: translate(-1px, -2px);
  }
  100% {
    transform: translate(0, 0);
  }
}

.rocketlaunch-fire {
  opacity: 1;
}

.rocketlaunch-fire.rocketlaunch-fire-flicker {
  animation: rocketlaunch-fire-flicker 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

/* Svelte: path d morph not in CSS; opacity flicker approximates flame */
@keyframes rocketlaunch-fire-flicker {
  0%, 20%, 50%, 80%, 100% {
    opacity: 1;
  }
  40%, 60% {
    opacity: 0.85;
  }
}
</style>
