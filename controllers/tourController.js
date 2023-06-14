const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const checkId = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);

  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID',
    });
  }

  next();
};

const checkBody = (req, res, next) => {
  console.log('Soy checkBody 👮‍♂️');

  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }

  next();
};

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'succes',
    results: tours.length,
    requestTime: req.requestTime,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  res.status(201).json({
    status: 'succes',
    data: {
      tour,
    },
  });
};

const createNewTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) return console.log(err);

      res.status(201).json({
        status: 'succes',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  res.status(200).json({
    status: 'succes',
    data: '<Changed data...>',
  });
};

const deleteTour = (req, res) => {
  res.status(204).json({
    status: 'succes',
    data: null,
  });
};

module.exports = {
  getAllTours,
  getTour,
  createNewTour,
  updateTour,
  deleteTour,
  checkId,
  checkBody,
};
