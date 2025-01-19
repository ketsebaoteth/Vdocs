<script setup lang="ts">
import { IconMoon, IconSun } from '@tabler/icons-vue';
import { ref } from 'vue';

const isdark = ref(false);

const enableDarkMode = () => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    isdark.value = true;
    moveInducator();
}

const disableDarkMode = () => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    isdark.value = false;
    moveInducator();
}

const moveInducator = () => {
    const darkMode = localStorage.getItem('theme') === 'dark';
    const inducator: HTMLDivElement | null = document.querySelector('.inducator-transition');
    if (darkMode && inducator) {
        inducator.style.left = 'calc(100% - 28px)';
    } else {
        if(inducator){
            inducator.style.left = '4px';
        }
    }
}


</script>

<template>
    <div class="px-1 py-1 rounded-full border border-border flex-place-center gap-2 relative">
        <div @click="disableDarkMode" class="p-1 cursor-pointer z-10 text-background" :class="{'text-foreground': isdark}">
            <IconSun class="size-4" />
        </div>
        <div @click="enableDarkMode" class="p-1 cursor-pointer z-10" :class="{'text-background': isdark}">
            <IconMoon class="size-4" />
        </div>
        <div class="inducator-transition p-3 bg-primary rounded-full bg-black absolute z-0" />
    </div>
</template>

<style scoped>
.inducator-transition {
    transition: 0.5s !important;
}
</style>