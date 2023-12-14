import END_HTML from './pages/end_game.html'
export function end_game(document, points) {
    let end_message = document.createElement('div');
    end_message.id = 'ending-message';
    end_message.innerHTML = END_HTML;
    document.body.appendChild(ending)

}