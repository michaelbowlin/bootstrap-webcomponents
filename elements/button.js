import {LitElement, html} from '@polymer/lit-element';
import colors from '../styles/colors.js';

const variants = colors.reduce((style, {name, color, contrast}) => {
    return style + `
        :host([${name}]:not([outline])) {
            background-color: var(--bs-${name}-color, ${color});
            color: var(--bs-${name}-contrast, ${contrast});
        }
        :host([${name}]:focus:not([disabled])) {
            box-shadow: 0 0 0 .2rem ${color}50;
        }
        :host([${name}][outline]) {
            color: var(--bs-${name}-color, ${color});
            border-color: var(--bs-${name}-color, ${color});
        }
        :host([${name}][outline]:hover:not([disabled])), :host([${name}][outline][active]) {
            background-color: var(--bs-${name}-color, ${color});
            color: var(--bs-${name}-contrast, ${contrast});
            filter: none;
        }`
}, "");

class BsButton extends LitElement {
    static get properties() { 
        return { 
            disabled: Boolean,
            active: Boolean,
        }
    }

    _render() {
        return html`
            <style>
                :host(:not([hidden])) {
                    display: inline-block;
                }
                :host(:not([disabled])) {
                    cursor: pointer;
                }
                :host(:focus) {
                    outline: none;
                }
                :host {
                    font-size: 1rem;
                    padding: .375em .75em;
                    text-align: center;
                    white-space: nowrap;
                    vertical-align: middle;
                    border: 1px solid transparent;
                    border-radius: var(--bs-border-radius, .25em);
                    line-height: 1.5;
                    transition: 
                        color .15s ease-in-out, 
                        background-color .15s ease-in-out, 
                        border-color .15s ease-in-out, 
                        box-shadow .15s ease-in-out, 
                        filter .15s ease-in-out;
                }
                :host(:hover:not([disabled])), :host([active]:not([disabled])) {
                    filter: brightness(0.85);
                }
                :host([disabled]) {
                    opacity: 0.65;
                }
                :host([small]) {
                    font-size: .875rem;
                }
                :host([large]) {
                    font-size: 1.25rem;
                }
                ${variants}
            </style>
            <slot></slot>
        `;
    }

    connectedCallback() {
        super.connectedCallback();

        if (!this.hasAttribute('role')) {
            this.setAttribute('role', 'button');
        }
        if (!this.hasAttribute('tabindex')) {
            this.setAttribute('tabindex', 0);
        }
    }

    set active(value) {
        const isActive = Boolean(value);
        if (isActive) {
            this.setAttribute('active', '');
        } else {
            this.removeAttribute('active');
        }
        this.setAttribute('aria-pressed', isActive);
    }
  
    get active() {
        return this.hasAttribute('active');
    }
  
    set disabled(value) {
        const isDisabled = Boolean(value);
        if (isDisabled) {
            this.setAttribute('disabled', '');
        } else {
            this.removeAttribute('disabled');
        }

        this.setAttribute('aria-disabled', isDisabled);

        if (isDisabled) {
            this.removeAttribute('tabindex');
            // If the focus is currently on this element, unfocus it by
            // calling the `HTMLElement.blur()` method.
            this.blur();
        } else {
            this.setAttribute('tabindex', '0');
        }
    }
  
    get disabled() {
        return this.hasAttribute('disabled');
    }
}

customElements.define('bs-button', BsButton);