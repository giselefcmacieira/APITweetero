import express from "express";
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const usuarios = [];

const tweets = []; 

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
    res.send('OK');
});

app.post('/tweets', (req, res) => {
    const {username, tweet} = req.body;
    if(usuarios.length === 0){
        res.send('UNAUTHORIZED');
        return;
    }
    if(!username || !tweet || typeof(username) !== 'string' || typeof(tweet) !== 'string'){
        res.status(400).send("Todos os campos são obrigatórios!");
        return;
    }
    const userTweet = {
        username,
        tweet,
        avatar: avatarUser
    }
    tweets.push(userTweet);
    res.send('OK');
})

app.get('/tweets', (req, res) => {
    const numTweets = tweets.length;
    const ultimosTweets = [];
    for(let i = (numTweets - 1); i >= (numTweets - 10); i--){
        if(i >= 0){
            ultimosTweets.push(tweets[i]);
        }else{
            break;
        }  
    }
    res.send(ultimosTweets)
}) 

app.listen(5000, () => console.log('O servidor está rodando na porta 5000'));