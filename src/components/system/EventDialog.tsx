/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Card from "../ui/Card";
import type { Event } from "../../App.types";
import { Input } from "../ui/Input";
import { formActionDefault } from "../../utils/Helpers";
import { Button } from "../ui/Button";
import { Loader, X } from "lucide-react";
import { api } from "../../utils/Axios";

interface DialogProps {
  isDialogVisible: boolean;
  onClose: () => void;
  eventData: Event | null;
  onEventSaved: () => void;
}

type EventForm = Pick<Event, "name" | "date">;

const formDataDefault = {
  name: "",
  date: "",
};
function EventDialog({
  isDialogVisible,
  eventData,
  onClose,
  onEventSaved,
}: DialogProps) {
  const [formData, setFormData] = useState<EventForm>(formDataDefault);
  const [formAction, setFormAction] = useState(formActionDefault);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  useEffect(() => {
    if (eventData) {
      setIsUpdate(true);
      setFormData({
        name: eventData.name,
        date: eventData.date,
      });
    } else {
      setFormData(formDataDefault);
      setIsUpdate(false);
    }
  }, [eventData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormAction({ ...formAction, formProcess: true });

    try {
      const res = isUpdate
        ? await api.put(`/events/update/${eventData!.id}`, formData)
        : await api.post("/events/create", formData);

      setFormAction({
        formProcess: false,
        formErrorMessage: "",
        formSuccessMessage: res.data?.message || "Event saved successfully!",
      });
      setFormData(formDataDefault);

      // Call the callback to refresh events list
      setTimeout(() => {
        onEventSaved();
      }, 500);
    } catch (error: any) {
      setFormAction({
        formProcess: false,
        formErrorMessage: error.response?.data?.message || "Error saving event",
        formSuccessMessage: "",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <>
      {isDialogVisible && (
        <div className="fixed inset-0 bg-black/15  flex items-center justify-center z-100">
          <Card
            className=" w-90  md:w-100 bg-background p-4 relative"
            onClick={(e: any) => e.stopPropagation()}
          >
            <span className="absolute right-0 top-1 ">
              <X
                size={30}
                onClick={onClose}
                className="text-red-500 cursor-pointer hover:text-red-700"
              />
            </span>
            <form onSubmit={handleSubmit}>
              {formAction.formErrorMessage && (
                <p className="text-center mb-3 text-sm font-semibold text-red-500">
                  {formAction.formErrorMessage}
                </p>
              )}
              {formAction.formSuccessMessage && (
                <p className="text-center mb-3 text-sm font-semibold text-green-500">
                  {formAction.formSuccessMessage}
                </p>
              )}
              <Input
                type="text"
                label="Event"
                name="name"
                placeholder="Enter event name"
                value={formData.name}
                onChange={handleChange}
              />
              <Input
                type="date"
                label="Date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />

              <Button
                type="submit"
                className={`mt-4 w-full rounded-md ${formAction.formProcess ? "opacity-70 cursor-not-allowed" : ""}`}
                size="sm"
                disabled={formAction.formProcess}
              >
                {formAction.formProcess ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `${isUpdate ? "Update Event" : "Create Event"}`
                )}
              </Button>
            </form>
          </Card>
        </div>
      )}
    </>
  );
}

export default EventDialog;
