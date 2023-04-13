import baseUrl from "@/api/baseUrl";
import type {
  EventTypes,
  AddEventParams,
  UpdateEventParams,
} from "@/types/EventTypes";

class EventsDataService {
  getAllEvents(): Promise<EventTypes[]> {
    return baseUrl.get("/events");
  }

  addEvent(params: AddEventParams): Promise<any> {
    return baseUrl.post("/events", params);
  }

  deleteEvent(id: number): Promise<any> {
    return baseUrl.delete(`/events/${id}`);
  }

  updateEvent(id: number, params: UpdateEventParams): Promise<any> {
    return baseUrl.patch(`/events/${id}`, params);
  }
}

export default new EventsDataService();
