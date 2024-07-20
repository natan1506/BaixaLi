const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const { default: axios } = require('axios');
require('dotenv').config();
const app = express();

app.use(cors());

app.use('/proxy', createProxyMiddleware({
  target: '',
  changeOrigin: true,
  router: (req) => {
    const url = new URL(req.query.url);
    return `${url.protocol}//${url.host}`;
  },
  pathRewrite: (path, req) => {
    const url = new URL(req.query.url);
    return url.pathname + url.search;
  }
}));


app.get('/search', async (req, res) => {
  try {
    const query = req.query.q;
    const url = `https://api.mangadex.org/manga?title=${query}`;
    const response = await axios.get(url);
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});


app.get('/search-hq', async (req, res) => {
  try {
    const apiKey = process.env.VITE_API_KEY_COMIC;
    const query = req.query.q;
    const baseUrl = 'https://comicvine.gamespot.com/api';
    const endpoint = `/search/?api_key=${apiKey}&format=json&resources=issue&query=${encodeURIComponent(query)}`;
    const response = await fetch(`${baseUrl}${endpoint}`);
    const data = await response.json();
    res.send(data.results);
  } catch (error) {
    
    res.status(500).send(error.toString());
  }
});

app.get('/cover/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const url = `https://api.mangadex.org/cover/${id}`;
    const response = await axios.get(url);
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get('/chapters/:mangaId', async (req, res) => {
  try {
    const mangaId = req.params.mangaId;
    const url = `https://api.mangadex.org/manga/${mangaId}/feed`;
    const response = await axios.get(url);
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get('/at-home/server/:chapterId', async (req, res) => {
  try {

    const chapterId = req.params.chapterId;
    const response = await axios.get(`https://api.mangadex.org/at-home/server/${chapterId}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching chapter pages');
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
