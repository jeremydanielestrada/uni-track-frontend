/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import type { Event } from "../../App.types";
import Card from "../ui/Card";
import { api } from "../../utils/Axios";
import { Loader } from "lucide-react";

function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMesssage, setErrorMessage] = useState("");

  useEffect(() => {
    const getEventsFromDb = async () => {
      const res = await api.get("/events/get");
      setIsLoading(true);

      try {
        setEvents(res.data.events);
      } catch (error: any) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getEventsFromDb();
  }, []);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (errorMesssage) {
    return (
      <div className="flex items-center justify-center h-96">
        <h2 className="text-lg text-red-500">{errorMesssage}</h2>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {events.map((event) => (
        <Card key={event.id} className="p-4 border border-secondary rounded-lg">
          <h4 className="font-semibold text-foreground mb-2">{event.name}</h4>
          <p className="text-sm text-muted-foreground mb-2">📅 {event.date}</p>
          <p className="text-sm text-muted-foreground">
            👥 {event.students?.length ?? 0} Students
          </p>
        </Card>
      ))}
    </div>
  );
}

export default EventList;
