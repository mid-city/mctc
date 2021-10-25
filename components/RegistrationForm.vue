/* eslint-disable camelcase */ /* eslint-disable camelcase */ /* eslint-disable
camelcase */
<template>
  <div>
    <ValidationObserver
      v-slot="{ invalid, handleSubmit }"
      ref="form"
      mode="eager"
    >
      <form id="registrationForm" @submit.prevent="handleSubmit(onSubmit)">
        <div class="hidden">
          <input
            v-model="formData.emailAlt"
            type="text"
            name="email"
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
            <label for="email2">Email</label>
            <ValidationProvider v-slot="{ errors }">
              <input
                id="email2"
                v-model="formData.email"
                type="email"
                name="email2"
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
              <span v-if="errors[0]" class="form-error"
                ><br />Please specify your billing preference.</span
              >
            </ValidationProvider>
          </div>
          <div
            v-if="formData.billingPreference === 'bill-account'"
            class="form-field"
          >
            <label for="cust-po">PO</label>
            <ValidationProvider>
              <input
                id="cust-po"
                v-model="formData.custPo"
                type="text"
                name="custPo"
              />
            </ValidationProvider>
          </div>
        </div>
        <div class="my-8">
          <label for="commments">Comments</label>
          <textarea
            id="comments"
            v-model="formData.comments"
            name="comments"
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
    maxSeats: {
      type: Number,
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
        custPo: '',
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
    resetForm() {
      this.formData = {
        emailAlt: '',
        fullName: '',
        email: '',
        phone: '',
        company: '',
        billingPreference: '',
        custPo: '',
        comments: '',
      }
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
    },
    onSubmit() {
      this.processing = true
      try {
        this.$axios.$post(
          '/registrations',
          {
            eventId: this.eventId,
            location: this.location,
            courseTitle: this.courseTitle,
            price: this.price,
            dealerPrice: this.dealerPrice,
            registrationTime: this.$dayjs().toISOString(),
            maxSeats: this.maxSeats,
            ...this.formData,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        this.processing = false
        this.resetForm()
      } catch (err) {
        this.processing = false
        this.submitError = true
        console.error(err)
      }

      this.$emit('submitted')
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
