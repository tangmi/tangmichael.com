React.renderComponent(
	<h1>Hello, world!</h1>,
	document.getElementById('example')
);

$(window).resize(() => {
	console.log($(window).height());
	$('.top').height($(window).height());
});

$(window).resize();

// make a function that runs some `fn` at quickest, at some
// interval `time` (in ms) 
var makeLimiter = function(fn, time) {
	var isRunning = false;
	return function(ctx, args) {
		if (!isRunning) {
			fn.apply(ctx, args);
			isRunning = true;
			setTimeout(function() {
				isRunning = false;
			}, time);
		}
	};
};

function print(message) {
	console.log('action', message);
}

var printLimiter = makeLimiter(print, 500);
$(window).keypress(function(e) {
	console.log(e.key);
	printLimiter(this, [e.key]);
});