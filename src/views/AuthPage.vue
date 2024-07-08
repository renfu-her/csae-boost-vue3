<!-- components/pages/AuthPage.vue -->
<template>
  <div class="auth-container">
    <div class="auth-form">
      <h3 v-if="isLogin">登入</h3>
      <h3 v-else>註冊</h3>
      <form @submit.prevent="handleSubmit">
        <div v-if="!isLogin" class="mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="使用者名稱"
            v-model="name"
            required
          />
        </div>
        <div class="mb-3">
          <input
            type="email"
            class="form-control"
            placeholder="E-mail"
            v-model="email"
            required
          />
        </div>
        <div class="mb-3">
          <input
            type="password"
            class="form-control"
            placeholder="密碼"
            v-model="password"
            required
          />
        </div>
        <div v-if="!isLogin" class="mb-3">
          <input
            type="password"
            class="form-control"
            placeholder="確認密碼"
            v-model="confirmPassword"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary w-100">
          {{ isLogin ? "登入" : "註冊" }}
        </button>
      </form>
      <div v-if="errorMessage" class="alert alert-danger mt-3">
        {{ errorMessage }}
      </div>
      <p class="toggle-link" @click="toggleForm">
        {{ isLogin ? "還沒有帳號？註冊" : "已有帳號？登入" }}
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";

export default {
  name: "AuthPage",
  data() {
    return {
      isLogin: true,
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      errorMessage: "",
    };
  },
  methods: {
    ...mapActions(["saveToken"]),
    async handleSubmit() {
      if (this.isLogin) {
        await this.login();
      } else {
        await this.registerUser();
      }
    },
    async login() {
      try {
        const response = await axios.post("/login", {
          email: this.email,
          password: this.password,
        });
        this.saveToken(response.data.token);
        this.errorMessage = "";
        this.$router.push("/");
      } catch (error) {
        this.errorMessage = "登入失敗，請檢查您的帳號或密碼。";
      }
      setTimeout(() => {
        this.errorMessage = "";
      }, 3000);
    },
    async registerUser() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = "密碼與確認密碼不符合";
        return;
      }

      try {
        const response = await axios.post("/register", {
          name: this.name,
          email: this.email,
          password: this.password,
        });
        if (response.data.code == 200) {
          this.$router.push("/join");
        } else {
          this.errorMessage = "輸入 E-mail 重複";
        }
      } catch (error) {
        this.errorMessage = "註冊錯誤";
        console.error(error);
      }
    },
    toggleForm() {
      this.isLogin = !this.isLogin;
      this.errorMessage = "";
    },
  },
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* background-color: #4caf50; */ /* 替換為你的背景色 */
}

.auth-form {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 400px;
}

.auth-form h3 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.auth-form .form-control {
  margin-bottom: 1rem;
}

.auth-form .btn-primary {
  background-color: #4caf50; /* 替換為你的按鈕顏色 */
  border-color: #4caf50; /* 替換為你的按鈕顏色 */
}

.auth-form .toggle-link {
  text-align: center;
  margin-top: 1rem;
  color: #4caf50; /* 替換為你的鏈接顏色 */
  cursor: pointer;
}
</style>
