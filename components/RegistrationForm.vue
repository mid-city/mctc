/* eslint-disable camelcase */ /* eslint-disable camelcase */ /* eslint-disable
camelcase */
<template>
  <div class="w-full h-full bg-gray-200 p-4">
    <h2 class="text-brand text-2xl">Register</h2>

    <ValidationObserver v-slot="{ invalid, handleSubmit }" mode="eager">
      <form id="registrationForm" @submit.prevent="handleSubmit(onSubmit)">
        <input
          v-model="formData.emailAlt"
          type="text"
          name="email"
          class="absolute -top-80 -left-80"
        />

        <div class="form-field">
          <label for="fullName">Full Name</label>
          <ValidationProvider v-slot="{ errors }" rules="alpha_spaces">
            <input
              id="fullName"
              v-model="formData.fullName"
              type="text"
              name="fullName"
              minlength="3"
              required
            />
            <span class="form-error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-field">
          <label for="email2">Email</label>
          <ValidationProvider v-slot="{ errors }">
            <input
              id="email2"
              v-model="formData.email"
              type="email"
              name="email2"
              required
            />
            <span class="form-error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-field">
          <label for="phone">Phone</label>
          <ValidationProvider v-slot="{ errors }">
            <input
              id="phone"
              v-model="formData.phone"
              type="tel"
              name="phone"
              minlength="10"
              required
            />
            <span class="form-error">{{ errors[0] }}</span>
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
              required
            />
            <span class="form-error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-field">
          <label for="billing">Billing Preference</label>
          <ValidationProvider v-slot="{ errors }" rules="min:6">
            <select
              id="billing"
              v-model="formData.billingPreference"
              name="billingPreference"
              required
            >
              <option value=""></option>
              <option value="bill-account">Bill my Account</option>
              <option value="cash-check">Cash or Check</option>
            </select>
            <span class="form-error">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="my-4">
          <label for="commments">Comments</label>
          <textarea
            id="comments"
            v-model="formData.comments"
            name="comments"
            cols="30"
            rows="5"
            class="w-full"
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
            class="bg-brand text-gray-50 rounded-full px-4 py-2 text-center hover:bg-red-500 focus:bg-red-500 w-40"
          >
            <span v-if="!processing">Register</span>
            <FaIcon
              v-if="processing"
              :icon="['fas', 'spinner']"
              class="fa-spin"
            />
          </button>
        </div>
        <p class="text-sm text-gray-700 sm:px-8">
          By registering, you agree to pay ${{ price }}
          {{ dealerPrice ? `(or $ if you are a DS dealer)` : '' }}
          via the method you selected. Cash or check payments are due before
          class begins. Attendees will be required to sign a liability waiver
          before class begins.
        </p>
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
  name: 'RegistrationForm',

  components: {
    ValidationProvider,
    ValidationObserver,
  },

  props: {
    eventId: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    dealerPrice: {
      type: Number,
      default: null,
    },
    startDate: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    courseTitle: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      formData: {
        emailAlt: '',
        fullName: '',
        email: '',
        phone: '',
        company: '',
        billingPreference: '',
        comments: '',
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
      // http POST to endpoint url.
      this.$axios
        .$post(
          '/registrations/write',
          {
            eventId: this.eventId,
            location: this.location,
            courseTitle: this.courseTitle,
            price: this.price,
            dealerPrice: this.dealerPrice,
            registrationTime: this.$dayjs().toISOString(),
            ...this.formData,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((res) => {
          // console.log(res)
          this.processing = false
          document.getElementById('registrationForm').reset()
        })
        .catch((err) => {
          this.processing = false
          this.submitError = true
          console.error(err)
        })
    },
  },
}
</script>

<style scoped>
.form-field {
  @apply my-8;
}
.form-field input,
.form-field select {
  @apply py-2 px-4;
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
