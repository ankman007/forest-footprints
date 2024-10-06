import { GoogleGenerativeAI } from "@google/generative-ai";

export async function getDeforestationSummary(location) {
    const API_KEY = "AIzaSyAtzZirYN_xByu0ZqYCe7SbvIRbHf1l8tk";
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    let data_present = false;
    
    const data_for_ktm = {
        "forest_cover_loss_rate": 5.7,
        "forest_fire_alerts": "Moderate",
        "additional_info": "High human impact on forest cover due to urban expansion."
    }

    if (location.includes("Kathmandu")) {
        data_present = true;
    }
    const prompt = `Generate a concise, two-line summary about deforestation in ${location}. Include information on the extent of deforestation, its impact on vegetation and plants, and any relevant statistics. It can be of general area or region, no need to be too specific about the region I've given. The summary should be no longer than 150 characters or 17 words. If and only case when location is Kathmandu region, use this ${JSON.stringify(data_for_ktm)} as reference and provide summary.`;

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    return result.response.text();
}


