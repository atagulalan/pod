<template>
  <div :class="['heroWrapper']">
    <div v-bar class="vuebar-element">
      <div class="parallax">
        <div id="hero" class="group">
          <div class="layer m0">
            <div class="middle">
              <div class="imageWithText">
                <div class="redPlant hvr-bob"></div>
                <div class="text">
                  <h1>
                    Bilgisayar mı?
                    <br />Çocuk Oyuncağı!
                  </h1>
                  <p>
                    Bilgisayarların nasıl bilgiyi saydığını öğrenin, hem de
                    eğlenceli bir şekilde!
                  </p>
                  <Button size="big" background="#9CCC66" @click="show">
                    <Icon
                      :size="44"
                      i="video"
                      stroke="#fff"
                      stroke-width="1.5"
                    />
                    <span style="vertical-align: middle;">Şimdi Başla!</span>
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
              <div class="middle" style="width: 100%; max-width: 1200px;">
                <h2>Sürekli tekrarlanan işleri robotlar yapsa nasıl olurdu?</h2>
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
              <div class="bottom" :style="`transform: scaleY(2);`">
                <div
                  class="paint"
                  :style="`transform: scaleY(${paintScale});`"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div id="ada" class="group">
          <div class="layer m-60">
            <div class="adaWrapper">
              <div class="ada hvr-bob">
                <component :is="ada"></component>
              </div>
            </div>
          </div>
          <div class="layer m0" style="background: #f7fafc;">
            <div class="room">
              <div class="middle">
                <div class="text">
                  <h1><span class="link">Ada</span> ile tanışın.</h1>
                  <p>
                    Bilgisayarların dünyasına olan yolculuğunuzun en iyi şekilde
                    geçmesi için programlandı.
                  </p>
                </div>
              </div>
            </div>
            <div
              class="roomFloor"
              :style="`transform: scaleY(${roomFloorScale});`"
            ></div>
          </div>
        </div>

        <div id="price" class="group">
          <div class="layer m0 priceCeiling">
            <div class="text">
              <h1>Tamamen ücretsiz.</h1>
              <p>Sonsuza kadar ücretsizdir ve ücretsiz kalacaktır.</p>
            </div>
            <div class="coinWrapper">
              <div class="coin">
                <div class="coin__front"></div>
                <div class="coin__edge">
                  <div v-for="index in 80" :key="index"></div>
                </div>
                <div class="coin__back"></div>
              </div>
            </div>
            <div class="coinFloor"></div>
          </div>
        </div>

        <div id="gonow" class="group">
          <div class="layer m100">
            <div class="middle">
              <div class="text">
                <h1>Şimdi başla!</h1>
                <p>Bilgisayarların dünyasına ilk adımını at.</p>
                <Button size="big" background="#C345FF" @click="show">
                  <Icon
                    :size="44"
                    i="entrance"
                    stroke="#fff"
                    stroke-width="1.5"
                  />
                  <span style="vertical-align: middle;">Giriş Yap</span>
                </Button>
              </div>
            </div>
          </div>
          <div class="layer m200">
            <div class="yellowTree"></div>
          </div>
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
    Icon,
  },
  props: {
    vProgress: {
      type: Function,
      default: () => {},
    },
    vComplete: {
      type: Function,
      default: () => {},
    },
  },
  data: () => {
    return {
      platouScale: 1,
      paintScale: 1,
      roomFloorScale: 1,
    }
  },
  computed: {
    machine() {
      return () => import(`~/static/img/home/machines.svg?inline`)
    },
    ada() {
      return () => import(`~/static/img/home/ada.svg?inline`)
    },
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
      if (this.$store.state.localStorage.user.initialized) {
        this.$router.push('/init')
      } else {
        this.$modal.show('authModal')
      }
    },
    hide() {
      this.$modal.hide('authModal')
    },
    getPos(el) {
      let lx = 0
      let ly = 0
      for (
        lx, ly;
        el != null;
        lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent
      );
      return { x: lx, y: ly }
    },
    handleScroll() {
      const vh = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      )
      const platouStart = 600
      const parallax = document.querySelector('.parallax')
      const pinkBush = document.querySelector('.pinkBushes')
      const groundZero = this.getPos(pinkBush).y + platouStart - vh / 2
      // This is a hack. i cannot reproduce height distortion of ground in css.
      // So i just flatten the height over scroll.
      this.paintScale = (groundZero - parallax.scrollTop) / vh / 1.5

      /* --------------------- */
      const roomFloor = document.querySelector('.roomFloor')
      const floorZero = this.getPos(roomFloor).y
      this.roomFloorScale = (floorZero - parallax.scrollTop) / vh
    },
  },
}
</script>

