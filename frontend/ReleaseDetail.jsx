import { useState } from "react";
import axios from "axios";

const STEPS = [
  "All relevant Github pull requests have been merged",
  "CHANGELOG.md files have been updated",
  "All tests are passing",
  "Releases in Github created",
  "Deployed in demo",
  "Tested thoroughly in demo",
  "Deployed in production",
];

export default function ReleaseDetail({ release, onBack }) {
  const [data, setData] = useState(release);

  const toggleStep = async (i) => {
    const updated = [...data.steps];
    updated[i] = !updated[i];
    setData({ ...data, steps: updated });

    if (!data.isNew) {
      await axios.patch(`/releases/${data._id}/steps`, { steps: updated });
    }
  };

  const deleteRelease = async () => {
    if (!data._id) return onBack();
    await axios.delete(`/releases/${data._id}`);
    onBack();
  };

  const save = async () => {
    if (!data.name || !data.date) {
      alert("Name and date required");
      return;
    }

    const payload = {
      name: data.name,
      date: data.date,
      additionalInfo: data.additionalInfo,
      steps: data.steps,
    };

    if (data.isNew) {
      await axios.post("/releases", payload);
    } else {
      await axios.patch(`/releases/${data._id}/info`, {
        additionalInfo: data.additionalInfo,
      });
    }

    onBack();
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
          textAlign: "left",
        }}
      >
        {/* breadcrumb + delete */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <div>
            <a href="#" onClick={onBack}>
              All releases
            </a>{" "}
            {">"} <span>{data.name || "New release"}</span>
          </div>

          {!data.isNew && (
            <button
              onClick={deleteRelease}
              style={{
                background: "#6c63ff",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          )}
        </div>

        {/* name + date */}
        <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
          <div>
            <p>Release</p>
            <input
              value={data.name || ""}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>

          <div>
            <p>Date</p>
            <input
              type="datetime-local"
              value={data.date ? data.date.slice(0, 16) : ""}
              onChange={(e) =>
                setData({ ...data, date: e.target.value })
              }
            />
          </div>
        </div>

        {/* checklist */}
        {STEPS.map((s, i) => (
          <label key={i} style={{ display: "block", marginBottom: 6 }}>
            <input
              type="checkbox"
              checked={data.steps?.[i] || false}
              onChange={() => toggleStep(i)}
            />{" "}
            {s}
          </label>
        ))}

        {/* notes */}
        <div style={{ marginTop: 20 }}>
          <p>Additional remarks / tasks</p>

          <textarea
            rows="5"
            style={{ width: "100%" }}
            placeholder="Please enter any other important notes for the release"
            value={data.additionalInfo || ""}
            onChange={(e) =>
              setData({ ...data, additionalInfo: e.target.value })
            }
          />
        </div>

        {/* save */}
        <div style={{ textAlign: "right", marginTop: 20 }}>
          <button
            onClick={save}
            style={{
              background: "#6c63ff",
              color: "white",
              border: "none",
              padding: "10px 18px",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Save ✓
          </button>
        </div>
      </div>
    </div>
  );
}