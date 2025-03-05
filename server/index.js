import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

import Chance from "chance";
const chance = new Chance();

const animals = [...Array(250).keys()].map((id) => {
  return {
    id,
    name: chance.first(),
    type: chance.animal({ type: "zoo" }),
    age: chance.age(),
  };
});

app.get("", (req, res) => {
  const q = req.query.q?.toLowerCase() || "";
  //   const results = animals.filter((animal) => animal.name === q);
  const results = animals.filter((animal) =>
    animal.type.toLowerCase().includes(q)
  );
  res.send(results);
});

app.listen(8080, () => console.log("Listening on port http://localhost:8080"));
