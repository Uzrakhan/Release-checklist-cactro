import axios from "axios";
import { Eye, Trash2 } from "lucide-react";

const getStatus = (steps) => {
  if (steps.every((s) => !s)) return "Planned";
  if (steps.every((s) => s)) return "Done";
  return "Ongoing";
};

export default function ReleaseList({ releases, onSelect, refresh }) {
  const createNew = () => {
    onSelect({
      name: "",
      date: "",
      additionalInfo: "",
      steps: [false, false, false, false, false, false, false],
      isNew: true,
    });
  };

  const deleteRelease = async (id) => {
    await axios.delete(`/releases/${id}`);
    refresh();
  };

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>ReleaseCheck</h1>
      <p style={{ color: "#666" }}>Your all-in-one release checklist tool</p>

      <div
        style={{
          margin: "40px auto",
          width: "800px",
          border: "1px solid #ccc",
          borderRadius: 6,
          padding: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 15,
          }}
        >
          <a href="#">All releases</a>

          <button
            onClick={createNew}
            style={{
              background: "#6c63ff",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            New release +
          </button>
        </div>

        <table width="100%" border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Release</th>
              <th>Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {releases.map((r) => (
              <tr key={r._id}>
                <td>{r.name}</td>
                <td>{new Date(r.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}</td>
                <td
                    style={{
                        color:
                        getStatus(r.steps) === "Done"
                            ? "green"
                            : getStatus(r.steps) === "Ongoing"
                            ? "orange"
                            : "gray",
                        fontWeight: 600,
                    }}
                >
                    {getStatus(r.steps)}
                </td>

                <td>
                  <button
                        onClick={() => onSelect(r)}
                        style={{ border: "none", background: "transparent", cursor: "pointer" }}
                    >
                        <Eye size={18} />
                    </button>

                    <button
                        onClick={() => deleteRelease(r._id)}
                        style={{ border: "none", background: "transparent", cursor: "pointer" }}
                    >
                        <Trash2 size={18} />
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}