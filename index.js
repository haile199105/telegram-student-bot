const TelegramBot = require('node-telegram-bot-api');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

bot.on('message', async (msg) => {

    const chatId = msg.chat.id;
    const userText = msg.text;

    try {

        const result = await model.generateContent(
        `You are Haile, a friendly IT teacher helping students. 
Explain clearly and simply.

Student question: ${userText}`
        );

        const reply = result.response.text();

        bot.sendMessage(chatId, reply);

    } catch (error) {

        bot.sendMessage(chatId, "Sorry, something went wrong.");
    }

});
