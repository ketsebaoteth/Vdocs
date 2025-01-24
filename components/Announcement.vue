<script setup>
import { IconX } from '@tabler/icons-vue';

const banner = ref(null)

const props = defineProps({
    msg:{
        type: String,
        default: "[Warning]: No Announcement Message Set this is a fallback"
    }
})

const closeAnnouncements = ()=>{
    banner.value.style.height = "0px"
    banner.value.style.opacity = "0";
    banner.value.style.pointerEvents = "none";
}
</script>
<template>
    <div ref="banner" class="grid_texture bg-gradient-to-r from-primary to-secondary transition-all w-screen h-7 flex-place-center justify-center text-white">
        <p class="text-sm">{{props.msg}}</p>
        <IconX @click="closeAnnouncements" stroke="4" class="size-5 cursor-pointer absolute ml-auto right-3"/>
    </div>
</template>

<style scoped>
.grid_texture{
    background: linear-gradient(
        to right,
        hsl(var(--primary)),
        hsl(var(--secondary))
      ),
      repeating-linear-gradient(
        to right,
        hsl(var(--border)) 0,
        hsl(var(--border)) 1px,
        transparent 1px,
        transparent 20px
      ),
      repeating-linear-gradient(
        to bottom,
        hsl(var(--border)) 0,
        hsl(var(--border)) 1px,
        transparent 1px,
        transparent 20px
    );
}

</style>