<template>
    <div class="login-container">
        <form @submit.prevent="login">
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" v-model="email" class="form-control" id="email" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" v-model="password" class="form-control" id="password" required>
            </div>
            <div class="mb-3">
                <button type="submit" class="btn btn-primary w-100">登入</button>
            </div>
        </form>
        <div v-if="errorMessage" class="alert alert-danger mt-3 text-center">{{ errorMessage }}</div>
        <div v-if="successMessage" class="alert alert-info mt-3 text-center">{{ successMessage }}</div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
    name: 'UserLogin',
    data() {
        return {
            email: '',
            password: '',
            errorMessage: '',
            successMessage: ''
        };
    },
    methods: {
        ...mapActions(['saveToken']),
        async login() {
            try {
                const response = await axios.post('/login', {
                    email: this.email,
                    password: this.password
                });
                // 處理登入成功，例如存儲 token 或其他
                // localStorage.setItem('token', response.data.token);
                this.saveToken(response.data.token);
                this.errorMessage = '';
                this.successMessage = '登入成功，將跳轉到首頁。';
                setTimeout(() => {
                    this.successMessage = '';
                    this.$router.push('/'); // 使用 Vue Router 進行跳轉
                }, 3000);
            } catch (error) {
                this.errorMessage = '登入失敗，請檢查您的帳號或密碼。';
            }
            setTimeout(() => {
                this.errorMessage = '';
            }, 3000);
            setTimeout(() => {
                this.successMessage = '';
            }, 3000);
        }
    }
};
</script>

<style>
.login-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #fff;
}
</style>