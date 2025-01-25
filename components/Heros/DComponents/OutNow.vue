
<template>
    <div class="relative outnow transition-all duration-200 ease-in-out w-[305px] hover:w-[315px] cursor-pointer flex-place-center gap-2 z-10 rounded-full bg-background py-1.5 px-2 border border-border ">
        <div class="bg-primary px-2 rounded-full text-background">
            <span class="text-xs font-semibold">New</span>
        </div>
        <span class="text-sm">Vdocs Version 1.0.1 is out now 🎉</span>
        <Icon name="tabler:chevron-right" class="text-foreground arrow-right ml-auto" />
    </div>
</template>


<style scoped>
.arrow-right{
    transition: transform 0.2s ease-in-out !important;
}
.outnow:hover > .arrow-right{
    transform: rotate(-45deg);
}
</style>

