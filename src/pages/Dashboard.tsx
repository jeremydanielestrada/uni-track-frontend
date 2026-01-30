import Card from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useState } from "react";
import EventDialog from "../components/system/EventDialog";
import EventList from "../components/system/EventList";
import type { Event } from "../App.types";

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogVisible, setisDialogVisible] = useState(false);
  const [eventData, setEventData] = useState<Event | null>(null);
  // const [uploadMessage, setUploadMessage] = useState("");
  const events = [
    { id: 1, name: "Programming Workshop", date: "22 Jan 2025", students: 6 },
    { id: 2, name: "Leadership Summit", date: "20 Jan 2025", students: 8 },
    { id: 3, name: "Career Fair", date: "15 Jan 2025", students: 7 },
  ];

  const students = [
    { id: "STU001", name: "Juan Dela Cruz", hours: 24.5 },
    { id: "STU002", name: "Maria Santos", hours: 18.75 },
    { id: "STU003", name: "Pedro Reyes", hours: 32.0 },
    { id: "STU004", name: "Ana Garcia", hours: 15.25 },
    { id: "STU005", name: "Carlos Lopez", hours: 28.5 },
    { id: "STU006", name: "Isabella Martinez", hours: 21.0 },
    { id: "STU007", name: "Diego Morales", hours: 35.75 },
    { id: "STU008", name: "Sofia Nguyen", hours: 19.5 },
  ];

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Title */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Student Attendance Dashboard
        </h2>
        <p className="text-muted-foreground">
          Track student rendered hours and manage events
        </p>
      </div>

      {/* Events Section */}
      <Card className="p-6 shadow-md mb-8 rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-foreground">Events</h3>
          <Button
            className="bg-primary hover:bg-primary/90 text-white rounded-lg"
            size="default"
            onClick={() => setisDialogVisible(!isDialogVisible)}
          >
            + Create Event
          </Button>
        </div>

        <EventList />

        <EventDialog
          isDialogVisible={isDialogVisible}
          onClose={() => setisDialogVisible(!isDialogVisible)}
        />
      </Card>

      {/* Search and File Operations */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium text-foreground mb-2">
            Search Students
          </label>
          <Input
            placeholder="Search by name or student ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <label className="cursor-pointer">
            <input type="file" accept=".csv" className="hidden" />
            <Button
              className="bg-primary hover:bg-primary/90 text-white cursor-pointer rounded-lg"
              size="default"
              onClick={(e) => {
                const input = e.currentTarget.parentElement?.querySelector(
                  'input[type="file"]',
                ) as HTMLInputElement;
                input?.click();
              }}
            >
              📤 Upload CSV
            </Button>
          </label>
          <Button
            className="bg-primary hover:bg-primary/90 text-white rounded-lg"
            size="default"
          >
            📥 Download CSV Report
          </Button>
        </div>
      </div>

      {/* Upload Message */}
      {/* {uploadMessage && (
        <div className="mb-4 p-4 bg-green-100 border border-green-300 text-green-700 rounded-lg text-sm">
          {uploadMessage}
        </div>
      )} */}

      {/* Students Table */}
      <Card className="p-6 shadow-md overflow-x-auto">
        <h3 className="text-lg font-bold text-foreground mb-4">
          Students ({filteredStudents.length})
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-secondary">
                <th className="text-left py-3 px-4 font-semibold text-foreground">
                  Student ID
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">
                  Name
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">
                  Total Hours Rendered
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">
                  Assign Students
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-border hover:bg-secondary/30 transition"
                >
                  <td className="py-3 px-4 text-foreground font-medium">
                    {student.id}
                  </td>
                  <td className="py-3 px-4 text-foreground">{student.name}</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      {student.hours}h
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No students found matching your search.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}

export default Dashboard;
