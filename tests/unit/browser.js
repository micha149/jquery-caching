jQuery(function() {

   module('browser');

   /**
    * Tests the browsers local storage functionalities
    */
   test('LocalStorage', function() {

       ok(typeof window.localStorage == 'object', 'Local Storage exists');

   });

   /**
    * Tests the JSON helper object
    */
   test('JSON', function() {

       ok(typeof JSON == 'object', 'JSON object exists');
       ok(typeof JSON.stringify == 'function', 'JSON.stringify exists')
       ok(typeof JSON.parse == 'function', 'JSON.parse exists')
   });
   
});