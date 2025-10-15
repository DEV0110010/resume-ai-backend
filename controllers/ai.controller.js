import Resume from "../models/Resume.model.js";
import ai from '../configs/gemini.js';

// controller for enhancing a resume's professional summary
// POST: /api/ai/enhance-pro-sum

export const enhanceProSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.GEMINI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences, highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly, and return only the text — no options or additional content.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedContent = response.choices[0].message.content;
    return res.status(200).json({ enhancedContent });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// controller for enhancing a resume's job description
// POST: /api/ai/enhance-job-desc
export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.GEMINI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an expert in resume writing. Your task is to enhance the job description of a resume. The description should be only 1-2 sentences, highlighting key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly and return only the text — no options or additional content.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedContent = response.choices[0].message.content;
    return res.status(200).json({ enhancedContent });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// controller for adding resume to the database
// POST: /api/ai/upload-resume

export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    // 1. More robust validation
    if (!resumeText || !title) {
      return res.status(400).json({ message: "Resume text and title are required fields." });
    }

    const systemPrompt = "You are an expert AI agent trained to extract structured data from resumes. Respond ONLY with the JSON object and no other text, markdown, or explanations.";

    const userPrompt = `Extract the data from the following resume text and provide it in the exact JSON format specified below.

Resume Text: """${resumeText}"""

JSON Format:
{
  "professional_summary": "",
  "skills": [],
  "personal_info": {
    "image": "",
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "experience": [
    {
      "company": "",
      "position": "",
      "start_date": "",
      "end_date": "",
      "description": "",
      "is_current": false
    }
  ],
  "project": [
    {
      "name": "",
      "type": "",
      "description": ""
    }
  ],
  "education": [
    {
      "institution": "",
      "degree": "",
      "field": "",
      "graduation_date": "",
      "gpa": ""
    }
  ]
}`;

    const response = await ai.chat.completions.create({
      model: process.env.GEMINI_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      // 2. --- FIX: Use 'json_object' with an underscore ---
      response_format: { type: "json_object" }, 
    });

    const extractedData = response.choices[0].message.content;
    
    // For debugging: see what the AI is actually sending back
    // console.log("AI Response:", extractedData);

    const parsedData = JSON.parse(extractedData);

    const newResume = await Resume.create({ userId, title, ...parsedData });

    // 3. Use 201 Created for a successful resource creation
    return res.status(201).json({ resumeId: newResume._id });

  } catch (error) {
    // 4. Better error handling
    console.error("ERROR UPLOADING RESUME:", error); // Log the full error for debugging

    // If JSON parsing fails, it's a server error, not the user's fault.
    if (error instanceof SyntaxError) {
      return res.status(500).json({ message: "Failed to process the AI response. Please try again." });
    }
    
    // For all other errors, send a generic server error message.
    return res.status(500).json({ message: "An internal server error occurred." });
  }
};
