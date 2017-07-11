// possible solution
// https://stackoverflow.com/questions/17546633/enabling-youtube-playback-with-video-js-wrapper
// https://tutorialzine.com/2015/08/how-to-control-youtubes-video-player-with-javascript

var analyzer = new GameAnalyzer();
var onYouTubeIframeAPIReady = analyzer.onYouTubeIframeAPIReady;
function loaded() {
    console.log('DEBUG:: loaded()');
    document.getElementById('analyzer').appendChild(analyzer.analyzer);
}
