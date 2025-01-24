<template>
    <div class="py-10">
        <ExtendersCustomFeatureEx header="">
            <template #title>
                <h1>Markdown With Superpowers</h1>
            </template>
            <template #description>
                <p>
                    Author Documentation Sites With Markdown And Vuejs Components With Mdx. Mdx Is A Markdown Syntax That Supports Vue Components. It Allows You To Author Markdown With The Power Of Components In Vue.
                </p>
            </template>
            <template #img>
                <svg class="icon icon-mdx size-80" height="28.5" viewBox="0 0 138 57" width="69" aria-label="MDX" role="img"><title>MDX</title><g><rect fill="yellow" height="55.5" rx="4.5" width="136.5" x=".75" y=".75"></rect><g fill="none" stroke="black" stroke-width="6"><path d="M16.5 44V19L30.25 32.75l14-14v25"></path><path d="M70.5 40V10.75"></path><path d="M57 27.25L70.5 40.75l13.5-13.5"></path><path d="M122.5 41.24L93.25 12M93.5 41.25L122.75 12"></path></g></g></svg>
            </template>
            <template #actions>
                <NuxtLink to="https://mdxjs.com/docs/" >
                    <Button class="w-fit font-semibold">
                        Read More On How Mdx Works
                        <IconArrowUpRight class="size-5" />
                    </Button>
                </NuxtLink>
            </template>
        </ExtendersCustomFeatureEx>


        <ExtendersCustomFeatureEx direction="right" header="">
            <template #title>
                <h1 class="flex-place-center gap-1">Built With 
                <img class="size-10" src="../../assets/images/nuxt.svg" alt="">
                    Nuxt Js</h1>
            </template>
            <template #description>
                <p>
                    Author Documentation Sites With Markdown And Vuejs Components With Mdx. Mdx Is A Markdown Syntax That Supports Vue Components. It Allows You To Author Markdown With The Power Of Components In Vue.
                </p>
            </template>
            <template #img>
                <img class="size-96" src="../../assets/images/nuxt.svg" alt="">
            </template>
            <template #actions>
                <NuxtLink to="https://nuxt.com/docs/getting-started/introduction" >
                    <Button class="w-fit bg-[#00DC82] font-semibold text-black hover:bg-[#22be7d]">
                        Nuxt Js And Its Benefits
                        <IconArrowUpRight class="size-5" />
                    </Button>
                </NuxtLink>
            </template>
        </ExtendersCustomFeatureEx>

        <ExtendersCustomFeatureEx>
            <template #title>
                <h1>Seamless Translation Support</h1>
            </template>
            <template #description>
                <p>
                    Vdocs Comes With Built-In Translation Support. You Can Easily Translate Your Documentation To Any Language You Want. Vdocs Makes It Easy To Manage And Translate Your Documentation. <strong>And Generates the UI For You.</strong>
                </p>
            </template>
            <template #img>
                <IconLanguageHiragana class="size-96" />
            </template>
            <template #actions>
                <NuxtLink to="https://www.i18next.com/" >
                    <Button class="w-fit font-semibold ">
                        Learn How I8n Works
                        <IconArrowUpRight class="size-5" />
                    </Button>
                </NuxtLink>
            </template>
        </ExtendersCustomFeatureEx>

        <!--Versioning Support Feature-->
        <ExtendersCustomFeatureEx direction="right">
            <template #title>
                <h1>Versioning Support</h1>
            </template>
            <template #description>
                <p>
                    Vdocs Comes With Built-In Versioning Support. You Can Easily Manage And Publish Different Versions Of Your Documentation. Vdocs Makes It Easy To Manage And Publish Different Versions Of Your Documentation. <strong>And Generates the UI For You.</strong>
                </p>
            </template>
            <template #img>
                <img class="size-72" src="../../assets/images/versions.png" alt="">
            </template>
            <template #actions>
                <NuxtLink to="https://mdxjs.com/docs/" >
                    <Button class="w-fit font-semibold">
                        Read More On How Mdx Works
                        <IconArrowUpRight class="size-5" />
                    </Button>
                </NuxtLink>
            </template>
        </ExtendersCustomFeatureEx>

        <!--Client Side Search Feature -->
        <ExtendersCustomFeatureEx>
            <template #title>
                <h1>Client Side Search</h1>
            </template>
            <template #description>
                <p>
                    Vdocs Comes With Built-In Client Side Search Support. You Can Easily Search Through Your Documentation Without Any Server-Side Setup. Vdocs Makes It Easy To Manage And Search Through Your Documentation. <strong>And Generates the UI For You.</strong>
                </p>
            </template>
            <template #img>
                <IconSearch class="size-96" />
            </template>
            <template #actions>
                <NuxtLink to="https://mdxjs.com/docs/" >
                    <Button class="w-fit font-semibold">
                        Read More On How Mdx Works
                        <IconArrowUpRight class="size-5" />
                    </Button>
                </NuxtLink>
            </template>
        </ExtendersCustomFeatureEx>

        <ExtendersCustomTestimonialEx   />
    </div>
</template>

<script setup>
import {Button} from '@/components/ui/button'
import {IconArrowUpRight, IconLanguageHiragana, IconSearch} from '@tabler/icons-vue'
</script>