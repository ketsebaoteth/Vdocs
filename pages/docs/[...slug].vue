<template>
    <div class="flex flex-col h-full">
        <div class="flex justify-center h-fit pb-20 pt-5">
            <DocsSidebar />
            <DocsView :slug="slug" />
            <DocsQuickLinkBar />
        </div>
        <FooterDefault />
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const slug = (route.params.slug).join('/');
const filename = route.params.filename;

onMounted(()=>{
    //extract slug 
    //join slug
    console.log(slug)
})
</script>