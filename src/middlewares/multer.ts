const moment = require('moment');

function setupMulter(multer: any) {
  const storage = multer.diskStorage({
    destination(req: any, file: any, cb: any) {
      cb(null, './uploads/articles/imgs');
    },
    filename(req: any, file: any, cb: any) {
      cb(null, `${moment().format('YYYY-MM-DD')}-${file.originalname}`);
    },
  });

  const fileFilter = (req: any, file: any, cb: any) => {
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
