import { useState } from "react";

type Subject = {
  id: number;
  name: string;
  grade: string;
};

const gradePoints: Record<string, number> = {
  A: 4.0,
  "B+": 3.5,
  B: 3.0,
  "C+": 2.5,
  C: 2.0,
  "D+": 1.5,
  D: 1.0,
  F: 0,
  W: NaN, // W ไม่เอามาคำนวณ
};

export default function GPAComponent() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subjectName, setSubjectName] = useState("");
  const [grade, setGrade] = useState("A");
  const [gpa, setGpa] = useState<number | null>(null);

  const addSubject = () => {
    if (!subjectName.trim()) return;
    setSubjects((prev) => [
      ...prev,
      { id: Date.now(), name: subjectName.trim(), grade },
    ]);
    setSubjectName("");
    setGrade("A");
  };

  const removeSubject = (id: number) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  const calculateGPA = () => {
    const valid = subjects.filter((s) => s.grade !== "W");
    if (valid.length === 0) {
      setGpa(0);
      return;
    }
    const total = valid.reduce((sum, s) => sum + (gradePoints[s.grade] ?? 0), 0);
    setGpa(total / valid.length);
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-xl shadow-md bg-white space-y-4">
      <h1 className="text-xl font-bold text-center">GPA Calculator</h1>

      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="ชื่อวิชา"
          className="border p-2 rounded"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        >
          {Object.keys(gradePoints).map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <button
          onClick={addSubject}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          ➕ เพิ่มรายวิชา
        </button>
      </div>

      <div>
        <h2 className="font-semibold mb-2">📋 รายวิชา</h2>
        {subjects.length === 0 && (
          <p className="text-gray-500">ยังไม่มีรายวิชา</p>
        )}
        <ul className="space-y-1">
          {subjects.map((s) => (
            <li
              key={s.id}
              className="flex justify-between items-center border-b pb-1"
            >
              <span
                className={`${
                  s.grade === "F" ? "text-red-500 font-bold" : "text-gray-800"
                }`}
              >
                {s.name} ({s.grade})
              </span>
              <button
                onClick={() => removeSubject(s.id)}
                className="text-sm bg-red-400 text-white px-2 py-1 rounded hover:bg-red-500"
              >
                ลบ
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={calculateGPA}
        className="bg-green-500 text-white p-2 w-full rounded hover:bg-green-600"
      >
        ✅ คำนวณ GPA
      </button>

      {gpa !== null && (
        <div className="text-center text-lg font-bold">
          GPA: {gpa.toFixed(2)}
        </div>
      )}
    </div>
  );
}