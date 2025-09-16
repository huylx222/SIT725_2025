// Survey business logic: CSV processing, survey creation, data validation
const Survey = require('../models/Survey');
const Invitation = require('../models/Invitation');
const User = require('../models/User');

// Validate CSV data structure
exports.validateCsvData = (csvData) => {
  if (!Array.isArray(csvData) || csvData.length === 0) {
    const error = new Error('CSV data must be a non-empty array');
    error.code = 'INVALID_CSV_DATA';
    throw error;
  }

  // Check required headers
  const firstRow = csvData[0];
  const requiredHeaders = ['questionId', 'questionText'];
  
  for (const header of requiredHeaders) {
    if (!firstRow.hasOwnProperty(header)) {
      const error = new Error(`Missing required CSV column: ${header}`);
      error.code = 'MISSING_CSV_COLUMN';
      throw error;
    }
  }

  // Validate question count
  if (csvData.length > 20) {
    const error = new Error('Maximum 20 questions allowed per survey');
    error.code = 'MAX_QUESTIONS_EXCEEDED';
    throw error;
  }

  // Extract and validate questions
  const questions = csvData.map((row, index) => {
    if (!row.questionId || !row.questionText) {
      const error = new Error(`Missing data in row ${index + 1}`);
      error.code = 'INCOMPLETE_CSV_ROW';
      throw error;
    }

    if (row.questionText.length > 200) {
      const error = new Error(`Question text too long in row ${index + 1} (max 200 characters)`);
      error.code = 'QUESTION_TEXT_TOO_LONG';
      throw error;
    }

    return {
      questionId: row.questionId.toString().trim(),
      questionText: row.questionText.toString().trim()
    };
  });

  // Check for duplicate question IDs
  const questionIds = questions.map(q => q.questionId);
  const uniqueIds = [...new Set(questionIds)];
  if (questionIds.length !== uniqueIds.length) {
    const error = new Error('Duplicate question IDs found in CSV');
    error.code = 'DUPLICATE_QUESTION_IDS';
    throw error;
  }

  return questions;
};

// Create new survey from CSV data
exports.createSurvey = async ({ title, creatorId, csvData, originalFilename }) => {
  // Validate inputs
  if (!title || title.trim().length === 0) {
    const error = new Error('Survey title is required');
    error.code = 'MISSING_TITLE';
    throw error;
  }

  if (title.trim().length > 100) {
    const error = new Error('Survey title too long (max 100 characters)');
    error.code = 'TITLE_TOO_LONG';
    throw error;
  }

  // Validate creator exists
  const creator = await User.findById(creatorId);
  if (!creator) {
    const error = new Error('Creator not found');
    error.code = 'CREATOR_NOT_FOUND';
    throw error;
  }

  // Validate and process CSV data
  const questions = this.validateCsvData(csvData);

  // Create survey
  const survey = await Survey.create({
    title: title.trim(),
    creatorId,
    questions,
    csvMetadata: {
      originalFilename,
      uploadedAt: new Date(),
      rowCount: questions.length
    },
    status: 'active'
  });

  // Return survey with creator info
  await survey.populate('creatorId', 'name email');
  
  return {
    id: survey._id,
    title: survey.title,
    creatorId: survey.creatorId._id,
    creatorName: survey.creatorId.name,
    questionCount: survey.questions.length,
    status: survey.status,
    createdAt: survey.createdAt,
    csvMetadata: survey.csvMetadata
  };
};

// Get surveys created by user
exports.getUserCreatedSurveys = async (userId) => {
  const surveys = await Survey.find({ creatorId: userId })
    .sort({ createdAt: -1 })
    .populate('creatorId', 'name email')
    .lean();

  // Get response counts for each survey
  const surveysWithStats = await Promise.all(
    surveys.map(async (survey) => {
      const invitationCount = await Invitation.countDocuments({ surveyId: survey._id });
      const responseCount = await Invitation.countDocuments({ 
        surveyId: survey._id, 
        status: 'completed' 
      });

      return {
        id: survey._id,
        title: survey.title,
        status: survey.status,
        createdAt: survey.createdAt,
        questionCount: survey.questions.length,
        invitationCount,
        responseCount,
        dashboardLink: `/dashboard/${survey._id}`
      };
    })
  );

  return surveysWithStats;
};

// Get survey by ID with creator verification
exports.getSurveyById = async (surveyId, requesterId = null) => {
  const survey = await Survey.findById(surveyId)
    .populate('creatorId', 'name email')
    .lean();

  if (!survey) {
    const error = new Error('Survey not found');
    error.code = 'SURVEY_NOT_FOUND';
    throw error;
  }

  // // If requester specified, verify ownership
  // if (requesterId && survey.creatorId._id.toString() !== requesterId.toString()) {
  //   const error = new Error('Access denied: not survey creator');
  //   error.code = 'ACCESS_DENIED';
  //   throw error;
  // }

  return {
    id: survey._id,
    title: survey.title,
    creatorId: survey.creatorId._id,
    creatorName: survey.creatorId.name,
    questions: survey.questions,
    status: survey.status,
    createdAt: survey.createdAt,
    updatedAt: survey.updatedAt,
    csvMetadata: survey.csvMetadata
  };
};
