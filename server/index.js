import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// CORS configuration supporting dynamic frontend URL from env
app.use(cors({
  origin: FRONTEND_URL,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Healthy check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Proposal accepted notification endpoint
app.post('/api/proposal-accepted', async (req, res) => {
  const { event, timestamp, source } = req.body;

  // Basic validation
  if (!event || event !== 'proposal_accepted') {
    return res.status(400).json({ success: false, message: 'Invalid event payload' });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('Server configuration error: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing.');
    return res.status(500).json({ success: false, message: 'Telegram bot settings are not configured' });
  }

  // Format date/time
  const localDateTime = timestamp 
    ? new Date(timestamp).toLocaleString()
    : new Date().toLocaleString();

  // Create message text
  const telegramMessage = `💖 SHE SAID YES! 💖

Your proposal website received a YES ❤️

Time: ${localDateTime}
Website: ${FRONTEND_URL}
Source: ${source || 'Proposal Web App'}`;

  try {
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    await axios.post(telegramUrl, {
      chat_id: chatId,
      text: telegramMessage,
      parse_mode: 'HTML'
    });

    console.log('Telegram notification successfully sent!');
    return res.json({ success: true, message: 'Notification sent' });
  } catch (error) {
    console.error('Error sending Telegram notification:', error.response?.data || error.message);
    return res.status(500).json({ success: false, message: 'Failed to send Telegram message' });
  }
});

app.listen(PORT, () => {
  console.log(`Notification server running on port ${PORT}`);
  console.log(`CORS configured for origin: ${FRONTEND_URL}`);
});
