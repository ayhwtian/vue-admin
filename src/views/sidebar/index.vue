<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @select="handleSelect"
    background-color="#304155"
    text-color="#fff"
    active-text-color="#409efe"
    unique-opened
    :collapse-transition="false"
    :collapse="fold"
    router
  >
    <aside-child :list="menulist" />
  </el-menu>
</template>

<script>
import AsideChild from "./item.vue";
// import AsideChild from "./asidechild.vue";

export default {
  name: "SideBar",
  data() {
    return {
      menulist: [],
      breadcrumb: '',
    };
  },
  props: {
    fold: false,
  },
  created() {
    // 后台api获取菜单
    this.getMenuList();
    // this.convertMenuList();
  },
  components: {
    AsideChild,
  },
  methods: {
    handleOpen(index, indexPath) {
      this.menulist.forEach((item) => {
        // console.log(item.authName, item.path, index);
        if (index === "/" + item.path) {
          // console.log(item.authName);
          this.breadcrumb = item.authName
        }
      });
    },
    handleSelect(index, indexPath) {
      this.$store.commit({
        type: "clearBreadCrumb",
        item: [],
      });
      this.handleOpen();
      this.menulist.forEach((item) => {
        item.children.forEach((itemChild) => {
          if (
            this.$store.state.breadcrumbList.indexOf(itemChild.authName) === -1
          ) {
            if (index === "/" + itemChild.path) {
              const breadcrumbList = [this.breadcrumb, itemChild.authName];
              console.log(breadcrumbList);
              this.$store.commit({
                type: "updateBreadcrumb",
                item: breadcrumbList,
              });
            }
          }
        });
      });
      console.log(this.$store.state.breadcrumbList);
    },
    // 后台获取
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      this.menulist = res.data;
    },
    // 从路由获取数据，转换Object为数组
    async convertMenuList() {
      this.menulist = await this.$router.options.routes;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}
</style>