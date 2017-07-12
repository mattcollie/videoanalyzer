(function() {
    function GameAnalyzer() {
        var _content = {
            onYouTubeIframeAPIReady: APIReady,
            get analyzer() {
                loadAfter();
                return _container;
            },
            get points() {
                return {
                    get kicks() {
                        return _points.kicks.records.length;
                    },
                    get passes() {
                        return _points.passes.records.length;
                    },
                    get trys() {
                        return _points.trys.records.length;
                    },
                    get conversions() {
                        return _points.conversions.records.length;
                    },
                    get score() {
                        return Object.keys(_points).map(a => (_points[a].records.length * _points[a].value)).reduce((a,b) => a + b, 0);
                    }
                };
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
            conversions: { value: 3, records: [] }
        },
        _player;

        var videoPlayer = createElement('div', { id: ('video-' + Math.floor(Math.random() * 1000000)) });
        _container.appendChild(videoPlayer);
        
        buildActions();

        return _content;

        function bindKeyPress(key, callback) {
            document.addEventListener('keypress', function(e) {
                if(e.keyCode == key)
                    callback();
            });
            return callback;
        }

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

        function loadAfter() {
            var script = document.createElement("script");
            script.src = "https://www.youtube.com/iframe_api";
            script.type = "text/javascript";
            document.getElementsByTagName("head")[0].appendChild(script);
        }

        function buildActions() {
            var actionContainer = createElement();
            _container.appendChild(actionContainer);
            _container.appendChild(createAction('Kick', function() { _points.kicks.records.push({time: _player.getCurrentTime()}); }));
            _container.appendChild(createAction('Pass', function() { _points.passes.records.push({time: _player.getCurrentTime()}); }));
            _container.appendChild(createAction('Try', bindKeyPress(49, function() { 
                var time = { time: _player.getCurrentTime() };
                _points.trys.records.push(time);
                var content = createElement();
                content.appendChild(createAction('try: ' + _points.trys.records.length + ' time: ' + Math.floor(time.time) + 's', function() { 
                    _player.seekTo(time.time);
                }));
                actionContainer.appendChild(content);
            })));
            _container.appendChild(createAction('Conversion', bindKeyPress(50, function() { 
                var time = { time: _player.getCurrentTime() };
                _points.conversions.records.push(time);
                var content = createElement();
                content.appendChild(createAction('Conversion: ' + _points.conversions.records.length + ' time: ' + Math.floor(time.time) + 's', function() { 
                    _player.seekTo(time.time);
                }));
                actionContainer.appendChild(content);
            })));
            _container.appendChild(createAction('Show Score', function() { alert('score: ' + _content.points.score); }));
        }
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