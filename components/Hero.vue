<template>
  <div :class="['heroWrapper']">
    <div v-bar class="vuebar-element">
      <div class="parallax">
        <div id="hero" class="group">
          <div class="layer m0">
            <div class="middle">
              <div class="imageWithText">
                <div class="redPlant"></div>
                <div class="text">
                  <h1>Bilgisayar mı?<br />Çocuk Oyuncağı!</h1>
                  <p>
                    Bilgisayarların nasıl bilgiyi saydığını öğrenin,<br />hem de
                    eğlenceli bir şekilde!
                  </p>
                  <Button size="big" background="#9CCC66">
                    <Icon
                      :size="48"
                      i="video"
                      stroke="#fff"
                      stroke-width="1.5"
                    />
                    Şimdi Başla!
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div class="layer m300">
            <div class="mountains"></div>
          </div>
          <div class="layer m600 topHalf">
            <LogoWithText class="logo" width="210" />
            <div class="clouds">
              <div class="cloud1"></div>
              <div class="cloud2"></div>
              <div class="cloud3"></div>
            </div>
          </div>
        </div>

        <div id="platou" class="group">
          <div class="layer m-150">
            <div class="ceiling">
              <div class="middle" style="width: 100%;">
                <h2>
                  Sürekli tekrarlanan işleri<br />robotlar yapsa nasıl olurdu?
                </h2>
              </div>
            </div>
            <div class="string"></div>
          </div>
          <div class="layer m-140">
            <div class="machine">
              <component :is="machine"></component>
            </div>
          </div>
          <div class="layer m-75">
            <div class="platou1"></div>
          </div>
          <div class="layer m-70">
            <div class="platou2"></div>
          </div>
          <div class="layer m-65">
            <div class="platou3"></div>
          </div>
          <div class="layer m-47">
            <div class="platou4"></div>
          </div>
          <div class="layer m-9">
            <div class="darkBushes"></div>
          </div>
          <div class="layer m0">
            <div class="pinkBushes">
              <div class="bottom" :style="`height: ${platouHeight}vh;`"></div>
            </div>
          </div>
        </div>

        <div id="ada" class="group">
          <div class="layer m0" style="margin-top: -270px; background:red">
            <div class="middle">Base Layer</div>
          </div>
          <div class="layer m-100"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LogoWithText from '~/components/atomic/LogoWithText.vue'
import Icon from '~/components/atomic/Icon.vue'
import Button from '~/components/atomic/Button.vue'
import { logout } from '~/middleware/auth-service'

export default {
  components: {
    LogoWithText,
    Button,
    Icon
  },
  props: {
    vProgress: {
      type: Function,
      default: () => {}
    },
    vComplete: {
      type: Function,
      default: () => {}
    }
  },
  data: () => {
    return {
      platouHeight: 60
    }
  },
  computed: {
    machine() {
      return () => import(`~/static/img/home/machines.svg?inline`)
    }
  },
  mounted() {
    document
      .querySelector('.parallax')
      .addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    document
      .querySelector('.parallax')
      .removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    logout,
    show() {
      this.$modal.show('authModal')
    },
    hide() {
      this.$modal.hide('authModal')
    },
    handleScroll() {
      console.log(document.querySelector('.parallax').scrollTop)
      // Your scroll handling here
      if (document.querySelector('.parallax').scrollTop > 800) {
        this.platouHeight =
          60 - (document.querySelector('.parallax').scrollTop - 800) / 13
      }
    }
  }
}
</script>

<style lang="scss">
#hero {
  height: 100vh;
  .m0 {
    .imageWithText {
      width: 1200px;
      margin-top: 100px;
      position: relative;
      overflow: hidden;
      .redPlant {
        width: 317px;
        height: 528px;
        background: url('/img/home/red_leaves.svg');
        float: left;
      }
      .text {
        float: left;
        font-family: 'Quicksand', sans-serif;
        color: #798f9c;
        text-align: left;
        position: absolute;
        top: 50%;
        left: 400px;
        transform: translateY(-50%);
        h1 {
          font-size: 75px;
          line-height: 75px;
          font-weight: 600;
          margin-bottom: 40px;
        }
        p {
          font-size: 38px;
          font-weight: 400;
          margin-bottom: 40px;
        }
      }
    }
  }
  .m300 {
    .mountains {
      margin-top: 180px;
      width: 100%;
      height: 271px;
      background: url('/img/home/mountains.svg');
      background-size: cover;
      background-position: 50% 0;
      &:after {
        content: '';
        background: #d3f1fb;
        height: 130vh;
        display: block;
        top: 100%;
        position: relative;
      }
    }
  }
  .m600 {
    background: #e0f8fa;
    .logo {
      position: relative;
      z-index: 2;
      display: block;
      margin: 0 auto;
      margin-top: 100px;
    }
    .clouds {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 240px;

      @keyframes cloud {
        0% {
          left: calc(0% - 800px);
        }
        100% {
          left: calc(100% + 800px);
        }
      }

      .cloud1,
      .cloud2,
      .cloud3 {
        animation: linear infinite;
        animation-name: cloud;
        position: absolute;
      }

      .cloud1 {
        background: url('/img/home/cloud1.svg');
        width: 564px;
        height: 86px;
        animation-duration: 120s;
        animation-delay: -20s;
        top: 58px;
      }
      .cloud2 {
        background: url('/img/home/cloud2.svg');
        width: 737px;
        height: 116px;
        animation-duration: 90s;
        animation-delay: -50s;
        top: 107px;
      }
      .cloud3 {
        background: url('/img/home/cloud3.svg');
        width: 335px;
        height: 53px;
        animation-duration: 200s;
        animation-delay: -75s;
        top: 227px;
      }
    }
  }
}

