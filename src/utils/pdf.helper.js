exports.formatDate = () => {
  return new Date().toLocaleDateString("en-GB");
};

exports.mmToPt = (mm) => mm * 2.83465;
