(function() {
    function GameAnalyzer() {
        var _content = {
            onYouTubeIframeAPIReady: APIReady,
            get analyzer() {
                loadAfter();
                return _container;
            }
        },
        _container = createElement('div', {}, { 
            backgroundColor: 'black', 
            height:'600px', 
            width: '600px'
        }),
        _points = {
            kicks: { value: 0, records: [] },
            passes: { value: 0, records: [] },
            trys: { value: 5, records: [] },
            conversions: { value: 2, records: [] }
        },
        _player;

        var videoPlayer = createElement('div', { id: ('video-' + Math.floor(Math.random() * 1000000)) });
        _container.appendChild(videoPlayer);
        
        buildActions();

        return _content;

        function APIReady() {
            console.log('DEBUG:: hit');
            console.log(videoPlayer.id);
            _player = new YT.Player(videoPlayer.id, {
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

        function buildActions() {
            var actionPanel = createElement('div', { class: 'panel panel-primary' });
            var actionHeading = createElement('div', { class: 'panel-heading' });
            actionHeading.textContent = 'Actions';
            var actionBody = createElement('div', { class: 'panel-body' });
            actionPanel.appendChild(actionHeading);
            actionPanel.appendChild(actionBody);
            actionBody.appendChild(createAction('Kick', { class: 'btn btn-default'}, function() { _points.kicks.records.push({time: _player.getCurrentTime()}); }));
            actionBody.appendChild(createAction('Pass', { class: 'btn btn-default'}, function() { _points.passes.records.push({time: _player.getCurrentTime()}); }));
            actionBody.appendChild(createAction('Try', { class: 'btn btn-default'}, bindKeyPress(49, function() { 
                var time = { time: _player.getCurrentTime() };
                _points.trys.records.push(time);
                var content = createElement();
                content.appendChild(createAction('Try: ' + _points.trys.records.length + ' time: ' + Math.floor(time.time) + 's', { class: 'btn btn-default'}, function() { 
                    _player.seekTo(time.time);
                }));
                actionPanel.appendChild(content);
            })));
            actionBody.appendChild(createAction('Conversion', { class: 'btn btn-default'}, bindKeyPress(50, function() { 
                var time = { time: _player.getCurrentTime() };
                _points.conversions.records.push(time);
                var content = createElement();
                content.appendChild(createAction('Conversion: ' + _points.conversions.records.length + ' time: ' + Math.floor(time.time) + 's', { class: 'btn btn-default'}, function() { 
                    _player.seekTo(time.time);
                }));
                actionPanel.appendChild(content);
            })));
            _container.appendChild(actionPanel);
        }
    }

    function videoReady() {

    }

    function loadAfter() {
        var script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.type = "text/javascript";
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    function bindKeyPress(key, callback) {
        document.addEventListener('keypress', function(e) {
            if(e.keyCode == key)
                callback();
        });
        return callback;
    }

    function createAction(name, attributes, action = function defaultAction() { console.log('DEBUGG:: ' + name + ' clicked'); }) {
        var element = createElement('div', attributes);
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