<template>
  <div class="w-full h-full bg-gray-200 p-4">
    <h2 class="text-brand text-2xl">Register</h2>
    <form
      :action="`/events/${eventId}/registration-success/`"
      name="event-registration"
      method="POST"
      data-netlify="true"
      netlify-honeypot="email"
    >
      <input type="hidden" name="form-name" value="event-registration" />
      <input type="text" name="email" class="absolute -top-80 -left-80" />

      <input type="hidden" name="eventId" :value="eventId" />
      <div class="form-field">
        <label for="fullName">Full Name</label>
        <input
          id="fullName"
          v-model="formData.fullName"
          type="text"
          name="fullName"
        />
      </div>

      <div class="form-field">
        <label for="email2">Email</label>
        <input
          id="email2"
          v-model="formData.email"
          type="email"
          name="email2"
        />
      </div>

      <div class="form-field">
        <label for="phone">Phone</label>
        <input id="phone" v-model="formData.phone" type="tel" name="phone" />
      </div>

      <div class="form-field">
        <label for="company">Company</label>
        <input
          id="company"
          v-model="formData.company"
          type="text"
          name="company"
        />
      </div>

      <div class="form-field">
        <label for="billing">Billing Preference</label>
        <select id="billing" v-model="formData.billing" name="billing">
          <option value=""></option>
          <option value="bill-account">Bill my Account</option>
          <option value="cash-check">Cash or Check</option>
        </select>
      </div>
      <div class="my-4">
        <label for="commments">Comments</label>
        <textarea
          id="comments"
          name="comments"
          cols="30"
          rows="5"
          class="w-full"
        ></textarea>
      </div>
      <div class="my-4 text-center">
        <input
          type="submit"
          value="Register"
          class="bg-brand text-gray-50 rounded-full px-4 py-2 text-center"
        />
      </div>
      <p class="text-sm text-gray-700 sm:px-8">
        By registering, you agree to pay ${{ stdPrice }}
        {{ dealerPrice ? `(or $${dealerPrice} if you are a DS dealer)` : '' }}
        via the method you selected. Cash or check payments are due before class
        begins. Attendees will be required to sign a liability waiver before
        class begins.
      </p>
    </form>
  </div>
</template>
<script>
export default {
  name: 'RegistrationForm',
  props: {
    eventId: {
      type: String,
      required: true,
    },
    stdPrice: {
      type: Number,
      required: true,
    },
    dealerPrice: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      formData: {
        fullName: '',
        email: '',
        phone: '',
        company: '',
        billing: '',
        comments: '',
        eventId: '',
      },
    }
  },
}
</script>
<style scoped>
.form-field {
  @apply flex justify-between items-center my-4;
}
</style>
