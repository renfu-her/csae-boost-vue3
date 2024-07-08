<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-center">
      <h3>登入</h3>
    </div>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label for="email" class="form-label">E-mail</label>
        <input
          type="email"
          v-model="email"
          class="form-control"
          id="email"
          required
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">密碼</label>
        <input
          type="password"
          v-model="password"
          class="form-control"
          id="password"
          required
        />
      </div>
      <div class="mb-3">
        <button type="submit" class="btn btn-primary w-100">登入</button>
      </div>
    </form>
    <div class="container mt-5">
      <div v-if="errorMessage" class="alert alert-danger mt-3 text-center">
        {{ errorMessage }}
      </div>
      <div v-if="successMessage" class="alert alert-info mt-3 text-center">
        {{ successMessage }}
      </div>
    </div>
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
      <div
        id="liveMessage"
        class="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="toast-header">
          <strong class="me-auto">通知</strong>
          <small class="text-muted">剛剛</small>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div class="toast-body"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
// import { Toast } from "bootstrap";

export default {
  name: "UserLogin",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    ...mapActions(["saveToken"]),
    async login() {
      try {
        const response = await axios.post("/login", {
          email: this.email,
          password: this.password,
        });
        // 處理登入成功，例如存儲 token 或其他
        this.saveToken(response.data.token);
        this.errorMessage = "";
        this.successMessage = "登入成功！";

        // 顯示 Toast
        // this.showToast();

        // 重新導向到首頁
        this.$router.push("/");
      } catch (error) {
        this.errorMessage = "登入失敗，請檢查您的帳號或密碼。";
      }
      setTimeout(() => {
        this.errorMessage = "";
      }, 3000);
      setTimeout(() => {
        this.successMessage = "";
      }, 3000);
    },
    // showToast() {
    //   const toastEl = document.getElementById("liveMessage");
    //   const toast = new Toast(toastEl);
    //   toast.show();

    // },
  },
};
</script>

<style scoped>
.container {
  max-width: 500px;
}
</style>
