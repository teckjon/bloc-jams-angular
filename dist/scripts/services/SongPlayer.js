 (function() {
     function SongPlayer(Fixtures) {
          var SongPlayer = {};
         
          var currentAlbum = Fixtures.getAlbum();
         
          var getSongIndex = function(song) {
              return currentAlbum.songs.indexOf(song);
          };

/**
* @desc Active song object from list of songs
* @type {Object}
*/         
     SongPlayer.currentSong = null;
     var currentBuzzObject = null;
 /**
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
 */
    var setSong = function(song) {
     if (currentBuzzObject) {
        currentBuzzObject.stop();
        currentSong.playing = null;
    }
 
    currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
    });
 
    currentSong = song;
    };         
     /**
    * @function play song
    * @desc Plays Current song
    */
     SongPlayer.play = function(song) {
         song = song || SongPlayer.currentSong;
         if (currentSong !== song) {
            setSong(song);
         currentBuzzObject.play(); 
         
             song.playing = true;     
        } else if (currentSong === song) {
            if (currentBuzzObject.isPaused()) {
                currentBuzzObject.play();
            }
        }    
     };
    /**
    * @function Pause Song
    * desc Pause song
    */
    SongPlayer.pause = function(song) {        
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
            pauseSong(song);
    };
    
    /**
    * @function Plays previous song
    */
    SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
             
            if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
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
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();