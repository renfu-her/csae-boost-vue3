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
            :class="{ 'is-invalid': !isPasswordValid && password }"
            placeholder="密碼"
            v-model="password"
            required
          />
          <div v-if="!isPasswordValid && password" class="invalid-feedback">
            密碼需包含至少一個大寫字母、小寫字母、數字，且長度需大於 8 個字元
          </div>
        </div>
        <div v-if="!isLogin" class="mb-3">
          <input
            type="password"
            class="form-control"
            :class="{
              'is-invalid': password !== confirmPassword && confirmPassword,
            }"
            placeholder="確認密碼"
            v-model="confirmPassword"
            required
          />
          <div
            v-if="password !== confirmPassword && confirmPassword"
            class="invalid-feedback"
          >
            密碼與確認密碼不符合
          </div>
        </div>
        <button type="submit" class="btn btn-primary w-100">
          {{ isLogin ? "登入" : "註冊" }}
        </button>
      </form>
      <div v-if="errorMessage" class="alert alert-danger mt-3">
        {{ errorMessage }}
      </div>
      <div v-if="successMessage" class="alert alert-success mt-3">
        {{ successMessage }}
      </div>
      <p class="toggle-link" @click="toggleForm">
        {{ isLogin ? "還沒有帳號？註冊" : "已有帳號？登入" }}
      </p>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  name: "AuthPage",
  setup() {
    const store = useStore();
    const router = useRouter();

    const isLogin = ref(true);
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const errorMessage = ref("");
    const successMessage = ref("");

    const isPasswordValid = computed(() => {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      return passwordRegex.test(password.value);
    });

    const handleSubmit = async () => {
      if (!isLogin.value) {
        if (!isPasswordValid.value) {
          errorMessage.value = "密碼不符合要求";
          return;
        }
        if (password.value !== confirmPassword.value) {
          errorMessage.value = "密碼與確認密碼不符合";
          return;
        }
      }

      if (isLogin.value) {
        await login();
      } else {
        await registerUser();
      }
    };

    const login = async () => {
      try {
        const response = await axios.post("/login", {
          email: email.value,
          password: password.value,
        });
        store.dispatch("saveToken", response.data.token);
        errorMessage.value = "";
        router.push("/");
      } catch (error) {
        errorMessage.value = "登入失敗，請檢查您的帳號或密碼。";
        successMessage.value = "";
      }
      setTimeout(() => {
        errorMessage.value = "";
      }, 3000);
    };

    const registerUser = async () => {
      try {
        const response = await axios.post("/register", {
          name: name.value,
          email: email.value,
          password: password.value,
        });
        if (response.data.code == 200) {
          isLogin.value = true;
          successMessage.value = "註冊成功，請登入";
          errorMessage.value = "";
        } else {
          errorMessage.value = "輸入 E-mail 重複";
          successMessage.value = "";
        }
      } catch (error) {
        errorMessage.value = "註冊錯誤";
        successMessage.value = "";
        console.error(error);
      }
    };

    const toggleForm = () => {
      isLogin.value = !isLogin.value;
      errorMessage.value = "";
      successMessage.value = "";
      name.value = "";
      email.value = "";
      password.value = "";
      confirmPassword.value = "";
    };

    return {
      isLogin,
      name,
      email,
      password,
      confirmPassword,
      errorMessage,
      successMessage,
      isPasswordValid,
      handleSubmit,
      toggleForm,
    };
  },
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
  background-color: #4caf50;
  border-color: #4caf50;
}

.auth-form .toggle-link {
  text-align: center;
  margin-top: 1rem;
  color: #4caf50;
  cursor: pointer;
}

.font-password {
  color: red;
  font-size: 0.8rem;
}

.invalid-feedback {
  display: block;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: #dc3545;
}
</style>
