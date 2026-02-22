import axios from "axios";

const getStatus = (steps) => {
  if (steps.every((s) => !s)) return "planned";
  if (steps.every((s) => s)) return "done";
  return "ongoing";
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
    <div style={{ padding: 40 }}>
      <h1>ReleaseCheck</h1>

      <button onClick={createNew}>New Release</button>

      <table border="1" cellPadding="10" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {releases.map((r) => (
            <tr key={r._id}>
              <td>{r.name}</td>
              <td>{new Date(r.date).toLocaleDateString()}</td>
              <td>{getStatus(r.steps)}</td>

              <td>
                <button onClick={() => onSelect(r)}>View</button>
                <button onClick={() => deleteRelease(r._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}