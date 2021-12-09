<template>
  <div
    class="hero relative overflow-hidden bg-hero-poster bg-left-top bg-cover"
  >
    <div
      class="
        hero-content
        relative
        z-10
        h-full
        w-full
        bg-black bg-opacity-30
        flex
        items-center
      "
    >
      <div class="container text-gray-50">
        <h2
          class="text-5xl md:text-7xl uppercase font-bold filter drop-shadow-sm"
        >
          Stand Out From The Crowd
        </h2>
        <p class="text-lg md:text-xl my-8 filter drop-shadow-sm">
          Learn Essential Skills from Industry Veterans
        </p>
        <div class="flex flex-wrap justify-between w-full max-w-lg mt-10">
          <NuxtLink
            to="/courses"
            class="btn bg-brand w-full sm:w-60 mb-4 shadow-sm"
            >Courses</NuxtLink
          >
          <NuxtLink
            to="/events"
            class="btn bg-brand w-full sm:w-60 mb-4 shadow-sm"
            >Schedule</NuxtLink
          >
        </div>
      </div>
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
.btn {
  @apply rounded p-4 text-center;
}
.hero {
  height: 60vw;
  min-height: 480px;
  max-height: 70vh;
}
</style>
