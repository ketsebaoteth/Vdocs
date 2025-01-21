<!-- filepath: /c:/Users/admin/Desktop/Full Typescript Projects/cognito 1.0/Vdocs/components/DocsBlocks/table.vue -->
<template>
    <table class="table-cont my-2 w-full table-fixed" role="table">
      <slot />
    </table>
  </template>
  
  <script setup>
  // Minimal script code as needed
  </script>
  
  <style>
  .table-cont {
    /* Apply borders and rounded corners */
    @apply border border-border rounded-md;
  
    /* Ensure the table takes the full width of its container */
    width: 100%;
  
    /* Use fixed table layout to allow equal column widths */
    table-layout: fixed;
  
    /* Collapse borders for a unified look */
    border-collapse: collapse;
  }
  
  /* Style table headers */
  .table-cont th {
    @apply bg-muted border border-border px-4 py-2 text-left;
  
    /* Ensure headers take equal width */
    width: 1%;
    white-space: nowrap;
  }
  
  /* Style table data cells */
  .table-cont td {
    @apply border border-border px-4 py-2;
  
    /* Ensure cells take equal width */
    width: 1%;
    word-wrap: break-word;
  }
  
  /* Optional: Zebra striping for better readability */
  .table-cont tbody tr:nth-child(even) {
    @apply bg-muted;
  }

  
  /* Optional: Hover effect for rows */
  .table-cont tbody tr:hover {
    @apply bg-muted;
  }
  
  /* Remove right border from the last header and data cells to prevent double borders */
  .table-cont th:last-child,
  .table-cont td:last-child {
    @apply border-r-0;
  }
  
  /* Remove bottom border from the last row's cells for a cleaner look */
  .table-cont tbody tr:last-child td {
    @apply border-b-0;
  }
  </style>