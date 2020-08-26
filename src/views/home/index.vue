<template>
  <el-container class="home-container">
    <el-aside :width="fold ? '200px' : '64px'">
      <div>
        <img src="@/assets/0.png" alt />
        <span v-show="fold">电商后台管理系统</span>
      </div>
      <side-bar :fold="!fold"></side-bar>
    </el-aside>
    <el-container>
      <el-header>
        <div>
          <div class="fold" @click="fold_click">
            <i class="el-icon-s-fold" v-if="fold"></i>
            <i class="el-icon-s-unfold" v-else></i>
          </div>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="item in $store.state.breadcrumbList" :key="item.id">{{item}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-button type="primary" @click="cancel_click">退出</el-button>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideBar from "@/views/sidebar/index.vue";

export default {
  name: "home",
  data() {
    return {
      fold: true,
    };
  },
  components: {
    SideBar,
  },
  methods: {
    // 退出登录
    cancel_click() {
      window.sessionStorage.removeItem("token");
      this.$router.push("login");
      this.$message.warning("您已退出系统！");
    },
    // 折叠导航栏
    fold_click() {
      this.fold = !this.fold;
    },
  },
};
</script>

<style lang='scss' scoped>
.el-container {
  height: 100%;
  .el-header {
    margin-left: 5px;
    background-color: #ffffff;
    box-shadow: 0 5px 5px rgba(39, 39, 39, 0.1);
    color: #737b88;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .fold {
      display: inline-block;
      height: 30px;
      &:hover {
        background-color: rgba(0, 0, 0, 0.02);
      }
      .el-icon-s-fold {
        display: block;
        line-height: 30px;
        font-size: 20px;
      }
      .el-icon-s-unfold {
        display: block;
        line-height: 30px;
        font-size: 20px;
      }
    }
    .el-breadcrumb {
      margin-left: 10px;
      display: inline-block;
    }
  }
  .el-aside {
    height: 100%;
    background-color: #304155;
    box-shadow: 1px 0 5px 1px rgba(39, 39, 39, 0.1);
    color: #fff;
    text-align: center;
    line-height: 200px;

    div {
      margin-left: 10px;
      display: flex;
      align-items: center;
      height: 50px;
      font-size: 16px;
      img {
        height: 40px;
        width: 40px;
        margin: 2px 2px 2px 0px;
      }
    }
  }
  .el-main {
    margin-left: 5px;
    margin-top: 5px;
    padding: 0;
    background-color: #f6f7f9;
    color: #363434;
    text-align: center;
    line-height: 160px;
  }
}
</style>