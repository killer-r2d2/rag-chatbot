<template>
  <div class="max-w-2xl mx-auto">
    <div class="bg-white rounded-lg shadow-md p-6 mb-4 min-h-[300px] max-h-[500px] overflow-y-auto">
      <div v-if="messages.length === 0" class="text-gray-500 text-center py-8">
        Stellen Sie eine Frage über unser Unternehmen!
      </div>
      <div v-else>
        <div v-for="(message, index) in messages" :key="index" class="mb-4">
          <div :class="[
            'p-3 rounded-lg max-w-[80%]',
            message.role === 'user' 
              ? 'bg-blue-100 ml-auto' 
              : 'bg-gray-100'
          ]">
            {{ message.content }}
          </div>
        </div>
      </div>
    </div>

    <form @submit.prevent="sendMessage" class="flex gap-2">
      <input
        v-model="userInput"
        type="text"
        placeholder="Ihre Frage..."
        class="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        :disabled="isLoading"
      />
      <button
        type="submit"
        class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
        :disabled="isLoading || !userInput.trim()"
      >
        {{ isLoading ? 'Sendet...' : 'Senden' }}
      </button>
    </form>
  </div>
</template>

<script setup>
const userInput = ref('')
const messages = ref([])
const isLoading = ref(false)

async function sendMessage() {
  if (!userInput.value.trim() || isLoading.value) return

  const question = userInput.value
  messages.value.push({ role: 'user', content: question })
  userInput.value = ''
  isLoading.value = true

  try {
    const response = await $fetch('/api/chat', {
      method: 'POST',
      body: { question }
    })

    messages.value.push({ role: 'assistant', content: response.answer })
  } catch (error) {
    messages.value.push({
      role: 'assistant',
      content: 'Entschuldigung, es gab einen Fehler bei der Verarbeitung Ihrer Anfrage.'
    })
  } finally {
    isLoading.value = false
  }
}
</script>