<template>
    <div>
      <h3 class="text-center mt-3"><b>外包專案列表</b></h3>
      <ProjectList :projects="projects" />
    </div>
  </template>
  
  <script>
  import ProjectList from '@/components/ProjectList.vue';
  import axios from 'axios';
  
  export default {
    name: 'HomePage',
    components: {
      ProjectList
    },
    data() {
      return {
        projects: [],
      };
    },
    async created() {
      const slug = this.$route.params.slug;
      try {
        if (slug === 'all') {
          // 獲取所有專案
          const projectsResponse = await axios.get('/projects');
          this.projects = projectsResponse.data;
        } else {
          // 獲取特定類別的專案
          const categoryResponse = await axios.get(`/project-categories?slug=${slug}`);
          if (categoryResponse.data.length > 0) {
            const categoryId = categoryResponse.data[0].id;
            const projectsResponse = await axios.get(`/projects?category_id=${categoryId}`);
            this.projects = projectsResponse.data;
          } else {
            console.warn('Category not found for slug:', slug);
          }
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    },
  };
  </script>
  
  <style>
  /* 添加你的样式 */
  </style>
  