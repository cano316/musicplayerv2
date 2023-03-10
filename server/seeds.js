require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Song = require('./models/Song');


const DB_URL = process.env.DB_URL;

main().catch(e => console.log(e));
async function main() {
    mongoose.set('strictQuery', false)
    await mongoose.connect(DB_URL, { useNewUrlParser: true });
    console.log('CONNECTED TO MONGODB')
};

const arrayOfSongs = [
    {
        id: 1,
        songName: "Hard Times",
        artist: "Freddie Gibbs",
        imgSrc: "https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_auto,w_1400/fl_lossy,pg_1/ykhdu9an0yoeqyoo0hsw/soul-sold-separately"
    },
    {
        id: 2,
        songName: "Addictions",
        artist: "Brent Faiyaz",
        imgSrc: "https://media.pitchfork.com/photos/62c715e86284eb9164c12cd5/1:1/w_600/Brent-Faiyaz-Wasteland.jpg"
    },
    {
        id: 3,
        songName: "My First Reply (Till It's Over)",
        artist: "Dom Kennedy",
        imgSrc: "https://upload.wikimedia.org/wikipedia/en/0/08/By_Dom_Kennedy.jpeg"
    },
    {
        id: 4,
        songName: "Justice",
        artist: "Justin Bieber",
        imgSrc: "https://upload.wikimedia.org/wikipedia/en/0/08/Justin_Bieber_-_Justice.png"
    }
];

Song.insertMany(arrayOfSongs)
    .then(songs => console.log(songs))
    .catch(err => console.log(err));