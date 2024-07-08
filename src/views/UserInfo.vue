<template>
  <div class="container mt-3">
    <div class="card">
      <div class="card-body user-form">
        <h3>會員資料</h3>
        <div v-if="user">
          <form @submit.prevent="updateUserInfo">
            <div class="mb-3">
              <label for="name">姓名:</label>
              <input
                type="text"
                id="name"
                v-model="user.name"
                class="form-control"
                required
              />
            </div>
            <div class="mb-3">
              <label for="email">郵件:</label>
              <input
                type="email"
                id="email"
                v-model="user.email"
                class="form-control"
                required
              />
            </div>
            <div class="mb-3">
              <label for="mobile">手機:</label>
              <input
                type="text"
                id="mobile"
                v-model="user.mobile"
                class="form-control"
              />
            </div>
            <div class="mb-3">
              <label for="phone">電話:</label>
              <input
                type="text"
                id="phone"
                v-model="user.phone"
                class="form-control"
              />
            </div>
            <button type="submit" class="btn btn-primary w-100">保存</button>
          </form>
        </div>
        <div v-else>
          <p>載入中...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  name: "UserInfo",
  setup() {
    const store = useStore();
    const user = ref(null);
    const token = computed(() => store.getters.token);
    const error = ref(null);

    onMounted(async () => {
      try {
        const response = await axios.get(`/user/info/${token.value}`);
        user.value = response.data.user;
      } catch (err) {
        console.error("無法獲取用戶資料:", err);
        error.value = "無法獲取用戶資料";
      }
    });

    const updateUserInfo = async () => {
      try {
        const response = await axios.post(
          `/user/info/update/${token.value}`,
          user.value
        );
        user.value = response.data;
        alert("資料更新成功");
      } catch (err) {
        console.error("無法更新用戶資料:", err);
        error.value = "無法更新用戶資料";
      }
    };

    return {
      user,
      updateUserInfo,
      error,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
}

.user-info {
  padding: 20px;
}
.mb-3 {
  margin-bottom: 15px;
}
.btn-primary {
  margin-top: 10px;
}

.user-form h3 {
  text-align: center;
  margin-bottom: 1.5rem;
}
</style>
