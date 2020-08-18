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
    <aside-child />
  </el-menu>
</template>

<script>
// import AsideChild from './item.vue'
import AsideChild from './asidechild.vue'

export default {
  name: "SideBar",
  data() {
    return {
      // menulist: [],
    };
  },
  created() {
    this.getMenuList();
  },
  components: {
    AsideChild
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      // console.log(res);
      this.menulist = res.data;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>