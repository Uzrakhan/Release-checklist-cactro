import { useEffect, useState } from "react";
import axios from "axios";
import ReleaseList from '../ReleaseList'
import ReleaseDetail from "../ReleaseDetail";

axios.defaults.baseURL = "http://localhost:5000";

export default function App() {
  const [releases, setReleases] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchReleases = async () => {
    const res = await axios.get("/releases");
    setReleases(res.data);
  };

  useEffect(() => {
    fetchReleases();
  }, []);

  if (selected) {
    return (
      <ReleaseDetail
        release={selected}
        onBack={() => {
          setSelected(null);
          fetchReleases();
        }}
      />
    );
  }

  return (
    <ReleaseList
      releases={releases}
      refresh={fetchReleases}
      onSelect={setSelected}
    />
  );
}