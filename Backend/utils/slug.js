const { default: slugify } = require("slugify");

const generateSlug = (title) => {
  return (
    slugify(title, { lower: true, strict: true, trim: true }) + "-" + Date.now()
  );
};

module.exports = {
  generateSlug,
};
