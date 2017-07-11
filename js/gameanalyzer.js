(function() {
    function GameAnalyzer() {
        var _content = {
            container: createElement('div', {}, {backgroundColor: 'black', height:'600px', width: '600px'})
        };
        
        var testAction = createAction('test');
        _content.container.appendChild(testAction);

        return _content.container;
    }

    function createAction(name, action = function defaultAction() { console.log('DEBUGG:: ' + name + ' clicked'); }) {
        var element = createElement('div', {}, {backgroundColor: 'yellow', height:'60px', width: '60px'});
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
            element[attribute] = attributes[attribute];
    }

    function applyStyles(element, styles) {
        for(var style in styles)
            element.style[style] = styles[style];
    }

    if(window)
        window.GameAnalyzer = GameAnalyzer;
})();