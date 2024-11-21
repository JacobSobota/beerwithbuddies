<template>
  <div class="max-w-4xl mx-auto p-4">
    <h2 class="text-xl font-bold mb-4">Scan Receipt</h2>
    
    <div class="space-y-4">
      <input
        type="file"
        accept="image/*"
        @change="handleImageUpload"
        class="block w-full"
      />

      <div v-if="isProcessing" class="text-center">
        <p>Processing image...</p>
        <div class="loader"></div>
      </div>

      <div v-if="items.length" class="space-y-4">
        <h3 class="font-semibold">Extracted Items:</h3>
        <ul class="space-y-2">
          <li v-for="(item, index) in items" :key="index" class="flex items-center gap-4">
            <span>{{ item.name }} - ${{ item.price }}</span>
            <select
              v-model="item.splitBetween"
              multiple
              class="border p-1 rounded"
            >
              <option v-for="user in participants" :key="user" :value="user">
                {{ user }}
              </option>
            </select>
          </li>
        </ul>

        <button
          @click="saveReceipt"
          class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Save Receipt
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Tesseract from 'tesseract.js'

const items = ref([])
const isProcessing = ref(false)
const participants = ref(['User 1', 'User 2']) // This should come from your poll data

const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  isProcessing.value = true
  try {
    const result = await Tesseract.recognize(file, 'eng')
    // Parse the OCR result and extract items
    items.value = parseReceiptText(result.data.text)
  } catch (error) {
    console.error('OCR failed:', error)
  } finally {
    isProcessing.value = false
  }
}

const parseReceiptText = (text: string) => {
  // Implement receipt parsing logic here
  // This is a placeholder implementation
  return [
    { name: 'Item 1', price: 10.99, splitBetween: [] },
    { name: 'Item 2', price: 15.99, splitBetween: [] }
  ]
}

const saveReceipt = async () => {
  // Implement save logic using WordPress REST API
}
</script>

<style scoped>
.loader {
  /* Add your loader styling */
}
</style>