<style lang="scss">
#hero {
  height: 100vh;
  & > * {
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
        margin-top: 5px;
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
          max-width: 820px;
          margin: 0 auto 40px;
        }
      }
    }
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
        height: calc(100vh - 451px);
        display: block;
        top: 100%;
        position: relative;
      }
    }
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
      height: 500px;
      background: #e0f8fa;

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
      background-color: #d3f1fb;
      .bottom {
        display: block;
        width: 100%;
        top: 177px;
        position: absolute;
        transform-origin: top;
        height: 100vh;
        overflow: hidden;
        .paint {
          background: #b8d75f;
          height: 100vh;
          width: 100%;
          transform-origin: top;
        }
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
      top: 180px;
    }
    .platou2 {
      width: 100%;
      height: 316px;
      background: url('/img/home/platou2.svg');
      background-position: center;
      background-size: cover;
      position: absolute;
      top: -20px;
    }
    .platou3 {
      width: 100%;
      height: 244px;
      background: url('/img/home/platou3.svg');
      background-position: center;
      background-size: cover;
      position: absolute;
      top: 40px;
    }
    .platou4 {
      width: 100%;
      height: 188px;
      background: url('/img/home/platou4.svg');
      background-position: center;
      background-size: cover;
      position: absolute;
      top: 45px;
    }
    .machine {
      width: 3840px;
      position: absolute;
      left: 50%;
      top: -180px;
      transform: translateX(-50%);

      @keyframes rotate1 {
        0% {
          transform: rotateZ(-30deg);
        }
        100% {
          transform: rotateZ(30deg);
        }
      }

      .leftTip,
      .leftLevel1,
      .leftLevel2,
      .leftLevel3,
      .rightTip,
      .rightLevel1,
      .rightLevel2,
      .rightLevel3 {
        animation: ease-in-out infinite alternate;
        animation-name: rotate1;
      }
      .leftTip {
        animation-duration: 2s;
      }
      .leftLevel1 {
        animation-duration: 3s;
      }
      .leftLevel2 {
        animation-duration: 5s;
      }
      .leftLevel3 {
        animation-duration: 7s;
      }
      .rightTip {
        animation-duration: 2s;
      }
      .rightLevel1 {
        animation-duration: 3s;
      }
      .rightLevel2 {
        animation-duration: 5s;
      }
      .rightLevel3 {
        animation-duration: 7s;
      }

      @keyframes box {
        0% {
          transform: translateX(50px);
        }
        100% {
          transform: translateX(300px);
        }
      }

      @keyframes bottomBox {
        0% {
          transform: translateX(50px);
        }
        100% {
          transform: translateX(300px);
        }
      }

      @keyframes fall {
        0% {
          transform: translateX(50px);
        }
        60% {
          transform: translateX(200px) translateY(0px) rotateZ(0deg);
        }
        69% {
          transform: translateX(228px) translateY(22px) rotateZ(49deg);
        }
        90% {
          transform: translateX(330px) translateY(140px) rotateZ(49deg);
        }
        99% {
          transform: translateX(367.5px) translateY(152px) rotateZ(90deg);
        }
        100% {
          transform: translateX(370px) translateY(152px) rotateZ(90deg);
        }
      }
      .box,
      .fall,
      .bottomBox {
        animation: linear infinite;
        animation-duration: 3s;
        transform-origin: 2029.5px 200px;
      }
      .box {
        animation-name: box;
      }
      .fall {
        animation-name: fall;
      }
      .bottomBox {
        animation-name: bottomBox;
      }
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
      h2 {
        max-width: 800px;
        margin: 0 auto;
      }
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
      pointer-events: none;
    }
  }
}

