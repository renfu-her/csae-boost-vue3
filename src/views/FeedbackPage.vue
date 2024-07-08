<template>
  <div class="container mt-3">
    <div class="card">
      <div class="card-body feedback-form">
        <h3>提交回饋</h3>
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="name" class="form-label">名稱</label>
            <input
              type="text"
              v-model="feedback.name"
              class="form-control"
              id="name"
              required
            />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">E-mail</label>
            <input
              type="email"
              v-model="feedback.email"
              class="form-control"
              id="email"
              required
            />
          </div>
          <div class="mb-3">
            <label for="type" class="form-label">類型</label>
            <select
              v-model="feedback.type"
              class="form-select"
              id="type"
              required
            >
              <option value="操作畫面問題">操作畫面問題</option>
              <option value="功能請求">功能請求</option>
              <option value="錯誤報告">錯誤報告</option>
              <option value="性能問題">性能問題</option>
              <option value="用戶體驗問題">用戶體驗問題</option>
              <option value="其他">其他</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="content" class="form-label">內容</label>
            <textarea
              v-model="feedback.content"
              class="form-control"
              id="content"
              rows="5"
              required
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary w-100">提交</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "FeedbackPage",
  setup() {
    const router = useRouter();
    const store = useStore();
    const feedback = ref({
      name: "",
      email: "",
      type: "操作畫面問題",
      user_id: null,
      content: "",
    });

    const token = computed(() => store.getters.token);

    onMounted(async () => {
      try {
        const userResponse = await axios.get(`/user/info/${token.value}`, {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        });
        const userData = userResponse.data;
        feedback.value.name = userData.user.name;
        feedback.value.email = userData.user.email;
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    });

    const handleSubmit = async () => {
      try {
        await axios.post("/feedback", feedback.value, {
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        });
        alert("建議回饋成功");
        router.push(`/project/all`);
      } catch (error) {
        console.error("提交失敗:", error);
        alert("建議回饋失敗");
      }
    };

    return {
      feedback,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
}

.feedback-form h3 {
  text-align: center;
  margin-bottom: 1.5rem;
}
</style>
