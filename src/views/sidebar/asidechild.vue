<template>
  <div>
    <template v-for="item in routes">
      <template v-if="item.children && item.children.length">
        <el-submenu :index="item.path" :key="item.path">
          <template slot="title">
            <!-- <i :class="item.meta.icon"></i> -->
            <span>{{ item.name }}</span>
          </template>
          <AsideChild :list="item.children" />
        </el-submenu>
      </template>
      <template v-if="!item.children">
        <el-menu-item :key="item.path" :index="item.path">
          <!-- <i :class="item.meta.icon"></i> -->
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: "AsideChild",
  data() {
    return {
      routes: this.$router.options.routes,
      a: [1,2,3]
    };
  },
  created() {
    for (var i in this.routes) {
      console.log(i.name);
    };
    console.log(this.routes);
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