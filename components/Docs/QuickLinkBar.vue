<template>
  <div class="quick-link-bar w-fit h-screen bg-background p-8 sticky top-16 relative">
    <!-- Indicator Bar: Only render if there is an active heading -->
    <div
      v-if="activeHeadingId"
      class="indicator absolute left-8 w-2 bg-primary transition-all duration-300"
      :style="{ top: indicatorTop + 'px', height: indicatorHeight - 4 + 'px' }"
    ></div>

    <!--Heading For Quick Link Bar-->
    <div class="flex-place-center my-2 gap-2">
      <IconListTree
        class="size-5 text-muted-foreground" />
      <p class="">on this page</p>
    </div>

    <ul class="flex flex-col gap-1 z-10 border-l border-border ml-[1px]">
      <li
        v-for="(heading) in headings"
        :key="heading.id"
        ref="headingRefs"
        class="pl-4 py-[2px] cursor-pointer"
        :class="{ 'active-link': heading.id === activeHeadingId }"
      >
        <!-- Prevent default anchor jump, call scrollToHeading instead -->
        <a href="#" @click.prevent="scrollToHeading(heading.id)">
          {{ heading.text }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, ref, watch, nextTick, onMounted } from 'vue';
import { docsStates } from '../../state';
import { IconListTree } from '@tabler/icons-vue';

// Computed property to get headings from state
const headings = computed(() => docsStates.value.headings);
const activeHeadingId = ref(null);

// Refs to all heading list items
const headingRefs = ref([]);

// Indicator position and size
const indicatorTop = ref(0);
const indicatorHeight = ref(0);

/**
 * Scroll smoothly to the heading and center it in the viewport
 * @param {string} headingId
 */
function scrollToHeading(headingId) {
  const el = document.getElementById(headingId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

/**
 * Observe headings using IntersectionObserver to set the active heading
 * @param {Array} newHeadings
 */
function observeHeadings(newHeadings) {
  if (!('IntersectionObserver' in window)) return;

  // Disconnect existing observers to prevent multiple triggers
  if (observeHeadings.observer) {
    observeHeadings.observer.disconnect();
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeHeadingId.value = entry.target.id;
        } else {
          // Optional: Unset activeHeadingId if heading is not intersecting
        }
      });
    },
    { threshold: 0.3 } // threshold can be adjusted as needed
  );

  newHeadings.forEach((heading) => {
    const el = document.getElementById(heading.id);
    if (el) {
      observer.observe(el);
    }
  });

  // Store the observer for later disconnection
  observeHeadings.observer = observer;
}

/**
 * Update the indicator's position and size based on the active link
 */
function updateIndicator() {
  if (!activeHeadingId.value || headingRefs.value.length === 0) {
    return;
  }

  const index = headings.value.findIndex(
    (heading) => heading.id === activeHeadingId.value
  );

  if (index === -1) {
    return;
  }

  const activeElement = headingRefs.value[index];
  if (!activeElement) return;

  const elementRect = activeElement.getBoundingClientRect();
  const containerRect = document.querySelector('.quick-link-bar').getBoundingClientRect(); // Get container rect

  // Calculate the top position relative to the *container*
  indicatorTop.value = elementRect.top - containerRect.top;
  indicatorHeight.value = elementRect.height;
}

// Watch for changes in headings and set up the observer
watch(
  headings,
  async (newHeadings) => {
    if (newHeadings.length === 0) {
      activeHeadingId.value = null;
      indicatorTop.value = 0;
      indicatorHeight.value = 0;
      return;
    }
    await nextTick();
    observeHeadings(newHeadings);
    updateIndicator();
  },
  { immediate: true }
);

// Watch for changes in activeHeadingId to update the indicator
watch(
  activeHeadingId,
  async () => {
    await nextTick();
    updateIndicator();
  }
);

// Collect references to each heading list item
// Vue automatically populates headingRefs as an array due to ref on v-for
onMounted(() => {
  // No additional setup needed here
});
</script>

<style scoped>
/* Indicator Bar Styling */
.indicator {
  width: 4px; /* Adjust the width as needed */
  @apply bg-primary;
  border-radius: 2px;
  transition: top 0.3s ease-in-out, height 0.3s ease-in-out;
}

/* Highlight the active heading link */
.active-link a {
  @apply text-primary font-semibold;
}

/* Optional: Enhance the appearance of links */
a {
  @apply text-muted-foreground text-sm;
  text-decoration: none;
  transition: color 0.3s;
}

a:hover {
  @apply text-primary;
}
</style>