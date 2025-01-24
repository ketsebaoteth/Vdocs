<!-- filepath: /c:/Users/admin/Desktop/Full Typescript Projects/cognito 1.0/Vdocs/components/Navbar.vue -->
<script setup>
import { ref, onMounted, onUnmounted, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { IconArrowUpRight, IconBrandDiscord, IconBrandTwitter, IconLanguage } from '@tabler/icons-vue';

const router = useRouter();

const props = defineProps({
    logoText: {
        type: String,
        default: "Vdocs"
    },
    scrollThreshold: {
        type: Number,
        default: 100 // Default scroll threshold
    }
});

const isScrolled = ref(false);

function handleScroll() {
    isScrolled.value = window.scrollY > props.scrollThreshold;
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
    <div :class="['navbar flex-place-center gap-3', { 'bg-opacity-100': isScrolled, 'bg-opacity-0': !isScrolled }]">
        <div @click="router.push('/')" class="logo flex-place-center gap-1 ">
            <h1 class="cursor-pointer text-lg font-extrabold">{{ props.logoText }}</h1>
        </div>
        <NavbarSearchBar />
        <div class="links ml-auto flex-place-center gap-2">
            <NavbarLink text="Documentation" route="/docs" />
            <NavbarLink text="Blog" />
            <NavbarLink text="ChangeLogs" />
            <NavbarLink text="About" :has-dropdown="true">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
            </NavbarLink>
        </div>
        <Separator />
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <DropdownMenu>
                        <DropdownMenuTrigger class="flex-place-center">
                            <div class="p-1">
                                <IconLanguage class="cursor-pointer size-5" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent class="w-44">
                            <DropdownMenuItem class="gap-1 cursor-pointer">
                                አማርኛ
                                <IconArrowUpRight class="!size-3 h-full place-self-start" />
                            </DropdownMenuItem>
                            <DropdownMenuItem class="gap-1 cursor-pointer">
                                简体中文
                                <IconArrowUpRight class="!size-3 h-full place-self-start" />
                            </DropdownMenuItem>
                            <DropdownMenuItem class="gap-1 cursor-pointer">
                                Українська
                                <IconArrowUpRight class="!size-3 h-full place-self-start" />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Change Language</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <Separator />
        <NavbarThemeToggle />
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <NavbarGithub :githubLink="'vercel/next.js'" />
                </TooltipTrigger>
                <TooltipContent>
                    <p>Open Repository</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <div class="socials flex-place-center gap-2">
            <IconBrandTwitter class="size-5" />
            <IconBrandDiscord class="size-5" />
        </div>
    </div>
</template>

<style scoped>
.navbar {
    @apply w-screen h-16 bg-transparent sticky top-0 border-border px-8 z-50 transition-all duration-500;
}

.bg-opacity-0 {
    background-color: rgba(255, 255, 255, 0) !important;
}

.bg-opacity-100 {
    background-color: hsl(var(--background)) !important;
}
</style>