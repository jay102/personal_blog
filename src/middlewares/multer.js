const moment = require('moment');

function setupMulter(multer) {
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './uploads/articles/imgs');
    },
    filename(req, file, cb) {
      cb(null, `${moment().format('YYYY-MM-DD')}-${file.originalname}`);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === 'image/png'
      || file.mimetype === 'image/jpeg'
      || file.mimetype === 'image/jpg'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Unacceptable Image Format'), false);
    }
  };

  const multerInit = multer({
    storage,
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
    fileFilter,
  });

  return {
    multerInit,
  };
}
module.exports = setupMulter;
