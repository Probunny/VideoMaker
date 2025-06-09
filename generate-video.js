import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Content-Type', 'application/json');
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { prompt, apiKey } = req.body;

  if (!prompt || !apiKey) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(400).json({ success: false, error: 'Missing prompt or API key.' });
  }

  try {
    const openai = new OpenAI({ apiKey });

    // Example: generate a script using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a helpful assistant that generates video scripts." },
        { role: "user", content: `Generate a short video script based on this prompt: ${prompt}` }
      ]
    });

    const script = completion.choices[0].message.content;

    // For now, we’re not generating real videos—just simulate
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({
      success: true,
      videoUrl: "/sample.mp4", // Placeholder video URL
      script
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json({
      success: false,
      error: error.message || 'Something went wrong.'
    });
  }
}
