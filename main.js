import { interpolate } from "flubber";
import { styler, tween } from "popmotion";
import { LitElement, html } from "@polymer/lit-element";

class MyMorph extends LitElement {
  static get properties() {
    return {
      startPath: { type: String },
      endPath: { type: String },
      morphed: { type: Boolean }
    };
  }
  render() {
    return html`
      <svg width="200" height="200">
        <path id="target" />
      </svg>
      <button @click="${() => this.Morph()}">DoMorph</button> `;
  }

  firstUpdated() {
    let target = this.shadowRoot.querySelector("#target");
    target.setAttribute("d", this.startPath);
  }

  Morph() {
    let morph;

    if (!this.morphed) {
      morph = interpolate(this.startPath, this.endPath, {
        maxSegmentLength: 2
      });
    } else {
      morph = interpolate(this.endPath, this.startPath, {
        maxSegmentLength: 2
      });
    }
    this.morphed = !this.morphed;

    let target = this.shadowRoot.querySelector("#target");
    let shape = styler(target).set("d");

    tween({ duration: 600 })
      .pipe(morph)
      .start(shape);
  }
}

customElements.define("my-morph", MyMorph);
