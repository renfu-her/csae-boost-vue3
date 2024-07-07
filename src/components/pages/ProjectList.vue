<template>
  <div class="container">
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
        <tr v-for="project in projects.data" :key="project.id" >
          <td>
            <router-link :to="'/projects/' + project.id">{{ project.name }}</router-link>
          </td>
          <td><router-link :to="'/projects/' + project.id">{{ project.budget_range }}</router-link></td>
          <td><router-link :to="'/projects/' + project.id">{{ project.work_location }}</router-link></td>
          <td><router-link :to="'/projects/' + project.id">{{ project.target_audience }}</router-link></td>
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
        next_page_url: null
      })
    },
    fetchProjects: {
      type: Function,
      required: true
    }
  },
  methods: {
    navigateProjects(pageOrUrl) {
      if (typeof pageOrUrl === 'string') {
        const page = new URL(pageOrUrl).searchParams.get('page');
        this.fetchProjects(page);
      } else {
        this.fetchProjects(pageOrUrl);
      }
    }
  },
  computed: {
    pages() {
      const pages = [];
      for (let i = 1; i <= this.projects.last_page; i++) {
        pages.push(i);
      }
      return pages;
    }
  }
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
</style>
