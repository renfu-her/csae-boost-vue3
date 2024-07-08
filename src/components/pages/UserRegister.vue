<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-center">
      <h3>註冊</h3>
    </div>
    <form @submit.prevent="registerUser">
      <div class="mb-3">
        <label for="name" class="form-label">使用者名稱</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">E-mail</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="email"
          required
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">密碼</label>
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="password"
          required
        />
      </div>
      <div class="mb-3">
        <label for="confirmPassword" class="form-label">確認密碼</label>
        <input
          type="password"
          class="form-control"
          id="confirmPassword"
          v-model="confirmPassword"
          required
        />
      </div>
      <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-primary">註冊</button>
      </div>
    </form>
    <div v-if="errorMessage" class="alert alert-danger mt-3">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserRegister",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      errorMessage: "",
    };
  },
  methods: {
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
        console.log(response.data);
        if (response.data.code == 200) {
          this.$router.push("/join");
        } else {
          this.errorMessage = "輸入 E-mail 重複";
        }
        // Redirect to login or another page
        // this.$router.push("/login");
      } catch (error) {
        this.errorMessage = "註冊錯誤";
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 500px;
}
</style>
