module.exports = {
  '*.{js,jsx,ts,tsx}': ['prettier --write', 'eslint --fix', 'echo echo-start'],
  '*.{json,md,css,scss}': ['prettier --write'],
};
