<template>
  <div>
    <ValidationObserver
      ref="form"
      v-slot="{ invalid, handleSubmit }"
      mode="eager"
    >
      <form id="contactForm" @submit.prevent="handleSubmit(onSubmit)">
        <div class="hidden">
          <input
            v-model="formData.nameAlt"
            type="text"
            name="name"
            autocomplete="off"
            class="absolute -top-80 -left-80"
          />
        </div>

        <div class="form-row">
          <div class="form-field">
            <label for="fullName">Full Name</label>
            <ValidationProvider v-slot="{ errors }" rules="alpha_spaces">
              <input
                id="fullName"
                v-model="formData.fullName"
                type="text"
                name="fullName"
                minlength="3"
                autocomplete="name"
                required
              />
              <span v-if="errors[0]" class="form-error"
                ><br />Please provide your full name.</span
              >
            </ValidationProvider>
          </div>

          <div class="form-field">
            <label for="email">Email</label>
            <ValidationProvider v-slot="{ errors }">
              <input
                id="email"
                v-model="formData.email"
                type="email"
                name="email"
                autocomplete="email"
                required
              />
              <span v-if="errors[0]" class="form-error"
                ><br />This doesn't look like a valid email.</span
              >
            </ValidationProvider>
          </div>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label for="phone">Phone</label>
            <ValidationProvider v-slot="{ errors }">
              <input
                id="phone"
                v-model="formData.phone"
                type="tel"
                name="phone"
                minlength="10"
                autocomplete="tel-national"
                required
              />
              <span v-if="errors[0]" class="form-error"
                ><br />Please enter a 10-digit phone number.</span
              >
            </ValidationProvider>
          </div>
          <div class="form-field">
            <label for="company">Company</label>
            <ValidationProvider v-slot="{ errors }">
              <input
                id="company"
                v-model="formData.company"
                type="text"
                name="company"
                minlength="3"
                autocomplete="organization"
                required
              />
              <span v-if="errors[0]" class="form-error"
                ><br />Please enter your full company name.</span
              >
            </ValidationProvider>
          </div>
        </div>

        <div class="form-row">
          <div class="form-field">
            <label for="subject">Subject</label>
            <ValidationProvider v-slot="{ errors }" rules="min:6">
              <select
                id="subject"
                v-model="formData.subject"
                name="subject"
                required
              >
                <option value=""></option>
                <option value="billing">Billing Question</option>
                <option value="change-registration">
                  Change/Cancel a Registration
                </option>
                <option value="request-class">Request a Class</option>
                <option value="other">Other</option>
              </select>
              <span v-if="errors[0]" class="form-error"
                ><br />Please choose a subject.</span
              >
            </ValidationProvider>
          </div>
        </div>
        <div class="my-8">
          <label for="message">Message</label>
          <textarea
            id="message"
            v-model="formData.message"
            name="message"
            cols="30"
            rows="5"
            class="p-4 w-full rounded border border-gray-400 mt-2"
          ></textarea>
        </div>
        <div class="my-4 text-center">
          <p class="text-sm my-4">
            <span v-if="invalid">Please complete form before submitting</span>
            <span v-if="submitError" class="text-red-700">
              <FaIcon :icon="['fas', 'exclamation-circle']" />
              Error Submitting Information
            </span>
          </p>
          <button
            type="submit"
            :disabled="invalid"
            class="
              bg-brand
              text-gray-50
              rounded-full
              px-4
              py-2
              text-center
              hover:bg-red-500
              focus:bg-red-500
              w-40
            "
          >
            <span v-if="!processing">Submit</span>
            <FaIcon
              v-if="processing"
              :icon="['fas', 'spinner']"
              class="fa-spin"
            />
          </button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import {
  required,
  email,
  min,
  alpha_spaces as alphaSpaces,
} from 'vee-validate/dist/rules'

export default {
  name: 'ContactForm',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      formData: {
        fullName: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        nameAlt: '',
      },
      processing: false,
      submitError: false,
    }
  },
  created() {
    extend('required', { ...required })
    extend('email', email)
    extend('min', min)
    extend('alpha_spaces', alphaSpaces)
  },
  methods: {
    onSubmit() {
      this.processing = true
      try {
        this.$axios.$post('/contact', this.formData, {
          headers: { 'Content-Type': 'application/json' },
        })

        this.processing = false
        this.resetForm()
      } catch (err) {
        this.processing = false
        this.submitError = true
      }

      this.$emit('submitted')
    },
    resetForm() {
      this.formData = {
        fullName: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        nameAlt: '',
      }

      this.$nextTick(() => {
        this.$refs.form.reset()
      })
    },
  },
}
</script>
<style scoped>
.form-row {
  @apply flex flex-wrap justify-between;
}
.form-field {
  @apply mt-2 h-28 min-w-full md:min-w-0 lg:min-w-full xl:min-w-0;
  flex-basis: 47%;
}
.form-field input,
.form-field select {
  @apply py-2 px-4 rounded w-full border border-gray-400;
}
.form-field label {
  @apply block my-2;
}
button[disabled] {
  @apply bg-gray-400 cursor-not-allowed;
}
.form-error {
  @apply text-sm text-red-400;
}
</style>
