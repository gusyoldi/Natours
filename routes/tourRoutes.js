const express = require('express');
const {
  checkId,
  checkBody,
  getAllTours,
  createNewTour,
  getTour,
  updateTour,
  deleteTour,
} = require('../controllers/tourController');
const router = express.Router();

router.param('id', checkId);

router.route('/').get(getAllTours).post(createNewTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
