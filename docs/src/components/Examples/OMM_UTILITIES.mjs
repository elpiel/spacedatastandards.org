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
  for (let segment = 0; segment < segments.length; segment++) {
    let { domEl, tagName } = segments[segment];

    for (let hN = 0; hN < domEl.childNodes.length; hN++) {
      if (domEl.childNodes[hN].tagName === "xsd:element") {
        let nodeName = domEl.childNodes[hN].getAttribute("name");
        segments[segment].childNodeNames.push(nodeName);
        endElements[tagName] = endElements[tagName] || { childNodes: [] };
        endElements[tagName].childNodes.push(nodeName);
      }

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

    let omm = root.ele('omm', { "id": "CCSDS_OMM_VERS", "version": "2.0" });
    let header = omm.ele('header');
    endElements['header'].childNodes.forEach(hNode => {
      if (showNull || v[i][hNode]) {
        header.ele(hNode).txt(v[i][hNode]);
      }
    });

    let bodySegment = omm.ele('body').ele('segment');

    let hNodeFunc = (_element) => hNode => {
      if (showNull || v[i][hNode]) {
        _element.ele(hNode).txt(v[i][hNode]);
      }
    };
    endElements['metadata'].childNodes.forEach(hNodeFunc(bodySegment.ele('metadata')));
    let bodySegmentData = bodySegment.ele('data');
    endElements['meanElements'].childNodes.forEach(hNodeFunc(bodySegmentData.ele('meanElements')));
    endElements['tleParameters'].childNodes.forEach(hNodeFunc(bodySegmentData.ele('tleParameters')));
  }
  return root.end({ prettyPrint: true });
}

export { checkNull, makeArray, getElementsByAttribute, getKids, aMap, tofixed, XMLOMM };