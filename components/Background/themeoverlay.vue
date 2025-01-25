<template>
    <div class="relative">
        <div class="tr -z-20 absolute">

        </div>
        <div class="theme-overlay absolute -z-30 absolute top-0 right-0 w-[500px] h-[500px]"></div>
    </div>
</template>

<style scoped>
.tr{
    @apply w-[1300px] h-[800px] rotate-45 -top-[320px] -right-32;
    background-image: linear-gradient(to right, hsl(var(--background)) 52%, transparent 54%, hsl(var(--background)) 86%, hsl(var(--background)) 100%);
    background-size: cover;
}
.theme-overlay{
    background-color: #e5e5f700;
    opacity: 0.8;
    background-image:  
    linear-gradient(hsl(var(--muted)) 1px, transparent 1px), 
    linear-gradient(to right, hsl(var(--muted)) 1px, transparent 1px);
    background-size: 50px 50px;
}
</style>