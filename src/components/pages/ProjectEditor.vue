<template>
  <div class="container mt-3">
    <div class="card">
      <div class="card-body">
        <h3>{{ isEditMode ? "編輯專案" : "新增專案" }}</h3>
        <form @submit.prevent="handleSubmit">
          <!-- 项目类别选择 -->
          <div class="mb-3">
            <label for="category" class="form-label">專案類別</label>
            <select
              v-model="project.category_id"
              class="form-select"
              id="category_id"
              required
            >
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">專案名稱</label>
            <input
              type="text"
              v-model="project.name"
              class="form-control"
              id="name"
              required
            />
          </div>
          <div class="mb-3">
            <label for="contact_person" class="form-label">聯絡人</label>
            <input
              type="text"
              v-model="project.contact_person"
              class="form-control"
              id="contact_person"
              required
            />
          </div>
          <div class="mb-3">
            <label for="mobile" class="form-label">手機</label>
            <input
              type="text"
              v-model="project.mobile"
              class="form-control"
              id="mobile"
              required
            />
          </div>
          <!-- <div class="mb-3">
            <label for="phone" class="form-label">電話</label>
            <input
              type="text"
              v-model="project.phone"
              class="form-control"
              id="phone"
              required
            />
          </div> -->
          <div class="mb-3">
            <label for="email" class="form-label">E-mail</label>
            <input
              type="email"
              v-model="project.email"
              class="form-control"
              id="email"
              required
            />
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">專案說明</label>
            <textarea
              v-model="project.description"
              class="form-control"
              id="description"
              rows="10"
              required
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="required_skills" class="form-label">要求技能</label>
            <input
              type="text"
              v-model="project.required_skills"
              class="form-control"
              id="required_skills"
              required
            />
          </div>
          <!-- 發案對象選項 -->
          <div class="mb-3">
            <label class="form-label">發案對象</label>
            <div class="d-flex flex-wrap">
              <div class="form-check form-check-inline">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="target_company"
                  value="公司"
                  v-model="project.target_audience"
                />
                <label class="form-check-label" for="target_company"
                  >公司</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="target_workspace"
                  value="工作室"
                  v-model="project.target_audience"
                />
                <label class="form-check-label" for="target_workspace"
                  >工作室</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="target_parttime"
                  value="兼職上班族"
                  v-model="project.target_audience"
                />
                <label class="form-check-label" for="target_parttime"
                  >兼職上班族</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="target_student"
                  value="學生"
                  v-model="project.target_audience"
                />
                <label class="form-check-label" for="target_student"
                  >學生</label
                >
              </div>
              <div class="form-check form-check-inline">
                <label class="form-check-label">(選項可複選)</label>
              </div>
            </div>
          </div>
          <!-- 工作地點選項 -->
          <div class="mb-3">
            <label for="work_location" class="form-label">工作地點</label>
            <select
              v-model="project.work_location"
              class="form-select"
              id="work_location"
              required
            >
              <option value="皆可">皆可</option>
              <option value="自備場所">自備場所</option>
              <option value="駐點">駐點</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="experience_years" class="form-label"
              >經驗要求(年)</label
            >
            <input
              type="number"
              v-model="project.experience_years"
              class="form-control"
              id="experience_years"
              required
            />
          </div>
          <div class="mb-3">
            <label for="notes" class="form-label">注意事項</label>
            <textarea
              v-model="project.notes"
              class="form-control"
              id="notes"
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="budget_range" class="form-label">案件預算</label>
            <select
              v-model="project.budget_range"
              class="form-select"
              id="budget_range"
              required
            >
              <option v-for="range in budgetRanges" :key="range" :value="range">
                {{ range }}
              </option>
            </select>
          </div>
          <!-- 新增洽詢起始日期 -->
          <div class="mb-3">
            <label for="start_date" class="form-label">洽詢起始日期</label>
            <input
              type="date"
              v-model="project.start_date"
              class="form-control"
              id="start_date"
              required
            />
          </div>
          <!-- 新增洽詢期限 -->
          <div class="mb-3">
            <label for="inquiry_deadline" class="form-label">洽詢期限</label>
            <input
              type="date"
              v-model="project.inquiry_deadline"
              class="form-control"
              id="inquiry_deadline"
              required
            />
          </div>
          <div class="mb-3">
            <label for="status" class="form-label">案件發佈狀態</label>
            <select
              v-model="project.status"
              class="form-select"
              id="status"
              required
            >
              <option value="1">公佈</option>
              <option value="0">關閉專案</option>
            </select>
          </div>
          <div class="mb-3">
            <!-- 隱藏的 input 用來存儲 token -->
            <input type="hidden" v-model="project.token" />
            <button type="submit" class="btn btn-primary w-100">
              {{ isEditMode ? "更新專案" : "新增專案" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "ProjectEditor",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const isEditMode = ref(false);
    const project = ref({
      category_id: "",
      name: "",
      contact_person: "",
      mobile: "",
    //   phone: "",
      email: "",
      description: `為了讓接案方明確了解專案內容需求；建議您詳細填寫下列格式需求！
          1.工作內容：(接案方需完成的工作事項)
          2.配合時間：(預計執行工期或結案日)
          3.配合地點：(需駐點位置、限定配合地區或自備場所作業)
          4.專案預算：(您預計或可接受的預算範圍)
          5.注意事項：(電話聯絡時間或合作時溝通方式等其他注意事項)
          （聯絡時請說明由Case888外包網得知訊息，謝謝！）`,
      required_skills: "",
      target_audience: [],
      work_location: "",
      experience_years: 0,
      notes: "",
      budget_range: "",
      start_date: "",
      inquiry_deadline: "",
      token: "",
      status: 1,
    });

    const categories = ref([]);
    const token = computed(() => store.getters.token);

    watch(token, (newToken) => {
      project.value.token = newToken;
    });

    const budgetRanges = [
      "預算另議",
      "1~3 萬",
      "3~5 萬",
      "6~9 萬",
      "10~15萬",
      "15~20萬",
      "20~25",
      "25~30",
      "40~50",
      "50~60",
      "60~70",
      "70~80",
      "80~90",
      "90~100",
      "100（含）以上",
    ];

    onMounted(async () => {
      project.value.token = token.value;
      const projectId = route.params.id;
      if (projectId) {
        isEditMode.value = true;
        try {
          const response = await axios.get(`/projects/${projectId}`);
          project.value = response.data;
          project.value.target_audience =
            response.data.target_audience.split(",");
        } catch (error) {
          console.error(error);
        }
      }

      try {
        const response = await axios.get("/project-categories");
        categories.value = response.data;
      } catch (error) {
        console.error("Error fetching project categories:", error);
      }

      // 根據 token 獲取用戶資料並設置到表單中
      try {
        const userResponse = await axios.get(`/user/info/${token.value}`);
        const userData = userResponse.data;
        project.value.contact_person = userData.user.name;
        project.value.mobile = userData.user.mobile;
        // project.value.phone = userData.user.phone;
        project.value.email = userData.user.email;
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    });

    const handleSubmit = async () => {
      project.value.target_audience = project.value.target_audience.join(",");

      const config = {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      };

      if (isEditMode.value) {
        try {
          await axios.post(
            `/projects/${project.value.id}`,
            project.value,
            config
          );
          router.push(`/user/project/view`);
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          const response = await axios.post(`/projects`, project.value, config);
          router.push(`/projects/${response.data.id}`);
        } catch (error) {
          console.error(error);
        }
      }
    };

    return {
      project,
      isEditMode,
      handleSubmit,
      categories,
      budgetRanges,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
