const express=require('express')
const axios = require('axios');
const app=express()
const port=3000
app.get('/hello',(req,res)=>{
    res.send('news app')
})
//Test code to get the JSON of the News
app.get('/', async (req, res) => {
  try {
    const apiKey = '50db29f424a24bff9a17d8f8589dcba3'; // Replace with your News API key
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;

    const response = await axios.get(apiUrl);
    const newsArticles = response.data.articles.map(article => ({
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage:article.urlToImage,
    }));

    // Send the formatted news data as JSON
    res.json(newsArticles);
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).send('Internal Server Error');
  }
});
app.listen(port,()=>{
    console.log(`Server Started at port ${port}`)
})