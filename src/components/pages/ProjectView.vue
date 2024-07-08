<template>
  <div class="container">
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col" class="col-3">專案名稱</th>
          <th scope="col" class="col-2">案件預算</th>
          <th scope="col" class="col-2">自備場所</th>
          <th scope="col" class="col-2">接案身份</th>
          <th scope="col" class="col-1">狀態</th>
          <th scope="col" class="col-2">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="project in projects.data"
          :key="project.id"
          :class="getRowClass(project.status)"
        >
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
          <td :class="getStatusClass(project.status)">
            {{ getStatus(project.status) }}
          </td>
          <td>
            <router-link :to="'/user/project/edit/' + project.id">
              <button class="btn btn-primary mx-2">編輯</button>
            </router-link>
            <button class="btn btn-danger mx-2">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <PageNavigator
      :current-page="projects.current_page"
      :total-pages="projects.last_page"
      @page-change="fetchProjects"
    />
  </div>
</template>

<script>
import PageNavigator from "../PageNavigator.vue";

export default {
  components: {
    PageNavigator,
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
  methods: {
    navigateProjects(pageOrUrl) {
      if (typeof pageOrUrl === "string") {
        const page = new URL(pageOrUrl).searchParams.get("page");
        this.fetchProjects(page);
      } else {
        this.fetchProjects(pageOrUrl);
      }
    },
    getStatus(status) {
      return status === 1 ? "公佈" : "關閉專案";
    },
    getStatusClass(status) {
      return status === 1 ? "text-done" : "text-danger";
    },
    getRowClass(status) {
      return status === 1 ? "published-project" : "closed-project";
    },
  },
  computed: {
    pages() {
      const pages = [];
      for (let i = 1; i <= this.projects.last_page; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
};
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

.published-project {
  background-color: #d4edda; /* 綠色背景表示公佈專案 */
}

.closed-project {
  background-color: #f8d7da; /* 紅色背景表示關閉專案 */
}

.text-danger {
  color: #dc3545; /* 紅色文字表示關閉專案 */
}

.text-done {
  color: #1138e6 !important; /* 綠色文字表示公佈專案 */
}
</style>
