// Finish 3.1-3.8
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("build"));

morgan.token("body", (req, res) => {
  return req.method === "POST" ? JSON.stringify(req.body) : "";
});

app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens.body(req, res),
    ].join("  ");
  })
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = () => Math.floor(Math.random() * 100000 + 1);

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const responseText = `<p>Phonebook has info for ${persons.length} people </p>
  
  <p>${new Date()}</p>
  `;
  res.send(responseText);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);

  const findbyid = persons.find((person) => person.id === id);

  if (findbyid) {
    res.json(findbyid);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const deletebyid = persons.filter((person) => person.id !== id);

  res.status(204).end();
});
//nếu muốn delete backend chạy được thì tùy ý thêm cái này thời điểm chưa cần thêm bài 3.11
// app.delete("/api/persons/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const deleteIndex = persons.findIndex((person) => person.id === id);

//   if (deleteIndex === -1) {
//     // If the person with the given ID doesn't exist
//     return res.status(404).json({ error: "Person not found" });
//   }

//   // Remove the person with the given ID from the array
//   persons.splice(deleteIndex, 1);

//   // Respond with a success message
//   res.json({ message: "Person deleted successfully" });
// });
app.post("/api/persons", (req, res) => {
  const id = generateId();
  if (!req.body.name || !req.body.number) {
    return res.status(400).json({
      error: "name or number is missing",
    });
  }
  const foundPerson = persons.find((person) => person.name === req.body.name);
  if (foundPerson) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }
  const addPerson = { id, name: req.body.name, number: req.body.number };
  persons = persons.concat(addPerson);
  res.json(addPerson);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
