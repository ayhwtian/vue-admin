<template>
  <div id="login" class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="@/assets/logo.png" alt />
      </div>
      <!-- 登陆表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        label-width="0px"
        class="login_form"
        :rules="loginFormRules"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-account-fill"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-password1"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区 -->
        <el-form-item class="btn">
          <el-button type="primary" @click="login_click">登陆</el-button>
          <el-button type="info" @click="resetLoginFrom_click">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    // 密码验证规则
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
    };

    return {
      // 登陆表单数据绑定对象
      loginForm: {
        username: "admin",
        password: "123456",
      },
      // 表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 点击重置按钮重置表单
    resetLoginFrom_click() {
      this.$refs.loginFormRef.resetFields();
    },
    // 登陆之前的预验证
    login_click() {
      this.$refs.loginFormRef.validate(async (valid) => {
        // console.log(valid);
        if (!valid) return;
        const { data: res } = await this.$http.post("login", this.loginForm);
        if (res.meta.status === 400)
          return this.$message.error("用户名或密码错误");
        if (res.meta.status === 200) {
          // 1. 将登陆成功之后的 token 保存到客户端的 sessionStorage 中
          //  1.1 项目中除了登录之外的其他API接口，必须在登录之后才能访问
          //  1.2 token 只应该在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
          // 2. 通过编程时导航跳转到后台主页，路由地址是 /home
          window.sessionStorage.setItem("token", res.data.token);
          this.$router.push('/home')
          return this.$message.success("登陆成功");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login_container {
  width: 1920px;
  height: 1080px;
  background:linear-gradient(90deg, #667db6 0%,#0082c8 33%,#0082c8 66%,#667db6 100% );
  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .avatar_box {
      height: 130px;
      width: 130px;
      background-color: #fff;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 5px;
      box-shadow: 0 0 10px #ddd;
      img {
        height: 100%;
        width: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
    .login_form {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 20px;
      .btn {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>