<template>
  <div class="wrap">
    <video
      :src="url"
      controls
      class="video-container">
      <p>您的版本过低，无法播放视频文件</p>
    </video>
  </div>
</template>

<script>
export default {
  name: 'video-preview',
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
video{
  max-width: 1000px;
}
</style>
