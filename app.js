const Storage = require('./storage.js').default;

class App {
    constructor(root, config) {
        this.root = root;
        this.config = config;

        this.storage = new Storage(config.settings.name)
        this.state = {
            data: this.storage.list()
        };

        this.addClickHandler();
        this.render();
    }

    addClickHandler() {
        document.addEventListener('click', (event) => {
            if (event.target.matches('#addTask')) {
                let todo = event.target.previousElementSibling.value
                this.add(todo)
            }

            if (event.target.matches('#markTask')) {
                let id = event.target.parentElement.id;
                this.mark(id)
            }

            if (event.target.matches('#removeTask')) {
                let id = event.target.parentElement.id;
                this.remove(id)
            }

        }, false);
    }

    add(todo) {
        if (!todo) { return; }

        this.setState({
            data: this.storage.add({
                name: todo,
                done: false
            }),
        })
    }

    mark(id) {

        this.setState({
            data: this.storage.update(id, (data) => {
                return {
                    done: !data.done
                };
            })
        })
    }

    remove(id) {

        this.setState({
            data: this.storage.remove(id)
        })
    }

    setState(state) {
        // create updates
        let updates = {
            ...this.state,
            ...state
        }

        // reject non-changes
        if (JSON.stringify(updates) === JSON.stringify(this.state)) { return; }

        // update state and re-render
        this.state = updates;
        this.render();
    }

    render() {
        this.root.innerHTML = `
        <h1>${this.config.settings.name}</h1>
        <ul>
            ${this.state.data.map(task => {
                return `
                    <li id=${task.id} class="task">
                        <input id="markTask" class="task-mark" type="checkbox" ${task.data.done && 'checked'}>
                        <div class="task-name">${task.data.name}</div>
                        <div id="removeTask" class="task-close">X</div>
                    </li>
                `
            }).join('')}
        </ul>
        <div class="input">
            <input id="taskInput"></input>
            <button id="addTask">${this.config.settings.addText}</button>
        </div>
        `
    }
}

module.exports.default = App;