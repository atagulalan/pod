<template>
  <div class="episodeModalWrapper">
    <modal
      name="episodeModal"
      transition="scale"
      class="episodeModal"
      width="1000"
      height="auto"
    >
      <div class="modalInnerWrapper">
        <h1>{{ mission }}</h1>
        <div class="info">
          {{ info }}
        </div>
        <div class="stars">
          <div
            v-for="(starInfo, i) in [
              'Bölüm Başarılı',
              'En Az Satır Sayısı',
              'En Az İşlem Sayısı',
            ]"
            :key="starInfo"
            class="starWrapper"
          >
            <Star :color="stars[i] ? `#ffc107` : `#eaeaea`">
              {{ starInfo }}
            </Star>
          </div>
        </div>
        <div class="tip">
          {{ tip }}
        </div>
        <div class="buttons">
          <Button
            v-if="inGame"
            size="fit"
            background="#46cb92"
            @click="goForest()"
          >
            <Icon :size="24" i="arrow-left" stroke="#fff" />
            Ormana Dön
          </Button>
          <span v-else class="playWrapper">
            <Button
              v-if="stars[0]"
              size="fit"
              background="#46cb92"
              @click="play()"
            >
              <Icon :size="24" i="refresh" stroke="#fff" />
              Tekrar Oyna
            </Button>
            <Button v-else size="fit" background="#46cb92" @click="play()">
              <Icon :size="24" i="play" stroke="#fff" />
              Oyna
            </Button>
          </span>
          <Button
            v-if="stars[0]"
            size="fit"
            background="#ffcf00"
            @click="showScores()"
          >
            <Icon :size="24" i="chart" stroke="#fff" />
            Sıralamayı Gör
          </Button>
          <Button
            size="fit"
            background="#eaeaea"
            color="#000"
            @click="hideModal()"
          >
            <Icon :size="24" i="close" stroke="#000" />
            Kapat
          </Button>
        </div>
      </div>
      <div class="mobileModalExitButton" @click="$modal.hide('episodeModal')">
        <Icon :size="36" i="close" stroke="#f00" />
      </div>
    </modal>
  </div>
</template>

<script>
import Icon from '~/components/atomic/Icon.vue'
import Button from '~/components/atomic/Button.vue'
import Star from '~/components/atomic/Star.vue'
import { getLastBranch, getForests } from '~/middleware/game'

export default {
  components: {
    Icon,
    Star,
    Button,
  },
  props: {
    info: {
      type: String,
      default: '',
    },
    mission: {
      type: String,
      default: '',
    },
    activeEpisode: {
      type: String,
      default: '',
    },
    stars: {
      type: Array,
      default: () => [0, 0, 0],
    },
    inGame: {
      type: Boolean,
      default: false,
    },
    forest: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      tip: '',
    }
  },
  watch: {
    stars() {
      const tips = [
        'İpucu: Karakterini daha fazla kişiselleştirmek için bölümleri en az satırda geçmeye çalış!',
        'İpucu: Karakterini daha fazla kişiselleştirmek için bölümleri en az işlem yaparak geçmeye çalış!',
        'İpucu: Daha havalı gözükmek için karakterini kişiselleştir!',
        'İpucu: Bölümleri atlayarak altın kazanabilirsin!',
        'İpucu: Bazen en az satırı ve en az işlemi aynı anda yapamayabilirsin. Alternatifleri düşün!',
      ]
      this.tip = tips[Math.floor(tips.length * Math.random())]
    },
  },
  methods: {
    goBack() {
      this.$router.push('/forests')
    },
    goForest() {
      getForests
        .bind(this)()
        .then((data) => {
          const k = getLastBranch(
            data.user.completedEpisodes,
            data.chapters.find(
              (el) => el.chapterId === this.forest.slice('-')[0]
            )
          )
          this.$router.push(`/forests/${this.forest.slice('-')[0] + '-' + k}`)
        })
    },
    play() {
      this.$router.push('/code/' + this.activeEpisode)
    },
    showScores() {
      this.$router.push('/scores/' + this.activeEpisode)
    },
    hideModal() {
      this.$modal.hide('episodeModal')
    },
  },
}
</script>

<style lang="scss">
.episodeModalWrapper {
  .mobileModalExitButton {
    display: none;
  }

  .modalInnerWrapper {
    display: block;
    left: 0;
    top: 0;
    width: 100%;
    transform: scale(1.5);
    transform-origin: top;
    position: relative;
    height: 800px;
    text-align: center;

    h1 {
      padding-bottom: 10px !important;
    }

    .info,
    .tip {
      max-width: 400px;
      margin: 0 auto;
      padding-bottom: 20px;
    }

    .starWrapper {
      width: 100px;
      display: inline-block;
      margin: 5px;
      padding-bottom: 20px;
    }

    .buttons {
      width: 100%;
      .buttonWrapper {
        display: inline-block;
      }
    }
  }

  .scale-enter-active,
  .scale-leave-active {
    transition: all 0.4s;
  }
  .scale-enter {
    opacity: 0;
    transform: translateY(50px);
  }
  .scale-leave-active {
    opacity: 0;
    transform: translateY(-50px);
  }

  .episodeModal {
    .v--modal {
      box-shadow: none;
      background-image: url('/img/popup.svg');
      background-size: cover;
      background-color: transparent;
      transform: translate(-50%, -50%);
      top: 50vh !important;
      left: 50vw !important;
    }
    h1 {
      font-size: 18px;
      padding-top: 70px;
      padding-bottom: 70px;
      color: black;
      font-weight: 500;
      cursor: default;
      text-align: center;
    }
  }
}
@media only screen and (max-width: 767px) {
  .episodeModalWrapper .episodeModal .v--modal {
    width: 100% !important;
    height: 100vh !important;
    left: 0 !important;
    top: 0 !important;
    transform: translate(0, 0);
    background: white;
  }
  .episodeModalWrapper .modalInnerWrapper {
    transform: scale(1) translate(-50%, -50%);
    top: 50% !important;
    left: 50% !important;
    position: relative;
    transform-origin: center;
    padding: 0 10px 70px;
    height: auto;
  }
  .episodeModalWrapper .mobileModalExitButton {
    width: 50px;
    height: 50px;
    background-color: #ffb4ae;
    border-radius: 50%;
    position: absolute;
    right: 0;
    top: 0;
    margin: 10px;
    line-height: 46px;
    text-align: center;
    display: block;
  }
  .episodeModalWrapper .modalInnerWrapper .buttons .buttonWrapper {
    display: block;
    margin: 10px;
  }
}
</style>
