<script setup>
import { ref } from 'vue';
import axios from 'axios';

const longUrl = ref('');
const shortCode = ref('');
const shortUrl = ref('');
const isLoading = ref(false);
const error = ref(null);
const success = ref(false);

const handleShorten = async () => {
  error.value = null;
  success.value = false;
  shortUrl.value = '';

  if (!longUrl.value.startsWith('http')) {
    error.value = 'URL must start with http:// or https://';
    return;
  }

  isLoading.value = true;

  try {
    const response = await axios.post('/api/shorten', {
      url: longUrl.value,
    });

    shortCode.value = response.data.shortCode;
    shortUrl.value = response.data.shortUrl;
    success.value = true;

  } catch (err) {
    console.error(err);
    error.value = 'Error shortening URL. Please check the backend log.';
  } finally {
    isLoading.value = false;
  }
};

const copyToClipboard = () => {
  navigator.clipboard.writeText(shortUrl.value);
  alert('Short URL copied to clipboard!');
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-col items-center justify-center p-4">

    <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl transform transition-transform duration-300 ease-in-out">

      <h1 class="text-4xl font-extrabold text-center text-gray-800 mb-4">
        🔗 LinkShrink
      </h1>
      <p class="text-center text-gray-500 mb-8 text-lg">
        Fast & Simple URL Shortener
      </p>

      <form @submit.prevent="handleShorten" class="flex flex-col space-y-5">
        <input
            v-model="longUrl"
            type="url"
            required
            placeholder="Enter your long URL here (e.g., https://www.example.com/very/long/path)"
            :disabled="isLoading"
            class="p-4 border-2 border-gray-300 rounded-lg text-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-200 disabled:bg-gray-50"
        />

        <button
            type="submit"
            :disabled="isLoading"
            class="p-4 text-white text-xl font-bold rounded-lg bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 transition duration-300 disabled:bg-gray-400 disabled:from-gray-400 disabled:to-gray-500 flex items-center justify-center"
        >
          <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isLoading ? 'Shrinking Link...' : 'Shrink Link' }}
        </button>
      </form>

      <div v-if="error" class="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm text-center font-medium">
        {{ error }}
      </div>

      <div v-if="shortUrl" class="mt-8">
        <h2 class="text-xl font-semibold mb-3 text-gray-700">Your Shrunken Link:</h2>

        <div class="flex items-center space-x-3 bg-indigo-50 p-4 rounded-lg border border-indigo-200">
          <a :href="shortUrl" target="_blank" class="text-indigo-600 truncate flex-grow hover:underline text-lg font-medium">
            {{ shortUrl }}
          </a>

          <button
              @click="copyToClipboard"
              class="p-3 text-base font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition duration-200 shadow-md flex-shrink-0"
              aria-label="Copy to clipboard"
          >
            Copy
          </button>
        </div>
      </div>

      <div v-if="shortCode" class="mt-6 border-t pt-5 text-center">
        <p class="text-sm text-gray-500 mb-2">
          Test the redirect or view backend details:
        </p>
        <a :href="'http://localhost:3000/' + shortCode" target="_blank" class="text-base text-purple-600 hover:text-purple-700 font-medium hover:underline">
          Go to {{ shortCode }} (Redirect)
        </a>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Scoped styles ensure Tailwind classes are used correctly */
/* No custom CSS needed */
</style>