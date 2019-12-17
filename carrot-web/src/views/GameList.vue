<template>
  <div>
    <el-card class="box-card game-card" v-for="(item, index) in gameList" :key="index">
      <div class="card-wrapper">
        <div class="img">
          <img :src="item.picture" alt="">
        </div>
        <div class="info">
          <h2>
            <span v-for="(it, idx) in item.title" :key="it" >
                <span v-if="it && idx"> · </span>
                <span>{{ it }}</span>
            </span>
          </h2>
        </div>
      </div>
      
    </el-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";
import lottie from "lottie-web";

@Component({})
export default class GameList extends Vue {
  private gameList: [] = []
  private title: string = ''

  @Emit()
  updateTitle() {
    return this.title
  }

  async mounted() {
    const res = await this.$axios.get('/api/game/hot')
    if (!res.code) {
      this.gameList = res.data.data
      this.title = res.data.name
      this.updateTitle()
    }
  }
}
</script>

<style lang="scss">
.game-card.box-card {
  .el-card__body {
    padding: 0;
  }
}
</style>

<style lang="scss" scoped>
.box-card:not(:first-child) {
  margin: 16px 0;
}

.box-card {
  font-size: 0;
  h2 {
    font-size: 16px;
    margin: 0;
  }

  .card-wrapper {
    display: flex;
  }
  
}
</style>

