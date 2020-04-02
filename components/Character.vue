<template>
  <div class="character">
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      style="enable-background:new 0 0 512 512;"
      xml:space="preserve"
      width="300px"
      height="300px"
    >
      <Shoes />
      <LeftHand />
      <Body />
      <RightHand />
      <Head />
    </svg>
  </div>
</template>

<script>
import Head from '~/components/character/Head.vue'
import Body from '~/components/character/Body.vue'
import LeftHand from '~/components/character/LeftHand.vue'
import RightHand from '~/components/character/RightHand.vue'
import Shoes from '~/components/character/Shoes.vue'

export default {
  components: {
    Head,
    Body,
    LeftHand,
    RightHand,
    Shoes
  }
}
</script>

<style lang="scss">
@keyframes look-around {
  0%,
  to {
    transform: translateX(-4px);
  }

  10%,
  50% {
    transform: translateX(0px);
  }
}

@keyframes hvr-bob {
  0%,
  to {
    transform: translateY(-8px);
  }

  50% {
    transform: translateY(-4px);
  }
}

@keyframes hvr-bob-float {
  to {
    transform: translateY(-8px);
  }
}

.hvr-bob {
  display: inline-block;
  transform: perspective(1px) translateZ(0);
  animation-name: hvr-bob-float, hvr-bob;
  animation-duration: 0.3s, 1.5s;
  animation-timing-function: ease-out, ease-in-out;
  animation-delay: 0s, 0.3s;
  animation-iteration-count: 1, infinite;
  animation-direction: normal, alternate;
  box-shadow: 0 0 1px transparent;
  animation-fill-mode: forwards;
}

.look-around {
  display: inline-block;
  transform: perspective(1px) translateZ(0);
  animation-name: look-around;
  animation-duration: 10s;
  animation-timing-function: ease-in-out;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-direction: normal;
  box-shadow: 0 0 1px transparent;
  animation-fill-mode: forwards;
}
</style>
