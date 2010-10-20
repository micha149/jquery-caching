jQuery(function() {

   module('browser');

   test('LocalStorage', function() {

       ok(typeof window.localStorage == 'object', 'Local Storage exists');

   });
   
});