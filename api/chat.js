
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "OPENAI_API_KEY is not configured."
      });
    }

    const {
      message,
      dataset,
      history = []
    } = req.body || {};

    if (!message) {
      return res.status(400).json({
        error: "Message is required."
      });
    }

    const systemPrompt = `
You are Quantix X, an enterprise AI business intelligence analyst.

Analyze the user's connected business data and answer accurately.

RULES:
- Use the supplied dataset as the primary source of truth.
- Never invent numbers.
- Never pretend data exists when it does not.
- If the data is insufficient, say so clearly.
- Perform calculations carefully.
- Focus on KPIs, targets, achievement, growth, gaps, trends, risks and actions.
- Answer like a senior BI analyst speaking to management.
- Keep answers concise but useful.
- Use ₹ when the data represents Indian currency.
- Clearly distinguish facts from recommendations.

CONNECTED DATA:
${JSON.stringify(dataset || {})}
`;

    const input = [
      {
        role: "system",
        content: systemPrompt
      },
      ...history.slice(-8).map(item => ({
        role: item.role === "assistant"
          ? "assistant"
          : "user",
        content: String(item.content || "")
      })),
      {
        role: "user",
        content: message
      }
    ];

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },

        body: JSON.stringify({
          model: "gpt-5.6",
          input,
          max_output_tokens: 900
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI error:", data);

      return res.status(response.status).json({
        error:
          data?.error?.message ||
          "OpenAI request failed."
      });
    }

    const answer =
      data.output_text ||
      "I could not generate a response.";

    return res.status(200).json({
      answer,
      model: "gpt-5.6"
    });

  } catch (error) {

    console.error(
      "Quantix X API error:",
      error
    );

    return res.status(500).json({
      error:
        "Quantix X AI engine encountered an unexpected error."
    });
  }
}
