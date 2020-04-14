const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const newRepository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };
  repositories.push(newRepository);

  return response.json(newRepository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const index = repositories.findIndex((repository) => repository.id === id);
  if (index < 0) {
    return response.status(400).json({ message: "Repository not found" });
  }

  const updatedRepository = { ...repositories[index], title, url, techs };
  repositories[index] = updatedRepository;

  return response.json(updatedRepository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex((repository) => repository.id === id);
  if (index < 0) {
    return response.status(400).json({ message: "Repository not found" });
  }
  repositories.splice(index, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex((repository) => repository.id === id);
  if (index < 0) {
    return response.status(400).json({ message: "Repository not found" });
  }
  let updatedRepository = repositories[index];
  updatedRepository.likes = updatedRepository.likes + 1;

  return response.json(updatedRepository);
});

module.exports = app;
