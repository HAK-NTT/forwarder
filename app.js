const express = require('express');
const morgan = require('morgan');

const app = express();

// Use morgan for request logging
app.use(morgan('combined')); // Use 'dev' for concise colored output during development

// Middleware to handle /callback redirection
app.get('/callback', (req, res) => {
  try {

    const { code, state } = req.query;
    if (!code || !state) {
      return res.status(400).send('Missing required query parameters: code or state');
    }
    const redirectUrl = `https://ndappl-dev.outsystemscloud.com/Singpass/rest/Callback/Redirect?code=${encodeURIComponent(
      code
    )}&state=${encodeURIComponent(state)}`;

    console.log(`Redirecting to: ${redirectUrl}`);

    res.redirect(redirectUrl);
  } catch (error) {
    console.error('Error processing /callback request:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = 3080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});