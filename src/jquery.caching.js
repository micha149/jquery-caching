(function ($, undefined) {

    /**
     * jQuery Caching Utilities
     *
     * This object provides caching utilities for jQuery.
     */
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

        /**
         * Returns the timestamp on wich the new cache expires
         *
         * @return {integer} Timestamp
         */
        getNewCachedUntil: function() {
            var self     = this,
                settings = self.settings,
                time     = new Date().getTime();
            return settings.cachetime + time;
        },

        /**
         * Caches the given object using the given key.
         *
         * @param {string} key  Cache identiier
         * @param {mixed}  data Object or String to cache
         */
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
         * Writes data hash to browsers localStorage
         */
        writeData: function() {
            var self = this;
            if (self.cancache) {
                window.localStorage['jquery.caching'] = self.data;
            }
        }
        
    }

})(jQuery);