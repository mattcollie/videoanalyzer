(function() {
    function GameAnalyzer() {
        var _content = {
                container: createElement('div', {}, { 
                    backgroundColor: 'black', 
                    height:'600px', 
                    width: '600px'
                }),
                onYouTubeIframeAPIReady: APIReady,
            },
            _player;
        
        var testAction = createAction('test');
        _content.container.appendChild(testAction);

        return _content;
    }

    function APIReady() {
        console.log('DEBUG:: hit');
        _player = new YT.Player('video-placeholder', {
            width: 600,
            height: 400,
            videoId: 'Xa0Q0J5tOP0',
            playerVars: {
                color: 'white',
                playlist: 'taJ60kskkns,FG0fTKAqZ5g'
            },
            events: {
                onReady: videoReady
            }
        });
    }

    function videoReady() {

    }

    function createAction(name, action = function defaultAction() { console.log('DEBUGG:: ' + name + ' clicked'); }) {
        var element = createElement('div', {}, { 
            backgroundColor: 'yellow', 
            height:'60px', 
            width: '60px',
            cursor: 'pointer'
        });
        element.textContent = name;
        element.addEventListener('click', action);
        return element;
    }

    function createElement(elementType = 'div', attributes = {}, styles = {}) {
        var element = document.createElement(elementType);
        applyAttributes(element, attributes);
        applyStyles(element, styles);
        return element;
    }

    function applyAttributes(element, attributes) {
        for(var attribute in attributes)
            element.setAttribute(attribute, attributes[attribute]);
    }

    function applyStyles(element, styles) {
        for(var style in styles)
            element.style[style] = styles[style];
    }

    if(window)
        window.GameAnalyzer = GameAnalyzer;
})();