<template>
  <el-container style="min-height: 100vh;">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-weight: bold;">{{ cardTitle }}</span>

        <el-select
          v-model="value"
          placeholder="请选择"
          style="float: right; margin-top: -2px;"
          size="mini"
        >
          <el-option
            v-for="item in options"
            :key="item.type"
            :label="item.name"
            :value="item.type"
          >
          </el-option>
        </el-select>
      </div>
      <router-view :type="value"></router-view>
    </el-card>
  </el-container>
</template>

<style lang="scss" scoped>
.box-card {
  width: 100%;
  max-width: 800px;
  margin: 30px auto;
}
</style>

<script>
export default {
  data() {
    return {
      options: [
        {
          path: "index_r",
          name: "Steam 最新折扣",
          type: "steam"
        },
        {
          path: "index1",
          name: "热门游戏折扣",
          type: "hot"
        },
        {
          path: "index_1c",
          name: "热门中文游戏折扣",
          type: "hot_chinese"
        },
        {
          path: "index2",
          name: "热门游戏历史低价",
          type: "hot_history"
        },
        {
          path: "index_2c",
          name: "中文游戏历史低价",
          type: "hot_chinese_history"
        }
      ],
      value: this.$route.query.type || "steam"
    };
  },
  computed: {
    cardTitle() {
      return this.options.find(item => item.type === this.value).name
    }
  },
};
</script>
