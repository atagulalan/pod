<template>
  <g id="Body" class="hvr-bob">
    <path
      class="pants"
      d="M272.5,327.9h-76.1c-36.7,0-66.4,29.7-66.4,66.4v0c0,18.1,14.7,32.8,32.8,32.8h143.3
		c18.1,0,32.8-14.7,32.8-32.8v0C338.9,357.6,309.2,327.9,272.5,327.9z"
    />
    <path
      class="shirt"
      d="M255.4,287.5h-42c-46.1,0-83.5,37.4-83.5,83.5v5.2c0,13.2,10.7,23.9,23.9,23.9H315c13.2,0,23.9-10.7,23.9-23.9
		V371C338.9,324.9,301.5,287.5,255.4,287.5z"
    />
  </g>
</template>

<script>
export default {
  props: {}
}
</script>

<style lang="scss" scoped>
#Body {
  animation-delay: -1.3s;
}
.shirt {
  fill: #ff5b71;
}
.pants {
  fill: #ce3e5d;
}
</style>
