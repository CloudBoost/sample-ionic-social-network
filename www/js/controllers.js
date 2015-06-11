angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$rootScope) { 
  

  $scope.savePost = function(text){
    var post = new CB.CloudObject('Feed');
    post.set('text',text);
    post.save({
      success : function (post){
        //success
      },error : function(error){
        var myPopup = $ionicPopup.show({
          title: 'Oops! We cant save the post right now.',
          scope: $scope,
          buttons: [
            { text: 'Ok' }
          ]
        });
      }
    });
  },

  $scope.init = function(){

      $scope.posts = [];

      CB.CloudObject.on('Feed','created', function(post){
        $scope.posts = [post].concat($scope.posts);
      });

      var query = new CB.CloudQuery('Feed');
      query.orderByDesc('createdBy');
      query.find({
        success : function(list){
            //list is an array of CloudObject. 
            $scope.posts = list;

            $scope.$digest();
        }, error : function(error){
           var myPopup = $ionicPopup.show({
            title: 'Oops! We cannot get the list of posts right now.',
            scope: $scope,
            buttons: [
              { text: 'Ok' }
            ]
          });
        }
      });     

  }

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
