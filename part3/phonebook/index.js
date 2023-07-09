// Finish 3.1-3.6
const express = require("express");
const app = express();

app.use(express.json());

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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
