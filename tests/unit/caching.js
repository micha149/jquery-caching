jQuery(function() {

   module('jquery-caching');

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
           expectedJQuery = jQuery('<div>').addClass('testClass').text('some text');
           expectedKey    = 'myTestKey';

       ok(typeof jQuery.caching.save == 'function', 'Save funtion exists');

       // Overload method to check if it is called by save()
       jQuery.caching.writeData = function() {
           ok(true, 'Write access to local storage');
       }

       jQuery.caching.save(expectedKey, expectedString);
       same(jQuery.caching.data[expectedKey].content, expectedString, 'String in Data hash');

       jQuery.caching.save(expectedKey, expectedObject);
       same(jQuery.caching.data[expectedKey].content, expectedObject, 'Object in Data hash');

       jQuery.caching.save(expectedKey, expectedJQuery);
       same(jQuery.caching.data[expectedKey].content, expectedJQuery, 'jQuery Object in Data hash');

   })

   test('GetCachedUnit', function() {
      Date.prototype.getTime = function() {
          return 100;
      }
      jQuery.caching.settings.cachetime = 3600;
      equal(jQuery.caching.getNewCachedUntil(), 3700, 'New Cached Until');
   });
   
});