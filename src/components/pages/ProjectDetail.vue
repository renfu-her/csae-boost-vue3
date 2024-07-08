<template>
  <div v-if="project" class="container mt-3">
    <div class="card">
      <div class="card-body">
        <!-- 外包專案標題區塊 -->
        <div
          class="row py-3 border-bottom fs-4 fw-bold bg-success bg-gradient bg-opacity-75 text-white"
        >
          <div class="col-4 d-flex justify-content-center align-items-center">
            <strong>外包專案</strong>
          </div>
          <div class="col-8">{{ project.name }}</div>
        </div>
        
        <!-- 會員提示區塊 -->
        <div
          class="row py-3 border-bottom bg-secondary bg-gradient bg-opacity-75 text-white fs-4 fw-bold"
          v-if="!token">
          <div class="col-12 d-flex justify-content-center align-items-center">
            <strong
              >您尚未加入會員或登入會員，登入後加入贊助會員 <br />
              您就可以看到詳細聯絡資料以及發布專案聯絡人資料 <br />
              <a class="btn btn-primary w-100 fs-4" href="/join">登入或者加入會員</a>
            </strong>
          </div>
        </div>
        
        <!-- 聯絡資料區塊 -->
        <div class="contact-area" v-if="token">
          <div class="row py-3 border-bottom">
            <div class="col-4 d-flex justify-content-center align-items-center">
              <strong>聯絡人</strong>
            </div>
            <div class="col-8" v-html="project.contact_person"></div>
          </div>
        </div>

        <div class="contact-area" v-if="token">
          <div class="row py-3 border-bottom">
            <div class="col-4 d-flex justify-content-center align-items-center">
              <strong>手機號碼</strong>
            </div>
            <div class="col-8" v-html="project.mobile"></div>
          </div>
        </div>

        <div class="contact-area" v-if="token">
          <div class="row py-3 border-bottom">
            <div class="col-4 d-flex justify-content-center align-items-center">
              <strong>手機號碼</strong>
            </div>
            <div class="col-8" v-html="project.phone"></div>
          </div>
        </div>

        <div class="contact-area" v-if="token">
          <div class="row py-3 border-bottom">
            <div class="col-4 d-flex justify-content-center align-items-center">
              <strong>電話號碼</strong>
            </div>
            <div class="col-8" v-html="project.phone"></div>
          </div>
        </div>

        <div class="contact-area" v-if="token">
          <div class="row py-3 border-bottom">
            <div class="col-4 d-flex justify-content-center align-items-center">
              <strong>E-mail</strong>
            </div>
            <div class="col-8" v-html="project.email"></div>
          </div>
        </div>
        
        <!-- 外包專案說明區塊 -->
        <div class="row py-3 border-bottom">
          <div class="col-4 d-flex justify-content-center align-items-center">
            <strong>外包專案說明</strong>
          </div>
          <div class="col-8" v-html="project.description"></div>
        </div>
        
        <!-- 其他區塊 -->
        <div class="row py-3 border-bottom">
          <div class="col-4 d-flex justify-content-center align-items-center">
            <strong>要求技能</strong>
          </div>
          <div class="col-8">{{ project.required_skills }}</div>
        </div>
        <div class="row py-3 border-bottom">
          <div class="col-4 d-flex justify-content-center align-items-center">
            <strong>外包發案對象</strong>
          </div>
          <div class="col-8">{{ project.target_audience }}</div>
        </div>
        <div class="row py-3 border-bottom">
          <div class="col-4 d-flex justify-content-center align-items-center">
            <strong>自備場所</strong>
          </div>
          <div class="col-8">{{ project.work_location }}</div>
        </div>
        <div class="row py-3 border-bottom">
          <div class="col-4 d-flex justify-content-center align-items-center">
            <strong>經驗要求</strong>
          </div>
          <div class="col-8">{{ project.experience_years }} 年</div>
        </div>
        <div class="row py-3 border-bottom">
          <div class="col-4 d-flex justify-content-center align-items-center">
            <strong>配合地點</strong>
          </div>
          <div class="col-8">{{ project.work_location }}</div>
        </div>
        <div class="row py-3 border-bottom">
          <div class="col-4 d-flex justify-content-center align-items-center">
            <strong>注意事項</strong>
          </div>
          <div class="col-8">{{ project.notes }}</div>
        </div>
        <div class="row py-3 border-bottom">
          <div class="col-4 d-flex justify-content-center align-items-center">
            <strong>案件預算</strong>
          </div>
          <div class="col-8">{{ project.budget_range }}</div>
        </div>
        <div class="row py-3 border-bottom">
          <div class="col-4 d-flex justify-content-center align-items-center">
            <strong>更新日期</strong>
          </div>
          <div class="col-8">{{ project.updated_at }}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="mt-3"></div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { mapGetters } from "vuex";

export default {
  setup() {
    const route = useRoute();
    const project = ref(null);

    onMounted(() => {
      const projectId = route.params.id;
      axios
        .get(`/projects/${projectId}`)
        .then((response) => {
          project.value = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    });

    return {
      project,
    };
  },
  computed: {
    ...mapGetters(['token'])
  }
};
</script>

<style>
.card {
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  background-color: #fff;
  margin-bottom: 1rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}
.card-body {
  padding: 1.25rem;
  margin-left: -5px;
  margin-right: -5px;
}
.contact-area {
  background-color: #f8d7da;
  padding: 1.25rem;
  margin-left: -12px;
  margin-right: -12px;
}
</style>
