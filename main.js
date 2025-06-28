import express from "express";
import { write, read } from "./fileControl.js";

const app = express();

app.use(express.json());

app.post("/", async (req, res) => {
    try {
        const fruits = await read();
        const newFruit = {
            id: !fruits?.length ? 1 : fruits.at(-1)?.id + 1,
            ...req.body,
        };
        fruits.push(newFruit);
        await write(fruits);
        return res.status(201).json({
            data: newFruit,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "internal server error",
        });
    }
});

app.get("/", async (req, res) => {
    try {
        const data = await read();
        return res.status(200).json({
            data,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});

app.get("/:id", async (req, res) => {
    try {
        const id = +req.params.id;
        const fruits = await read();
        const fruit = fruits.find((fruit) => fruit.id === id);
        if (!fruit) {
            return res.status(404).json({
                message: "Fruit not found",
            });
        }

        return res.status(200).json({
            data: fruit,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "internal server",
        });
    }
});

app.put("/:id", async (req, res) => {
    try {
        const id = +req.params.id;
        const fruits = await read();
        const index = fruits.findIndex((fruit) => fruit.id === id);
        if (index === -1) {
            return res.status(404).json({
                message: "fruit not found" || "internal server",
            });
        }
        fruits[index] = {
            id,
            ...req.body,
        };
        await write(fruits);
        return res.status(200).json({
            data: fruits[index],
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "internal server",
        });
    }
});

app.delete("/:id", async (req, res) => {
    try {
        const id = +req.params.id;
        const fruits = await read();
        const index = fruits.findIndex((fruit) => fruit.id === id);
        if (index === -1) {
            return res.status(404).json({
                message: "fruit not found",
            });
        }
        fruits.splice(index, 1);
        await write(fruits);
        return res.status(200).json({
            data: {},
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "intyernal server",
        });
    }
});
const port = 1024;

app.listen(port, () => console.log(`server runing on port ${port}`));
