<!-- filepath: /c:/Users/admin/Desktop/Full Typescript Projects/cognito 1.0/Vdocs/components/Background/patteroverlay.vue -->
<template>
    <!-- The overlay is absolutely positioned and non-interactive -->
    <div class="absolute -z-50 top-0 left-0 w-full h-full pointer-events-none">
      <div
        v-for="(cell, i) in cells"
        :key="i"
        class="cell border"
        :style="getCellStyle(cell)"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, defineProps } from 'vue'
  
  const props = defineProps({
    marginSpacing: {
      type: Number,
      default: 5 // Default gap between cells
    }
  })
  
  const cellSize = 40
  const cells = ref([])
  const mouseX = ref(0)
  const mouseY = ref(0)
  const proximityRadius = 100
  
  onMounted(() => {
    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight
  
    // Treat marginSpacing as additional space between cells
    const effectiveCellSize = cellSize + props.marginSpacing
    const cols = Math.ceil(screenWidth / effectiveCellSize)
    const rows = Math.ceil(screenHeight / effectiveCellSize)
  
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        cells.value.push({
          x: c * effectiveCellSize,
          y: r * effectiveCellSize
        })
      }
    }
  
    window.addEventListener('mousemove', handleMouse)
  })
  
  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouse)
  })
  
  function handleMouse(e) {
    mouseX.value = e.clientX
    mouseY.value = e.clientY
  }
  
  function getCellStyle(cell) {
    const dist = Math.hypot(cell.x - mouseX.value, cell.y - mouseY.value)
    const inRange = dist < proximityRadius
  
    return {
      width: `${cellSize}px`,
      height: `${cellSize}px`,
      position: 'absolute',
      left: `${cell.x}px`,
      top: `${cell.y}px`,
      /*opacity is baesed on how far each element is*/
      opacity:  1 - dist / 500,
      borderColor: `hsl(var(--border))`,
      backgroundColor: inRange ? `hsl(var(--border))` : 'transparent'
    }
  }
  </script>
  
  <style scoped>
  .cell {
    border: 1px solid;
    box-sizing: border-box;
    transition: background-color 0.4s ease-in-out;
    @apply rounded-md;
  }
  </style>