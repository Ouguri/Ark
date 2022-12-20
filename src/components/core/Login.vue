<template>
  <div>
    <div class="page">
      <div class="login">
        <form class="login_box">
          <div class="login_box_ipt margin_login">
            <label for="username" class="login_box_title">
              <span>账号</span>
            </label>
            <el-input
              id="username"
              class="login_box_input"
              v-model="username"
              placeholder="账号名"
            />
          </div>

          <div class="login_box_ipt">
            <label for="password" class="login_box_title">
              <span>密码</span>
            </label>
            <el-input
              id="password"
              class="login_box_input margin_login"
              v-model="password"
              placeholder="密码"
              show-password="true"
            />
          </div>

          <div class="margin_login">
            <input class="login_box_checkbox" type="checkbox" id="remember" />
            <label for="remember" class="login_box_remember">
              <span>记住我</span>
            </label>
          </div>

          <button class="login_box_btn" @click.prevent="userLogin">
            登 录
          </button>
        </form>
        <div class="login_bgc"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { userStore } from "@/stores/user";
import { useRouter } from "vue-router";
let username = ref<string>("ouguri");
let password = ref<string>("500Oo4!ss");

const user_store = userStore();
const router = useRouter();

const userLogin = async () => {
  const res = await user_store.userSignIn({
    username: username.value,
    password: password.value,
  });
  if (res.status == 0) {
    // 跳转路由到首页
    router.push("/");
  } else {
    username.value = password.value = "";
    console.log("用户名或密码错误");
  }
};
</script>

<style scoped lang="scss">
:deep(.el-input__wrapper) {
  background-color: rgb(50, 53, 60);
  box-shadow: none;
  border-radius: 1px;
  border-bottom: 2px solid transparent;
  position: relative;
  transition: all 0.3s;
  &:focus-within {
    border-bottom: 2px solid rgb(223, 223, 223);
  }
  &:hover {
    background-color: rgb(80, 85, 97);
  }
}

:deep(.el-input__inner) {
  color: #fff;
}

.page {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.login {
  padding: 5rem;
  width: 60rem;
  height: 25rem;
  background-color: rgb(24, 26, 33);
  border-radius: 3px;

  &_box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 40rem;
    &_ipt {
      display: flex;
      flex-direction: column;
    }
    &_title {
      color: rgb(151, 151, 152);
      padding-bottom: 5px;
    }

    &_input {
      width: 38rem;
      height: 40px;
    }

    &_btn {
      &,
      &:link,
      &:visited {
        display: inline-block;
        width: 25rem;
        height: 5rem;
        font-size: 1.8rem;
        transition: all 0.4s;
        position: relative;
        background: linear-gradient(
          to right,
          rgb(10, 182, 255),
          rgb(41, 123, 255),
          rgb(102, 209, 255),
          rgb(94, 152, 245)
        );
        background-size: 300%;
        border: none;
        border-radius: 2px;
        color: #fff;
        cursor: pointer;
        margin: 0 auto;
      }
      &:hover {
        background-position: 50%;
      }
    }

    &_checkbox {
      margin-right: 5px;
      vertical-align: middle;
    }

    &_remember {
      color: rgb(151, 151, 152);
      font-size: 1.2rem;
      vertical-align: middle;
    }
  }
}

.margin_login {
  margin-bottom: 1.4rem;
}
</style>
