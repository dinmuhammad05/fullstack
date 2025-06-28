import { writeFile, readFile } from "fs/promises";
import { join } from "path";

const filePath = join("./fruits.json");

export const write = async (data) => {
    await writeFile(filePath, JSON.stringify(data, null, 2));
};

export const read = async () => {
    const data = await readFile(filePath, "utf-8");
    return JSON.parse(data);
};
