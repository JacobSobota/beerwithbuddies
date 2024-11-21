<template>
  <div class="max-w-4xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Create New Poll</h1>

    <form @submit.prevent="createPoll" class="space-y-6">
      <div>
        <label class="block mb-2">Poll Title</label>
        <input
          v-model="title"
          type="text"
          class="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label class="block mb-2">Select Dates</label>
        <VCalendarDatePicker
          v-if="date && (date as DatePickerRangeObject)?.start && (date as DatePickerRangeObject)?.end"
          v-model.range="date"
          :columns="2"
          v-bind="{ ...attrs, ...$attrs }"
          @dayclick="onDayClick"
        />
        <VCalendarDatePicker
          v-else
          v-model="date"
          v-bind="{ ...attrs, ...$attrs }"
          @dayclick="onDayClick"
        />
      </div>

      <div>
        <label class="block mb-2">Participants (comma-separated emails)</label>
        <textarea
          v-model="participants"
          class="w-full p-2 border rounded"
          rows="3"
        ></textarea>
      </div>

      <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? "Creating..." : "Create Poll" }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { usePollsStore } from "@/stores/polls";
import { DatePicker as VCalendarDatePicker } from 'v-calendar'
// @ts-ignore
import type { DatePickerDate, DatePickerRangeObject } from 'v-calendar/dist/types/src/use/datePicker'
import 'v-calendar/dist/style.css'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  modelValue: {
    type: [Date, Object] as PropType<DatePickerDate | DatePickerRangeObject | null>,
    default: null
  }
})

const emit = defineEmits(['update:model-value', 'close'])

const date = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:model-value', value)
    emit('close')
  }
})

const attrs = {
  'transparent': true,
  'borderless': true,
  'color': 'primary',
  'first-day-of-week': 2
}

function onDayClick(_: any, event: MouseEvent): void {
  const target = event.target as HTMLElement
  target.blur()
}

const title = ref("");
const selectedDates = ref([]);
const participants = ref("");
const isSubmitting = ref(false);

const pollsStore = usePollsStore();

const createPoll = async () => {
  try {
    isSubmitting.value = true;
    const pollData = {
      title: title.value,
      dates: selectedDates.value.map((date) => ({
        date,
        availableUsers: [],
      })),
      participants: participants.value.split(",").map((email) => email.trim()),
      status: "publish",
    };

    await pollsStore.createPoll(pollData);
    navigateTo("/polls");
  } catch (error) {
    console.error("Failed to create poll:", error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style>
:root {
  --vc-gray-50: rgb(var(--color-gray-50));
  --vc-gray-100: rgb(var(--color-gray-100));
  --vc-gray-200: rgb(var(--color-gray-200));
  --vc-gray-300: rgb(var(--color-gray-300));
  --vc-gray-400: rgb(var(--color-gray-400));
  --vc-gray-500: rgb(var(--color-gray-500));
  --vc-gray-600: rgb(var(--color-gray-600));
  --vc-gray-700: rgb(var(--color-gray-700));
  --vc-gray-800: rgb(var(--color-gray-800));
  --vc-gray-900: rgb(var(--color-gray-900));
}

.vc-primary {
  --vc-accent-50: rgb(var(--color-primary-50));
  --vc-accent-100: rgb(var(--color-primary-100));
  --vc-accent-200: rgb(var(--color-primary-200));
  --vc-accent-300: rgb(var(--color-primary-300));
  --vc-accent-400: rgb(var(--color-primary-400));
  --vc-accent-500: rgb(var(--color-primary-500));
  --vc-accent-600: rgb(var(--color-primary-600));
  --vc-accent-700: rgb(var(--color-primary-700));
  --vc-accent-800: rgb(var(--color-primary-800));
  --vc-accent-900: rgb(var(--color-primary-900));
}
</style>