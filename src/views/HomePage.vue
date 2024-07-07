<template>
  <div>
    <h3 class="text-center mt-3"><b>外包專案列表</b></h3>
    <ProjectList :projects="projects" :fetch-projects="fetchProjects" />
  </div>
</template>

<script>
import ProjectList from '@/components/pages/ProjectList.vue';
import axios from 'axios';

export default {
  name: 'HomePage',
  components: {
    ProjectList
  },
  data() {
    return {
      projects: {
        data: [],
        current_page: 1,
        last_page: 1,
        prev_page_url: null,
        next_page_url: null
      },
      slug: this.$route.params.slug || 'all',
    };
  },
  async created() {
    await this.fetchProjects();
  },
  watch: {
    '$route.params.slug': 'fetchProjects'
  },
  methods: {
    async fetchProjects(page = 1) {
      const slug = this.$route.params.slug || 'all';
      const perPage = 15; // 每頁顯示 15 筆資料
      try {
        let response;
        if (slug === 'all') {
          response = await axios.get('/projects', { params: { page, count: perPage } });
        } else {
          const categoryResponse = await axios.get(`/project-categories?slug=${slug}`);
          if (categoryResponse.data && categoryResponse.data.id) {
            const categoryId = categoryResponse.data.id;
            response = await axios.get(`/projects`, { params: { category_id: categoryId, page, count: perPage } });
          } else {
            console.warn('Category not found or invalid for slug:', slug);
            this.projects = {
              data: [],
              current_page: 1,
              last_page: 1,
              prev_page_url: null,
              next_page_url: null
            };
            return;
          }
        }
        this.projects = response.data.data;
      } catch (error) {
        console.error('Error fetching projects:', error);
        this.projects = {
          data: [],
          current_page: 1,
          last_page: 1,
          prev_page_url: null,
          next_page_url: null
        };
      }
    }
  }
};
</script>

<style>
/* 添加你的样式 */
</style>
