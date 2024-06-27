<template>
  <div v-if="project" class="container mt-3">
    <div class="card">
      <div class="card-header">
        <h5>外包專案：{{ project.name }}</h5>
      </div>
      <div class="card-body">
        <p><strong>詳細內容:</strong> {{ project.description }}</p>
        <p><strong>自備場所:</strong> {{ project.work_location }}</p>
        <p><strong>希望接案身份:</strong> {{ project.target_audience }}</p>
        <p><strong>工作內容:</strong> {{ project.work_content }}</p>
        <p><strong>預算:</strong> {{ project.budget }}</p>
        <p><strong>配合時間:</strong> {{ project.schedule }}</p>
        <p><strong>配合地點:</strong> {{ project.location }}</p>
        <p><strong>專案預算:</strong> {{ project.budget }}</p>
        <p><strong>注意事項:</strong> {{ project.notes }}</p>
        <p><strong>案件起始日期:</strong> {{ project.start_date }}</p>
        <p><strong>洽詢期限:</strong> {{ project.inquiry_deadline }}</p>
        <p><strong>要求技能:</strong> {{ project.required_skills }}</p>
        <p><strong>案件預算範圍:</strong> {{ project.budget_range }}</p>
        <p><strong>發案對象:</strong> {{ project.target_audience }}</p>
        <p><strong>自備場所:</strong> {{ project.work_location }}</p>
        <!-- <p><strong>案件發佈狀態:</strong> {{ project.status ? '公佈' : '關閉專案' }}</p> -->
        <p><strong>經驗要求:</strong> {{ project.experience_years }} 年</p>
        <p><strong>發案者公司或個人網站:</strong> <a :href="project.issuer_website" target="_blank">{{ project.issuer_website }}</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const project = ref(null);

    onMounted(() => {
      const projectId = route.params.id;
      axios.get(`/projects/${projectId}`)
        .then(response => {
          project.value = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    });

    return {
      project
    };
  }
};
</script>

<style>
/* 添加你的樣式 */
</style>
