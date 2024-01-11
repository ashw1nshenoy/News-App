const express=require('express')
const app=express()
const axios = require('axios');
const apiKey = '50db29f424a24bff9a17d8f8589dcba3';


const path=require('path')
const bodyParser=require('body-parser');
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.json())

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('./public'))
app.get('/', async (req, res) => {
 
    try {
      const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;
  
      const response = await axios.get(apiUrl);
      // Send the formatted news data as JSON
        // res.json(response.data.articles)
        // let data={
        //   url:response.data.articles.url,
        //   img:response.data.articles.urlToImage,
        //    title:response.data.articles.title,
        //    description:response.data.articles.description,
        //    time:response.data.articles.publishedAt,
        //    author:response.data.articles.author
        //  }
         
        res.render('home1',{ data:response.data.articles})
        
     
    } catch (error) {
      console.error('Error fetching news:', error.message);
      res.status(500).render('error')
    }
  });
  app.get('/technology', async (req, res) => {
 
    try {
      const apiUrl = `https://newsapi.org/v2/top-headlines?category=technology&country=in&apiKey=${apiKey}`;
  
      const response = await axios.get(apiUrl);
      // Send the formatted news data as JSON
        // res.json(response.data.articles)
        // let data={
        //   url:response.data.articles.url,
        //   img:response.data.articles.urlToImage,
        //    title:response.data.articles.title,
        //    description:response.data.articles.description,
        //    time:response.data.articles.publishedAt,
        //    author:response.data.articles.author
        //  }
         
        res.render('home1',{ data:response.data.articles})
        
     
    } catch (error) {
      console.error('Error fetching news:', error.message);
      res.status(500).render('error')
    }
  });
app.listen(3000)