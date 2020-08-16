<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="@/assets/0.png" alt />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="primary" @click="cancel_click">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <side-bar></side-bar>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideBar from '@/views/sidebar/index.vue'

export default {
  name: "home",
  data() {
    return {};
  },
  components: {
    SideBar
  },
  methods: {
    cancel_click() {
      window.sessionStorage.removeItem("token");
      this.$router.push("login");
      this.$message.warning('您已退出系统！')
    },
  },
};
</script>

<style lang='scss' scoped>
.el-container {
  height: 100%;
  .el-header {
    background-color: #373d41;
    color: #fff;
    text-align: center;
    font-size: 20px;
    // line-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      display: flex;
      align-items: center;
      img {
        height: 50px;
        width: 50px;
        margin: 2px 2px 2px 0px;
      }
    }
  }
  .el-aside {
    height: 100%;
    background-color: #333744;
    color: #fff;
    text-align: center;
    line-height: 200px;
  }
  .el-main {
    background-color: #eaedf1;
    color: #363434;
    text-align: center;
    line-height: 160px;
  }
}
</style>