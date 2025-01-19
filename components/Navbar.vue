<script setup>
import { defineProps } from 'vue';
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { IconArrowUpRight, IconBrandDiscord, IconBrandTwitter, IconLanguage } from '@tabler/icons-vue';

const props = defineProps({
    logoText : {
        type: String,
        default: "Vdocs"
    },
})


</script>

<template>
    <div class="navbar flex-place-center gap-3">
        <div class="logo flex-place-center gap-1">
            <img src="../assets/images/logo.svg" alt="">
            <h1 class="cursor-pointer">{{props.logoText}}</h1>
        </div>
        <NavbarSearchBar />
        <div class="links ml-auto flex-place-center gap-2">
            <NavbarLink text="Documentation" />
            <NavbarLink text="Blog" />
            <NavbarLink text="ChangeLogs" />
            <NavbarLink text="About" :has-dropdown="true" >
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
                                <IconLanguage class="cursor-pointer size-5"/>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent class="w-44">
                          <DropdownMenuItem class="gap-1 cursor-pointer">
                            አማርኛ
                            <IconArrowUpRight class="!size-3 h-full place-self-start"/>
                        </DropdownMenuItem>
                        <DropdownMenuItem class="gap-1 cursor-pointer">
                            简体中文
                            <IconArrowUpRight class="!size-3 h-full place-self-start"/>
                        </DropdownMenuItem>
                        <DropdownMenuItem class="gap-1 cursor-pointer">
                            Українська
                            <IconArrowUpRight class="!size-3 h-full place-self-start"/>
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
              <TooltipTrigger >
                    <NavbarGithub />
              </TooltipTrigger>
              <TooltipContent>
                <p>Github</p>
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
.navbar{
    @apply w-screen h-14 bg-background border-b border-border px-8;
}

</style>