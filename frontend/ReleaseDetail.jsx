import { useState } from "react";
import axios from "axios";

const STEPS = [
  "PR merged",
  "Changelog updated",
  "Tests passing",
  "Github release created",
  "Deployed to demo",
  "Tested in demo",
  "Production deploy",
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
    <div style={{ padding: 40 }}>
      <button onClick={onBack}>← Back</button>

      <h2>Release Detail</h2>

      <input
        placeholder="Name"
        value={data.name || ""}
        onChange={(e) => setData({ ...data, name: e.target.value })}
      />

      <br />

      <input
        type="datetime-local"
        value={data.date ? data.date.slice(0, 16) : ""}
        onChange={(e) =>
          setData({ ...data, date: e.target.value })
        }
      />

      <h3>Steps</h3>

      {STEPS.map((s, i) => (
        <label key={i}>
          <input
            type="checkbox"
            checked={data.steps?.[i] || false}
            onChange={() => toggleStep(i)}
          />
          {s}
          <br />
        </label>
      ))}

      <h3>Notes</h3>

      <textarea
        value={data.additionalInfo || ""}
        onChange={(e) =>
          setData({ ...data, additionalInfo: e.target.value })
        }
      />

      <br />

      <button onClick={save}>Save</button>
    </div>
  );
}