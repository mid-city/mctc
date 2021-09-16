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
      <nav class="flex-grow max-w-lg">
        <ul class="flex justify-between items-center text-sm sm:text-lg">
          <li>
            <NuxtLink to="/courses">Course Catalog</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/instructors">Instructors</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/events">Upcoming Classes</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/contact">Contact</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
