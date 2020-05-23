<template>
  <div class="scoreContainer">
    <div class="scoreWrapper">
      <div class="titleWrapper">
        <div class="iconWrapperBig">
          <Icon :size="26" i="chart" stroke="#fff" stroke-width="2" />
          <h1>Sıralama Tablosu</h1>
        </div>

        <div class="iconWrapper">
          <Icon :size="26" i="cup" stroke="#fff" stroke-width="2" />
          <h1>en iyi 5</h1>
        </div>
        <div class="iconWrapper">
          <Icon :size="26" i="layers" stroke="#fff" stroke-width="2" />
          <h1>{{ episodeID }}</h1>
        </div>
      </div>
      <div class="labelWrapper">
        <div class="accountWrapper">
          <h1 class="flex:1">Sıralama</h1>
          <h1 class="flex:1">Kullanıcı Adı</h1>
        </div>
        <div class="resultWrapper">
          <h1 class="element">Satır Sayısı</h1>
          <h1 class="element">İşlem Sayısı</h1>
          <h1 class="element">Süre</h1>
        </div>
      </div>
      <div>
        <Element
          :bg-color="`#ecf0f1`"
          :rank="1"
          :username="list[0]"
          :numofline="list[1]"
          :numofexec="list[2]"
          :duration="list[3]"
        />

        <Element
          :bg-color="`#fff`"
          :rank="2"
          :username="list[4]"
          :numofline="list[5]"
          :numofexec="list[6]"
          :duration="list[7]"
        />

        <Element
          :bg-color="`#ecf0f1`"
          :rank="3"
          :username="list[8]"
          :numofline="list[9]"
          :numofexec="list[10]"
          :duration="list[11]"
        />

        <Element
          :bg-color="`#fff`"
          :rank="4"
          :username="list[12]"
          :numofline="list[13]"
          :numofexec="list[14]"
          :duration="list[15]"
        />

        <Element
          :bg-color="`#ecf0f1`"
          :rank="5"
          :username="list[16]"
          :numofline="list[17]"
          :numofexec="list[18]"
          :duration="list[19]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '~/components/atomic/Icon'
import Element from '~/components/scoreboard/boardelement'

export default {
  components: {
    Icon,
    Element,
  },
  props: {},
  data() {
    return {
      list: [
        'username1',
        31,
        11,
        2,
        'username2',
        11,
        31,
        1,
        'username3',
        6,
        26,
        2,
        'username4',
        55,
        109,
        3,
        'username5',
        16,
        71,
        1,
      ],
    }
  },
  computed: {
    episodeID() {
      return this.$route.params.id
    },
  },
  methods: {},
}
</script>

<style lang="scss">
.scoreContainer {
  width: 100vw;
  height: 100vh;
  background: url(/img/memphis-colorful.png);
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  .scoreWrapper {
    background-color: #fff;
    max-width: 1200px;
    width: 100%;

    .titleWrapper {
      width: 100%;
      height: 70px;
      background-color: #2ecc71;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      position: relative;
      overflow: visible;

      h1 {
        color: #fff;
        font-size: 18pt;
        margin-left: 20px;
      }
      .iconWrapperBig {
        flex: 2;
        display: flex;
        flex-direction: row;
        margin-left: 30px;
        align-items: center;
      }
      .iconWrapper {
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }
    }
    .labelWrapper {
      width: 100%;
      height: 80px;
      margin: auto;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      h1 {
        font-size: 16pt;
        font-family: 'Quicksand', sans-serif;
        color: #2c3e50;
      }

      .accountWrapper {
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;

        .avatar {
          width: 60px;
          height: 60px;
          border-radius: 100%;
        }
      }

      .resultWrapper {
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
    }
  }
}
</style>