#platou {
  z-index: 8;
  height: 490px;
  & > * {
    .pinkBushes {
      width: 100%;
      height: 178px;
      background: url('/img/home/pink_bushes.svg');
      background-position: bottom center;
      background-size: cover;
      position: absolute;
      top: 0px;
      .bottom {
        display: block;
        width: 100%;
        background: #b8d75f;
        top: 99%;
        position: absolute;
      }
    }
    .darkBushes {
      width: 100%;
      height: 131px;
      background: url('/img/home/dark_bushes.svg');
      background-position: bottom center;
      background-size: cover;
      position: absolute;
      top: 54px;
    }
    .platou1 {
      width: 100%;
      height: 135px;
      background: url('/img/home/platou1.svg');
      background-position: center;
      background-size: cover;
      position: absolute;
      top: 162px;
    }
    .platou2 {
      width: 100%;
      height: 316px;
      background: url('/img/home/platou2.svg');
      background-position: center;
      background-size: cover;
      position: absolute;
      top: -40px;
    }
    .platou3 {
      width: 100%;
      height: 244px;
      background: url('/img/home/platou3.svg');
      background-position: center;
      background-size: cover;
      position: absolute;
      top: -10px;
    }
    .platou4 {
      width: 100%;
      height: 188px;
      background: url('/img/home/platou4.svg');
      background-position: center;
      background-size: cover;
      position: absolute;
      top: 42px;
    }
    .machine {
      width: 3840px;
      position: absolute;
      left: 50%;
      top: 20px;
      transform: translateX(-50%);
    }
    .ceiling {
      background: url('/img/home/ceiling.svg');
      background-position: center;
      background-size: cover;
      height: 415px;
      width: 100%;
      position: absolute;
      top: 470px;
      font-size: 38px;
      line-height: 60px;
      color: #fefefe;
      font-weight: 500;
    }
    .string {
      background: url('/img/home/string.svg');
      background-position: center;
      background-size: cover;
      height: 837px;
      width: 100%;
      position: absolute;
      top: 810px;
      font-size: 38px;
      line-height: 60px;
      color: #fefefe;
      font-weight: 500;
    }
  }
}

#ada {
  z-index: 7;
  height: 100vh;
  * {
  }
  .deep {
    background: rgb(184, 223, 101);
  }
}

#group5 {
  z-index: -3; /* slide over group 4 and 6 */
}
#group5 .base {
  background: rgb(214, 229, 100);
}

#group6 {
  z-index: -4; /* slide under group 5 and 7 */
}
#group6 .back {
  background: rgb(245, 235, 100);
}

#group7 {
  z-index: -5; /* slide over group 7 */
}
#group7 .base {
  background: rgb(255, 241, 100);
}

.middle {
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.heroWrapper {
  width: 100%;
  height: auto;
  position: relative;
  z-index: 0;

  @keyframes fadein {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    80% {
      transform: translateY(0px);
    }
    100% {
      opacity: 1;
    }
  }

  hr {
    border: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(135deg, #6f9941 0%, #787dd2 100%);
  }

  #wrapper {
    height: 600px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #252821;
    position: relative;
    overflow: hidden;

    .inner {
      max-width: 500px;
      text-align: center;
      animation: fadein 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
      opacity: 0;
    }

    p {
      padding: 20pt 0 50pt;
      font-size: 18pt;
      font-weight: 300;
    }

    .login {
      color: #252821;
      display: block;
      padding: 10px 20px;
      font-weight: 300;
      font-size: 16pt;
      z-index: 32;
      position: relative;
      transition: 0.3s filter;
      width: 180px;
      margin: 30px auto 0;
      &:before {
        content: '';
        width: 100%;
        left: 0;
        background: linear-gradient(
          135deg,
          rgba(111, 153, 65, 1) 0%,
          rgba(111, 153, 65, 1) 100%
        );
        height: 3px;
        position: absolute;
        bottom: -20px;
        transition: 0.2s bottom, 0.15s opacity;
        opacity: 0;
        pointer-events: none;
      }
      &:hover {
        &:before {
          bottom: -10px;
          opacity: 1;
        }
      }
    }
  }
}
</style>
