const router = require('express').Router();
const requireAuth = require('../middleware/auth');
const dashboardController = require('../controllers/dashboardController');

// All dashboard routes require authentication
router.use(requireAuth);

// Homepage data (main dashboard)
router.get('/home', dashboardController.getHomepage);

// Individual survey dashboard with analytics
router.get('/:surveyId', dashboardController.getSurveyDashboard);

// User statistics endpoint
router.get('/user/stats', dashboardController.getUserStats);

// Quick summary for dashboard widgets
router.get('/user/summary', dashboardController.getQuickSummary);

module.exports = router;