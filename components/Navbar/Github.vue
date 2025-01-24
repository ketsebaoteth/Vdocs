<script setup lang="ts">
import { IconBrandGithub, IconStar, IconGitFork } from '@tabler/icons-vue';
import { ref, onMounted, computed } from 'vue';

const props = defineProps({
  githubLink: {
    type: String,
    default: ''
  }
});

const starCount = ref<number | null>(null);
const forkCount = ref<number | null>(null);

const getGithubStats = async () => {
  const res = await fetch(`https://api.github.com/repos/${props.githubLink}`);
  const data = await res.json();
  return {
    stars: data.stargazers_count,
    forks: data.forks_count
  };
};

function formatCount(count: number | null): string {
  if (count === null || isNaN(count)) {
    return '0';
  }
  if (count < 1000) {
    return count.toString();
  } else if (count < 1000000) {
    return (count / 1000).toFixed(1) + 'k';
  } else {
    return (count / 1000000).toFixed(1) + 'mil';
  }
}

onMounted(async () => {
  const stats = await getGithubStats();
  starCount.value = stats.stars;
  forkCount.value = stats.forks;
});

const formattedStars = computed(() => formatCount(starCount.value));
const formattedForks = computed(() => formatCount(forkCount.value));

const opengithub = () => {
  window.open('https://github.com/'+props.githubLink)
}
</script>

<template>
  <div @click="opengithub" class="navbar_github hover:opacity-[0.6] transition-opacity flex-place-center gap-1 border-x border-border">
    <IconBrandGithub class="size-6 text-primary cursor-pointer" />
    <div class="github_details flex flex-col place-items-start">
      <span class="leading-tight text-sm font-semibold"> {{ props.githubLink }}</span>
      <div class="star_fork flex-place-center gap-1">
        <div class="flex-place-center gap-1">
          <IconStar class="size-3" />
          <span class="text-[0.7rem]">{{ formattedStars }}</span>
        </div>
        <div class="flex-place-center gap-1">
          <IconGitFork class="size-3" />
          <span class="text-[0.7rem]">{{ formattedForks }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.navbar_github {
  @apply cursor-pointer px-3 py-1;
}
.transition-opacity{
  transition: opacity 0.2s ease-in-out;
}
</style>