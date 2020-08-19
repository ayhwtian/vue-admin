<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#333744"
    text-color="#fff"
    active-text-color="#409efe"
    unique-opened
  >
    <!-- <aside-child :list="menulist"/> -->
    <aside-child :list="menulist" />
  </el-menu>
</template>

<script>
// import AsideChild from './item.vue'
import AsideChild from "./asidechild.vue";

export default {
  name: "SideBar",
  data() {
    return {
      menulist: [],
    };
  },
  created() {
    // 后台api获取菜单
    // this.getMenuList();
    this.convertMenuList();
  },
  components: {
    AsideChild,
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 后台获取
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      // console.log(res);
      this.menulist = res.data;
    },
    // 转换Object为数组
    async convertMenuList() {
      this.menulist = await this.$router.options.routes
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-menu {
  border-right: 0px solid;
  .el-menu-item {
    span {margin-left: 20px;}
  }
}
</style>