<script setup lang="ts">
  const props = defineProps<{
    image: String;
    title: String;
    id: number;
    years?: number;
  }>();
</script>

<template>
  <NuxtLink :to="`/${id}`" class="card">
    <img :src="image" :alt="title" class="card__img" />
    <h3 class="card__title">Название: {{ title }}</h3>
    <p v-if="years" class="card__text">Год выпуска: {{ years }}</p>
  </NuxtLink>
</template>

<style scoped lang="scss">
  .card {
    max-height: 75rem;
    min-height: 12rem;
    height: auto;
    max-width: 75rem;
    min-width: 12rem;
    width: 100%;
    background-color: aliceblue;
    transition: box-shadow 0.9s;
    padding: 1.5rem;

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }

    &__img {
      object-fit: cover;
      max-height: 20rem;
      width: 100%;
      max-width: 75rem;
      margin-bottom: 1rem;
    }
    &__title {
      font-size: 1.3rem;
      color: black;
      font-weight: 800;
    }
    &__text {
      font-size: 1.3rem;
      color: black;
    }
  }
</style>
