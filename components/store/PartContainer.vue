<template>
  <div v-if="isVisible" :class="`subpart ${type} ${isVisible ? 'active' : ''}`">
    <div id="scroller" ref="scroller" class="scroller" @scroll="handleScroll">
      <div
        v-for="(p, a) in Math.ceil(
          items.filter((el) => el.type === type).length / itemsPerPage
        )"
        :key="`${type}-page${a}`"
        class="scrollable"
      >
        <div
          v-for="(item, i) in items
            .filter((el) => el.type === type)
            .slice(0 + a * itemsPerPage, a * itemsPerPage + itemsPerPage)"
          :key="`${type}-${i}`"
          :class="`${type}Container ${
            weared[type] === item.key ? 'active' : ''
          } ${!item.owned && item.cost !== 0 ? 'locked' : ''}`"
          @click="wearItem(type, item.key)"
        >
          <div class="selected">
            <Icon
              v-if="item.owned || item.cost === 0"
              :size="30"
              i="ok"
              stroke="#fff"
              :stroke-width="4"
            />
            <span v-else-if="weared[type] === item.key">
              {{ item.cost }}
            </span>
            <Icon
              v-else
              :size="26"
              i="lock"
              stroke="#fff"
              :stroke-width="3"
              style="margin-bottom: 4px;"
            />
          </div>
          <div
            :class="`${type}Item`"
            :style="`background-image:url(/img/character/thumbnails/${type}/${item.key.replace(
              /#/gi,
              '%23'
            )}.png)`"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '~/components/atomic/Icon'

export default {
  components: {
    Icon,
  },
  props: {
    type: {
      type: String,
      default: '',
    },
    weared: {
      type: Object,
      default: () => {},
    },
    items: {
      type: Array,
      default: () => [],
    },
    owned: {
      type: Array,
      default: () => [],
    },
    wearItem: {
      type: Function,
      default: () => {},
    },
    updateButtonVisibility: {
      type: Function,
      default: () => {},
    },
    setPage: {
      type: Function,
      default: () => {},
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
    page: {
      type: Number,
      default: 1,
    },
    itemsPerPage: {
      type: Number,
      default: 16,
    },
  },
  computed: {
    totalPages() {
      const das = this
      return Math.ceil(
        this.items.filter((el) => el.type === das.type).length /
          das.itemsPerPage
      )
    },
  },
  watch: {
    isVisible(newVal, oldVal) {
      if (newVal) {
        this.setPage(1)
        console.log(this.page, this.totalPages)
        this.updateButtonVisibility(
          this.page !== 1,
          this.page !== this.totalPages
        )
      }
    },
    page(newVal, oldVal) {
      // watch it
      if (this.isVisible) {
        console.log('Page changed: ', newVal, ' | was: ', oldVal)
        this.updateButtonVisibility(
          this.page !== 1,
          this.page !== this.totalPages
        )
        this.changePage(newVal - oldVal)
      }
    },
  },
  methods: {
    handleScroll(e) {
      const calculatedPage =
        Math.floor(
          (document.querySelector('#scroller').querySelector('.scrollable')
            .clientWidth /
            2 +
            e.target.scrollLeft) /
            document.querySelector('#scroller').querySelector('.scrollable')
              .clientWidth
        ) + 1
      this.updateButtonVisibility(
        calculatedPage !== 1,
        calculatedPage !== this.totalPages
      )
    },
    easing(time, startpos, endpos) {
      return function (t) {
        return (t * (endpos - startpos)) / time + startpos // linear easing
      }
    },
    changePage(val) {
      const galleryItemSize = document
        .querySelector('#scroller')
        .querySelector('.scrollable').clientWidth
      console.log(val * galleryItemSize)
      document.querySelector('#scroller').scrollBy({
        top: 0,
        left: val * galleryItemSize,
        behavior: 'smooth',
      })
    },
  },
}
</script>

<style lang="scss">
.subpart {
  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    box-shadow: none;
    border: none;
  }
  ::-webkit-scrollbar-track {
    box-shadow: none;
    border: none;
  }
  &.active {
    z-index: 2;
  }
}

.scroller {
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  overflow-y: hidden;
  display: flex;
  height: 100%;
  -webkit-overflow-scrolling: touch;
  .scrollable {
    min-width: 100%;
    min-height: 100%;
    height: 100%;
    width: 100%;
    scroll-snap-align: start;
  }
}
</style>
