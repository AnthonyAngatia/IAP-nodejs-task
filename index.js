const express = require("express");
const app = express();

app.use(express.json());

const students = [
  { id: 1, name: "Student 1", course: "ICS" },
  { id: 2, name: "Anthony", course: "ICS" },
  { id: 3, name: "Angatia ", course: "ICS" },
  { id: 4, name: "Ominde ", course: "ICS" },
  { id: 5, name: "Student", course: "ICS" },
];

app.get("/", (req, res) => {
  res.send("Testing Api connection. It works");
});

app.get("/api/v1/students", (req, res) => {
  res.send(students);
});

app.get("/api/v1/student/:id", (req, res) => {
  const student = students.find((c) => c.id === parseInt(req.params.id));
  if (!student)
    return res.status(404).send("No student exists with th given ID");
  res.send(student);
});

app.put("/api/v1/student/:id", (req, res) => {
  const student = students.find((c) => c.id === parseInt(req.params.id));
  if (!student)
    return res.status(404).send("No student exists with th given ID");
  student.name = req.body.name;
  student.course = req.body.course;

  res.send(student);
});

app.post("/api/v1/students", (req, res) => {
  const student = {
    id: students.length + 1,
    name: req.body.name,
    course: req.body.course,
  };
  students.push(student);
  res.send(student);
});

app.delete("/api/v1/student/:id", (req, res) => {
  const student = students.find((c) => c.id === parseInt(req.params.id));

  if (!student)
    return res.status(404).send("No student exists with th given ID");
  const index = students.indexOf(student);
  students.splice(index, 1);
  res.send(student);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listen on port ${port}...`));
