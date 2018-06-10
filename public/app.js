function displayComic(arr) {
    $('main').append('<h2>Comics</h2>');
    for (index in arr) {
        let thisComic = arr[index];
        $('main').append(
            `
            <div class="comic" id=${thisComic.id}>
                <h3>${thisComic.title}</h3>
                <p>by, ${thisComic.author}</p>
                <p>Published ${thisComic.published}</p>
                <div class="updateable">
                    <p>${thisComic.pagesRead}/<span class="total-pages">${thisComic.pages}</span> pages</p>
                    <p class="rating">Rating: ${thisComic.rating}</p>
                    <button class="put">Update</button>
                    <button class="del">Remove from list</button>
                </div>
            </div>
            `
        );
    }
}

function displayManga(arr) {
    $('main').append('<h2>Manga</h2>');
    for (index in arr) {
        let thisManga = arr[index];
        $('main').append(
            `
            <div class="manga" id=${thisManga.id}>
                <h3>${thisManga.title}</h3>
                <p>by, ${thisManga.author}</p>
                <p>Published ${thisManga.published}</p>
                <div class="updateable">
                    <p>${thisManga.pagesRead}/<span class="total-pages">${thisManga.pages}</span> pages</p>
                    <p class="rating">Rating: ${thisManga.rating}</p>
                    <button class="put">Update</button>
                    <button class="del">Remove from list</button>
                </div>
            </div>
            `
        );
    }
}

function displayGNovel(arr) {
    $('main').append('<h2>Graphic Novels</h2>');
    for (index in arr) {
        let thisNovel = arr[index];
        $('main').append(
            `
            <div class="novel" id=${thisNovel.id}>
                <h3>${thisNovel.title}</h3>
                <p>by, ${thisNovel.author}</p>
                <p>Published ${thisNovel.published}</p>
                <div class="updateable">
                    <p>${thisNovel.pagesRead}/<span class="total-pages">${thisNovel.pages}</span> pages</p>
                    <p class="rating">Rating: ${thisNovel.rating}</p>
                    <button class="put">Update</button>
                    <button class="del">Remove from list</button>
                </div>
            </div>
            `
        );
    }
}

function updateComic(obj) {
    //PUT
    console.log('making PUT request');
    $.ajax({
        url: `/api/comics/${obj.id}`,
        method: 'put',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(obj),
        success: function() {
            loadPage('list');
        }
    });
}

function readyUpdate(targetID) {
    $('.js-update-comic').submit(event => {
        //update the item on the database and reload page
        event.preventDefault();
        //let newPagesRead = $(event.currentTarget).find('pages-read').html();
        let newPagesRead = $(event.currentTarget).find('#pages-read').val();
        let newRating = $(event.currentTarget).find('#rating').val();
        
        let putObject = {
            "id": `${targetID}`,
            "pagesRead": `${newPagesRead}`,
            "rating": `${newRating}`
        };
        updateComic(putObject);
    });
    $('.cancel').on('click', () => {
      loadPage('list');
    });
}

function updateComicJSON(targetComic) {
    let thisComicID = $(targetComic).attr('id');
    let updateableSelector = `#${thisComicID} .updateable`;

    let spanSelector = `#${thisComicID} .total-pages`;
    let totalPages = $(spanSelector).html();

    $(updateableSelector).html(`
        <form action="#" name="update-form" class="js-update-comic">
            <label for="pages-read">Read</label>
            <input type="text" id="pages-read">
            /<span class="total-pages">${totalPages}</span>
            <br><br>
            <label for="new-rating">Rating: </label>
            <select name="new-rating" id="rating">
                <option value="None">--</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <br><br>
            <button type="submit" class="save">Save</button>
        </form>
        <button class="cancel">Cancel</button>
    `);
    readyUpdate(thisComicID);
}

function deleteComic(id) {
    //DELETE
    console.log('making DELETE request');
    $.ajax({
        url: `/api/comics/${id}`,
        method: 'delete',
        success: function() {
            loadPage('list');
        }
    });
  }

function confirmDelete(targetComic) {
    let comicID = $(targetComic).attr('id');

    let sectionSelector = `#${comicID} .updateable`;
    let buttonSelector = `${sectionSelector} button`;

    $(buttonSelector).remove();
    $(sectionSelector).append(`
        <p>Are you sure?</p>
        <button class="delete">Yes</button>
        <button class="cancel">No</button>
    `);
    $('.delete').on('click', () => {
        deleteComic(comicID);
    });
    $('.cancel').on('click', () => {
        loadPage('list');
    });
}

function readyComicFunctions() {
    $('.add').on('click', createComicJSON);
    $('.del').on('click', (event) => {
        let thisComic = $(event.currentTarget).parent().parent();
        confirmDelete(thisComic);
    });
    $('.put').on('click', (event) => {
        let thisComic = $(event.currentTarget).parent().parent();
        updateComicJSON(thisComic);
    });
}

function sortData(data) {
    displayComic(data.comics);
    displayManga(data.manga);
    displayGNovel(data.graphicNovels);
    readyComicFunctions();
}

function getComics() {
    console.log('making GET request');
    $.ajax({
        url: '/api/comics',
        method: 'get',
        success: sortData
    });
}

function addComic(obj) {
    //POST function
    console.log('making POST request');
    $.ajax({
        url: '/api/comics',
        method: 'post',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(obj),
        success: loadPage('list')
    });
}

function readyFormButtons() {
    $('.cancel').on('click', () => {
        loadPage('list');
    });
    $('.js-add-comic').submit(event => {
        event.preventDefault();
        const thisType = $(event.currentTarget).find('#type').val();
        const thisTitle = $(event.currentTarget).find('#title').val();
        const thisAuthor = $(event.currentTarget).find('#author').val();
        const thisPubDate = $(event.currentTarget).find('#published').val();
        const thisPages = $(event.currentTarget).find('#pages').val();

        //mess with type later
        console.log(thisType);
        const postObject = {
            "title": {"English": thisTitle},
            "author": thisAuthor,
            "published": thisPubDate,
            "pages": thisPages
        };
        addComic(postObject);
    });
    $('.js-update-comic').submit(event => {
        event.preventDefault();
        const newRating = $(event.currentTarget).find('#rating').val();
        const newPagesRead = $(event.currentTarget).find('#pages-read').val();
    });
}

function createComicJSON() {
  $('main').html(`
    <form action="#" name="add-form" class="js-add-comic">
    <fieldset class="comic-info">
        <label for="type" class="comic-type">What kind of comic?</label>
        <select name="type" id="type" required>
            <option value="comic" selected>Comic</option>
            <option value="manga">Manga</option>
            <option value="graphic novel">Graphic Novel</option>
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
        <button type="submit" class="add-new-comic">Add this comic</button>
    </fieldset>
        
    </form>
    <button class="cancel">Back</button>
  `);
  readyFormButtons();
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
    default:
      console.log(`${page} is not a valid argument`);
      break;
  }
}

function readyNavButtons() {
  $('nav button').on('click', event => {
    let navButton = event.target.id;
    loadPage(navButton);
  });
}

$(readyNavButtons);
