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
            let { action } = event.target.dataset;
            if (!action) { return; }

            // add todo
            if (action === 'addTask') {
                let todo = event.target.previousElementSibling.value
                this.add(todo)
            }

            // mark todo
            if (action === 'markTask') {
                let id = event.target.parentElement.id;
                this.mark(id)
            }

            // remove todo
            if (action === 'removeTask') {
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
                        <input data-action="markTask" class="task-mark" type="checkbox" ${task.data.done && 'checked'}>
                        <div class="task-name">${task.data.name}</div>
                        <div data-action="removeTask" class="task-close">X</div>
                    </li>
                `
            }).join('')}
        </ul>
        <div class="input">
            <input data-action="taskInput"></input>
            <button data-action="addTask">${this.config.settings.addText}</button>
        </div>
        `
    }
}

module.exports.default = App;