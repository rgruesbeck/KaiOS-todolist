const Koji = require('@withkoji/vcc').default;

const styles = `
    * {
        font-family: ${Koji.config.settings.fontFamily};
    }

    body {
        background-color: ${Koji.config.colors.bodyBackground};
        color: ${Koji.config.colors.textColor};
        margin: 0;
    }

    .container {
      display: flex;
      flex-direction: column;
      height: 100%;
      margin: 5px;
    }

    ul {
      padding: 0;
    }

    li {
        list-style: none;
    }

    .task {
        display: flex;
        flex-direction: row;
    }

    .task-mark {
        flex: 0;
    }

    .task-name {
        flex: 1;
    }

    .task-close {
        flex: 0;
    }

    .input {
      position: absolute;
      bottom: 0;
      width: 100%;
      display: flex;
      flex-direction: row;
    }

    .input input {
      flex: 1;
    }

    .input button {
      flex: 0;
    }

`;

module.exports.default = styles;
