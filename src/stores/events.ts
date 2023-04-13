import { defineStore, createPinia, setActivePinia } from "pinia";

setActivePinia(createPinia());

import EventsDataService from "@/api/services/EventsDataService";

import type {
  EventTypes,
  AddEventParams,
  UpdateEventParams,
} from "@/types/EventTypes";

export interface EventsState {
  events: EventTypes[];
  loading: boolean;
}

export const useEventsStore = defineStore("events", {
  state: (): EventsState => ({
    events: [],
    loading: false,
  }),

  getters: {
    eventsList: (state) => {
      if (!state.events.length) return [];
      return state.events.map((item) => ({
        ...item,
        statusName: item.status === "completed" ? "Выполнен" : "Новый",
      }));
    },
  },

  actions: {
    async getAllEvents() {
      this.loading = true;

      try {
        const events = await EventsDataService.getAllEvents();
        this.events = events.data;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async addEvent(params: AddEventParams) {
      try {
        await EventsDataService.addEvent(params);
      } catch (error) {
        console.error(error);
      }
    },

    async deleteEvent(id: number) {
      try {
        await EventsDataService.deleteEvent(id);
      } catch (error) {
        console.error(error);
      }
    },

    async updateEvent(id: number, params: UpdateEventParams) {
      try {
        await EventsDataService.updateEvent(id, params);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
