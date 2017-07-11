function loaded() {
    console.log('DEBUG:: loaded()');
    var analyzer = new GameAnalyzer();
    document.getElementById('analyzer').appendChild(analyzer);
}