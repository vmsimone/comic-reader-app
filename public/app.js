const TEST_DATA = {
    "comics": [
        {
            "title": {"English": "Batman: The Killing Joke"},
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
            },
            "author": "Sakae Esuno",
            "published": "January 26, 2006",
            "pages": 2500
        },
        {
            "title": {
                "English": "Naruto",
                "Japanese": "ナルト",
                "Romaji": "Naruto"
            },
            "author": "Masashi Kishimoto",
            "published": "September 21, 1999",
            "pages": 16072
        }
    ],
    "graphicNovels": [
        {
            "title": {"English": "Scott Pilgrim"},
            "author": "Bryan Lee O'Malley",
            "published": "August 18, 2004",
            "pages": 1000
        },
        {
            "title": {"English": "Lost at Sea"},
            "author": "Bryan Lee O'Malley",
            "published": "November, 2003",
            "pages": 168
        }
    ]
}

function displayComic(arr) {
    $('main').append('<h2>Comics</h2>');
    for (index in arr) {
        $('main').append(
            `
            <h3>${arr[index].title.English}</h3>
            <p>by, ${arr[index].author}</p>
            <p>Published ${arr[index].published}</p>
            <p>${arr[index].pages} pages</p>
            `
        );
    }
}

function displayManga(arr) {
    $('main').append('<h2>Manga</h2>');
    for (index in arr) {
        $('main').append(
            `
            <h3>${arr[index].title.English}</h3>
            <h4>${arr[index].title.Japanese}</h4>
            <p>by, ${arr[index].author}</p>
            <p>Published ${arr[index].published}</p>
            <p>${arr[index].pages} pages</p>
            `
        );
    }
}

function displayGNovel(arr) {
    $('main').append('<h2>Graphic Novels</h2>');
    for (index in arr) {
        $('main').append(
            `
            <h3>${arr[index].title.English}</h3>
            <p>by, ${arr[index].author}</p>
            <p>Published ${arr[index].published}</p>
            <p>${arr[index].pages} pages</p>
            `
        );
    }
}

function sortData(data) {
    displayComic(data.comics);
    displayManga(data.manga);
    displayGNovel(data.graphicNovels);
}

function addComic() {
  //POST function
}

function deleteComic() {
  //DELETE
}

function updateComic() {
  //PUT
}

function loadPage(page) {
  const homePage = '<p>Click "My List" to view your comics or "Stats" to see your statistics</p>';
  const statsPage = '<p>Page Under Construction</p>';
  const listPage = '<button class="add-comic">Add comic</button>';
  const comicDetailsPage = '<p>Testing</p>'; //this will need to be a GET with a filter

  switch(page) {
    case 'home':
      $('main').html(homePage);
      break;
    case 'list':
      $('main').html(listPage);
      sortData(TEST_DATA);
      break;
    case 'stats':
      $('main').html(statsPage);
      break;
  }
}

function readyButtons() {
  $('button').on('click', event => {
    let navButton = event.target.id;
    loadPage(navButton);
  });
}

$(readyButtons);
