export function HtmlEncode(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(/<[^>]*>/), replace);
}
