function hostname(url) {
  let parsedURL = new URL(url);
  return parsedURL.hostname;
}

window.addEventListener('load', () => {
  let websitesToReplace = document.querySelectorAll('span.extract-hostname');
  websitesToReplace.forEach(element => {
    element.innerHTML = hostname(element.innerHTML);
  })
})