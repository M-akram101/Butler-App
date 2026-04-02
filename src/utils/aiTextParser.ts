export function safeParseJSON(input: string) {
  try {
    // Remove markdown code block if present
    const cleaned = input
      .trim()
      .replace(/^```json\s*/, '') // remove starting ```json
      .replace(/^```/, '') // fallback if just ```
      .replace(/```$/, '') // remove ending ```
      .trim();

    return cleaned;
  } catch (err) {
    console.error('Failed to parse JSON:', input);
    throw err;
  }
}