#ada {
  z-index: 7;
  height: 100vh;
  margin-top: -270px;
  * {
    .adaWrapper {
      width: 1200px;
      margin: 0 auto;
      position: relative;
      .ada {
        width: 23vh;
        top: 40vh;
        position: absolute;
        right: 0;
      }
    }
    .room {
      height: 70vh;
      position: relative;
      .text {
        width: 600px;
        position: relative;
        font-family: 'Quicksand', sans-serif;
        color: #798f9c;
        text-align: center;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, 0%);
        h1 {
          font-size: 75px;
          line-height: 75px;
          font-weight: 600;
          margin-bottom: 40px;
          .link {
            position: relative;
            &:after {
              content: '';
              width: 100%;
              height: 6px;
              border-radius: 50px;
              background: #798f9c;
              position: absolute;
              left: 0;
              top: 100%;
              margin-top: -10px;
            }
          }
        }
        p {
          font-size: 38px;
          font-weight: 400;
          margin-bottom: 40px;
        }
      }
    }
    .roomFloor {
      height: 30vh;
      background: url('/img/home/roomFloor.svg');
      background-position: center;
      background-size: cover;
      transform-origin: bottom;
    }
  }
}

#price {
  height: 900px;
  z-index: 7;
  background: white;
  .priceLayer {
    background: white;
    border-top: 5px solid #f7fafc;
  }
  .priceCeiling {
    overflow: hidden;
    box-shadow: inset 0px 1px 0px 0px #e8e8e8;
    background: white;
  }
  * {
    .text {
      width: 1200px;
      position: relative;
      font-family: 'Quicksand', sans-serif;
      color: #798f9c;
      text-align: center;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      height: 490px;
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

  .coinWrapper {
    margin-top: 24px;
    transform: translateX(-50%) translateZ(-300px) scale(1);
    top: 490px;
    position: absolute;
    left: 50%;
    &:after {
      content: '';
      top: 100%;
      width: 100%;
      height: 37px;
      background: url('/img/home/coinPlatform.svg');
      background-position: center;
      background-size: cover;
      transform-origin: bottom;
      position: absolute;
      margin-top: 50px;
    }
  }

  $coin-diameter: 265px;
  $coin-thickness: 20px;
  $coin-color: #ffcc01;
  $coin: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4yIiBiYXNlUHJvZmlsZT0idGlueSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDQoJIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8Zz4NCgkJPGc+DQoJCQk8Y2lyY2xlIGZpbGw9IiNGRkQ3MTUiIGN4PSIyNTYiIGN5PSIyNTYiIHI9IjI1NiIvPg0KCQk8L2c+DQoJCTxnPg0KCQkJPGNpcmNsZSBmaWxsPSIjRkZDQzAxIiBjeD0iMjU2IiBjeT0iMjU2IiByPSIyMTcuMyIvPg0KCQk8L2c+DQoJPC9nPg0KCTxwYXRoIGZpbGw9IiNFNjlBMjQiIGQ9Ik0zNTEuNywxNzljMS43LTUuMywyLjYtMTAuOSwyLjYtMTYuOGMwLTI4LjgtMjEuNy01Mi41LTQ5LjYtNTUuNmMtMTAtMTUuMy0yNy4zLTI1LjUtNDctMjUuNQ0KCQljLTE5LjUsMC0zNi43LDEwLTQ2LjgsMjUuMmMtMjkuNiwxLjUtNTMuMiwyNi01My4yLDU2YzAsNS44LDAuOSwxMS41LDIuNiwxNi44Yy05LjksMTAuMS0xNi4xLDI0LTE2LjEsMzkuM2MwLDMwLjksMjUuMSw1Niw1Niw1Ng0KCQljMS45LDAsMy43LTAuMSw1LjUtMC4zYzQuMSwxMC4xLDExLjEsMTguOCwxOS45LDI1djEwMy4yYzAsNy4zLDUuOSwxMy4zLDEzLjMsMTMuM2gzNC4xYzcuMywwLDEzLjMtNS45LDEzLjMtMTMuM1YzMDEuMg0KCQljMTAuNC02LjIsMTguNi0xNS42LDIzLjItMjdjMC43LDAsMS41LDAuMSwyLjIsMC4xYzMwLjksMCw1Ni0yNS4xLDU2LTU2QzM2Ny44LDIwMywzNjEuNywxODkuMSwzNTEuNywxNzl6Ii8+DQo8L2c+DQo8L3N2Zz4NCg==);
  $edge-faces: 80;
  $edge-face-length: 3.14 * $coin-diameter/$edge-faces;
  $turn-time: 8s;

  .coin {
    position: relative;
    width: $coin-diameter;
    height: $coin-diameter;
    margin: 0px auto;
    transform-style: preserve-3d;
    animation: rotate3d $turn-time linear infinite;
    transition: all 0.3s;
  }

  .coin__front,
  .coin__back {
    position: absolute;
    width: $coin-diameter;
    height: $coin-diameter;
    border-radius: 50%;
    overflow: hidden;
    background-color: $coin-color;

    &:after {
      content: '';
      position: absolute;
      left: -$coin-diameter/2;
      bottom: 100%;
      display: block;
      height: $coin-diameter/1.5;
      width: $coin-diameter * 2;
      background: #fff;
      opacity: 0.3;
      animation: shine linear $turn-time/2 infinite;
    }
  }

  .coin__front {
    background-image: $coin;
    background-size: cover;
    transform: translateZ($coin-thickness/2);
  }
  .coin__back {
    background-image: $coin;
    background-size: cover;
    transform: translateZ(-$coin-thickness/2) rotateY(180deg);
  }

  .coin__edge {
    @for $i from 1 through $edge-faces {
      div:nth-child(#{$i}) {
        position: absolute;
        height: $edge-face-length;
        width: $coin-thickness;
        background: $coin-color;
        transform: translateY(#{$coin-diameter/2-$edge-face-length/2})
          translateX(#{$coin-diameter/2-$coin-thickness/2})
          rotateZ(360deg / $edge-faces * $i + 90)
          translateX(#{$coin-diameter/2})
          rotateY(90deg);
      }
    }
  }

  @keyframes rotate3d {
    0% {
      transform: perspective(1000px) rotateY(0deg);
    }

    100% {
      transform: perspective(1000px) rotateY(360deg);
    }
  }

  @keyframes shine {
    0%,
    15% {
      transform: translateY($coin-diameter * 2) rotate(-40deg);
    }
    50% {
      transform: translateY(-$coin-diameter) rotate(-40deg);
    }
  }

  .coinFloor {
    width: 100%;
    height: 34px;
    background: #1a2e35;
    position: absolute;
    bottom: 0;
  }
}

#gonow {
  height: 100vh;
  * {
    .yellowTree {
      width: 100%;
      height: 100vh;
      background: url('/img/home/yellowTree.svg');
      background-position: center;
      background-size: cover;
      transform-origin: bottom;
      position: absolute;
      top: 10px;
    }

    .text {
      width: 600px;
      margin-left: 600px;
      text-align: left;
      color: #ff9000;
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

  .m200 {
    background: #ffed5b;
  }
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
  opacity: 1;
  hr {
    border: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(135deg, #6f9941 0%, #787dd2 100%);
  }
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1200px) {
  .parallax {
    width: calc(100% + 34px) !important;
    margin-left: -17px;
  }

  .middle {
    width: 100%;
  }

  #hero {
    & > * {
      .logo {
        margin-top: 75px;
      }
      .imageWithText {
        width: 100vw;
        height: 600px;
        margin-top: 100px;
        margin-left: 17px;
        .redPlant {
          width: 133px;
          height: 221px;
          clear: both;
          display: block;
          margin: 5px auto;
          float: none;
        }
        .text {
          clear: both;
          width: 125%;
          height: 300px;
          transform: none;
          position: absolute;
          left: 0;
          transform: scale(0.8);
          transform-origin: top left;
          height: 480px;
          margin-top: 20px;
          top: 220px;
          text-align: center;
        }
      }
    }
  }

  #platou {
    & > * {
      .ceiling h2 {
        font-size: 32pt;
        line-height: 42px;
        width: 100%;
        padding: 0 30px;
        max-width: 680px;
      }
      .machine {
        margin-left: 55vw;
      }
    }
  }

  #ada {
    margin-top: -200px;
    * {
      .room .text {
        width: 100%;
        margin-top: -100px;
        h1 {
          font-size: 48pt;
          .link:after {
            height: 4px;
            margin-top: -5px;
          }
        }
        p {
          font-size: 28pt;
          padding: 0 60px;
        }
      }
      .adaWrapper {
        width: 100%;
        .ada {
          top: 55vh;
          position: absolute;
          left: calc(50% - 100px);
          width: 200px;
        }
      }
    }
  }

  #price * {
    .text {
      width: 100%;
      top: 40%;
      h1 {
        font-size: 48pt;
      }
      p {
        font-size: 28pt;
        padding: 0 60px;
      }
    }
  }

  #gonow * {
    .text {
      width: 100%;
      margin-left: 0;
      text-align: center;
      p {
        font-size: 28pt;
        padding: 0 60px;
      }
      h1 {
        font-size: 48pt;
      }
    }
    .yellowTree {
      background-position: 100%;
    }
  }
}

