import '@testing-library/jest-dom';

if (typeof HTMLFormElement.prototype.requestSubmit !== 'function') {
    HTMLFormElement.prototype.requestSubmit = function () {
        if (this.checkValidity()) {
            this.submit();
        }
    };
}
