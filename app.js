const TEST_DATA = {
    "comics": [
        {
            "title": "Batman: The Killing Joke",
            "author": "Alan Moore",
            "published": "December 1st, 1995",
            "pages": 50
        }
    ],
    "manga": [
        {
            "title": {
                "English": "Future Diary",
                "Japanese": "未来日記",
                "Romaji": "Mirai Nikki"
            }
            "author": "Sakae Esuno",
            "published": "January 26, 2006",
            "pages": 2500
        },
        {
            "title": {
                "English": "Naruto",
                "Japanese": "ナルト",
                "Romaji": "Naruto"
            }
            "author": "Masashi Kishimoto",
            "published": "September 21, 1999",
            "pages": 16072
        }
    ],
    "graphicNovels": [
        {
            "title": "Scott Pilgrim",
            "author": "Bryan Lee O'Malley",
            "published": "August 18, 2004",
            "pages": 1000
        },
        {
            "title": "Lost at Sea",
            "author": "Bryan Lee O'Malley",
            "published": "November, 2003",
            "pages": 168
        }
    ]
}

function displayComic(arr) {
    for (index in arr) {
        $('body').append(
            `
            <h2>Comics</h2>
            <h3>${index.title}<h3>
            <p>by, ${index.author}</p>
            <p>Published ${index.published}</p>
            <p>${index.pages} pages</p>
            `
        )
    }
}

function displayManga(arr) {

}

function displayGNovel(arr) {

}

function sortData(data) {
    displayComic(data.comics);
    displayManga(data.manga);
    displayGNovel(data.graphicNovels);
}

$(function() {
    sortData(TEST_DATA);
})