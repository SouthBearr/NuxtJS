<template>
  <div class="p-3">
    <ul class="ml-2 grid justify-items-center gap-4 grid-cols-3 grid-rows-3">
      <li v-for="mem of memes.data.memes" :key="mem.id">
        <div>
          <p>{{ mem.name }}</p>
        </div>
        <img :src="mem.url" :alt="mem.name" />
      </li>
    </ul>
  </div>
</template>

<script setup>
  const apiMemes = "https://api.imgflip.com/get_memes";
  const { data: memes } = await useAsyncData("memes.data", () => $fetch(apiMemes));
</script>

<style>
  ul {
    list-style: none;
  }
</style>
