<script setup>
import { ref } from 'vue'
defineProps({
  msg: String,
})

</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <div class="w-full">
      
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="text-gray-700 text-sm font-bold mb-2 flex items-start" for="email">
            email
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white" id="email" type="text" placeholder="email">
        </div>
        <div class="mb-6">
          <label class="text-gray-700 text-sm font-bold mb-2 flex items-start" for="passwd">
            passwd
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white" id="passwd" type="text" placeholder="password">
        </div>
        <div class="flex items-center justify-around">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Login
          </button>
          <div v-if="isGuessCanRegister">
            <button class="bg-white bg-blue text-blue-500 font-bold py-2 px-4 rounded" type="button">
              Register
            </button>
          </div>
        </div>
      </form>
      <p class="text-center text-gray-500 text-xs">
        &copy;2020 Acme Corp. All rights reserved.
      </p>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>


<script>
import { GrowthBook } from "@growthbook/growthbook"
import { ref } from 'vue'

// Create a GrowthBook instance
const gb = new GrowthBook({
  apiHost: "http://localhost:3001",
  clientKey: "sdk-yIQGbXEDvB0WCnZs",
  attributes: {
    homeClub: "PIK",
  },
});

// Wait for features to be available
await gb.loadFeatures({ autoRefresh: true });

// Get flag
const msg = gb.getFeatureValue("web-headline")
const isGuessCanRegister = gb.getFeatureValue("web-can_register")


</script>