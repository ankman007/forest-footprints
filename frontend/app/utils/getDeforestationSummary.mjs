import { GoogleGenerativeAI } from "@google/generative-ai";

export async function getDeforestationSummary(location) {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Generate a concise, two-line summary about deforestation in ${location}. Include information on the extent of deforestation, its impact on vegetation and plants, and any relevant statistics. It can be of general area or region, no need to be too specific about the region I've given`;

    const result = await model.generateContent(prompt);
    return result.response.text();
}




