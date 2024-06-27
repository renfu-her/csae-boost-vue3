<template>
  <div class="container">
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">專案名稱</th>
          <th scope="col">案件預算</th>
          <th scope="col">自備場所</th>
          <th scope="col">接案身份</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects.data" :key="project.id">
          <td>
            <router-link :to="'/projects/' + project.id">{{ project.name }}</router-link>
          </td>
          <td><router-link :to="'/projects/' + project.id">{{ project.budget_range }}</router-link></td>
          <td><router-link :to="'/projects/' + project.id">{{ project.work_location }}</router-link></td>
          <td><router-link :to="'/projects/' + project.id">{{ project.target_audience }}</router-link></td>
        </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-center">
      <nav aria-label="Page navigation">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: !projects.prev_page_url }">
            <button class="page-link" @click="fetchProjects(projects.prev_page_url)" :disabled="!projects.prev_page_url">
              上一頁
            </button>
          </li>
          <li class="page-item" v-for="page in pages" :key="page" :class="{ active: page === projects.current_page }">
            <button class="page-link" @click="fetchProjects(page)">
              {{ page }}
            </button>
          </li>
          <li class="page-item" :class="{ disabled: !projects.next_page_url }">
            <button class="page-link" @click="fetchProjects(projects.next_page_url)" :disabled="!projects.next_page_url">
              下一頁
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      projects: {
        data: [],
        current_page: 1,
        last_page: 1,
        prev_page_url: null,
        next_page_url: null
      },
      perPage: 15 // 每页显示的记录数
    };
  },
  created() {
    this.fetchProjects();
  },
  methods: {
    fetchProjects(page = 1) {
      axios.get('/projects', {
        params: {
          count: this.perPage,
          page: page
        }
      })
      .then(response => {
        this.projects = response.data.data;  // 使用后端返回的分页数据
      })
      .catch(error => {
        console.error(error);
      });
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

a:link{
  text-decoration: none;
}

.text-bold {
  font-weight: bold;
}
</style>
