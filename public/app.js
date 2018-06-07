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
            <button class="put">Update</button>
            <button class="del">Remove from list</button>
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
            <button class="put">Update</button>
            <button class="del">Remove from list</button>
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
            <button class="put">Update</button>
            <button class="del">Remove from list</button>
            `
        );
    }
}

function sortData(data) {
    console.log(data);
    displayComic(data.comics);
    displayManga(data.manga);
    displayGNovel(data.graphicNovels);
    readyComicFunctions();
}

function getComics() {
    console.log('making request');
    $.ajax({
        url: '/api/comics',
        method: 'get',
        success: sortData
    });
}

function addComic() {
  //POST function
  console.log('add working');
  $('main').html(`
    <form action="#" name="add-form" class="js-add">
    <fieldset class="comic-info">
        <label for="type" class="comic-type">What kind of comic?</label>
        <select name="type" id="type" required>
            <option value="0" selected>Comic</option>
            <option value="1">Manga</option>
            <option value="2">Graphic Novel</option>
        </select>

        <legend>Enter your comic's information here:</legend>
        <label for="title">Title:</label>
        <input type="text" id="title" required>
        <br>
        <label for="author">Author:</label>
        <input type="text" id="author" required>
        <br>
        <label for="published">Date Published:</label>
        <input type="text" id="published" required>
        <br>
        <label for="pages">Number of Pages:</label>
        <input type="text" id="pages" required>
        <br>
        <button type="submit">Add this comic</button>
    </fieldset>
        
    </form>
    <button class="cancel">Back</button>
  `);
}

function deleteComic() {
  //DELETE
  console.log('del working');
}

function updateComic() {
  //PUT
  console.log('update working')
}

function readyComicFunctions() {
    $('.del').on('click', deleteComic);
    $('.put').on('click', updateComic);
    $('.add').on('click', addComic);
}

function loadPage(page) {
  const homePage = '<p>Click "My List" to view your comics or "Stats" to see your statistics</p>';
  const statsPage = '<p>Page Under Construction</p>';
  const listPage = '<button class="add">Add comic</button>';
  const comicDetailsPage = '<p>Testing</p>'; //this will need to be a GET with a filter

  switch(page) {
    case 'home':
      $('main').html(homePage);
      break;
    case 'list':
      $('main').html(listPage);
      getComics();
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
