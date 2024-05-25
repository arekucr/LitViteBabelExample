(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2 = globalThis, e$2 = t$2.ShadowRoot && (void 0 === t$2.ShadyCSS || t$2.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s$2 = Symbol(), o$3 = /* @__PURE__ */ new WeakMap();
let n$3 = class n {
  constructor(t2, e2, o2) {
    if (this._$cssResult$ = true, o2 !== s$2)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e2;
  }
  get styleSheet() {
    let t2 = this.o;
    const s2 = this.t;
    if (e$2 && void 0 === t2) {
      const e2 = void 0 !== s2 && 1 === s2.length;
      e2 && (t2 = o$3.get(s2)), void 0 === t2 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), e2 && o$3.set(s2, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
};
const r$4 = (t2) => new n$3("string" == typeof t2 ? t2 : t2 + "", void 0, s$2), i$2 = (t2, ...e2) => {
  const o2 = 1 === t2.length ? t2[0] : e2.reduce((e3, s2, o3) => e3 + ((t3) => {
    if (true === t3._$cssResult$)
      return t3.cssText;
    if ("number" == typeof t3)
      return t3;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s2) + t2[o3 + 1], t2[0]);
  return new n$3(o2, t2, s$2);
}, S$1 = (s2, o2) => {
  if (e$2)
    s2.adoptedStyleSheets = o2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet);
  else
    for (const e2 of o2) {
      const o3 = document.createElement("style"), n3 = t$2.litNonce;
      void 0 !== n3 && o3.setAttribute("nonce", n3), o3.textContent = e2.cssText, s2.appendChild(o3);
    }
}, c$2 = e$2 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const s2 of t3.cssRules)
    e2 += s2.cssText;
  return r$4(e2);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const {
  is: i$1,
  defineProperty: e$1,
  getOwnPropertyDescriptor: r$3,
  getOwnPropertyNames: h$1,
  getOwnPropertySymbols: o$2,
  getPrototypeOf: n$2
} = Object, a$1 = globalThis, c$1 = a$1.trustedTypes, l$1 = c$1 ? c$1.emptyScript : "", p$1 = a$1.reactiveElementPolyfillSupport, d$1 = (t2, s2) => t2, u$1 = {
  toAttribute(t2, s2) {
    switch (s2) {
      case Boolean:
        t2 = t2 ? l$1 : null;
        break;
      case Object:
      case Array:
        t2 = null == t2 ? t2 : JSON.stringify(t2);
    }
    return t2;
  },
  fromAttribute(t2, s2) {
    let i2 = t2;
    switch (s2) {
      case Boolean:
        i2 = null !== t2;
        break;
      case Number:
        i2 = null === t2 ? null : Number(t2);
        break;
      case Object:
      case Array:
        try {
          i2 = JSON.parse(t2);
        } catch (t3) {
          i2 = null;
        }
    }
    return i2;
  }
}, f$1 = (t2, s2) => !i$1(t2, s2), y$1 = {
  attribute: true,
  type: String,
  converter: u$1,
  reflect: false,
  hasChanged: f$1
};
Symbol.metadata ??= Symbol("metadata"), a$1.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
class b extends HTMLElement {
  static addInitializer(t2) {
    this._$Ei(), (this.l ??= []).push(t2);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t2, s2 = y$1) {
    if (s2.state && (s2.attribute = false), this._$Ei(), this.elementProperties.set(t2, s2), !s2.noAccessor) {
      const i2 = Symbol(), r2 = this.getPropertyDescriptor(t2, i2, s2);
      void 0 !== r2 && e$1(this.prototype, t2, r2);
    }
  }
  static getPropertyDescriptor(t2, s2, i2) {
    const {
      get: e2,
      set: h2
    } = r$3(this.prototype, t2) ?? {
      get() {
        return this[s2];
      },
      set(t3) {
        this[s2] = t3;
      }
    };
    return {
      get() {
        return e2?.call(this);
      },
      set(s3) {
        const r2 = e2?.call(this);
        h2.call(this, s3), this.requestUpdate(t2, r2, i2);
      },
      configurable: true,
      enumerable: true
    };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) ?? y$1;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d$1("elementProperties")))
      return;
    const t2 = n$2(this);
    t2.finalize(), void 0 !== t2.l && (this.l = [...t2.l]), this.elementProperties = new Map(t2.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d$1("finalized")))
      return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d$1("properties"))) {
      const t3 = this.properties, s2 = [...h$1(t3), ...o$2(t3)];
      for (const i2 of s2)
        this.createProperty(i2, t3[i2]);
    }
    const t2 = this[Symbol.metadata];
    if (null !== t2) {
      const s2 = litPropertyMetadata.get(t2);
      if (void 0 !== s2)
        for (const [t3, i2] of s2)
          this.elementProperties.set(t3, i2);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t3, s2] of this.elementProperties) {
      const i2 = this._$Eu(t3, s2);
      void 0 !== i2 && this._$Eh.set(i2, t3);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s2) {
    const i2 = [];
    if (Array.isArray(s2)) {
      const e2 = new Set(s2.flat(1 / 0).reverse());
      for (const s3 of e2)
        i2.unshift(c$2(s3));
    } else
      void 0 !== s2 && i2.push(c$2(s2));
    return i2;
  }
  static _$Eu(t2, s2) {
    const i2 = s2.attribute;
    return false === i2 ? void 0 : "string" == typeof i2 ? i2 : "string" == typeof t2 ? t2.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t2) => this.enableUpdating = t2), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t2) => t2(this));
  }
  addController(t2) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t2), void 0 !== this.renderRoot && this.isConnected && t2.hostConnected?.();
  }
  removeController(t2) {
    this._$EO?.delete(t2);
  }
  _$E_() {
    const t2 = /* @__PURE__ */ new Map(), s2 = this.constructor.elementProperties;
    for (const i2 of s2.keys())
      this.hasOwnProperty(i2) && (t2.set(i2, this[i2]), delete this[i2]);
    t2.size > 0 && (this._$Ep = t2);
  }
  createRenderRoot() {
    const t2 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S$1(t2, this.constructor.elementStyles), t2;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t2) => t2.hostConnected?.());
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t2) => t2.hostDisconnected?.());
  }
  attributeChangedCallback(t2, s2, i2) {
    this._$AK(t2, i2);
  }
  _$EC(t2, s2) {
    const i2 = this.constructor.elementProperties.get(t2), e2 = this.constructor._$Eu(t2, i2);
    if (void 0 !== e2 && true === i2.reflect) {
      const r2 = (void 0 !== i2.converter?.toAttribute ? i2.converter : u$1).toAttribute(s2, i2.type);
      this._$Em = t2, null == r2 ? this.removeAttribute(e2) : this.setAttribute(e2, r2), this._$Em = null;
    }
  }
  _$AK(t2, s2) {
    const i2 = this.constructor, e2 = i2._$Eh.get(t2);
    if (void 0 !== e2 && this._$Em !== e2) {
      const t3 = i2.getPropertyOptions(e2), r2 = "function" == typeof t3.converter ? {
        fromAttribute: t3.converter
      } : void 0 !== t3.converter?.fromAttribute ? t3.converter : u$1;
      this._$Em = e2, this[e2] = r2.fromAttribute(s2, t3.type), this._$Em = null;
    }
  }
  requestUpdate(t2, s2, i2) {
    if (void 0 !== t2) {
      if (i2 ??= this.constructor.getPropertyOptions(t2), !(i2.hasChanged ?? f$1)(this[t2], s2))
        return;
      this.P(t2, s2, i2);
    }
    false === this.isUpdatePending && (this._$ES = this._$ET());
  }
  P(t2, s2, i2) {
    this._$AL.has(t2) || this._$AL.set(t2, s2), true === i2.reflect && this._$Em !== t2 && (this._$Ej ??= /* @__PURE__ */ new Set()).add(t2);
  }
  async _$ET() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return null != t2 && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending)
      return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [t4, s3] of this._$Ep)
          this[t4] = s3;
        this._$Ep = void 0;
      }
      const t3 = this.constructor.elementProperties;
      if (t3.size > 0)
        for (const [s3, i2] of t3)
          true !== i2.wrapped || this._$AL.has(s3) || void 0 === this[s3] || this.P(s3, this[s3], i2);
    }
    let t2 = false;
    const s2 = this._$AL;
    try {
      t2 = this.shouldUpdate(s2), t2 ? (this.willUpdate(s2), this._$EO?.forEach((t3) => t3.hostUpdate?.()), this.update(s2)) : this._$EU();
    } catch (s3) {
      throw t2 = false, this._$EU(), s3;
    }
    t2 && this._$AE(s2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    this._$EO?.forEach((t3) => t3.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this._$Ej &&= this._$Ej.forEach((t3) => this._$EC(t3, this[t3])), this._$EU();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
}
b.elementStyles = [], b.shadowRootOptions = {
  mode: "open"
}, b[d$1("elementProperties")] = /* @__PURE__ */ new Map(), b[d$1("finalized")] = /* @__PURE__ */ new Map(), p$1?.({
  ReactiveElement: b
}), (a$1.reactiveElementVersions ??= []).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1 = globalThis, i = t$1.trustedTypes, s$1 = i ? i.createPolicy("lit-html", {
  createHTML: (t2) => t2
}) : void 0, e = "$lit$", h = `lit$${Math.random().toFixed(9).slice(2)}$`, o$1 = "?" + h, n$1 = `<${o$1}>`, r$2 = document, l = () => r$2.createComment(""), c = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2, a = Array.isArray, u = (t2) => a(t2) || "function" == typeof t2?.[Symbol.iterator], d = "[ 	\n\f\r]", f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v = /-->/g, _ = />/g, m = RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), p = /'/g, g = /"/g, $ = /^(?:script|style|textarea|title)$/i, y = (t2) => (i2, ...s2) => ({
  _$litType$: t2,
  strings: i2,
  values: s2
}), x = y(1), w = Symbol.for("lit-noChange"), T = Symbol.for("lit-nothing"), A = /* @__PURE__ */ new WeakMap(), E = r$2.createTreeWalker(r$2, 129);
function C(t2, i2) {
  if (!Array.isArray(t2) || !t2.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return void 0 !== s$1 ? s$1.createHTML(i2) : i2;
}
const P = (t2, i2) => {
  const s2 = t2.length - 1, o2 = [];
  let r2, l2 = 2 === i2 ? "<svg>" : "", c2 = f;
  for (let i3 = 0; i3 < s2; i3++) {
    const s3 = t2[i3];
    let a2, u2, d2 = -1, y2 = 0;
    for (; y2 < s3.length && (c2.lastIndex = y2, u2 = c2.exec(s3), null !== u2); )
      y2 = c2.lastIndex, c2 === f ? "!--" === u2[1] ? c2 = v : void 0 !== u2[1] ? c2 = _ : void 0 !== u2[2] ? ($.test(u2[2]) && (r2 = RegExp("</" + u2[2], "g")), c2 = m) : void 0 !== u2[3] && (c2 = m) : c2 === m ? ">" === u2[0] ? (c2 = r2 ?? f, d2 = -1) : void 0 === u2[1] ? d2 = -2 : (d2 = c2.lastIndex - u2[2].length, a2 = u2[1], c2 = void 0 === u2[3] ? m : '"' === u2[3] ? g : p) : c2 === g || c2 === p ? c2 = m : c2 === v || c2 === _ ? c2 = f : (c2 = m, r2 = void 0);
    const x2 = c2 === m && t2[i3 + 1].startsWith("/>") ? " " : "";
    l2 += c2 === f ? s3 + n$1 : d2 >= 0 ? (o2.push(a2), s3.slice(0, d2) + e + s3.slice(d2) + h + x2) : s3 + h + (-2 === d2 ? i3 : x2);
  }
  return [C(t2, l2 + (t2[s2] || "<?>") + (2 === i2 ? "</svg>" : "")), o2];
};
class V {
  constructor({
    strings: t2,
    _$litType$: s2
  }, n3) {
    let r2;
    this.parts = [];
    let c2 = 0, a2 = 0;
    const u2 = t2.length - 1, d2 = this.parts, [f2, v2] = P(t2, s2);
    if (this.el = V.createElement(f2, n3), E.currentNode = this.el.content, 2 === s2) {
      const t3 = this.el.content.firstChild;
      t3.replaceWith(...t3.childNodes);
    }
    for (; null !== (r2 = E.nextNode()) && d2.length < u2; ) {
      if (1 === r2.nodeType) {
        if (r2.hasAttributes())
          for (const t3 of r2.getAttributeNames())
            if (t3.endsWith(e)) {
              const i2 = v2[a2++], s3 = r2.getAttribute(t3).split(h), e2 = /([.?@])?(.*)/.exec(i2);
              d2.push({
                type: 1,
                index: c2,
                name: e2[2],
                strings: s3,
                ctor: "." === e2[1] ? k : "?" === e2[1] ? H : "@" === e2[1] ? I : R
              }), r2.removeAttribute(t3);
            } else
              t3.startsWith(h) && (d2.push({
                type: 6,
                index: c2
              }), r2.removeAttribute(t3));
        if ($.test(r2.tagName)) {
          const t3 = r2.textContent.split(h), s3 = t3.length - 1;
          if (s3 > 0) {
            r2.textContent = i ? i.emptyScript : "";
            for (let i2 = 0; i2 < s3; i2++)
              r2.append(t3[i2], l()), E.nextNode(), d2.push({
                type: 2,
                index: ++c2
              });
            r2.append(t3[s3], l());
          }
        }
      } else if (8 === r2.nodeType)
        if (r2.data === o$1)
          d2.push({
            type: 2,
            index: c2
          });
        else {
          let t3 = -1;
          for (; -1 !== (t3 = r2.data.indexOf(h, t3 + 1)); )
            d2.push({
              type: 7,
              index: c2
            }), t3 += h.length - 1;
        }
      c2++;
    }
  }
  static createElement(t2, i2) {
    const s2 = r$2.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function N(t2, i2, s2 = t2, e2) {
  if (i2 === w)
    return i2;
  let h2 = void 0 !== e2 ? s2._$Co?.[e2] : s2._$Cl;
  const o2 = c(i2) ? void 0 : i2._$litDirective$;
  return h2?.constructor !== o2 && (h2?._$AO?.(false), void 0 === o2 ? h2 = void 0 : (h2 = new o2(t2), h2._$AT(t2, s2, e2)), void 0 !== e2 ? (s2._$Co ??= [])[e2] = h2 : s2._$Cl = h2), void 0 !== h2 && (i2 = N(t2, h2._$AS(t2, i2.values), h2, e2)), i2;
}
class S {
  constructor(t2, i2) {
    this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = i2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t2) {
    const {
      el: {
        content: i2
      },
      parts: s2
    } = this._$AD, e2 = (t2?.creationScope ?? r$2).importNode(i2, true);
    E.currentNode = e2;
    let h2 = E.nextNode(), o2 = 0, n3 = 0, l2 = s2[0];
    for (; void 0 !== l2; ) {
      if (o2 === l2.index) {
        let i3;
        2 === l2.type ? i3 = new M(h2, h2.nextSibling, this, t2) : 1 === l2.type ? i3 = new l2.ctor(h2, l2.name, l2.strings, this, t2) : 6 === l2.type && (i3 = new L(h2, this, t2)), this._$AV.push(i3), l2 = s2[++n3];
      }
      o2 !== l2?.index && (h2 = E.nextNode(), o2++);
    }
    return E.currentNode = r$2, e2;
  }
  p(t2) {
    let i2 = 0;
    for (const s2 of this._$AV)
      void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t2, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t2[i2])), i2++;
  }
}
class M {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t2, i2, s2, e2) {
    this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t2, this._$AB = i2, this._$AM = s2, this.options = e2, this._$Cv = e2?.isConnected ?? true;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i2 = this._$AM;
    return void 0 !== i2 && 11 === t2?.nodeType && (t2 = i2.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i2 = this) {
    t2 = N(this, t2, i2), c(t2) ? t2 === T || null == t2 || "" === t2 ? (this._$AH !== T && this._$AR(), this._$AH = T) : t2 !== this._$AH && t2 !== w && this._(t2) : void 0 !== t2._$litType$ ? this.$(t2) : void 0 !== t2.nodeType ? this.T(t2) : u(t2) ? this.k(t2) : this._(t2);
  }
  S(t2) {
    return this._$AA.parentNode.insertBefore(t2, this._$AB);
  }
  T(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.S(t2));
  }
  _(t2) {
    this._$AH !== T && c(this._$AH) ? this._$AA.nextSibling.data = t2 : this.T(r$2.createTextNode(t2)), this._$AH = t2;
  }
  $(t2) {
    const {
      values: i2,
      _$litType$: s2
    } = t2, e2 = "number" == typeof s2 ? this._$AC(t2) : (void 0 === s2.el && (s2.el = V.createElement(C(s2.h, s2.h[0]), this.options)), s2);
    if (this._$AH?._$AD === e2)
      this._$AH.p(i2);
    else {
      const t3 = new S(e2, this), s3 = t3.u(this.options);
      t3.p(i2), this.T(s3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i2 = A.get(t2.strings);
    return void 0 === i2 && A.set(t2.strings, i2 = new V(t2)), i2;
  }
  k(t2) {
    a(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s2, e2 = 0;
    for (const h2 of t2)
      e2 === i2.length ? i2.push(s2 = new M(this.S(l()), this.S(l()), this, this.options)) : s2 = i2[e2], s2._$AI(h2), e2++;
    e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, i2) {
    for (this._$AP?.(false, true, i2); t2 && t2 !== this._$AB; ) {
      const i3 = t2.nextSibling;
      t2.remove(), t2 = i3;
    }
  }
  setConnected(t2) {
    void 0 === this._$AM && (this._$Cv = t2, this._$AP?.(t2));
  }
}
class R {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t2, i2, s2, e2, h2) {
    this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t2, this.name = i2, this._$AM = e2, this.options = h2, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = T;
  }
  _$AI(t2, i2 = this, s2, e2) {
    const h2 = this.strings;
    let o2 = false;
    if (void 0 === h2)
      t2 = N(this, t2, i2, 0), o2 = !c(t2) || t2 !== this._$AH && t2 !== w, o2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let n3, r2;
      for (t2 = h2[0], n3 = 0; n3 < h2.length - 1; n3++)
        r2 = N(this, e3[s2 + n3], i2, n3), r2 === w && (r2 = this._$AH[n3]), o2 ||= !c(r2) || r2 !== this._$AH[n3], r2 === T ? t2 = T : t2 !== T && (t2 += (r2 ?? "") + h2[n3 + 1]), this._$AH[n3] = r2;
    }
    o2 && !e2 && this.j(t2);
  }
  j(t2) {
    t2 === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 ?? "");
  }
}
class k extends R {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t2) {
    this.element[this.name] = t2 === T ? void 0 : t2;
  }
}
class H extends R {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t2) {
    this.element.toggleAttribute(this.name, !!t2 && t2 !== T);
  }
}
class I extends R {
  constructor(t2, i2, s2, e2, h2) {
    super(t2, i2, s2, e2, h2), this.type = 5;
  }
  _$AI(t2, i2 = this) {
    if ((t2 = N(this, t2, i2, 0) ?? T) === w)
      return;
    const s2 = this._$AH, e2 = t2 === T && s2 !== T || t2.capture !== s2.capture || t2.once !== s2.once || t2.passive !== s2.passive, h2 = t2 !== T && (s2 === T || e2);
    e2 && this.element.removeEventListener(this.name, this, s2), h2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class L {
  constructor(t2, i2, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    N(this, t2);
  }
}
const Z = t$1.litHtmlPolyfillSupport;
Z?.(V, M), (t$1.litHtmlVersions ??= []).push("3.1.3");
const j = (t2, i2, s2) => {
  const e2 = s2?.renderBefore ?? i2;
  let h2 = e2._$litPart$;
  if (void 0 === h2) {
    const t3 = s2?.renderBefore ?? null;
    e2._$litPart$ = h2 = new M(i2.insertBefore(l(), t3), t3, void 0, s2 ?? {});
  }
  return h2._$AI(t2), h2;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class s extends b {
  constructor() {
    super(...arguments), this.renderOptions = {
      host: this
    }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t2 = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t2.firstChild, t2;
  }
  update(t2) {
    const i2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Do = j(i2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(true);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(false);
  }
  render() {
    return w;
  }
}
s._$litElement$ = true, s["finalized"] = true, globalThis.litElementHydrateSupport?.({
  LitElement: s
});
const r$1 = globalThis.litElementPolyfillSupport;
r$1?.({
  LitElement: s
});
(globalThis.litElementVersions ??= []).push("4.0.5");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = (t2) => (e2, o2) => {
  void 0 !== o2 ? o2.addInitializer(() => {
    customElements.define(t2, e2);
  }) : customElements.define(t2, e2);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o = {
  attribute: true,
  type: String,
  converter: u$1,
  reflect: false,
  hasChanged: f$1
}, r = (t2 = o, e2, r2) => {
  const {
    kind: n3,
    metadata: i2
  } = r2;
  let s2 = globalThis.litPropertyMetadata.get(i2);
  if (void 0 === s2 && globalThis.litPropertyMetadata.set(i2, s2 = /* @__PURE__ */ new Map()), s2.set(r2.name, t2), "accessor" === n3) {
    const {
      name: o2
    } = r2;
    return {
      set(r3) {
        const n4 = e2.get.call(this);
        e2.set.call(this, r3), this.requestUpdate(o2, n4, t2);
      },
      init(e3) {
        return void 0 !== e3 && this.P(o2, void 0, t2), e3;
      }
    };
  }
  if ("setter" === n3) {
    const {
      name: o2
    } = r2;
    return function(r3) {
      const n4 = this[o2];
      e2.call(this, r3), this.requestUpdate(o2, n4, t2);
    };
  }
  throw Error("Unsupported decorator location: " + n3);
};
function n2(t2) {
  return (e2, o2) => "object" == typeof o2 ? r(t2, e2, o2) : ((t3, e3, o3) => {
    const r2 = e3.hasOwnProperty(o3);
    return e3.constructor.createProperty(o3, r2 ? {
      ...t3,
      wrapped: true
    } : t3), r2 ? Object.getOwnPropertyDescriptor(e3, o3) : void 0;
  })(t2, e2, o2);
}
const viteLogo = "/vite.svg";
const litLogo = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20aria-hidden='true'%20role='img'%20class='iconify%20iconify--logos'%20width='25.6'%20height='32'%20preserveAspectRatio='xMidYMid%20meet'%20viewBox='0%200%20256%20320'%3e%3cpath%20fill='%2300E8FF'%20d='m64%20192l25.926-44.727l38.233-19.114l63.974%2063.974l10.833%2061.754L192%20320l-64-64l-38.074-25.615z'%3e%3c/path%3e%3cpath%20fill='%23283198'%20d='M128%20256V128l64-64v128l-64%2064ZM0%20256l64%2064l9.202-60.602L64%20192l-37.542%2023.71L0%20256Z'%3e%3c/path%3e%3cpath%20fill='%23324FFF'%20d='M64%20192V64l64-64v128l-64%2064Zm128%20128V192l64-64v128l-64%2064ZM0%20256V128l64%2064l-64%2064Z'%3e%3c/path%3e%3cpath%20fill='%230FF'%20d='M64%20320V192l64%2064z'%3e%3c/path%3e%3c/svg%3e";
function template$2() {
  return x`
  <div class="card">
    <button @click=${this._onClick} part="button">
      count is ${this.count}
    </button>
  </div>
`;
}
const styles$1 = ".card {\r\n  padding: 2em;\r\n}\r\n\r\nbutton {\r\n  border-radius: 8px;\r\n  border: 1px solid transparent;\r\n  padding: 0.6em 1.2em;\r\n  font-size: 1em;\r\n  font-weight: 500;\r\n  font-family: inherit;\r\n  background-color: #1a1a1a;\r\n  cursor: pointer;\r\n  transition: border-color 0.25s;\r\n}\r\nbutton:hover {\r\n  border-color: #646cff;\r\n}\r\nbutton:focus,\r\nbutton:focus-visible {\r\n  outline: 4px auto -webkit-focus-ring-color;\r\n}\r\n\r\n@media (prefers-color-scheme: light) {\r\n  a:hover {\r\n    color: #747bff;\r\n  }\r\n  button {\r\n    background-color: #f9f9f9;\r\n  }\r\n}\r\n";
var _CounterElement2;
let _initClass$2, _classDecs$2, _countDecs, _init_count, _ref$1;
function _applyDecs$2(e2, t2, r2, n3, o2, a2) {
  function i2(e3, t3, r3) {
    return function(n4, o3) {
      return r3 && r3(n4), e3[t3].call(n4, o3);
    };
  }
  function c2(e3, t3) {
    for (var r3 = 0; r3 < e3.length; r3++)
      e3[r3].call(t3);
    return t3;
  }
  function s2(e3, t3, r3, n4) {
    if ("function" != typeof e3 && (n4 || void 0 !== e3))
      throw new TypeError(t3 + " must " + (r3 || "be") + " a function" + (n4 ? "" : " or undefined"));
    return e3;
  }
  function applyDec(e3, t3, r3, n4, o3, a3, c3, u3, l3, f3, p3, d2, h2) {
    function m2(e4) {
      if (!h2(e4))
        throw new TypeError("Attempted to access private element on non-instance");
    }
    var y2, v2 = t3[0], g2 = t3[3], b2 = !u3;
    if (!b2) {
      r3 || Array.isArray(v2) || (v2 = [v2]);
      var w2 = {}, S2 = [], A2 = 3 === o3 ? "get" : 4 === o3 || d2 ? "set" : "value";
      f3 ? (p3 || d2 ? w2 = { get: _setFunctionName$2(function() {
        return g2(this);
      }, n4, "get"), set: function(e4) {
        t3[4](this, e4);
      } } : w2[A2] = g2, p3 || _setFunctionName$2(w2[A2], n4, 2 === o3 ? "" : A2)) : p3 || (w2 = Object.getOwnPropertyDescriptor(e3, n4));
    }
    for (var P2 = e3, j2 = v2.length - 1; j2 >= 0; j2 -= r3 ? 2 : 1) {
      var D = v2[j2], E2 = r3 ? v2[j2 - 1] : void 0, I2 = {}, O = { kind: ["field", "accessor", "method", "getter", "setter", "class"][o3], name: n4, metadata: a3, addInitializer: function(e4, t4) {
        if (e4.v)
          throw Error("attempted to call addInitializer after decoration was finished");
        s2(t4, "An initializer", "be", true), c3.push(t4);
      }.bind(null, I2) };
      try {
        if (b2)
          (y2 = s2(D.call(E2, P2, O), "class decorators", "return")) && (P2 = y2);
        else {
          var k2, F;
          O.static = l3, O.private = f3, f3 ? 2 === o3 ? k2 = function(e4) {
            return m2(e4), w2.value;
          } : (o3 < 4 && (k2 = i2(w2, "get", m2)), 3 !== o3 && (F = i2(w2, "set", m2))) : (k2 = function(e4) {
            return e4[n4];
          }, (o3 < 2 || 4 === o3) && (F = function(e4, t4) {
            e4[n4] = t4;
          }));
          var N2 = O.access = { has: f3 ? h2.bind() : function(e4) {
            return n4 in e4;
          } };
          if (k2 && (N2.get = k2), F && (N2.set = F), P2 = D.call(E2, d2 ? { get: w2.get, set: w2.set } : w2[A2], O), d2) {
            if ("object" == typeof P2 && P2)
              (y2 = s2(P2.get, "accessor.get")) && (w2.get = y2), (y2 = s2(P2.set, "accessor.set")) && (w2.set = y2), (y2 = s2(P2.init, "accessor.init")) && S2.push(y2);
            else if (void 0 !== P2)
              throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");
          } else
            s2(P2, (p3 ? "field" : "method") + " decorators", "return") && (p3 ? S2.push(P2) : w2[A2] = P2);
        }
      } finally {
        I2.v = true;
      }
    }
    return (p3 || d2) && u3.push(function(e4, t4) {
      for (var r4 = S2.length - 1; r4 >= 0; r4--)
        t4 = S2[r4].call(e4, t4);
      return t4;
    }), p3 || b2 || (f3 ? d2 ? u3.push(i2(w2, "get"), i2(w2, "set")) : u3.push(2 === o3 ? w2[A2] : i2.call.bind(w2[A2])) : Object.defineProperty(e3, n4, w2)), P2;
  }
  function u2(e3, t3) {
    return Object.defineProperty(e3, Symbol.metadata || Symbol.for("Symbol.metadata"), { configurable: true, enumerable: true, value: t3 });
  }
  if (arguments.length >= 6)
    var l2 = a2[Symbol.metadata || Symbol.for("Symbol.metadata")];
  var f2 = Object.create(null == l2 ? null : l2), p2 = function(e3, t3, r3, n4) {
    var o3, a3, i3 = [], s3 = function(t4) {
      return _checkInRHS$2(t4) === e3;
    }, u3 = /* @__PURE__ */ new Map();
    function l3(e4) {
      e4 && i3.push(c2.bind(null, e4));
    }
    for (var f3 = 0; f3 < t3.length; f3++) {
      var p3 = t3[f3];
      if (Array.isArray(p3)) {
        var d2 = p3[1], h2 = p3[2], m2 = p3.length > 3, y2 = 16 & d2, v2 = !!(8 & d2), g2 = 0 == (d2 &= 7), b2 = h2 + "/" + v2;
        if (!g2 && !m2) {
          var w2 = u3.get(b2);
          if (true === w2 || 3 === w2 && 4 !== d2 || 4 === w2 && 3 !== d2)
            throw Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + h2);
          u3.set(b2, !(d2 > 2) || d2);
        }
        applyDec(v2 ? e3 : e3.prototype, p3, y2, m2 ? "#" + h2 : _toPropertyKey$2(h2), d2, n4, v2 ? a3 = a3 || [] : o3 = o3 || [], i3, v2, m2, g2, 1 === d2, v2 && m2 ? s3 : r3);
      }
    }
    return l3(o3), l3(a3), i3;
  }(e2, t2, o2, f2);
  return r2.length || u2(e2, f2), { e: p2, get c() {
    var t3 = [];
    return r2.length && [u2(applyDec(e2, [r2], n3, e2.name, 5, f2, t3), f2), c2.bind(null, t3, e2)];
  } };
}
function _toPropertyKey$2(t2) {
  var i2 = _toPrimitive$2(t2, "string");
  return "symbol" == typeof i2 ? i2 : i2 + "";
}
function _toPrimitive$2(t2, r2) {
  if ("object" != typeof t2 || !t2)
    return t2;
  var e2 = t2[Symbol.toPrimitive];
  if (void 0 !== e2) {
    var i2 = e2.call(t2, r2 || "default");
    if ("object" != typeof i2)
      return i2;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
function _setFunctionName$2(e2, t2, n3) {
  "symbol" == typeof t2 && (t2 = (t2 = t2.description) ? "[" + t2 + "]" : "");
  try {
    Object.defineProperty(e2, "name", { configurable: true, value: n3 ? n3 + " " + t2 : t2 });
  } catch (e3) {
  }
  return e2;
}
function _checkInRHS$2(e2) {
  if (Object(e2) !== e2)
    throw TypeError("right-hand side of 'in' should be an object, got " + (null !== e2 ? typeof e2 : "null"));
  return e2;
}
_classDecs$2 = [t("counter-element")];
let _CounterElement;
_ref$1 = (_countDecs = n2({
  type: Number
}), "count");
class CounterElement extends s {
  constructor(...args) {
    super(...args);
    this[_ref$1] = _init_count(this, 3);
  }
  static get styles() {
    return i$2`
    ${r$4(styles$1)}
    `;
  }
  get template() {
    return template$2.call(this);
  }
  render() {
    return x` ${this.template} `;
  }
  _onClick() {
    this.count++;
  }
}
_CounterElement2 = CounterElement;
({
  e: [_init_count],
  c: [_CounterElement, _initClass$2]
} = _applyDecs$2(_CounterElement2, [[_countDecs, 0, "count"]], _classDecs$2, 0, void 0, s));
_initClass$2();
function template$1() {
  return x`
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src=${viteLogo} class="logo" alt="Vite logo" />
    </a>
    <a href="https://lit.dev" target="_blank">
      <img src=${litLogo} class="logo lit" alt="Lit logo" />
    </a>
  </div>
  <slot></slot>
  <counter-element></counter-element>
  <p class="read-the-docs">${this.docsHint}</p>
`;
}
const styles = ":host {\r\n  max-width: 1280px;\r\n  margin: 0 auto;\r\n  padding: 2rem;\r\n  text-align: center;\r\n}\r\n\r\n.logo {\r\n  height: 6em;\r\n  padding: 1.5em;\r\n  will-change: filter;\r\n  transition: filter 300ms;\r\n}\r\n.logo:hover {\r\n  filter: drop-shadow(0 0 2em #646cffaa);\r\n}\r\n.logo.lit:hover {\r\n  filter: drop-shadow(0 0 2em #325cffaa);\r\n}\r\n.read-the-docs {\r\n  color: #888;\r\n}\r\n";
var _PageElement2;
let _initProto, _initClass$1, _classDecs$1, _docsHintDecs, _init_docsHint, _ref;
function _classPrivateFieldLooseBase(receiver, privateKey) {
  if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
    throw new TypeError("attempted to use private field on non-instance");
  }
  return receiver;
}
var id = 0;
function _classPrivateFieldLooseKey(name) {
  return "__private_" + id++ + "_" + name;
}
function _applyDecs$1(e2, t2, r2, n3, o2, a2) {
  function i2(e3, t3, r3) {
    return function(n4, o3) {
      return r3 && r3(n4), e3[t3].call(n4, o3);
    };
  }
  function c2(e3, t3) {
    for (var r3 = 0; r3 < e3.length; r3++)
      e3[r3].call(t3);
    return t3;
  }
  function s2(e3, t3, r3, n4) {
    if ("function" != typeof e3 && (n4 || void 0 !== e3))
      throw new TypeError(t3 + " must " + (r3 || "be") + " a function" + (n4 ? "" : " or undefined"));
    return e3;
  }
  function applyDec(e3, t3, r3, n4, o3, a3, c3, u3, l3, f3, p3, d2, h2) {
    function m2(e4) {
      if (!h2(e4))
        throw new TypeError("Attempted to access private element on non-instance");
    }
    var y2, v2 = t3[0], g2 = t3[3], b2 = !u3;
    if (!b2) {
      r3 || Array.isArray(v2) || (v2 = [v2]);
      var w2 = {}, S2 = [], A2 = 3 === o3 ? "get" : 4 === o3 || d2 ? "set" : "value";
      f3 ? (p3 || d2 ? w2 = { get: _setFunctionName$1(function() {
        return g2(this);
      }, n4, "get"), set: function(e4) {
        t3[4](this, e4);
      } } : w2[A2] = g2, p3 || _setFunctionName$1(w2[A2], n4, 2 === o3 ? "" : A2)) : p3 || (w2 = Object.getOwnPropertyDescriptor(e3, n4));
    }
    for (var P2 = e3, j2 = v2.length - 1; j2 >= 0; j2 -= r3 ? 2 : 1) {
      var D = v2[j2], E2 = r3 ? v2[j2 - 1] : void 0, I2 = {}, O = { kind: ["field", "accessor", "method", "getter", "setter", "class"][o3], name: n4, metadata: a3, addInitializer: function(e4, t4) {
        if (e4.v)
          throw Error("attempted to call addInitializer after decoration was finished");
        s2(t4, "An initializer", "be", true), c3.push(t4);
      }.bind(null, I2) };
      try {
        if (b2)
          (y2 = s2(D.call(E2, P2, O), "class decorators", "return")) && (P2 = y2);
        else {
          var k2, F;
          O.static = l3, O.private = f3, f3 ? 2 === o3 ? k2 = function(e4) {
            return m2(e4), w2.value;
          } : (o3 < 4 && (k2 = i2(w2, "get", m2)), 3 !== o3 && (F = i2(w2, "set", m2))) : (k2 = function(e4) {
            return e4[n4];
          }, (o3 < 2 || 4 === o3) && (F = function(e4, t4) {
            e4[n4] = t4;
          }));
          var N2 = O.access = { has: f3 ? h2.bind() : function(e4) {
            return n4 in e4;
          } };
          if (k2 && (N2.get = k2), F && (N2.set = F), P2 = D.call(E2, d2 ? { get: w2.get, set: w2.set } : w2[A2], O), d2) {
            if ("object" == typeof P2 && P2)
              (y2 = s2(P2.get, "accessor.get")) && (w2.get = y2), (y2 = s2(P2.set, "accessor.set")) && (w2.set = y2), (y2 = s2(P2.init, "accessor.init")) && S2.push(y2);
            else if (void 0 !== P2)
              throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");
          } else
            s2(P2, (p3 ? "field" : "method") + " decorators", "return") && (p3 ? S2.push(P2) : w2[A2] = P2);
        }
      } finally {
        I2.v = true;
      }
    }
    return (p3 || d2) && u3.push(function(e4, t4) {
      for (var r4 = S2.length - 1; r4 >= 0; r4--)
        t4 = S2[r4].call(e4, t4);
      return t4;
    }), p3 || b2 || (f3 ? d2 ? u3.push(i2(w2, "get"), i2(w2, "set")) : u3.push(2 === o3 ? w2[A2] : i2.call.bind(w2[A2])) : Object.defineProperty(e3, n4, w2)), P2;
  }
  function u2(e3, t3) {
    return Object.defineProperty(e3, Symbol.metadata || Symbol.for("Symbol.metadata"), { configurable: true, enumerable: true, value: t3 });
  }
  if (arguments.length >= 6)
    var l2 = a2[Symbol.metadata || Symbol.for("Symbol.metadata")];
  var f2 = Object.create(null == l2 ? null : l2), p2 = function(e3, t3, r3, n4) {
    var o3, a3, i3 = [], s3 = function(t4) {
      return _checkInRHS$1(t4) === e3;
    }, u3 = /* @__PURE__ */ new Map();
    function l3(e4) {
      e4 && i3.push(c2.bind(null, e4));
    }
    for (var f3 = 0; f3 < t3.length; f3++) {
      var p3 = t3[f3];
      if (Array.isArray(p3)) {
        var d2 = p3[1], h2 = p3[2], m2 = p3.length > 3, y2 = 16 & d2, v2 = !!(8 & d2), g2 = 0 == (d2 &= 7), b2 = h2 + "/" + v2;
        if (!g2 && !m2) {
          var w2 = u3.get(b2);
          if (true === w2 || 3 === w2 && 4 !== d2 || 4 === w2 && 3 !== d2)
            throw Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + h2);
          u3.set(b2, !(d2 > 2) || d2);
        }
        applyDec(v2 ? e3 : e3.prototype, p3, y2, m2 ? "#" + h2 : _toPropertyKey$1(h2), d2, n4, v2 ? a3 = a3 || [] : o3 = o3 || [], i3, v2, m2, g2, 1 === d2, v2 && m2 ? s3 : r3);
      }
    }
    return l3(o3), l3(a3), i3;
  }(e2, t2, o2, f2);
  return r2.length || u2(e2, f2), { e: p2, get c() {
    var t3 = [];
    return r2.length && [u2(applyDec(e2, [r2], n3, e2.name, 5, f2, t3), f2), c2.bind(null, t3, e2)];
  } };
}
function _toPropertyKey$1(t2) {
  var i2 = _toPrimitive$1(t2, "string");
  return "symbol" == typeof i2 ? i2 : i2 + "";
}
function _toPrimitive$1(t2, r2) {
  if ("object" != typeof t2 || !t2)
    return t2;
  var e2 = t2[Symbol.toPrimitive];
  if (void 0 !== e2) {
    var i2 = e2.call(t2, r2 || "default");
    if ("object" != typeof i2)
      return i2;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
function _setFunctionName$1(e2, t2, n3) {
  "symbol" == typeof t2 && (t2 = (t2 = t2.description) ? "[" + t2 + "]" : "");
  try {
    Object.defineProperty(e2, "name", { configurable: true, value: n3 ? n3 + " " + t2 : t2 });
  } catch (e3) {
  }
  return e2;
}
function _checkInRHS$1(e2) {
  if (Object(e2) !== e2)
    throw TypeError("right-hand side of 'in' should be an object, got " + (null !== e2 ? typeof e2 : "null"));
  return e2;
}
_classDecs$1 = [t("page-element")];
let _PageElement;
var _A = /* @__PURE__ */ _classPrivateFieldLooseKey("A");
_ref = (_docsHintDecs = n2({
  type: String
}), "docsHint");
class PageElement extends s {
  constructor(...args) {
    super(...args);
    Object.defineProperty(this, _A, {
      writable: true,
      value: (_initProto(this), _init_docsHint(this, "Click on the Vite and Lit logos to learn more"))
    });
  }
  get [_ref]() {
    return _classPrivateFieldLooseBase(this, _A)[_A];
  }
  set docsHint(v2) {
    _classPrivateFieldLooseBase(this, _A)[_A] = v2;
  }
  static get styles() {
    return i$2`
    ${r$4(styles)}
    `;
  }
  get template() {
    return template$1.call(this);
  }
  render() {
    return x` ${this.template} `;
  }
}
_PageElement2 = PageElement;
({
  e: [_init_docsHint, _initProto],
  c: [_PageElement, _initClass$1]
} = _applyDecs$1(_PageElement2, [[_docsHintDecs, 1, "docsHint"]], _classDecs$1, 0, void 0, s));
_initClass$1();
var _AppElement2;
let _initClass, _classDecs;
function _applyDecs(e2, t2, r2, n3, o2, a2) {
  function i2(e3, t3, r3) {
    return function(n4, o3) {
      return r3 && r3(n4), e3[t3].call(n4, o3);
    };
  }
  function c2(e3, t3) {
    for (var r3 = 0; r3 < e3.length; r3++)
      e3[r3].call(t3);
    return t3;
  }
  function s2(e3, t3, r3, n4) {
    if ("function" != typeof e3 && (n4 || void 0 !== e3))
      throw new TypeError(t3 + " must " + (r3 || "be") + " a function" + (n4 ? "" : " or undefined"));
    return e3;
  }
  function applyDec(e3, t3, r3, n4, o3, a3, c3, u3, l3, f3, p3, d2, h2) {
    function m2(e4) {
      if (!h2(e4))
        throw new TypeError("Attempted to access private element on non-instance");
    }
    var y2, v2 = t3[0], g2 = t3[3], b2 = !u3;
    if (!b2) {
      r3 || Array.isArray(v2) || (v2 = [v2]);
      var w2 = {}, S2 = [], A2 = 3 === o3 ? "get" : 4 === o3 || d2 ? "set" : "value";
      f3 ? (p3 || d2 ? w2 = { get: _setFunctionName(function() {
        return g2(this);
      }, n4, "get"), set: function(e4) {
        t3[4](this, e4);
      } } : w2[A2] = g2, p3 || _setFunctionName(w2[A2], n4, 2 === o3 ? "" : A2)) : p3 || (w2 = Object.getOwnPropertyDescriptor(e3, n4));
    }
    for (var P2 = e3, j2 = v2.length - 1; j2 >= 0; j2 -= r3 ? 2 : 1) {
      var D = v2[j2], E2 = r3 ? v2[j2 - 1] : void 0, I2 = {}, O = { kind: ["field", "accessor", "method", "getter", "setter", "class"][o3], name: n4, metadata: a3, addInitializer: function(e4, t4) {
        if (e4.v)
          throw Error("attempted to call addInitializer after decoration was finished");
        s2(t4, "An initializer", "be", true), c3.push(t4);
      }.bind(null, I2) };
      try {
        if (b2)
          (y2 = s2(D.call(E2, P2, O), "class decorators", "return")) && (P2 = y2);
        else {
          var k2, F;
          O.static = l3, O.private = f3, f3 ? 2 === o3 ? k2 = function(e4) {
            return m2(e4), w2.value;
          } : (o3 < 4 && (k2 = i2(w2, "get", m2)), 3 !== o3 && (F = i2(w2, "set", m2))) : (k2 = function(e4) {
            return e4[n4];
          }, (o3 < 2 || 4 === o3) && (F = function(e4, t4) {
            e4[n4] = t4;
          }));
          var N2 = O.access = { has: f3 ? h2.bind() : function(e4) {
            return n4 in e4;
          } };
          if (k2 && (N2.get = k2), F && (N2.set = F), P2 = D.call(E2, d2 ? { get: w2.get, set: w2.set } : w2[A2], O), d2) {
            if ("object" == typeof P2 && P2)
              (y2 = s2(P2.get, "accessor.get")) && (w2.get = y2), (y2 = s2(P2.set, "accessor.set")) && (w2.set = y2), (y2 = s2(P2.init, "accessor.init")) && S2.push(y2);
            else if (void 0 !== P2)
              throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");
          } else
            s2(P2, (p3 ? "field" : "method") + " decorators", "return") && (p3 ? S2.push(P2) : w2[A2] = P2);
        }
      } finally {
        I2.v = true;
      }
    }
    return (p3 || d2) && u3.push(function(e4, t4) {
      for (var r4 = S2.length - 1; r4 >= 0; r4--)
        t4 = S2[r4].call(e4, t4);
      return t4;
    }), p3 || b2 || (f3 ? d2 ? u3.push(i2(w2, "get"), i2(w2, "set")) : u3.push(2 === o3 ? w2[A2] : i2.call.bind(w2[A2])) : Object.defineProperty(e3, n4, w2)), P2;
  }
  function u2(e3, t3) {
    return Object.defineProperty(e3, Symbol.metadata || Symbol.for("Symbol.metadata"), { configurable: true, enumerable: true, value: t3 });
  }
  if (arguments.length >= 6)
    var l2 = a2[Symbol.metadata || Symbol.for("Symbol.metadata")];
  var f2 = Object.create(null == l2 ? null : l2), p2 = function(e3, t3, r3, n4) {
    var o3, a3, i3 = [], s3 = function(t4) {
      return _checkInRHS(t4) === e3;
    }, u3 = /* @__PURE__ */ new Map();
    function l3(e4) {
      e4 && i3.push(c2.bind(null, e4));
    }
    for (var f3 = 0; f3 < t3.length; f3++) {
      var p3 = t3[f3];
      if (Array.isArray(p3)) {
        var d2 = p3[1], h2 = p3[2], m2 = p3.length > 3, y2 = 16 & d2, v2 = !!(8 & d2), g2 = 0 == (d2 &= 7), b2 = h2 + "/" + v2;
        if (!g2 && !m2) {
          var w2 = u3.get(b2);
          if (true === w2 || 3 === w2 && 4 !== d2 || 4 === w2 && 3 !== d2)
            throw Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + h2);
          u3.set(b2, !(d2 > 2) || d2);
        }
        applyDec(v2 ? e3 : e3.prototype, p3, y2, m2 ? "#" + h2 : _toPropertyKey(h2), d2, n4, v2 ? a3 = a3 || [] : o3 = o3 || [], i3, v2, m2, g2, 1 === d2, v2 && m2 ? s3 : r3);
      }
    }
    return l3(o3), l3(a3), i3;
  }(e2, t2, o2, f2);
  return r2.length || u2(e2, f2), { e: p2, get c() {
    var t3 = [];
    return r2.length && [u2(applyDec(e2, [r2], n3, e2.name, 5, f2, t3), f2), c2.bind(null, t3, e2)];
  } };
}
function _toPropertyKey(t2) {
  var i2 = _toPrimitive(t2, "string");
  return "symbol" == typeof i2 ? i2 : i2 + "";
}
function _toPrimitive(t2, r2) {
  if ("object" != typeof t2 || !t2)
    return t2;
  var e2 = t2[Symbol.toPrimitive];
  if (void 0 !== e2) {
    var i2 = e2.call(t2, r2 || "default");
    if ("object" != typeof i2)
      return i2;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
function _setFunctionName(e2, t2, n3) {
  "symbol" == typeof t2 && (t2 = (t2 = t2.description) ? "[" + t2 + "]" : "");
  try {
    Object.defineProperty(e2, "name", { configurable: true, value: n3 ? n3 + " " + t2 : t2 });
  } catch (e3) {
  }
  return e2;
}
function _checkInRHS(e2) {
  if (Object(e2) !== e2)
    throw TypeError("right-hand side of 'in' should be an object, got " + (null !== e2 ? typeof e2 : "null"));
  return e2;
}
_classDecs = [t("app-element")];
let _AppElement;
class AppElement extends s {
  get template() {
    return template.call(this);
  }
  render() {
    return x`<style>
        :host {
            max-width: 1280px;
            margin: 0 auto;
            padding: 2rem;
            text-align: center;
        }
    </style>
    <page-element>
        <h1>Vite + Lit</h1>
    </page-element>`;
  }
}
_AppElement2 = AppElement;
[_AppElement, _initClass] = _applyDecs(_AppElement2, [], _classDecs, 0, void 0, s).c;
_initClass();
//# sourceMappingURL=index-Cjw0BFtw.js.map
