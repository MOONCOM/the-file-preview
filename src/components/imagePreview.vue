<template>
  <div class="wrap">
    <img :src="url" class="image-container" alt="图片" />
  </div>
</template>

<script>
export default {
  name: 'image-preview',
  props: {
    url: {
      required: true,
      type: String,
      default: '',
    },
  },
};
</script>
<style scoped>
  img{
    max-width: 1000px;
  }
</style>
