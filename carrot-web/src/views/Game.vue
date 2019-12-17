<template>
  <el-container style="min-height: 100vh;">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ cardTitle }}</span>
      </div>
      <router-view @update-title="updateTitle"></router-view>
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
      cardTitle: ''
    }
  },
  methods: {
    updateTitle(data) {
      this.cardTitle = data
    }
  }
}
</script>