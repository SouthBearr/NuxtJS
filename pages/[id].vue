<script setup lang="ts">
  import { getDetailMoviesAsync } from "~/api/movies/index";

  const router = useRouter();
  const route = useRoute();
  const moviesDetail = ref();
  const isLoading = ref(true);

  const getMovies = () => {
    getDetailMoviesAsync(route.params.id)
      .then((res) => {
        moviesDetail.value = res;
        isLoading.value = false;
      })
      .catch((err) => console.error("Ошибка получения фильмов ", err));
  };
  getMovies();
</script>

<template>
  <div v-if="isLoading" class="container-loader">
    <loader />
  </div>
  <template v-else>
    <div class="container">
      <card-movies
        :image="moviesDetail?.primaryImage?.url"
        :title="moviesDetail?.originalTitleText?.text"
        :id="moviesDetail?.id"
        :years="moviesDetail?.releaseYear?.year"
      />
    </div>
  </template>
</template>

<style scoped lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 3rem;
  }
</style>
