<template>
  <div class="headerWrapper">
    <svg viewbox="0 0 100 100">
      <filter id="goo">
        <fegaussianblur in="SourceGraphic" result="blur" stddeviation="4" />
        <fecolormatrix
          in="blur"
          mode="matrix"
          result="goo"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
        />
      </filter>
      <g filter="url(#goo)">
        <circle
          v-for="(item, index) in items"
          :key="'circle' + index"
          :cx="item.pos[0]"
          :cy="item.pos[1]"
          :r="item.size"
        >
          <animatetransform
            :from="
              0 +
                ' ' +
                rand(item.pos[0] - 5, item.pos[0] + 5) +
                ' ' +
                rand(item.pos[1] - 5, item.pos[1] + 5)
            "
            :to="
              360 * coinFlip() +
                ' ' +
                rand(item.pos[0] - 5, item.pos[0] + 5) +
                ' ' +
                rand(item.pos[1] - 5, item.pos[1] + 5)
            "
            :dur="rand(4, 10) + 's'"
            attributename="transform"
            attributetype="XML"
            repeatcount="indefinite"
            type="rotate"
          />
          <animate
            :values="
              coinFlip() === 1
                ? '#6f9941; #6f9941; #6f9941'
                : '#6f9941; #6f9941; #6f9941'
            "
            :dur="rand(6, 9) + 's'"
            attributename="fill"
            attributetype="XML"
            repeatcount="indefinite"
            keyTimes="0; 0.5; 1"
          />
        </circle>
      </g>
    </svg>
    <h2>
      <span><slot /></span>
    </h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          pos: [this.rand(30, 40), this.rand(30, 40)],
          size: this.rand(10, 14)
        },
        {
          pos: [this.rand(35, 45), this.rand(30, 40)],
          size: this.rand(10, 14)
        },
        {
          pos: [this.rand(40, 50), this.rand(40, 50)],
          size: this.rand(23, 27)
        },
        {
          pos: [this.rand(25, 35), this.rand(55, 65)],
          size: this.rand(18, 22)
        },
        { pos: [this.rand(55, 65), this.rand(35, 45)], size: this.rand(13, 17) }
      ]
    }
  },
  methods: {
    // returns a number between min and max
    rand: (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min
    },
    // returns 1 or -1
    coinFlip: () => {
      return Math.random() > 0.5 ? 1 : -1
    }
  }
}
</script>

<style lang="scss">
.headerWrapper {
  svg {
    transform: translateY(20px) scale(2.5);
    width: 100px;
    height: 74pt;
    mix-blend-mode: multiply;
    position: absolute;
    z-index: 2;
  }
  h2 {
    span {
      font-size: 48pt;
      font-weight: 700;
      background: linear-gradient(135deg, #6f9941 0%, #787dd2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      line-height: 150px;
      letter-spacing: -2px;
      margin-left: 9px;
    }
  }
}
</style>
