// possible solution
// https://stackoverflow.com/questions/17546633/enabling-youtube-playback-with-video-js-wrapper
// https://tutorialzine.com/2015/08/how-to-control-youtubes-video-player-with-javascript

function loaded() {
    console.log('DEBUG:: loaded()');
    var analyzer = new GameAnalyzer();
    document.getElementById('analyzer').appendChild(analyzer);
}