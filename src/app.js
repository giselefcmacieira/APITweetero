import express from "express";
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const usuarios = [];

const tweets = []; 

const userTweets = [];

let avatarUser = '';

app.post('/sign-up', (req, res) => {
    const {username, avatar} = req.body;
    if(!username || !avatar || typeof(username) !== 'string' || typeof(avatar) !== 'string'){
        res.status(400).send("Todos os campos são obrigatórios!");
        return;
    }
    const usuario = {
        username, 
        avatar 
    }
    avatarUser = avatar;
    usuarios.push(usuario);
    res.status(201).send('OK');
});

app.post('/tweets', (req, res) => {
    const {tweet} = req.body;
    const {user} = req.headers
    if(usuarios.length === 0){
        res.status(401).send('UNAUTHORIZED');
        return;
    }
    if(!user || !tweet || typeof(user) !== 'string' || typeof(tweet) !== 'string'){
        res.status(400).send("Todos os campos são obrigatórios!");
        return;
    }
    const userTweet = {
        username: user,
        tweet,
        avatar: avatarUser
    }
    tweets.push(userTweet);
    res.status(201).send('OK');
})

app.get('/tweets', (req, res) => {
    const {page} = req.query;
    const numTweets = tweets.length;
    const ultimosTweets = [];
    if(Number(page) < 1){
        res.status(400).send('Informe uma página válida!');
        return
    }
    if(Number(page) === 1){
        for(let i = (numTweets - 1); i >= (numTweets - 10); i--){
            if(i >= 0){
                ultimosTweets.push(tweets[i]);
            }else{
                break;
            }  
        }
        res.send(ultimosTweets)
        return
    }
    if(Number(page) > 1){
        const p = ((page * 10) - 9);
        for(let i = (numTweets - p); i >= (numTweets - (page*10)); i--){
            if(i >= 0){
                ultimosTweets.push(tweets[i]);
            }else{
                break;
            }  
        }
        res.send(ultimosTweets)
        return
    }
    if(page === undefined){
        for(let i = (numTweets - 1); i >= (numTweets - 10); i--){
            if(i >= 0){
                ultimosTweets.push(tweets[i]);
            }else{
                break;
            }  
        }
        res.send(ultimosTweets)
        return
    }
    
}) 

app.get('/tweets/:USERNAME', (req, res) => {
    const {USERNAME} = req.params;
    for(let i = 0; i < tweets.length; i++){
        if(tweets[i].username === USERNAME){
            const utweet = {
                username: tweets[i].username,
                avatar: tweets[i].avatar,
                tweet: tweets[i].tweet
            }
            userTweets.push(utweet);
        }
    }
    res.send(userTweets);
})

app.listen(5000, () => console.log('O servidor está rodando na porta 5000'));