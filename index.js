import "dotenv/config";
import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;

//create a new Tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

// provides all the teas available in the Teas
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

// get a tea with ID

app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  } else {
    return res.status(200).send(tea);
  }
});

// update a tea with ID
app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));

  if (!tea) {
    return res.status(404).send("Tea not found for updating");
  } else {
    const { name, price } = req.body;
    tea.name = name;
    tea.price = price;
    return res.status(200).send(tea);
  }
});

/// delete tea

app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));

  if (index === -1) {
    s;
    return res.status(404).send("no tea found to delete");
  } else {
    teaData.splice(index, 1);
    return res.status(204).send(`tea ${index} is deleted`);
  }
});

app.listen(port, () => {
  console.log(`server is running at port ${port}...`);
});

// app.get("/", (req, res) => {
//   res.send("Hello from Karma using Express");
// });
// app.get("/ice-tea", (req, res) => {
//   res.send("Hello from ice-tea");
// });
// app.get("/lemon", (req, res) => {
//   res.send("Hello from lemon flavor ice-tea");
// });
