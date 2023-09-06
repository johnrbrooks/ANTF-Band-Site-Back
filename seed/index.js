const db = require("../db");
const { Admin } = require("../models");
const { Song } = require("../models");
const { Show } = require("../models");

const main = async () => {

    /* const adminUser = new Admin({
        email: 'anighttoforgetdc@gmail.com',
        password: 'Peopleweknew'
    })
    await adminUser.save() */

    const shows = [
        {
            venue: 'BLive',
            show_poster: `https://imgur.com/vZ7ICui`,
            location: 'Arlington, VA',
            date: 'September 9th, 2023',
            time: '10:00pm - 1:00am',
            cover: 'Free',
        },
        {
            venue: 'Sauf Haus',
            show_poster: `https://imgur.com/rgFJL1G`,
            location: 'Washington D.C',
            date: 'September 30th, 2023',
            time: '10:00pm - 1:00am',
            cover: 'Free',
        },
        {
            venue: 'BLive',
            show_poster: `https://imgur.com/vZ7ICui`,
            location: 'Arlington, VA',
            date: 'October 14th, 2023',
            time: '10:00pm - 1:00am',
            cover: 'Free',
        },
        {
            venue: 'Light Horse',
            show_poster: `https://imgur.com/T4lMfpo`,
            location: 'Old Town Alexandria, VA',
            date: 'October 28th, 2023',
            time: '9:30pm - 1:00am',
            cover: 'Free',
        },
        {
            venue: 'Crossroads',
            show_poster: `https://imgur.com/T4lMfpo`,
            location: 'Chantilly, VA',
            date: 'November 3rd, 2023',
            time: '9:30pm - 1:00am',
            cover: 'Free',
        },
        {
            venue: 'Light Horse',
            show_poster: `https://imgur.com/T4lMfpo`,
            location: 'Old Town Alexandria, VA',
            date: 'November 11th, 2023',
            time: '9:30pm - 1:00am',
            cover: 'Free',
        },
    ]

    await Show.insertMany(shows)

    /* const songs = [
        {name: 'All Signs Point to Lauderdale', artist: 'A Day To Remember'},
        {name: 'Downfall Of Us All', artist: 'A Day To Remember'},
        {name: 'Dear Maria, Count Me In', artist: 'All Time Low'},
        {name: 'Weightless', artist: 'All Time Low'},
        {name: 'Sk8er Boi', artist: 'Avril Lavigne'},
        {name: 'All The Small Things', artist: 'blink-182'},
        {name: 'Dammit', artist: 'blink-182'},
        {name: 'First Date', artist: 'blink-182'},
        {name: "What's My Age Again?", artist: 'blink-182'},
        {name: "Livin' On A Prayer", artist: 'Bon Jovi'},
        {name: '1985', artist: 'Bowling For Soup'},
        {name: 'The Great Escape', artist: 'Boys Like Girls'},
        {name: 'Love Drunk', artist: 'Boys Like Girls'},
        {name: 'Dance, Dance', artist: 'Fall Out Boy'},
        {name: "Sugar We're Goin' Down", artist: 'Fall Out Boy'},
        {name: 'Thnks Fr Th Mmrs', artist: 'Fall Out Boy'},
        {name: "Stacy's Mom", artist: 'Fountains of Wayne'},
        {name: 'The Anthem', artist: 'Good Charlotte'},
        {name: 'American Idiot', artist: 'Green Day'},
        {name: 'Basket Case ', artist: 'Green Day'},
        {name: 'Holiday', artist: 'Green Day'},
        {name: 'The Middle', artist: 'Jimmy Eat World'},
        {name: "Don't Stop Believin", artist: 'Journey'},
        {name: 'Since U Been Gone', artist: 'Kelly Clarkson'},
        {name: 'My Own Worst Enemy', artist: 'Lit'},
        {name: "Scotty Doesn't Know", artist: 'Lustra'},
        {name: 'Jamie All Over', artist: 'Mayday Parade'},
        {name: 'Somebody That I Used To Know', artist: 'Mayday Parade/Gotye'},
        {name: 'Shake It', artist: 'Metro Station'},
        {name: 'Helena', artist: 'My Chemical Romance'},
        {name: "I'm Not Okay", artist: 'My Chemical Romance'},
        {name: 'Teenagers', artist: 'My Chemical Romance'},
        {name: 'Welcome to the Black Parade', artist: 'My Chemical Romance'},
        {name: 'My Friends Over You', artist: 'New Found Glory'},
        {name: 'Smells Like Teen Spirit', artist: 'Nirvana'},
        {name: 'Good 4 U', artist: 'Olivia Rodrigo'},
        {name: 'Misery Business', artist: 'Paramore'},
        {name: 'Be My Escape', artist: 'Relient K'},
        {name: 'Welcome To My Life', artist: 'Simple Plan'},
        {name: "I'm Just A Kid", artist: 'Simple Plan'},
        {name: 'Right Now', artist: 'SR-71'},
        {name: 'Memory', artist: 'Sugarcult'},
        {name: 'Fat Lip', artist: 'Sum 41'},
        {name: 'In Too Deep', artist: 'Sum 41'},
        {name: 'The Hell Song', artist: 'Sum 41'},
        {name: 'Meant To Live', artist: 'Switchfoot'},
        {name: 'MakeDamnSure', artist: 'Taking Back Sunday'},
        {name: 'You Belong With Me', artist: 'Taylor Swift'},
        {name: 'Dirty Little Secret', artist: 'The All-American Rejects'},
        {name: 'Gives You Hell', artist: 'The All-American Rejects'},
        {name: 'Move Along', artist: 'The All-American Rejects'},
        {name: 'Just The Girl', artist: 'The Click Five'},
        {name: 'Everlong', artist: 'The Foo Fighters'},
        {name: 'Mr. Brightside', artist: 'The Killers'},
        {name: 'Face Down', artist: 'The Red Jumpsuit Apparatus'},
        {name: 'Shut Up And Dance', artist: 'WALK THE MOON'},
        {name: 'Check Yes Juliet', artist: 'We The Kings'},
        {name: "Say It Ain't So", artist: 'Weezer'},
        {name: 'Ocean Avenue', artist: 'Yellowcard'},
    ]

    await Song.insertMany(songs) */
}

const run = async () => {
    await main();
    await db.close();
}

run()