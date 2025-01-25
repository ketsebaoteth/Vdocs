<!-- filepath: /c:/Users/admin/Desktop/Full Typescript Projects/cognito 1.0/Vdocs/components/Navbar/ThemeToggle.vue -->
<script setup lang="ts">
import { IconDeviceImac, IconMoon, IconSun } from '@tabler/icons-vue';
import { ref, onMounted, watch } from 'vue';
import type { Ref } from 'vue';

const SelectedTheme: Ref<string> = ref('light');

function getSystemDefaultTheme() {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isDarkMode ? 'dark' : 'light';
}

function setTheme(theme: string) {
    if (theme === 'default') {
        const systemTheme = getSystemDefaultTheme();
        SelectedTheme.value = 'default';
        if (systemTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', 'default');
    } else if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        SelectedTheme.value = 'dark';
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        SelectedTheme.value = 'light';
    }
}

function moveIndicator() {
    const indicator: HTMLDivElement | null = document.querySelector('.indicator-transition');
    if (indicator) {
        if (SelectedTheme.value === 'light') {
            indicator.style.left = '4px';
        } else if (SelectedTheme.value === 'dark') {
            indicator.style.left = 'calc(100% - 28px)';
        } else {
            indicator.style.left = 'calc(50% - 12px)';
        }
    }
}

watch(SelectedTheme, () => {
    moveIndicator();
});

onMounted(() => {
    const savedTheme = localStorage.getItem('theme') || 'default';
    setTheme(savedTheme);
    moveIndicator();
});
</script>

<template>
    <div class="px-1 py-1 bg-background  rounded-full border border-border flex-place-center gap-2 relative">
        <div @click="setTheme('light')" class="p-1 cursor-pointer z-10 text-background" :class="{'text-foreground': SelectedTheme == 'dark' || SelectedTheme == 'default'}">
            <IconSun class="size-4" />
        </div>
        <div @click="setTheme('default')" class="p-1 cursor-pointer z-10" :class="{'text-background': SelectedTheme == 'default'}">
            <IconDeviceImac class="size-4" />
        </div>
        <div @click="setTheme('dark')" class="p-1 cursor-pointer z-10" :class="{'text-background': SelectedTheme == 'dark'}">
            <IconMoon class="size-4" />
        </div>
        <div class="indicator-transition p-3 bg-primary rounded-full bg-black absolute z-0" />
    </div>
</template>

<style scoped>
.indicator-transition {
    transition: 0.1s ease-in-out !important;
}
</style>