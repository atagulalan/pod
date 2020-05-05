<template>
  <div class="starContainer">
    <svg
      id="Layer_1"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      style="enable-background: new 0 0 512 512;"
      xml:space="preserve"
    >
      <g>
        <path
          :style="`fill:${color};`"
          d="M244.2,430.9l-114.6,60.2c-18.6,9.8-40.4-6-36.8-26.8l21.9-127.6c1.4-8.2-1.3-16.6-7.3-22.5
		l-92.7-90.3c-15.1-14.7-6.8-40.3,14.1-43.3L156.8,162c8.3-1.2,15.4-6.4,19.1-13.9l57.3-116.1c9.3-18.9,36.2-18.9,45.5,0L336,148.2
		c3.7,7.5,10.8,12.7,19.1,13.9l128.1,18.6c20.8,3,29.1,28.6,14.1,43.3l-92.7,90.3c-6,5.8-8.7,14.2-7.3,22.5l21.9,127.6
		c3.6,20.7-18.2,36.5-36.8,26.8l-114.6-60.2C260.4,427,251.6,427,244.2,430.9z"
        />
      </g>
    </svg>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#eaeaea',
    },
  },
}
</script>
