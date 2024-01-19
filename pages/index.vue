<script setup lang="ts">
  import { getListMoviesAsync } from "~/api/movies/index";

  const moviesList = ref();
  const currentPage = ref(1);
  const isLoading = ref(true);
  const isTileView = ref(true);
  const searchQuery = ref("");

  const getMovies = () => {
    getListMoviesAsync(currentPage.value)
      .then((res) => {
        moviesList.value = res;
        isLoading.value = false;
      })
      .catch((err) => console.error("Ошибка получения фильмов ", err));
  };
  getMovies();

  interface IFiltered {
    id: String;
    titleText: {
      text: String;
    };
  }

  const filteredItems = computed(() => {
    if (moviesList.value) {
      return moviesList.value?.results.filter((item: IFiltered) => {
        return (
          item?.titleText?.text
            .toLowerCase()
            .indexOf(searchQuery.value?.toLowerCase()) != -1
        );
      });
    }
  });

  const previousPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
      getMovies();
    }
  };

  const nextPage = () => {
    if (currentPage.value < moviesList.value?.entries) {
      currentPage.value++;
      getMovies();
    }
  };

  watch(currentPage, () => {
    getMovies();
  });
</script>

<template>
  <div v-if="isLoading" class="container-loader">
    <loader />
  </div>
  <template v-else>
    <div class="container-search">
      <input v-model="searchQuery" placeholder="Поиск..." />
      <button @click="isTileView = !isTileView">Изменить вид</button>
    </div>
    <template v-if="!isTileView">
      <div class="container-grid">
        <card-movies
          v-for="movie in filteredItems"
          :key="movie.id"
          :image="movie?.primaryImage?.url"
          :title="movie?.titleText?.text"
          :id="movie?.id"
        />
      </div>
    </template>
    <template v-else>
      <div class="container-list">
        <ul class="horizontal">
          <li
            v-for="movie in filteredItems"
            :key="movie.id"
            class="horizontal-item"
          >
            <NuxtLink :to="`/${movie.id}`">
              {{ movie?.titleText?.text }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </template>

    <div class="pagination">
      <ul class="pagination-item">
        <li @click="previousPage" class="pagination-item_prev">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path
              d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"
            />
          </svg>
        </li>
        <li
          @click="currentPage = page"
          v-for="page in moviesList?.entries"
          :key="page"
          :class="currentPage === page ? 'pagination-item_active' : ''"
        >
          {{ page }}
        </li>
        <li @click="nextPage" class="pagination-item_next">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
          >
            <path
              d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"
            />
          </svg>
        </li>
      </ul>
    </div>
  </template>
</template>

<style scoped lang="scss">
  .container-search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem;
  }
  .container-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-column-gap: 3rem;
    grid-row-gap: 3rem;
    padding: 2rem;
  }
  .container-list {
    margin: 2rem;

    & .horizontal {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }

  .pagination {
    display: flex;
    flex-direction: column;
    .pagination-item {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 1.2rem;
      gap: 1rem;
      &_active {
        color: #760492;
        font-size: 1.4rem;
      }
      &_next {
        color: #760492;
      }
      &_prev {
        transform: rotate(180deg);
        color: #760492;
      }
    }
  }
</style>
