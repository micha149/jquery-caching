jQuery(function() {

   module('jquery-caching');

   /**
    * Tests if the object is available
    */
   test('Plugin available', function() {

       ok(typeof jQuery.caching == 'object', 'Object exists');
       ok(jQuery.caching.cancache, 'LocalStorage available');

   });

   /**
    * Tests save method
    */
   test('Save', function() {

       expect(7);

       var expectedString = 'This is a simple Teststring',
           expectedObject = { key1: 'value1', key2: 'value2'},
           expectedJQuery = jQuery('<div>').addClass('testClass').text('some text'),
           expectedKey    = 'myTestKey',
           originalWriteData = jQuery.caching._writeData;

       ok(typeof jQuery.caching.save == 'function', 'Save funtion exists');

       // Overload method to check if it is called by save()
       jQuery.caching._writeData = function() {
           ok(true, 'Write access to local storage');
       }

       jQuery.caching.save(expectedKey, expectedString);
       same(jQuery.caching.data[expectedKey].content, expectedString, 'String in Data hash');

       jQuery.caching.save(expectedKey, expectedObject);
       same(jQuery.caching.data[expectedKey].content, expectedObject, 'Object in Data hash');

       jQuery.caching.save(expectedKey, expectedJQuery);
       same(jQuery.caching.data[expectedKey].content, expectedJQuery, 'jQuery Object in Data hash');

       // Restore write data method
       jQuery.caching._writeData = originalWriteData;
   })

   /**
    * Tests calculation of the cache until time
    */
    test('GetCachedUntil', function() {

        var originalGetTime = Date.prototype.getTime;
        expect(4);

        // Overload getTime function to get a specific result
        Date.prototype.getTime = function() {
            ok(true, 'Date.getTime() called');
            return 10000;
        }

        equal(jQuery.caching.getNewCachedUntil(), 13600, 'Get timestamp with default cachetime');

        jQuery.caching.setup({ cachetime: 84000 });
        equal(jQuery.caching.getNewCachedUntil(), 94000, 'Get timestamp with custom cachetime');

        // Restore original getTime function
        Date.prototype.getTime = originalGetTime;
    });
   
    /**
     * Tests writing to local storage
     */
    test('_writeData', function() {
        var expectedData = {
            'testKey': {
                'key': 'testKey',
                'content': "Test Data",
                'tags': ['tagA', 'tagB']
            }
        };

        jQuery.caching.data = expectedData;
        jQuery.caching._writeData();

        var actualData = JSON.parse (window.localStorage['jquery.caching']);
        same(actualData, expectedData, 'Expected object found in local Storage');
    });

});