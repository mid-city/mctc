<template>
  <main>
    <Hero />
    <div class="container my-12">
      <section class="card-row flex justify-evenly">
        <div class="card">
          <h3>
            <FaIcon :icon="['fas', 'tools']" class="fa-fw"></FaIcon>
            By Pros, for Pros
          </h3>
          <p>
            Our hands-on curriculum is designed by experienced HVAC technicians.
            We know how to teach it, because we've done it.
          </p>
        </div>
        <div class="card">
          <h3>
            <FaIcon :icon="['fas', 'sliders-h']" class="fa-fw"></FaIcon>
            Custom Training
          </h3>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        <div class="card">
          <NuxtImg
            src="MCTC/D2_2D_TRAIN_TEST_PROV_blk_zbhzn4"
            alt="NATE Training & Testing Provider"
            width="600"
            height="597"
            class="w-48 mx-auto"
            sizes="xs:80vw "
          />
        </div>
      </section>
      <section>
        <h3 class="text-gray-700 my-4 text-3xl font-bold">Upcoming Classes</h3>
        <div
          class="
            flex
            items-center
            justify-center
            h-56
            bg-gray-300
            border-2 border-gray-500
          "
        >
          Events here
        </div>
      </section>

      <section></section>
    </div>
  </main>
</template>
<script>
export default {
  layout: 'home',
}
</script>
<style scoped>
.card-row h3 {
  @apply font-bold text-lg text-gray-600 my-4;
}

.card {
  @apply w-80 text-center;
}
</style>
