<!-- filepath: /c:/Users/admin/Desktop/Full Typescript Projects/cognito 1.0/Vdocs/components/Extenders/Custom/TestimonialEx.vue -->
<template>
  <div class="mx-auto pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl gap-16 sm:gap-y-24 flex flex-col">
    <div class="text-center flex flex-col items-center">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
        Trusted by the<br /><span class="text-primary">World Wide Web.</span>
      </h2>
    </div>
    <div class="column-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
      <div v-for="(testimonial, index) in testimonials" :key="index" class="break-inside-avoid">
        <div class="rounded-xl divide-y divide-gray-200 dark:divide-gray-800 ring-1 ring-gray-200 dark:ring-gray-800 shadow bg-white dark:bg-gray-900 relative">
          <div class="flex flex-col px-4 py-5 sm:p-6">
            <div>
              <q class="text-gray-600 dark:text-gray-300">
                {{ testimonial.quote }}
              </q>
              <div class="flex items-center gap-3 mt-6 relative">
                <span class="relative inline-flex items-center justify-center flex-shrink-0 rounded-full h-10 w-10 text-base">
                  <img class="rounded-full h-10 w-10 text-base" :alt="testimonial.name" :src="testimonial.image" />
                </span>
                <div>
                  <a :href="testimonial.link" rel="noopener noreferrer" target="_blank" :aria-label="testimonial.name" class="focus:outline-none" tabindex="-1">
                    <span class="absolute inset-0" aria-hidden="true"></span>
                  </a>
                  <p class="font-semibold text-gray-900 dark:text-white text-sm">{{ testimonial.name }}</p>
                  <p class="text-gray-500 dark:text-gray-400 text-sm">{{ testimonial.title }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const testimonials = ref([
  {
    quote: "Nuxt offers a compelling solution and a great ecosystem to help you ship fullstack Vue apps that are performant and SEO friendly. The flexibility to choose between SSR and SSG is icing on the cake.",
    name: "Evan You",
    title: "Creator of Vue.js and Vite",
    image: "https://via.placeholder.com/40",
    link: "https://twitter.com/youyuxi"
  },
  {
    quote: "Nuxt is a fantastic choice for teams building a production-grade product on the web. It aims to bake in performance best-practices while maintaining excellent Vue.js DX.",
    name: "Addy Osmani",
    title: "Chief Engineer of Chrome",
    image: "https://via.placeholder.com/40",
    link: "https://twitter.com/addyosmani"
  },
  {
    quote: "Nuxt has been an incredible source of innovation and inspiration for developers and framework authors alike. It's been amazing to see its growth in web projects of all sizes on the web.",
    name: "Guillermo Rauch",
    title: "Co-founder and CEO of Vercel",
    image: "https://via.placeholder.com/40",
    link: "https://twitter.com/rauchg"
  },
  {
    quote: "Nuxt has outstanding developer productivity, experience, and performance right out of the gate! There’s so much attention to detail, ensuring teams have everything at their fingertips to productively build all manners of applications.",
    name: "Sarah Drasner",
    title: "Director of Engineering, Google",
    image: "https://via.placeholder.com/40",
    link: "https://twitter.com/sarah_edo"
  },
  {
    quote: "Nuxt has a unique approach of combining a great developer experience with reusable, fully integrated features that speed up the development and performance of your next website or application.",
    name: "Dominik Angerer",
    title: "Co-founder of Storyblok",
    image: "https://via.placeholder.com/40",
    link: "https://twitter.com/domangerer"
  },
  {
    quote: "The moment I used Nuxt for the first time I felt in love with it. Apart from its scalability, performance and developer experience, the team behind of it is also fantastic. Thanks for developing such a great framework and making our lives much easier!",
    name: "Savas Vedova",
    title: "Senior Frontend Engineer at GitLab",
    image: "https://via.placeholder.com/40",
    link: "https://twitter.com/savasvedova"
  },
  {
    quote: "Nuxt’s blend of high performance and focused developer experience is a game changer. Its SSR and SSG flexibility, coupled with a community that’s as vibrant as the Vue.js ecosystem, makes it a great choice for modern web projects.",
    name: "Rijk van Zanten",
    title: "CTO at Directus",
    image: "https://via.placeholder.com/40",
    link: "https://github.com/rijkvanzanten"
  }
]);
</script>