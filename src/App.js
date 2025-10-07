import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Optional for styling
import config from "./config";

function App() {
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [gender, setGender] = useState("");
  const [skills, setSkills] = useState([]); // skills as array of strings
  const [message, setMessage] = useState(null);

  const API = config.API_URL;

  // Define skill options
  const skillOptions = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "CSS",
    "HTML",
    "MongoDB"
  ];

  // Handle checkbox toggle
  const handleSkillChange = (skill) => {
    setSkills(prevSkills => {
      if (prevSkills.includes(skill)) {
        // Remove skill if already checked
        return prevSkills.filter(s => s !== skill);
      } else {
        // Add skill if checked
        return [...prevSkills, skill];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!name.trim() || !rollNo.trim() || !gender.trim()) {
      setMessage({ type: "danger", text: "Name, Roll Number, and Gender are required." });
      return;
    }

    try {
      const res = await fetch(`${API}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, rollNo, gender, skills })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");

      setMessage({ type: "success", text: "Saved successfully" });

      // Reset form
      setName("");
      setRollNo("");
      setGender("");
      setSkills([]);
    } catch (err) {
      console.error(err);
      setMessage({ type: "danger", text: err.message });
    }
  };

  return (
    <div className="container py-4">
      <div className="card mx-auto" style={{ maxWidth: 500 }}>
        <div className="card-body">
          <h4 className="card-title mb-3">User Entry Form</h4>

          {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Roll Number"
                value={rollNo}
                onChange={e => setRollNo(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Gender</label>
              <div>
                {['Male', 'Female', 'Other'].map((g) => (
                  <div className="form-check form-check-inline" key={g}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id={`gender-${g}`}
                      value={g}
                      checked={gender === g}
                      onChange={e => setGender(e.target.value)}
                      required
                    />
                    <label className="form-check-label" htmlFor={`gender-${g}`}>
                      {g}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Skills</label>
              <div>
                {skillOptions.map(skill => (
                  <div className="form-check form-check-inline" key={skill}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`skill-${skill}`}
                      value={skill}
                      checked={skills.includes(skill)}
                      onChange={() => handleSkillChange(skill)}
                    />
                    <label className="form-check-label" htmlFor={`skill-${skill}`}>
                      {skill}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="btn btn-primary">Save</button>
          </form>

          <div className="mt-3 text-muted text-center">
            All rights reserved &#xA9; 2025 CBIT-IT @kgr.
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
