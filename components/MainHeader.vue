<template>
  <header class="text-brand bg-gray-50 shadow-sm z-50 fixed top-0 w-full h-36">
    <div
      class="
        container
        flex flex-wrap
        lg:justify-between
        justify-center
        items-center
        h-full
      "
    >
      <div class="logo max-w-xs md:max-w-sm">
        <NuxtLink to="/">
          <img
            src="https://res.cloudinary.com/mid-city/image/upload/c_scale,e_trim:10,f_auto,q_auto,w_1000/v1616075716/MCTC/MCTC_Logo_Horizontal_cyc2bp"
            alt="Mid-City Tech Center"
          />
        </NuxtLink>
      </div>
      <nav class="flex-grow max-w-xl">
        <ul class="flex justify-between items-center text-sm sm:text-lg">
          <li>
            <NuxtLink to="/courses"
              ><FaIcon :icon="['fas', 'book']" class="fa-fw mr-1"></FaIcon
              >Course Catalog</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/instructors"
              ><FaIcon
                :icon="['fas', 'chalkboard-teacher']"
                class="fa-fw mr-1"
              ></FaIcon
              >Instructors</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/events"
              ><FaIcon
                :icon="['fas', 'calendar-alt']"
                class="fa-fw mr-1"
              ></FaIcon
              >Class Schedule</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/contact">
              <FaIcon :icon="['fas', 'mobile-alt']" class="fa-fw mr-1"></FaIcon
              >Contact</NuxtLink
            >
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
