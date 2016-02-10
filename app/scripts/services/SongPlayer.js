 (function () {
     function SongPlayer(Fixtures) {
         var SongPlayer = {};

         var currentAlbum = Fixtures.getAlbum();
         /**
          * @desc Buzz object audio file
          * @type {Object}
          */
         var currentBuzzObject = null;

         /**
          * @function setSong
          * @desc Stops currently playing song and loads new audio file as currentBuzzObject
          * @param {Object} song
          */
         var setSong = function (song) {
             if (currentBuzzObject) {
                 currentBuzzObject.stop();
                 SongPlayer.currentSong.playing = null;
             }

             currentBuzzObject = new buzz.sound(song.audioUrl, {
                 formats: ['mp3'],
                 preload: true
             });

             SongPlayer.currentSong = song;
         };
         /**
          * @function playSong
          * @desc Plays a song
          * @param {Object} song
          */
         var playSong = function (song) {
             currentBuzzObject.stop();
             song.playing = true;
         };
         /**
          * @function getSongIndex
          * @desc Gets index of current song
          * @param {Object} song
          */
         var getSongIndex = function (song) {
             return currentAlbum.songs.indexOf(song)
         };

         /** 
          * @function stopSong
          * @desc Stops the currently playing song
          * @param {Object} song
          */
         var stopSong = function(song) {
             currentBuzzObject.stop();
             song.playing = null;
         };
         
         SongPlayer.currentSong = null;

         SongPlayer.play = function (song) {
             song = song || SongPlayer.currentSong;
             if (SongPlayer.currentSong !== song) {
                 setSong(song);
                 playSong(song);
             }
         };


         SongPlayer.pause = function (song) {
             song = song || SongPlayer.currentSong;
             currentBuzzObject.pause();
             song.playing = false;
         };

         /**
          * @controller SongPlayer.previous
          * @desc Plays the previous song
          * @param {Object} song
          */
         SongPlayer.previous = function () {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex--;

             if (currentSongIndex < 0) {
                 stopSong(SongPlayer.currentSong);
             } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
             }
         };

         SongPlayer.next = function () {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex++;

             var lastSongIndex = currentAlbum.songs.length - 1;

             if (currentSongIndex > lastSongIndex) {
                 stopSong(SongPlayer.currentSong);
             } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
             }
         };
         return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();