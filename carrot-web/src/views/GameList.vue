<template>
  <div class="game-list">
    <el-card
      class="box-card game-card"
      v-for="(item, index) in gameList"
      :key="index"
    >
      <div 
        class="card-wrapper" 
        @click="showHandle(index)"
      >
        <div
          class="img"
          v-lazy:background-image="replaceImgs(item.picture)"
        ></div>
        <div class="info">
          <h2 @click="jumpSteam(item)">
            <span v-for="(it, idx) in item.title" :key="it">
              <span v-if="it && idx">·</span>
              <span>{{ it }}</span>
            </span>
          </h2>

          <div class="tag-list">
            <el-tag size="mini" v-if="item.product_info.listDate" type="info">{{
              item.product_info.listDate
            }}</el-tag>
            <el-tag
              size="mini"
              v-if="item.product_info.commentNum"
              type="info"
              >{{ item.product_info.commentNum }}</el-tag
            >
            <el-tag
              size="mini"
              v-if="item.product_info.commentRate"
              type="info"
              >好评率: {{ item.product_info.commentRate }}</el-tag
            >
          </div>

          <div class="rate">
            <span class="title">{{ item.discount_info[0] }}折扣</span>
            <span class="text" :style="computedStyle(item.discount_info[2])">{{ item.discount_info[2] }}</span>
          </div>

          <div class="rate-num">
            <span>当前价格: {{ item.discount_info[1] }}</span>
          </div>
        </div>
      </div>
      <el-collapse-transition>
        <div class="extra-wrapper" v-if="show[index]">
          <div v-if="item.platforms.steam" class="game-li">
            <div class="text-left">
              <p class="game-li-title"><a :href="item.platforms.steam.source" target="_blank">{{ item.platforms.steam.name}}</a></p>
              <p>{{item.platforms.steam.display_text}}</p>
              <p>{{item.platforms.steam.sales_date}}</p>
            </div>
            <div class="text-right">
              <p class="game-li-original">{{item.platforms.steam.original_price}}</p>
              <p>{{item.platforms.steam.price}}</p>
              <p>{{item.platforms.steam.sales_text}}</p>
            </div>
          </div>
          <div></div>
          <div></div>
        </div>
      </el-collapse-transition>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop, Watch } from "vue-property-decorator";
import lottie from "lottie-web";

@Component({
  filters: {
    replaceImg(value) {
      if (!value) return "";
      return value.replace(/capsule.*/, "header.jpg");
    }
  }
})
export default class GameList extends Vue {
  private gameList: [] = [];
  private title: string = "";
  private show = {};

  @Emit()
  updateTitle() {
    return this.title;
  }

  @Prop({ type: String, default: "steam" }) type;

  replaceImgs(value) {
    if (!value) return "";
    return value.replace(/capsule.*/, "header.jpg");
  }

  @Watch("type", { deep: true })
  checkChange() {
    this.fetchList()
  }

  async mounted() {
    this.fetchList()
  }

  async fetchList() {
    const res = await this.$axios.get(`/api/game/${ this.type }`);
    if (!res.code) {
      this.show = {};
      this.gameList = res.data.data;
      this.title = res.data.name;
    }
  }

  jumpSteam(item) {
    const src = item.platforms.steam ? item.platforms.steam.source : ''
    if (src) {
      window.open(src)
    } else {
      this.$message.warning('当前游戏不可跳转')
    }
  }

  computedStyle(text) {
    if (text.indexOf('打破') > -1) {
      return {
        color: 'yellow',
        'font-weight': 'bold'
      }
    } else if (text.indexOf('未达') > -1) {
      return {
        color: '#eee'
      }
    } else {
      return {
        color: '#fff',
        'font-weight': 'bold'
      }
    }
  }

  showHandle(idx) {
    this.$set(this.show, idx, !this.show[idx])
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
    cursor: pointer;
  }

  .card-wrapper {
    display: flex;
    .img {
      min-width: 100px;
      width: 36%;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      padding-bottom: 17.5%;
      flex: 0 0 auto;
      background-color: #eee;
    }
    .info {
      position: relative;
      flex: 1 1 auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      h2 {
        overflow: hidden;
        text-overflow: ellipsis;
        // white-space: nowrap;
      }
      .tag-list {
        font-size: 14px;
        margin: 8px 0 0;
        .el-tag {
          margin-bottom: 8px;
          margin-right: 8px;
        }
      }

      .rate {
        font-size: 14px;
        position: absolute;
        right: 0;
        bottom: 0;
        background-color: #e90c19;
        color: #fff;
        padding: 2px 16px;
        border-top-left-radius: 8px;
        text-align: center;
        &:after {
          content: "";
          position: absolute;
          left: -19px;
          top: -17px;
          width: 0;
          height: 0;
          border: 20px solid transparent;
          border-bottom: 50px solid #e90c19;
        }
        .title {
          display: block;
          font-size: 14px;
          font-weight: bold;
        }
        .text {
          display: block;
          font-size: 10px;
        }
      }

      .rate-num {
        font-size: 16px;
        color: #e90c19;
        font-weight: bold;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }
    }
  }

  .extra-wrapper {
    font-size: 14px;
    background: #eee;
    padding: 8px;
    box-shadow: inset 0px 5px 8px 1px hsla(0, 0%, 0%, 0.13);
    .game-li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .text-left {
        text-align: left;
      }
      .text-right {
        text-align: right;
      }
      p {
        margin: 4px;
      }
      .game-li-title {
        
      }
    }
  }
}
</style>
