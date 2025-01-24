<template>
    <button
        @click="scrollToTop"
        class="fixed z-50 bottom-5 right-5 w-44 border border-border text-foreground text-sm hover:bg-secondary p-2 rounded-lg transition-opacity duration-300 "
        :class="{ 'opacity-100': isVisible, 'opacity-0': !isVisible }"
    >
        ↑ Back To Top
    </button>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';

export default defineComponent({
    name: 'GoToTop',
    setup() {
        const isVisible = ref(false);

        const handleScroll = () => {
            isVisible.value = window.scrollY > 100;
        };

        const scrollToTop = () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        onMounted(() => {
            window.addEventListener('scroll', handleScroll);
        });

        onUnmounted(() => {
            window.removeEventListener('scroll', handleScroll);
        });

        return {
            isVisible,
            scrollToTop,
        };
    },
});
</script>

<style scoped>
button.opacity-0 {
    opacity: 0;
}
button.opacity-100 {
    opacity: 1;
}
</style>
