<template>
  <main>
    <Hero />
    <div class="container my-12">
      <section class="card-row flex justify-evenly flex-wrap">
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
            Custom Training Programs
          </h3>
          <p>
            Can't make it to one of our classes? Need training for your entire
            crew? We can come to you with training material customized to your
            needs.
          </p>
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
        <div class="">
          <EventList
            class="grid gap-4 md:grid-cols-2 xl:grid-cols-3 xl:gap-6"
          />
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
  @apply w-full mb-8 text-center max-w-xs md:text-left;
}
</style>
