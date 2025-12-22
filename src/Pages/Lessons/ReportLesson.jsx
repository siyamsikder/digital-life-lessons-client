import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";

const ReportLesson = ({ lesson, close }) => {
  const { user } = useAuth();

  const handleReport = async (e) => {
    e.preventDefault();
    const form = e.target;

    const reportInfo = {
      lessonId: lesson._id,
      lessonTitle: lesson.title,
      reportedBy: {
        name: user?.displayName,
        email: user?.email,
      },
      reason: form.reason.value,
      details: form.details.value,
    };

    await axios.post(
      `${import.meta.env.VITE_API_URL}/reports`,
      reportInfo
    );

    Swal.fire({
      icon: "success",
      title: "Report Submitted 🚨",
      text: "Thank you for helping us keep the community safe.",
      confirmButtonColor: "#ED8B00",
    });

    close();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleReport}
        className="bg-base p-6 rounded-lg w-full max-w-md">
        
        <h2 className="text-xl font-bold mb-4">Report Lesson</h2>

        <select
          name="reason"
          required
          className="w-full mb-3 p-2 border rounded">
          <option value="">Select reason</option>
          <option>Spam</option>
          <option>Hate Speech</option>
          <option>Misleading Content</option>
          <option>Inappropriate</option>
        </select>

        <textarea
          name="details"
          placeholder="Explain briefly (optional)"
          className="w-full p-2 border rounded mb-4"
          rows={3}
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={close}
            className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportLesson;
