exports.logInfo = (msg) => {
  console.log(`[INFO] ${new Date().toISOString()} - ${msg}`);
};

exports.logError = (err) => {
  console.error(`[ERROR] ${new Date().toISOString()}`, err);
};
