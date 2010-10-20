(function($) {

    jQuery.caching = {

        /**
         * Flag to determine, if a local storage is available
         *
         * @var {boolean} Storage available
         */
        cancache: (typeof window.localStorage != 'undefined'),

        /**
         * The cached data, identified by its keys
         *
         * @var {object} Data hash
         */
        data: {},

        /**
         * Cache settings
         *
         * @var {object} Settings hash
         */
        settings: {
            cachetime: 3600
        },

        /**
         * Sets the cache settings
         *
         * @param {object} options
         */
        setup: function(options) {
            var self = this;
            $.extend(self.settings, options);
        },

        getNewCachedUntil: function() {
            var self     = this,
                settings = self.settings,
                time     = new Date().getTime();
            return settings.cachetime + time;
        },

        save: function(key, data) {
            var self        = this,
                cacheObject = {
                    content: data,
                    cachedUnil: self.getNewCachedUntil(),
                    tags: []
                };

            self.data[key] = cacheObject;

            self.writeData();
        },

        /**
         * Writes data to localStorage
         */
        writeData: function() {
            var self = this;
            window.localStorage['jquery.caching'] = self.data;
        }
        
    }

})(jQuery);