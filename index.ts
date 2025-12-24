import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yaml';
import fs from 'fs';

const app = express();
const swaggerFile = fs.readFileSync('./spec.yml', 'utf-8');
const swaggerDoc = YAML.parse(swaggerFile);

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve);
app.use('/api-docs', swaggerUi.setup(swaggerDoc));

app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json('Username and password are required');
  }

  res.status(200).json('Signed up');
});

app.post('/signin', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json('Username and password are required');
  }

  res.status(200).send({ token: 'dummy-token' });
});

app.get('/todos', (req, res) => {
  res.status(200).send([
    { id: 1, title: 'Sample Todo 1' },
    { id: 2, title: 'Sample Todo 2' },
  ]);
});

app.post('/todo/:id', (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json('Title is required');
  }
  res.status(200).json('Todo created');
});

app.listen(8080);
