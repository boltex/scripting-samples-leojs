(function () {

    const vscode = acquireVsCodeApi();

    window.addEventListener('message', (event) => {
        const message = event.data; // The json data
        switch (message.toMyWebview) {
            case 'hello':
                console.log('Webview Got Hello');
                break;
            case 'hi':
                console.log('Webview Got hi');
                break;
            case 'sendEvent':
                receivedData(message.package);
                break;
            default:
                console.log('Webview got some message');
        }
    });

    vscode.postMessage({ fromMyWebview: 'myWebviewMessage' });

    // Setup button click action
    const myButton = document.getElementById("myButton");
    if (myButton) {
        myButton.addEventListener("click", sendData);
    }

    function sendData() {
        const selectEl = document.getElementById("mySelect");
        const inputEl = document.getElementById("myInput");
        const checkbox1El = document.getElementById("myCheckbox1");
        const checkbox2El = document.getElementById("myCheckbox2");
        const radioEl = document.querySelector('input[name="myRadioScope"]:checked');
        const formValues = {
            select: selectEl ? selectEl.value : undefined,
            input: inputEl ? inputEl.value : undefined,
            checkbox1: checkbox1El ? checkbox1El.checked : undefined,
            checkbox2: checkbox2El ? checkbox2El.checked : undefined,
            radio: radioEl ? radioEl.value : undefined,
        };
        vscode.postMessage(
            {
                fromMyWebview: 'myButtonPressed',
                data: formValues
            }
        );
    }

    function receivedData(data) {
        const selectEl = document.getElementById("mySelect");
        const inputEl = document.getElementById("myInput");
        const checkbox1El = document.getElementById("myCheckbox1");
        const checkbox2El = document.getElementById("myCheckbox2");
        const radioEl = document.querySelector(`input[name="myRadioScope"][value="${data.radio}"]`);
        if (selectEl) selectEl.value = data.select;
        if (inputEl) inputEl.value = data.input;
        if (checkbox1El) checkbox1El.checked = data.checkbox1;
        if (checkbox2El) checkbox2El.checked = data.checkbox2;
        if (radioEl) radioEl.checked = true;
    }

})();
