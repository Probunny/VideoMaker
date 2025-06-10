import express from 'express';
import OpenAI from 'openai';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.post('/generate-video', async (req, res) => {
  const { prompt, apiKey } = req.body;

  if (!prompt || !apiKey) {
    return res.status(400).json({ success: false, error: 'Missing prompt or API key.' });
  }

  try {
    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a creative assistant that writes short video scripts." },
        { role: "user", content: `Write a short, engaging video script for this topic: ${prompt}` }
      ]
    });

    const script = completion.choices[0].message.content;

    return res.status(200).json({
      success: true,
      videoUrl: "/sample.mp4",
      script
    });
  } catch (error) {
    console.error("OpenAI error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Something went wrong.'
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
