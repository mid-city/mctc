<template>
  <div
    class="hero relative overflow-hidden bg-hero-poster bg-left-top bg-cover"
  >
    <div class="hero-content relative z-10 h-full w-full flex items-center">
      <p class="m-8 text-white text-5xl uppercase font-bold">
        Level Up Your Career
      </p>
    </div>
    <ClientOnly>
      <video
        v-if="showHeroVid"
        ref="heroVideo"
        autoplay
        loop
        muted
        playsinline
        disablepictureinpicture
        disableremoteplayback
        class="
          object-cover
          min-w-full min-h-full
          overflow-hidden
          w-auto
          h-auto
          absolute
          top-0
          left-0
        "
      >
        <source :src="heroVid.mp4" type="video/mp4" />
        <source :src="heroVid.webm" type="video/webm" />
      </video>
    </ClientOnly>
  </div>
</template>
<script>
export default {
  name: 'Hero',
  data() {
    return {
      showHeroVid: false,
    }
  },
  computed: {
    heroBg() {
      const publicId = 'mctc-hero2_poster_nwptl4'
      return this.$cloudinary.image.url(publicId, {
        format: 'auto',
        quality: 'auto',
      })
    },
    heroVid() {
      const publicId = 'MCTC/mctc-hero2_gufous'
      return {
        mp4: this.$cloudinary.video.url(publicId, {
          format: 'mp4',
          quality: 'auto',
        }),
        webm: this.$cloudinary.video.url(publicId, {
          format: 'webm',
          quality: 'auto',
        }),
      }
    },
  },
  mounted() {
    this.startVideo()
  },
  methods: {
    startVideo() {
      this.showHeroVid = true
    },
  },
}
</script>
<style scoped>
.hero {
  height: 40vw;
  min-height: 480px;
  max-height: 70vh;
}
</style>
