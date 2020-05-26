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
          <h1>Sıralama</h1>
          <h1 style="text-align: left; margin-left: 200px;">Kullanıcı Adı</h1>
        </div>
        <div class="resultWrapper">
          <h1 class="element">Satır Sayısı</h1>
          <h1 class="element">İşlem Sayısı</h1>
          <h1 class="element">Süre</h1>
        </div>
      </div>

      <div v-for="(item, i) in list" :key="`score${i}`">
        <Element
          :bg-color="i % 2 == 0 ? `#ecf0f1` : `#fff`"
          :rank="i + 1"
          :user="item.user"
          :line="item.line"
          :exec="item.exec"
          :duration="item.duration"
        />
      </div>

      <Button
        style="float: right; margin: 5px;"
        size="fit"
        background="#46cb92"
        @click="goForest()"
      >
        Ormana Dön
        <Icon :size="24" i="arrow-right" stroke="#fff" />
      </Button>
    </div>
  </div>
</template>

<script>
import Icon from '~/components/atomic/Icon'
import Element from '~/components/scoreboard/boardelement'
import { top5 } from '~/middleware/top5'
import Button from '~/components/atomic/Button'

export default {
  components: {
    Icon,
    Element,
    Button,
  },
  props: {},
  data() {
    return {
      list: [
        {
          user: 'Henüz bu sıraya yerleşen olmadı.',
          line: 0,
          exec: 0,
          duration: 0,
        },
        {
          user: 'Henüz bu sıraya yerleşen olmadı.',
          line: 0,
          exec: 0,
          duration: 0,
        },
        {
          user: 'Henüz bu sıraya yerleşen olmadı.',
          line: 0,
          exec: 0,
          duration: 0,
        },
        {
          user: 'Henüz bu sıraya yerleşen olmadı.',
          line: 0,
          exec: 0,
          duration: 0,
        },
        {
          user: 'Henüz bu sıraya yerleşen olmadı.',
          line: 0,
          exec: 0,
          duration: 0,
        },
      ],
    }
  },
  computed: {
    episodeID() {
      return this.$route.params.id
    },
  },
  mounted() {
    top5
      .bind(this)(this.$route.params.id)
      .then((data) => {
        this.list = data.data.top5
      })
  },
  methods: {
    goForest() {
      this.$router.push(`/forests`)
    },
  },
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
        align-items: center;

        h1 {
          width: 200px;
          text-align: center;
        }
      }

      .resultWrapper {
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;

        h1 {
          width: 200px;
          text-align: center;
        }
      }
    }
  }
}
</style>
