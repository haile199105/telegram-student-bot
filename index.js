const TelegramBot = require('node-telegram-bot-api');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

bot.on("message", async (msg) => {

  const chatId = msg.chat.id;
  const userText = msg.text;

  try {

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest"
    });

    const result = await model.generateContent(userText);

    const response = result.response.text();

    bot.sendMessage(chatId, response);

  } catch (error) {

    console.error(error);
    bot.sendMessage(chatId, "AI error, try again.");

  }

});
