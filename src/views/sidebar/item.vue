<template>
  <div>
    <template v-for="item in list">
      <template v-if="item.children && item.children.length > 0">
        <el-submenu :index="item.id+''" :key="item.id">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.authName }}</span>
          </template>
          <AsideChild :list="item.children" />
        </el-submenu>
      </template>
      <template v-if="item.children.length == 0">
        <el-menu-item :key="item.id" :index="item.id+''">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.authName }}</span>
        </el-menu-item>
      </template>
    </template>
  </div>
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
      required: true
    }
  },
};
</script>

<style lang='scss' scoped>
.el-menu {
  border-right: 0px solid;
  .el-menu-item {
    margin-left: 10px;
  }
}
</style>