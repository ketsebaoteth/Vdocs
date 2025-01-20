<script setup>
import { IconX } from '@tabler/icons-vue';

const props = defineProps({
    msg:{
        type: String,
        default: "[Warning]: No Announcement Message Set this is a fallback"
    }
})

const closeAnnouncements = ()=>{
    document.querySelector('.bannergradient').style.height = "0px"
}
</script>
<template>
    <div class="bannergradient transition-all w-screen h-7 flex-place-center justify-center text-white">
        <p class="text-sm">{{props.msg}}</p>
        <IconX @click="closeAnnouncements" stroke="4" class="size-5 cursor-pointer absolute ml-auto right-3"/>
    </div>
</template>

<style scoped>
.bannergradient{
    background: #fc00ff;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #00dbde, #fc00ff);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #00dbde, #fc00ff); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>