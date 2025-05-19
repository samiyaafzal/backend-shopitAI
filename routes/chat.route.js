import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
// console.log("API Key:", process.env.OPENAI_API_KEY);

router.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
    });
    // console.log("OpenAI Response:", response);

    const botMessage = response.choices[0].message.content;

    res.json({ response: botMessage });
    console.log("Open AI Response", botMessage);
  } catch (error) {
    console.error("OpenAI Error:", error.message);
    res
      .status(500)
      .json({ response: "Error: Unable to connect to the chatbot" });
  }
});

export default router;
