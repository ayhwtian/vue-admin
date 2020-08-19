<template>
  <div>
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
  </div>
</template>

<script>
export default {
  name: "AsideChild",
  data() {
    return {
      // routes: {...this.$router.options.routes}
    };
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

</style>