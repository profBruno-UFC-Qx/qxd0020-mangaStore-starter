import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Message, Status } from '../types'

export const useNotificationStore = defineStore('message', () => {

  const messages = ref([] as Message[])

  function addMessage(content: string, status: Status) {
    messages.value.unshift({
      id: messages.value.length == 0 ? 1 : messages.value[messages.value.length - 1].id++,
      content,
      status
    })
  }

  function add(content: string) {
    addMessage(content, Status.SUCCESS)
  }


  function error(content: string) {
    addMessage(content, Status.ERROR)
  }

  function dismiss(id: number) {
    messages.value.splice(messages.value.findIndex(item => item.id == id), 1)
  }

  return { messages, add, error, dismiss}

})