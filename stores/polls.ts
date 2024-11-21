import { defineStore } from 'pinia'

interface Poll {
  id: number
  title: string
  dates: Array<{
    date: string
    availableUsers: Array<{
      name: string
      availability: 'yes' | 'no' | 'maybe'
    }>
  }>
  accessToken: string
}

export const usePollsStore = defineStore('polls', {
  state: () => ({
    polls: [] as Poll[],
    currentPoll: null as Poll | null,
  }),
  
  actions: {
    async fetchPoll(id: number) {
      const config = useRuntimeConfig()
      const { data } = await useFetch(`${config.public.wordpressUrl}/wp-json/wp/v2/poll/${id}`)
      this.currentPoll = data.value as Poll
    },
    
    async createPoll(pollData: Omit<Poll, 'id'>) {
      const config = useRuntimeConfig()
      const { data } = await useFetch(`${config.public.wordpressUrl}/wp-json/wp/v2/poll`, {
        method: 'POST',
        body: pollData
      })
      return data.value
    }
  }
})