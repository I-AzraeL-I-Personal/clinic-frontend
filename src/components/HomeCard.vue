<template>
  <div class="card text-center">
    <img :src="require(`@/assets/${image}`)" class="card-img-top" alt="" width="200" height="200"/>
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <router-link class="btn btn-primary" :to="{ name: linkToComponent }">{{ linkName }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeCard",
  props: {
    title: String,
    linkToComponent: String,
    linkName: String,
    image: String,
  },
};
</script>
