;(function($) {
	$.widget('jQUI.themeSwitcher', {
		options: {
			themes: [ "Black Tie", "Blitzer", "Cupertino", "Dark Hive", "Dot Luv", "Eggplant", "Excite Bike", "Flick", "Hot Sneaks", "Humanity", "Le Frog", "Mint Choc", "Overcast", "Pepper Grinder", "Redmond", "Smoothness", "South Street", "Start", "Sunny", "Swanky Purse", "Trontastic", "Ui Darkness", "Ui Lightness", "Vader" ],
			version: '1.11.4'
		},
		_create: function() {
			this.url = "https://ajax.googleapis.com/ajax/libs/jqueryui/{version}/themes/{theme}/jquery-ui.min.css";
			this.urlRegExp = new RegExp("https:\/\/ajax\.googleapis\.com\/ajax\/libs\/jqueryui\/[^/]+\/themes\/[^/]+\/jquery-ui.min.css", "i");
			var $this = $(this.element);
			if (!$this.hasClass("jqui-theme-switcher")) {
				$this.addClass("jqui-theme-switcher");
				var current = $this.data("current");
				$.each(this.options.themes, function(i,v) {
					var val = v.toLowerCase().replace(/ /g, "-"),
						opt = $("<option />", { text: v, val: val });
					if (val == current) {
						$this.data("current", val);
						opt.prop("selected", true);
					}
					$this.append(opt);
				});
				this._on(this.element, {
					'input': "_onInput"
				});
			}
		},
		_onInput: function(e) {
			var widget = this,
				opts = this.options,
				url = this.url,
				$this = $(this.element),
				current = $this.data("current"),
				val = $this.val().toLowerCase().replace(/ /g, "-");
			if (current != val) {
				var lnk = $("head link").filter(function(i) { return this.href.match(widget.urlRegExp) });
				lnk.length || (lnk = $("<link />", { rel: "stylesheet", type: "text/css" }).insertAfter("head link:last"));
				lnk.prop("href", url.replace(/\{version\}/, opts.version).replace(/\{theme\}/, val));
				$this.data("current", val);
			}
		}
	});
})(jQuery);
