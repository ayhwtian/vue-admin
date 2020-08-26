<template>
  <fragment>
    <template v-for="item in list">
      <template v-if="item.children && item.children.length > 0">
        <el-submenu :index="'/' + item.path" :key="item.id">
          <template slot="title">
            <!-- 正常使用从后台获取icon图标 -->
            <!-- <i :class="item.icon"></i> -->

            <!-- 临时使用的固定图标 -->
            <i class="el-icon-location"></i>
            <span>{{ item.authName }}</span>
          </template>
          <AsideChild :list="item.children" />
        </el-submenu>
      </template>
      <template v-if="item.children.length == 0">
        <el-menu-item :key="item.id" :index="'/' + item.path">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.authName }}</span>
        </el-menu-item>
      </template>
    </template>
  </fragment>
</template>

<script>
export default {
  name: "AsideChild",
  data() {
    return {};
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
  .el-menu-item {
    background-color: #202d3d !important;
    &:hover {
      background-color: #19232e !important;
    }
  }
  .el-submenu {
    
   ::v-deep .el-submenu__title {
      padding: 0 90px;
    }
  }
}
</style>