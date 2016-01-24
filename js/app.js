function em_link(name, fst, snd, tag) {
	var em_fst = String.fromCharCode.apply(this, fst);
	var em_tag = '+' + tag;// + (Math.random().toString(16).substr(2, 2));
	var em_snd = String.fromCharCode.apply(this, snd);
	var em = [em_fst, em_snd].join('');
	var em_tagged = [em_fst, em_tag, em_snd].join('');
	return '<a href="mailto:' + name + ' <' + em_tagged + '>" title="Email me">' + em + '</a>';
}

function make_tooltip(el, content) {
	var parent_el = el.parentNode;
	var tooltip_el = document.createElement('span');
	tooltip_el.innerHTML = content;
	tooltip_el.setAttribute('data-tooltip', '');
	parent_el.appendChild(tooltip_el);

	el.onmouseover = function() {
		tooltip_el.className += ' visible';
	};

	el.onmouseout = function() {
		tooltip_el.className = tooltip_el.className.replace(/\s*visible/, '');
	};
}

contentLoaded(window, function() {
	var resume_link = document.getElementById('resume_url');
	make_tooltip(resume_link, resume_link.title);
	resume_link.title = '';


	// if we don't have the vh units
	// var landing_page_margin = 50;
	// var landing_page = document.getElementsByTagName('header')[0];
	// landing_page.style.height = (window.innerHeight - 2*landing_page_margin) + 'px';
	// landing_page.style.marginTop = landing_page_margin + 'px';
	// landing_page.style.marginBottom = landing_page_margin + 'px';

	// var bg_image = document.createElement('div');
	// bg_image.style.zIndex = '-1000';
	// bg_image.style.width = '100%';
	// bg_image.style.height = landing_page.style.height;
	// // bg_image.style.background = 'transparent url("bg.jpg") no-repeat scroll center center / cover';
	// bg_image.style.position = 'absolute';
	// bg_image.style.top = '0';
	// bg_image.style.left = '0';
	// document.body.appendChild(bg_image);

	// "fix" the easter egg
	document.getElementById('what-a-guy').onmouseover = function(e) {
		e.target.className += ' fixed';
		delete document.getElementById('what-a-guy').onmouseover;
	};
});

function contentLoaded(win, fn) {
	// https://github.com/dperini/ContentLoaded/blob/master/src/contentloaded.js
	// Updated: 20101020
	var done = false,
		top = true,
		doc = win.document,
		root = doc.documentElement,
		add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
		rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
		pre = doc.addEventListener ? '' : 'on',
		init = function(e) {
			if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
			(e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
			if (!done && (done = true)) fn.call(win, e.type || e);
		},
		poll = function() {
			try {
				root.doScroll('left');
			} catch (e) {
				setTimeout(poll, 50);
				return;
			}
			init('poll');
		};
	if (doc.readyState == 'complete') fn.call(win, 'lazy');
	else {
		if (doc.createEventObject && root.doScroll) {
			try {
				top = !win.frameElement;
			} catch (e) {}
			if (top) poll();
		}
		doc[add](pre + 'DOMContentLoaded', init, false);
		doc[add](pre + 'readystatechange', init, false);
		win[add](pre + 'load', init, false);
	}
}