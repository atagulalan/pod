<template>
  <div class="scoreContainer">
    <h1>SUKAR TUBLAZI</h1>
    <div class="scoreWrapper">
      <div class="titleWrapper">
        <div class="iconWrapperBig">
          <Icon :size="26" i="chart" stroke="#fff" stroke-width="2" />
          <h1>Sıralama Tablosu</h1>
        </div>

        <div class="iconWrapper" @click="isTop5 = true">
          <Icon :size="26" i="cup" stroke="#fff" stroke-width="2" />
          <h1 :class="{ active: isTop5 }">en iyi 5</h1>
        </div>
        <div class="iconWrapper" @click="isTop5 = false">
          <Icon :size="26" i="swap-vertical" stroke="#fff" stroke-width="2" />
          <h1 :class="{ active: !isTop5 }">senin çevren</h1>
        </div>
        <div class="iconWrapper">
          <Icon :size="26" i="layers" stroke="#fff" stroke-width="2" />
          <h1 :class="{ active: isLine }">{{ episode }}</h1>
        </div>
      </div>
      <div class="labelWrapper">
        <div class="accountWrapper">
          <h1 class="flex:1">Sıralama</h1>
          <div>
            <h1 class="flex:1">Avatar</h1>
          </div>
          <h1 class="flex:1">Kullanıcı Adı</h1>
        </div>
        <div class="resultWrapper">
          <h1 class="element">Satır Sayısı</h1>
          <h1 class="element">İşlem Sayısı</h1>
          <h1 class="element">Bölüm Başarısı</h1>
        </div>
      </div>

      <div v-for="element in list" :key="element.rank">
        <Element
          :bg-color="element.rank % 2 === 0 ? '#f2f2f2' : '#fff'"
          :rank="element.rank"
          :avatar="element.avatar"
          :username="element.username"
          :numofline="element.numofline"
          :numofexec="element.numofexec"
          :star-count="element.stars"
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
  data() {
    return {
      isTop5: true,
      episode: 'b-12',
      list: [
        {
          rank: '1',
          avatar:
            'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
          username: 'username1',
          numofline: 31,
          numofexec: 11,
          stars: 2,
        },
        {
          rank: '2',
          avatar:
            'https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg',
          username: 'username2',
          numofline: 11,
          numofexec: 31,
          stars: 1,
        },
        {
          rank: '3',
          avatar:
            'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg',
          username: 'username1',
          numofline: 6,
          numofexec: 26,
          stars: 2,
        },
        {
          rank: '4',
          avatar:
            'https://i2.wp.com/background4free.com/download/blue_yellow_light_115379772.jpg?q=100',
          username: 'username1',
          numofline: 55,
          numofexec: 109,
          stars: 3,
        },
        {
          rank: '5',
          avatar:
            'https://i0.wp.com/office365itpros.com/wp-content/uploads/2019/10/Teams-Custom-Background-Setting.jpg?fit=840%2C439&ssl=1',
          username: 'username1',
          numofline: 16,
          numofexec: 71,
          stars: 1,
        },
      ],
    }
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

  .scoreWrapper {
    background-color: #f2f2f2;
    width: 60%;
    margin: auto;

    .titleWrapper {
      width: 100%;
      height: 70px;
      background-color: #4cd697;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      position: relative;
      overflow: visible;

      .active {
        border-bottom: solid 1px red;
      }
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
      }

      .accountWrapper {
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
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
        justify-content: space-evenly;
      }
    }
  }
}
</style>
