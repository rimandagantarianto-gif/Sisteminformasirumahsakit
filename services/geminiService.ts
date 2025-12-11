import { GoogleGenAI } from "@google/genai";
import { Patient, FinancialMetric } from '../types';

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing from environment variables.");
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey });
};

export const summarizeClinicalNote = async (note: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const prompt = `
      You are an expert AI Clinical Assistant designed to help doctors. 
      Analyze the following raw clinical transcript/note. 
      Generate a structured summary including:
      1. Chief Complaint
      2. History of Present Illness (HPI)
      3. Assessment
      4. Plan
      
      Output strictly in Markdown format.
      
      Raw Note: "${note}"
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "No summary generated.";
  } catch (error) {
    console.error("Clinical Summary Error:", error);
    return "Error generating summary. Please check API configuration.";
  }
};

export const analyzeFinancialHealth = async (data: FinancialMetric[]): Promise<string> => {
  try {
    const ai = getAiClient();
    const dataStr = JSON.stringify(data);
    const prompt = `
      You are a Hospital Financial Analyst.
      Analyze the following JSON financial data (Revenue, Expenses, Payroll) for the last 6 months.
      Identify trends, potential risks, and 3 actionable recommendations to improve the Net Profit Margin.
      Keep it professional and concise.

      Data: ${dataStr}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "No analysis generated.";
  } catch (error) {
    console.error("Financial Analysis Error:", error);
    return "Error analyzing financials.";
  }
};

export const searchFHIRWithNL = async (query: string, patients: Patient[]): Promise<string[]> => {
  try {
    const ai = getAiClient();
    // In a real app, this would generate a FHIR Query URL. 
    // Here, we act as a semantic filter on the client-side mock data.
    const context = JSON.stringify(patients.map(p => ({
      id: p.id,
      name: p.name[0].given.join(' ') + ' ' + p.name[0].family,
      condition: p.condition,
      status: p.status,
      gender: p.gender
    })));

    const prompt = `
      You are a FHIR Search Assistant. 
      I will provide a Natural Language Query and a dataset of Patients in JSON.
      Return ONLY a JSON array of patient IDs that match the query intent.
      If no match, return [].
      Do not output markdown code blocks, just the JSON string.

      Query: "${query}"
      Dataset: ${context}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text?.replace(/```json|```/g, '').trim();
    if (!text) return [];
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Search Error:", error);
    return [];
  }
};
