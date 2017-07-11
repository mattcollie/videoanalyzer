// possible solution
// https://stackoverflow.com/questions/17546633/enabling-youtube-playback-with-video-js-wrapper

function loaded() {
    console.log('DEBUG:: loaded()');
    var analyzer = new GameAnalyzer();
    document.getElementById('analyzer').appendChild(analyzer);
}