<template>
  <div class="container">
    <loading
      v-model:active="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    />
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col" class="col-3">專案名稱</th>
          <th scope="col" class="col-2">案件預算</th>
          <th scope="col" class="col-2">自備場所</th>
          <th scope="col" class="col-5">接案身份</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-if="!isLoading && projects.data.length === 0"
          class="no-data-row text-center"
        >
          <td colspan="4">目前沒有資料</td>
        </tr>
        <tr v-else v-for="project in projects.data" :key="project.id">
          <td>
            <router-link :to="'/projects/' + project.id">{{
              project.name
            }}</router-link>
          </td>
          <td>
            <router-link :to="'/projects/' + project.id">{{
              project.budget_range
            }}</router-link>
          </td>
          <td>
            <router-link :to="'/projects/' + project.id">{{
              project.work_location
            }}</router-link>
          </td>
          <td>
            <router-link :to="'/projects/' + project.id">{{
              project.target_audience
            }}</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <PageNavigator
    :current-page="projects.current_page"
    :total-pages="projects.last_page"
    @page-change="fetchProjects"
  />
</template>

<script>
import { defineComponent } from "vue";
import PageNavigator from "../PageNavigator.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

export default defineComponent({
  components: {
    PageNavigator,
    Loading,
  },
  props: {
    projects: {
      type: Object,
      default: () => ({
        data: [],
        current_page: 1,
        last_page: 1,
        prev_page_url: null,
        next_page_url: null,
      }),
    },
    fetchProjects: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      isLoading: true,
    };
  },
  methods: {
    async loadProjects() {
      this.isLoading = true;
      await this.fetchProjects();
      // 添加一個計時器來延遲關閉 loading
      setTimeout(() => {
        this.isLoading = false;
      }, -500); // 負數意味著提前關閉 loading
    },
  },
  created() {
    this.loadProjects();
  },
});
</script>

<style>
.pagination button {
  margin: 0 5px;
}

th {
  font-size: 20px;
}

a:link {
  text-decoration: none;
}

.text-bold {
  font-weight: bold;
}

.text-center {
  text-align: center;
}

.no-data-row {
  height: 200px; /* 自定義高度，可以根據需要調整 */
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
