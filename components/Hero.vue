<template>
  <main
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
      <div class="m-8 text-gray-50">
        <h2 class="my-4 text-5xl uppercase font-bold">
          Stand Out From The Crowd
        </h2>
        <p class="text-lg">Learn Essential Skills from Industry Veterans</p>
        <div class="flex flex-wrap justify-between w-1/2 mt-4">
          <NuxtLink to="/courses" class="py-2 text-center rounded bg-brand w-40"
            >Courses</NuxtLink
          >
          <NuxtLink to="/events" class="py-2 text-center rounded bg-brand w-40"
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
  </main>
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
  height: 60vw;
  min-height: 480px;
  max-height: 70vh;
}
</style>
