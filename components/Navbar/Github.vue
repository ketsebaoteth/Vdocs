<!-- filepath: /c:/Users/admin/Desktop/Full Typescript Projects/cognito 1.0/Vdocs/components/Navbar/Github.vue -->
<script setup lang="ts">
import { IconBrandGithub } from '@tabler/icons-vue';
import { ref, onMounted, computed } from 'vue';

const props = defineProps({
  githubLink: {
    type: String,
    default: ''
  }
});

const starCount = ref<number | null>(null);

const getGithubStars = async () => {
  const res = await fetch(`https://api.github.com/repos/${props.githubLink}`);
  const data = await res.json();
  return data.stargazers_count;
};

// 1. Format function
function formatStars(count: number | null): string {
  if (count === null || isNaN(count)) {
    return '0';
  }
  if (count < 1000) {
    return count.toString();        // e.g. "128"
  } else if (count < 1000000) {
    // Up to 999,999 => "12.3k"
    return (count / 1000).toFixed(1) + 'k';
  } else {
    // 1,000,000+ => "1.2mil" or "12.3mil"
    return (count / 1000000).toFixed(1) + 'mil';
  }
}

onMounted(async () => {
  starCount.value = await getGithubStars();
});

// 2. Computed property to display formatted count
const formattedCount = computed(() => formatStars(starCount.value));
const opengithub = ()=>{
    window.open('https://github.com/'+props.githubLink)
}
</script>

<template>
  <div @click="opengithub" class="navbar_github flex-place-center gap-1">
    <IconBrandGithub class="size-5 cursor-pointer" />
    <!-- 3. Use the computed value in template -->
    <span>{{ formattedCount }}</span>
  </div>
</template>

<style scoped>
.navbar_github {
  @apply cursor-pointer px-1 py-1;
}
</style>