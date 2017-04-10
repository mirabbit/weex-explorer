const getScript = (src, func) => {
  let script = document.createElement('script');
  script.async = "async";
  script.src = src;
  if (func) {
    script.onload = func;
  }
  document.getElementsByTagName("head")[0].appendChild(script);
};

module.exports = {
  getScript,
};
