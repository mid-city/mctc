<template>
  <footer class="bg-gray-800 text-gray-400 pb-4">
    <div class="container py-8">
      <div
        class="
          flex flex-wrap
          justify-center
          sm:justify-between
          items-center
          max-w-screen-md
        "
      >
        <div
          class="
            w-full
            sm:w-auto
            flex flex-col
            items-center
            justify-center
            mb-8
            sm:mb-0
          "
        >
          <p class="text-center text-sm mb-4">Training Provided By</p>
          <a
            href="https://www.mid-city.com/"
            target="_blank"
            rel="noopener"
            class="w-32 mx-auto sm:mx-0"
          >
            <NuxtImg
              src="Logos/MID-CITY_SUPPLY_Vector_White_dntt1t"
              alt="Mid-City Supply Co., Inc."
              height="438"
              width="866"
              sizes="sm:40vw"
              class="w-32"
              :modifiers="mcLogoModifiers"
            />
          </a>
        </div>
        <div class="text-center sm:text-left mb-8 sm:mb-0 w-full sm:w-auto">
          <p>
            940 Industrial Pkwy.<br />
            Elkhart, IN 46526
          </p>
          <p><a href="tel:+18005895551" class="underline">800-589-5551</a></p>
        </div>

        <div
          class="
            social
            text-gray-300
            flex
            items-center
            justify-between
            w-56
            sm:w-48
            md:w-56
          "
        >
          <a
            href="https://www.facebook.com/midcitysupply"
            rel="noopener"
            target="_blank"
          >
            <FaIcon :icon="['fab', 'facebook']" class="fa-2x"></FaIcon>
          </a>
          <a
            href="https://www.instagram.com/midcitysupply/"
            rel="noopener"
            target="_blank"
          >
            <FaIcon :icon="['fab', 'instagram']" class="fa-2x"></FaIcon>
          </a>
          <a
            href="https://www.youtube.com/user/MidCitySupply"
            rel="noopener"
            target="_blank"
          >
            <FaIcon :icon="['fab', 'youtube']" class="fa-2x"></FaIcon>
          </a>
          <a
            href="https://www.linkedin.com/company/mid-city-supply-co.-inc/"
            rel="noopener"
            target="_blank"
          >
            <FaIcon :icon="['fab', 'linkedin']" class="fa-2x"></FaIcon
          ></a>
        </div>
      </div>
    </div>
    <p class="text-center text-xs lg:text-left container">
      Copyright &copy; {{ year }} Mid-City Supply Co., Inc.
    </p>
  </footer>
</template>
<script>
export default {
  name: 'MainFooter',
  data() {
    return {
      mcLogoModifiers: {
        opacity: 78,
      },
    }
  },
  computed: {
    year() {
      return this.$dayjs().format('YYYY')
    },
  },
}
</script>
<style scoped>
a:hover,
a:focus {
  @apply text-gray-100;
}
</style>
