const multer = require('multer');
const path = require('path');

const destination = process.env.FILE_DESTINATION;

const storageEngine = multer.diskStorage({
  destination: destination,
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storageEngine,
  fileFilter: (req, file, callback) => {
    const fileExtention = path.extname(file.originalname);

    return callback(null, true);
  },
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});
exports.destination = destination;
exports.upload = upload;
exports.fileErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) return multer.MulterError();
  response.json({
    status: 404,
    message: err.message,
  });
  next();
};
