import {LitElement, html} from '@polymer/lit-element';
import colors from '../styles/colors.js';

export default class BsAlert extends LitElement {
	static get properties() {
		return {
			dismissable: Boolean,
		}
	}
	connectedCallback() {
		super.connectedCallback();
		if (!this.hasAttribute('class')) {
			this.setAttribute('class', 'secondary');
		}
		if (!this.hasAttribute('role')) {
			this.setAttribute('role', 'alert');
		}
	}

	_render() {
		return html`
			<style>
				:host {
					display: block;
				}
				:host([hidden]) {
					display: hidden;
				}
				:host {
					position: relative;
					padding: .75rem 1.25rem;
					margin-bottom: 1rem;
					border: 1px solid transparent;
					border-radius: .25rem;
				}
				:host([dismissable]) {
					padding-right: 4em;
				}
				:host([dismissable]) button {
					display: hidden;
				}
				button {
					position: absolute;
					top: 0;
					right: 0;
					padding: .75rem 1.25rem;
					border: 0;

					cursor: pointer;
					color: inherit;
					background-color: transparent;
					font-size: 1.5rem;
					font-weight: 700;
					line-height: 1;
					text-shadow: 0 1px 0 #fff;
					opacity: .5;
				}
				button:hover{
					color: #000;
					text-decoration: none;
					opacity: .75;
				}
				::slotted(a) {
					font-weight: 700;
				}
				/* important seems to be back to override parent scope */
				::slotted(:first-child) {
					margin-top: 0 !important;
				}
				::slotted(:last-child) {
					margin-bottom: 0 !important;
				}
				${colors.reduce((style, {selector, alertcolor, alertbg, alertborder}) => {
					return style + `
						:host(${selector}) {
							background-color: ${alertbg};
							color: ${alertcolor};
							border-color: ${alertborder};
							--bs-link-color: ${alertcolor};
						}`
				}, "")}
			</style>
			<slot></slot>
			<button
				type="button"
				aria-label="Close"
				on-click=${this.remove.bind(this)}>
				<span aria-hidden="true">&times;</span>
			</button>
		`;
	}

	remove() {
		super.remove();
		this.dispatchEvent(new CustomEvent('dismissed', {
			bubbles: false,
			composed: true,
		}));
	}

	set dismissable(value) {
		const isDismissable = Boolean(value);
		if (isDismissable) {
			this.setAttribute('dismissable', '');
		} else {
			this.removeAttribute('dismissable');
		}
	}
	get dismissable() {
		return this.hasAttribute('dismissable');
	}
}

customElements.define('bs-alert', BsAlert);