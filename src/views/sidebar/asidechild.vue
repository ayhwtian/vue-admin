<template>
  <fragment>
    <!-- 这是从前端路由获取菜单列表的方式，我参考大佬们的构想应该还有一步从后端动态获取路由，然后和前端固定路由合并，生成一个新的路由表
    再根据这个新的路由表生成菜单，我要努力实现这个功能，这样就把动态获取后端路由和前端完美合并成一个代码了 -->
    <template v-for="item in list">
      <template v-if="item.children && item.children.length>0 && !item.hidden">
        <el-submenu :index="item.path" :key="item.path">
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span>{{ item.meta.title }}</span>
          </template>

          <AsideChild :list="item.children" />
        </el-submenu>
      </template>
      <template v-if="!item.children && !item.hidden">
        <el-menu-item :key="item.path" :index="item.path">
          <i :class="item.meta.icon"></i>
          <span slot="title">{{ item.meta.title }}</span>
        </el-menu-item>
      </template>
    </template>
  </fragment>
</template>

<script>
export default {
  name: "AsideChild",
  data() {
    return {
    };
  },
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang='scss' scoped>
.el-menu {
  border-right: 0px solid;
  .el-submenu {
    ::v-deep .el-submenu__title {
      padding: 0 90px;
    }
  }
}
</style>