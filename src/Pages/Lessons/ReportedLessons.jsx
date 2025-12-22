import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const ReportedLessons = () => {
  const [selectedLesson, setSelectedLesson] = useState(null);

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reports"],
    queryFn: async () =>
      (await axios.get(`${import.meta.env.VITE_API_URL}/reports`)).data,
  });

  const grouped = useMemo(() => {
    const map = {};
    data.forEach((r) => {
      if (!map[r.lessonId]) {
        map[r.lessonId] = {
          lessonId: r.lessonId,
          lessonTitle: r.lessonTitle,
          reports: [],
        };
      }
      map[r.lessonId].reports.push({ ...r, date: r.createdAt });
    });
    return Object.values(map);
  }, [data]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete lesson?",
      text: "This will permanently remove the lesson",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      confirmButtonColor: "#d33",
    });
    if (result.isConfirmed) {
      await axios.delete(`${import.meta.env.VITE_API_URL}/addLesson/${id}`);
      Swal.fire("Deleted!", "Lesson removed.", "success");
      refetch();
    }
  };

  const handleIgnore = async (lessonId) => {
    const result = await Swal.fire({
      title: "Ignore all reports?",
      text: "This will clear all reports for this lesson",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, ignore",
      confirmButtonColor: "#ED8B00",
    });
    if (result.isConfirmed) {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/reports/clear/${lessonId}`
      );
      Swal.fire("Ignored", "Reports cleared", "success");
      refetch();
    }
  };

  if (isLoading) return <p>Loading reported lessons...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">🚩 Reported Lessons</h1>
      <table className="w-full border rounded-lg overflow-hidden">
        <thead className="bg-card">
          <tr>
            <th className="p-3 text-left">Lesson Title</th>
            <th className="p-3 text-center">Reports</th>
            <th className="p-3 text-center">Details</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {grouped.map((lesson) => (
            <tr key={lesson.lessonId} className="border-t border-base">
              <td className="p-3">{lesson.lessonTitle}</td>
              <td className="p-3 text-center font-bold text-red-600">
                {lesson.reports.length}
              </td>
              <td className="p-3 text-center">
                <button
                  onClick={() => setSelectedLesson(lesson)}
                  className="text-primary underline">
                  View
                </button>
              </td>
              <td className="p-3 flex gap-2 justify-center">
                <button
                  onClick={() => handleDelete(lesson.lessonId)}
                  className="px-3 py-1 bg-red-500 text-white rounded">
                  Delete
                </button>
                <button
                  onClick={() => handleIgnore(lesson.lessonId)}
                  className="px-3 py-1 border rounded">
                  Ignore
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedLesson && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-card p-6 rounded-lg w-full max-w-lg max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              Reports – {selectedLesson.lessonTitle}
            </h2>
            <div className="space-y-3">
              {selectedLesson.reports.length > 0 ? (
                selectedLesson.reports.map((r, i) => (
                  <div key={i} className="border p-3 rounded">
                    <p className="font-semibold">{r.reason}</p>
                    <p className="text-sm text-gray-600">{r.details}</p>
                    <p className="text-xs mt-1">
                      👤 {r.reportedBy.name} ({r.reportedBy.email})
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(r.date).toLocaleString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No reports available</p>
              )}
            </div>
            <div className="text-right mt-4">
              <button
                onClick={() => setSelectedLesson(null)}
                className="px-4 py-2 border rounded">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportedLessons;
