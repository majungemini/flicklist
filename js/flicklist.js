

var model = {
  watchlistItems: [],
  browseItems: []
}


var api = {
  root: "https://api.themoviedb.org/3",
  token: "cfe40e8b2740ff789f2e45958bea74bc" // TODO 0 put your api key here
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
			api_key: api.token,
		},
		success: function(response) {
			console.log("We got a response from The Movie DB!");
			console.log(response);
            debugger;
			// TODO 2
			// update the model, setting its .browseItems property equal to the movies we recieved in the response
            // response.results.forEach(result){
            //     model.browseItems.push(result);
            // }
            // model.browseItems = response.results;
            response.results.forEach(function(movie){
                model.browseItems.push(movie.title);
            })
			// invoke the callback function that was passed in.
			callback();
		}
	});

}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {
  // TODO 7
  // clear everything from both lists
        // model.watchlistItems = [];
        // model.browseItems = [];
        $("#section-watchlist > ul").empty();
        $("#section-browse > ul").empty();
  // TODO 6
  // for each movie on the user's watchlist, insert a list item into the <ul> in the watchlist section
  model.watchlistItems.forEach(function(movie){
      var li= $('<li />').text(movie);
      $("#section-watchlist > ul").append(li);
  });
  // for each movie on the current browse list,
  model.browseItems.forEach(function(movie) {
		// TODO 3
		// insert a list item into the <ul> in the browse section
        // $("#section-watchlist ul").append('<li>' + movie  + '</li>')

        var li=$('<li />');
        li.text(movie);
        var button=$('<button />');
        button.text("Add to Watchlist");
        // button.click(function(){
        //     model.watchlistItems.push(movie);
        //     render();
        // });
        // $('li').append(button);
        // $("#section-browse > ul").append(li);

        li.append(button);
        $("#section-browse > ul").append(li);
        });

        // $('#section-browse > ul button').on('click', function(movie){
        //     model.watchlistItems.push(movie);
        //     render();

        $('#section-browse > ul button').off();
        $('#section-browse > ul button').on('click', function(evt){
         console.log('hi there')
         var movie = $($(evt.target).parent()[0].childNodes[0]).text();
         model.watchlistItems.push(movie);
         render();



		// TODO 4
		// the list item should include a button that says "Add to Watchlist"
        // .append('<button value="Add to Watchlist">Add to Watchlist</button>');

        // TODO 5
		// when the button is clicked, this movie should be added to the model's watchlist and render() should be called again

        // $("button").onEvent("clicked",function(){
        //     model.watchlistItems.push(movie);
        //
        // })
  });

}


// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});
