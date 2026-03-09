const TelegramBot = require('node-telegram-bot-api');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

bot.on('message', async (msg) => {

  const chatId = msg.chat.id;
  const userText = msg.text;

  try {

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(
      `You are Haile, a friendly IT teacher helping students. 
Explain things simply like a mentor.

Student question: ${userText}`
    );

    const response = await result.response;
    const reply = response.text();

    bot.sendMessage(chatId, reply);

  } catch (error) {

    console.log(error);
    bot.sendMessage(chatId, "The bot is starting. Try again in a moment.");

  }

});
