<template>
    <div
      class="truncate-text"
      :style="{
        display: '-webkit-box',
        '-webkit-line-clamp': maxLines,
        '-webkit-box-orient': 'vertical',
        overflow: 'hidden',
        'text-overflow': 'ellipsis'
      }"
    >
      {{ text }}
    </div>
  </template>
  
  <script>
  export default {
    name: 'TruncateText',
    props: {
      text: {
        type: String,
        required: true
      },
      maxLines: {
        type: Number,
        default: 1
      }
    }
  }
  </script>
  
  <style scoped>
  .truncate-text {
    word-wrap: break-word;
  }
  </style>