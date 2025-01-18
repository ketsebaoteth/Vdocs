<script setup>
import { IconChevronDown } from '@tabler/icons-vue';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const props = defineProps({
    route: {
        type: String,
        default: "#"
    },
    text: {
        type: String,
        default: "Link"
    },
    hasDropdown: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <div class="link flex-place-center">
        <div v-if="!props.hasDropdown">
            <span>
                {{props.text}}
            </span>
            <IconChevronDown v-if="props.hasDropdown" class="size-3"/>
        </div>
        <div v-if="props.hasDropdown">
            <DropdownMenu>
                <DropdownMenuTrigger class="flex-place-center gap-1">
                    <span>
                        {{props.text}}
                    </span>
                    <IconChevronDown v-if="props.hasDropdown" class="size-3"/>
                </DropdownMenuTrigger>
                <DropdownMenuContent class="w-44">
                  <slot />
                </DropdownMenuContent>
              </DropdownMenu>
        </div>
        
    </div>
</template>

<style scoped>
.link{
    @apply cursor-pointer text-sm px-2 gap-1;
}
</style>