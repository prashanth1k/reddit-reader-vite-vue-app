<template>
  <h4>
    <strong class="text-light">{{ props.filter || "" }} posts</strong>
  </h4>
  <div class="container">
    <p class="error-msg">{{ err }}</p>
    <div v-if="!posts || posts.length <= 0">Loading..</div>
    <div
      class="post-item card text-left"
      v-for="(post, index) in posts"
      :key="index"
      v-else
    >
      <h3 class="post-title">
        <a :href="post?.data?.url" target="_blank">{{ post?.data?.title }}</a>
      </h3>
      <div class="post-item-meta">
        <a
          :href="`https://reddit.com/${post?.data?.subreddit_name_prefixed}`"
          target="blank"
          >{{ post?.data?.subreddit_name_prefixed }}</a
        >
        | {{ post?.data?.num_comments }} comments
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps } from "vue";

const posts = ref([]);
const err = ref("");

const mounted = onMounted(async () => {
  console.log("Fetching them posts..", props.filter);
  posts.value = await fetchPosts();
  console.log("posts.value: ", posts.value);
});

const props = defineProps({ filter: { type: String, default: "top" } });

const fetchPosts = async (query) => {
  try {
    err.value = "";
    const res = await fetch(`https://api.reddit.com/${props.filter}?limit=10`);
    if (res.ok) {
      const resJson = await res.json();
      return resJson?.data?.children;
    } else {
      err.value = res.statusText;
      return [];
    }
    console.log("data: ", data);
  } catch (e) {
    console.error(e.message);
    return [];
    err.value = e.message;
  }
};
</script>

<style>
</style>