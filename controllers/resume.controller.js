
import imageKit from "../configs/imageKit.js";
import Resume from "../models/resume.model.js";
import fs from "fs";

// controller for creating a new resume
// POST: /api/resumes/create

export const createResume = async (req, res) => {
  try {
    const userId = req.userId;

    const { title } = req.body;

    const newResume = await Resume.create({ userId, title });

    return res
      .status(201)
      .json({ message: "Resume created successfully", resume: newResume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// controller for deleting a new resume
// DELETE: /api/resumes/delete
export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const newResume = await Resume.findOneAndDelete({ userId, _id: resumeId });

    return res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// controller for  get user resume by id
// GET: /api/resumes/get
export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ userId, _id: resumeId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    resume.__v = undefined;
    resume.createdAt = undefined;
    resume.updatedAt = undefined;

    return res
      .status(200)
      .json({ message: "Resume fetched successfully", resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// controller for  get resume by public
// GET: /api/resumes/public

export const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ public: true, _id: resumeId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res
      .status(200)
      .json({ message: "Public Resume fetched successfully", resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// controller for  update resume
// PUT: /api/resumes/update
export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId, resumeData, removeBackground } = req.body;

    const image = req.file;

    let resumeDataCopy;
    if(typeof resumeData === 'string'){
      resumeDataCopy = await JSON.parse(resumeData);
    }else{
      resumeDataCopy = structuredClone(resumeData);
    }

    if (image) {
      const imageBufferData = fs.createReadStream(image.path);

      const response = await imageKit.files.upload({
        file: imageBufferData,
        fileName: "resume.png",
        folderName: "user-resumes",
        transformation: {
          pre:
            "w-300, h-300, fo-face, z-0.75" +
            (removeBackground ? ",e-bgremove" : ""),
        },
      });
      resumeDataCopy.personal_info.image = response.url;
    }

    const resume = await Resume.findOneAndUpdate(
      { userId, _id: resumeId },
      resumeDataCopy,
      { new: true }
    );

    return res.status(200).json({ message: "Saved Successfully", resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
