// api/generate-video.js

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

    const completion = await openai.chat.completions.create({
      model: "
