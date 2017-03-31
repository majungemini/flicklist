

var model = {
  watchlistItems: [],
  browseItems: []
}


var api = {

  root: "https://api.themoviedb.org/3",
  token: "cfe40e8b2740ff789f2e45958bea74bc", // TODO 0 add your api key

  /**
   * Given a movie object, returns the url to its poster image
   */
  posterUrl: function(movie) {
    // TODO 4b
    // implement this function

    var baseImageUrl = "http://image.tmdb.org/t/p/w300/";
    return baseImageUrl + movie.poster_path;
    }
}


/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
  $.ajax({
    url: api.root + "/discover/movie",
    data: {
      api_key: api.token
    },
    success: function(response) {
      model.browseItems = response.results;
      callback(response);
      console.log(response);
    }
  });
}


/**
 * Makes an AJAX request to the /search endpoint of the API, using the
 * query string that was passed in
 *
 * if successful, updates model.browseItems appropriately and then invokes
 * the callback function that was passed in
 */
function searchMovies(query, callback) {
  $.ajax({
    url: api.root + "/search/movie",
    data: {
      api_key: api.token,
      query: query
    },
    success: function(response) {
      model.browseItems = response.results;
      callback(response);
    }
  });
}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {

  // clear everything
  $("#section-watchlist ul").empty();
  $("#section-browse ul").empty();

  // insert watchlist items
  model.watchlistItems.forEach(function(movie) {
    var title = $("<h6></h6>").text(movie.original_title);


    // TODO 1
    // add an "I watched it" button and append it below the title
    // Clicking should remove this movie from the watchlist and re-render
    var button = $("<button/>")
                  .text("I watched it")
                //   .attr("class", "btn btn-danger")
                  .click(function(){
                      model.watchlistItems.splice(model.watchlistItems.indexOf(movie),1);
                   render();
                  });



    // var removeButton = $(<button class="btn btn-danger">Remove</button>)
    //                     .click(function(){
    //                         var idx=model.watchlistItems.indexOf(movie);
    //                         model.watchlistItems.splice(idx.1);
                           // render();
    //                     })



    // TODO 2i
    // apply the classes "btn btn-danger" to the "I watched it button"
        button.addClass("btn btn-danger");
    // TODO 4a
    // add a poster image and append it inside the
    // panel body above the button
        poster = $("<img/>").attr("src",api.posterUrl(movie))
                    .attr("class","img-responsive");

    // TODO 2g
    // re-implement the li as a bootstrap panel with a heading and a body
    var header = $('<div class="panel-heading"/>').append(title);
    var body = $('<div class="panel-body"/>')
                .append(poster)
                .append(button);
    var itemView = $("<li class='panel panel-default'></li>")
        .append(header)
        .append(body);

    //   .append(removeButton)
    //  .attrClass("item-watchlist");
    //   itemView.addclass("list-group-item");

    $("#section-watchlist ul").append(itemView);
  });

  // insert browse items
  model.browseItems.forEach(function(movie) {

    // TODO 2d continued
    // style this list item to look like the demo
    // You'll also need to make changes in index.html.
    // use the following BS classes:
    // "list-group", "list-group-item", btn", "btn-primary",

    var title = $("<h4></h4>").text(movie.original_title);

    var button = $("<button></button>")
      .text("Add to Watchlist")
      .click(function() {
        model.watchlistItems.push(movie);
        render();
      })
      .prop("disabled", model.watchlistItems.indexOf(movie) !== -1)
      .addClass('btn btn-primary');

    var overview = $("<p></p>").text(movie.overview);

    // append everything to itemView, along with an <hr/>
    var itemView = $("<li></li>")
      .append(title)
      .append(overview)
      .append(button)
      .addClass("list-group-item");

    // append the itemView to the list
    $("#section-browse ul").append(itemView);
  });

}


// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});
