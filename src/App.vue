<template>
  <div id="app">
    <nav
      class="navbar navbar-expand-lg navbar-dark bg-success bg-opacity-75 bg-gradient text-white"
    >
      <div class="container">
        <a class="navbar-brand" href="/projects">
          <img :src="logo" alt="外包接案網" class="logo" />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-auto">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                免費發案
              </a>
              <ul
                class="dropdown-menu"
                aria-labelledby="navbarDropdown"
                v-if="!token"
              >
                <li>
                  <a class="dropdown-item" href="#" @click="requireLogin"
                    >新增外包發案</a
                  >
                </li>
                <li>
                  <a class="dropdown-item" href="#" @click="requireLogin"
                    >瀏覽外包發案</a
                  >
                </li>
              </ul>
              <ul
                class="dropdown-menu"
                aria-labelledby="navbarDropdown"
                v-if="token"
              >
                <li>
                  <a class="dropdown-item" href="/user/project/new"
                    >新增外包發案</a
                  >
                </li>
                <li>
                  <a class="dropdown-item" href="/user/project/view"
                    >瀏覽外包發案</a
                  >
                </li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                找專案
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a class="dropdown-item" href="/project/all">專案全部</a>
                </li>
                <li v-for="category in projectCategories" :key="category.id">
                  <a
                    class="dropdown-item"
                    :href="`/project/${category.slug}`"
                    >{{ category.name }}</a
                  >
                </li>
              </ul>
            </li>
            <li class="nav-item" v-if="!token">
              <a class="nav-link" href="/join">登入/註冊</a>
            </li>
            <li class="nav-item dropdown" v-if="token">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                會員
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a class="dropdown-item" href="/user/info">會員資料</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#" @click="logout">登出</a>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/feedback">建議回饋</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import logo from "@/assets/logo.png";

export default {
  name: "App",
  data() {
    return {
      projectCategories: [],
      logo,
    };
  },
  computed: {
    ...mapGetters(["token"]),
  },
  methods: {
    ...mapActions(["removeToken"]),
    logout() {
      this.removeToken();
      this.$router.push("/join");
    },
    requireLogin() {
      alert("尚未登入，請先登入");
      this.$router.push("/join");
    },
    async fetchProjectCategories() {
      try {
        const response = await axios.get("/project-categories");
        this.projectCategories = response.data;
      } catch (error) {
        console.error("Error fetching project categories:", error);
      }
    },
  },
  created() {
    if (this.token) {
      // console.log("Token exists:", this.token);
      // 可以在這裡進行其他需要的初始化操作
    }
    this.fetchProjectCategories();
  },
};
</script>

<style>
.logo {
  height: 40px;
}

.navbar {
  background-color: #28a745;
}

.nav-item {
  margin: 0 auto;
}

.nav-item a {
  color: #fff;
}

.dropdown-menu a {
  color: #000;
  font-size: 18px;
}

li .nav-link {
  font-size: 20px;
}

.mobile-menu {
  background-color: #28a745;
  padding: 1rem;
}
</style>
