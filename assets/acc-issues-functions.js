const removeFooterLink = (href) => {
  document.querySelector(`.footer__wrapper li:has(a[href="${href}"])`).remove();
}
  // function to generate link to WCAG techniques based on the name in item[1]
  function generateTechniqueLink(item) {
    console.log(item);
    const input = item[1];
     console.log(input);
    const code = input.substring(0, input.indexOf(':'));
     console.log(code);
  
    const linkMap = {
      A: 'https://www.w3.org/WAI/WCAG21/Techniques/aria',
      F: 'https://www.w3.org/WAI/WCAG21/Techniques/failures/',
      G: 'https://www.w3.org/WAI/WCAG21/Techniques/general/',
      h: 'https://www.w3.org/WAI/WCAG21/Techniques/general/',
      H: 'https://www.w3.org/WAI/WCAG21/Techniques/html/',
      S: 'https://www.w3.org/WAI/WCAG21/Techniques/client-side-script/',
      C: 'https://www.w3.org/WAI/WCAG21/Techniques/css/'
    };
  
    if (linkMap.hasOwnProperty(code)) {
      return linkMap[code] + code;
    } else {
      return '';
    }
  }