@media only screen and (max-width: 767px) {
  .parallax {
    width: calc(100% + 34px) !important;
    margin-left: -17px;
  }

  .middle {
    width: 100%;
  }

  #hero {
    & > * {
      .logo {
        margin-top: 50px;
      }
      .imageWithText {
        width: 100vw;
        height: 454px;
        margin-top: 160px;
        margin-left: 17px;
        .redPlant {
          width: 110px;
          height: 183px;
          clear: both;
          display: block;
          margin: 5px auto;
          float: none;
        }
        .text {
          clear: both;
          width: 200%;
          height: 300px;
          transform: none;
          position: absolute;
          left: 0;
          transform: scale(0.5);
          transform-origin: top left;
          height: 480px;
          margin-top: 20px;
          top: 173px;
          text-align: center;
        }
      }
    }
  }

  #platou {
    h2 {
      font-size: 32pt;
      line-height: 42px;
      width: 100%;
      padding: 0 30px;
    }
    & > * .machine {
      margin-left: 70vw;
    }
  }

  #ada {
    margin-top: -100px;
    * {
      .room .text {
        width: 100%;
        margin-top: -100px;
        h1 {
          font-size: 50px;
          .link:after {
            height: 4px;
            margin-top: -5px;
          }
        }
        p {
          font-size: 18pt;
          padding: 0 30px;
        }
      }
      .adaWrapper {
        width: 100%;
        .ada {
          top: 55vh;
          position: absolute;
          left: calc(50% - 55px);
          width: 110px;
        }
      }
    }
  }

  #price * {
    .machine {
      margin-left: 122vw;
    }
    .text {
      width: 100%;
      top: 40%;
      h1 {
        font-size: 48pt;
      }
      p {
        font-size: 18pt;
        padding: 0 30px;
      }
    }
  }

  #gonow * {
    .text {
      width: 100%;
      margin-left: 0;
      text-align: center;
      p {
        font-size: 18pt;
        padding: 0 30px;
      }
      h1 {
        font-size: 40px;
      }
    }
    .yellowTree {
      background-position: 100%;
    }
  }
}
</style>
