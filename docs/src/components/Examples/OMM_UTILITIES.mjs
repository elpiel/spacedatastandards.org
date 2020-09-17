import builder from 'xmlbuilder2';
import navCommon_xsd from "../../../test/ndmxml-1.0-navwg-common.xsd";
import omm_xsd from "../../../test/ndmxml-1.0-omm-2.0.xsd";

let checkNull = (showNull, v) =>
  showNull ||
  (v !== null &&
    v !== undefined &&
    v !== "null" &&
    (typeof v !== "string" || v.trim().length > 0));
const makeArray = a => Array.prototype.slice.call(a);

const getElementsByAttribute = (_documentElement, _TagName, _aN, _aV) => {
  let _array = makeArray(_documentElement.getElementsByTagName(_TagName));
  return _aN
    ? _array.filter(n =>
      _aV
        ? n.attributes.getNamedItem(_aN).value === _aV
        : n.attributes.getNamedItem(_aN)
    )
    : _array;
};

const getKids = a =>
  makeArray(a.children[0].children)
    .map(n =>
      n.attributes.getNamedItem("name")
        ? n.attributes.getNamedItem("name").value
        : false
    )
    .filter(Boolean);

const aMap = (a = {}) =>
  Object.entries(a)
    .map(([key, value]) => `${key}="${value}"`)
    .join(" ");

const tagUp = (k, v, a = {}) => `\t<${k} ${aMap(a)}>${v}</${k}>`;

let rMap = {
  covarianceMatrix: "covarianceMatrixElementsGroup"
};

let tofixed = n => {
  if (!isNaN(n) && (typeof n === "number" || n instanceof bignumber)) {
    let place = n % 1 ? 15 : 0;
    n = n.toFixed(place);
    n = place ? n.replace(/0+$/, "") : n;
  }
  return n;
};

const XMLOMM = (showNull, v) => {
  let _xml;
  let [navCommon_xsd_xml, omm_xsd_xml] = (_xml = [navCommon_xsd, omm_xsd].map(
    raw => (new DOMParser).parseFromString(raw, "text/xml")
  ));
  const segments = [
    { schema: navCommon_xsd_xml, elementName: "ndmHeader", tagName: "header", domEl: null, childNodeNames: [] },
    { schema: omm_xsd_xml, elementName: "ommMetadata", tagName: "metadata", domEl: null, childNodeNames: [] },
    { schema: omm_xsd_xml, elementName: "meanElementsType", tagName: "meanElements", domEl: null, childNodeNames: [] },
    { schema: omm_xsd_xml, elementName: "tleParametersType", tagName: "tleParameters", domEl: null, childNodeNames: [] }
  ].map(elSet => {
    elSet.domEl = elSet.schema.getElementsByName(elSet.elementName)[0].getElementsByTagName('xsd:sequence')[0];
    return elSet;
  });

  let endElements = {};

  const walkElement = (cEl, segment, tagName, parent) => {
    if (cEl.tagName === "xsd:element") {
      endElements[tagName] = endElements[tagName] || { childNodes: [] };
      endElements[tagName].childNodes.push(cEl);
    } else if (cEl.childNodes.length) {
      for (let ccEl = 0; ccEl < cEl.childNodes.length; ccEl++) {
        walkElement(cEl.childNodes[ccEl], segment, tagName, cEl);
      }
    }
  }

  for (let segment = 0; segment < segments.length; segment++) {
    let { domEl, tagName } = segments[segment];
    for (let hN = 0; hN < domEl.childNodes.length; hN++) {
      walkElement(domEl.childNodes[hN], segment, tagName);
    };
  }

  const root = builder
    .create({ version: "1.0", encoding: "UTF-8" })
    .ele('ndm', {
      "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
      "xsi:noNamespaceSchemaLocation": "http://sanaregistry.org/r/ndmxml/ndmxml-1.0-master.xsd"
    });
  for (let i = 0; i < v.length; i++) {

    for (let vprop in v[i]) {
      v[i][vprop] = v[i][vprop].toNumber ? v[i][vprop].toNumber() : v[i][vprop];
    };


    let hNodeFunc = (endElementName, _element) => {
      _element = _element.ele(endElementName);
      let eE = endElements[endElementName];
      eE.childNodes.forEach(
        hNode => {
          let name = hNode.getAttribute("name");
          if (showNull &&
            hNode.parentNode.tagName !== "xsd:choice"
            || v[i][name]) {
            _element.ele(name).txt(v[i][name]);
          }
        });
    }

    let omm = root.ele('omm', { "id": "CCSDS_OMM_VERS", "version": "2.0" });
    hNodeFunc('header', omm);
    let bodySegment = omm.ele('body').ele('segment');
    hNodeFunc('metadata', bodySegment);
    let bodySegmentData = bodySegment.ele('data');
    hNodeFunc('meanElements', bodySegmentData);
    hNodeFunc('tleParameters', bodySegmentData);
  }
  return root.end({ prettyPrint: true });
}

export { checkNull, makeArray, getElementsByAttribute, getKids, aMap, tofixed, XMLOMM };