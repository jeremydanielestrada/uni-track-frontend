import type { Event } from "../../App.types";
import Card from "../ui/Card";
import { Pencil, Trash2 } from "lucide-react";

interface EventListProps {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (eventId: number) => void;
  onSelect: (event: Event) => void;
  selectedEventId?: number;
}

function EventList({
  events,
  onEdit,
  onDelete,
  onSelect,
  selectedEventId,
}: EventListProps) {
  if (events?.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No events yet. Create your first event!
        </p>
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {events?.map((event) => (
          <Card
            key={event.id}
            className={`p-4 border rounded-lg relative cursor-pointer transition-all ${
              selectedEventId === event.id
                ? "border-primary bg-primary/5 shadow-md"
                : "border-secondary hover:border-primary/50"
            }`}
            onClick={() => onSelect(event)}
          >
            <div className="absolute top-3 right-3 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(event);
                }}
                className="p-1.5 hover:bg-blue-100 rounded-md transition-colors"
                title="Edit event"
              >
                <Pencil className="h-4 w-4 text-blue-600" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(event.id);
                }}
                className="p-1.5 hover:bg-red-100 rounded-md transition-colors"
                title="Delete event"
              >
                <Trash2 className="h-4 w-4 text-red-600" />
              </button>
            </div>
            <h4 className="font-semibold text-foreground mb-2 pr-16">
              {event.name}
            </h4>
            <p className="text-sm text-muted-foreground mb-2">
              📅 {event.date}
            </p>
            <p className="text-sm text-muted-foreground">
              👥 {event.students?.length ?? 0} Students
            </p>
            {selectedEventId === event.id && (
              <div className="mt-2 pt-2 border-t border-primary/20">
                <span className="text-xs font-medium text-primary">
                  ✓ Selected
                </span>
              </div>
            )}
          </Card>
        ))}
      </div>
    );
  }
}

export default EventList;
