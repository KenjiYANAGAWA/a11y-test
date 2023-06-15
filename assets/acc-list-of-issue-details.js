// List issue
console.log("hello");
const issueListObj = {
  // 0:WCAG, 1:Technique Link, 2: Technique Name, 3:Issue Title
  '/':  [
    ['4.1.3 Status Messages', 'F103: Failure of Success Criterion 4.1.3 due to providing status messages that cannot be programmatically determined through role or properties', 'Cart Popup: When user increases the quantity of an item, screen reader does not announce the visual change of price and quantity.'],
    ['1.4.11 Non-text Contrast', 'G207: Ensuring that a contrast ratio of 3:1 is provided for icons', 'Social media Icons in the footer do not meet contrast requirement'],
    ['1.4.13 Content on Hover or Focus', 'F95: Failure of Success Criterion 1.4.13 due to content shown on hover not being hoverable', 'Under **Incredible features**, a tooltip appears on hover. However, the tooltip disappears when mouse moves away from the popup.'],
    ['2.4.2 Page Titled','F25: Failure of Success Criterion 2.4.2 due to the title of a Web page not identifying the contents','"50% off" is not descriptive as a title for a top page.'],
    ['2.1.1 Keyboard','F54: Failure of Success Criterion 2.1.1 due to using only pointing-device-specific event handlers (including gesture) for a function','**Gaming or Photography** can appear by sliding the bar in the middle. It does not receive keyboard focus.'],
    ['1.4.3 Contrast (Minimum)','G18: Ensuring that a contrast ratio of at least 4.5:1 exists between text (and images of text) and background behind the text','Text on Logo image "miller & lowe" does not meet contrast with the background on top page'],
    ['1.4.3 Contrast (Minimum)','G18: Ensuring that a contrast ratio of at least 4.5:1 exists between text (and images of text) and background behind the text','**incredible features** does not meet contrast with the background image of green headset'],
    ['1.3.1 Info and Relationships','F2: Failure of Success Criterion 1.3.1 due to using changes in text presentation to convey information without using the appropriate markup or text','**Sign up for new stories and personal offers**, **Footer Menu**, **About** inside the footer are visually but not programmatically headings.']
  ],
  '/collections/all': [
   ],
  '/pages/contact': [],
  '/pages/about-us': [],
  '/pages/advertisement': [],
  '/pages/checkout': [
    ['4.1.1 Parsing', 'F70: Failure of Success Criterion 4.1.1 due to incorrect use of start and end tags or attribute markup', 'id="first-name", id="last-name", id="select0" are used multiple times'],
    ['1.1.1 Non-text Content', 'F65: Failure of Success Criterion 1.1.1 due to omitting the alt attribute or text alternative on img elements, area elements, and input elements of type "image"','Dropdown collapsed caret icon is only announced as **image**'],
    ['1.3.1 Info and Relationships','F91: Failure of Success Criterion 1.3.1 for not correctly marking up table headers','**Contact** and **Ship to** acts as an row header but not programmed as such.']
  ],
  '/pages/shipping': [],
  '/pages/payment': [],
  '/cart': [],
  '/products/headphone-stand-black': [],
  '/products/mc100-wireless-charge-pad-gunmetal-aluminum-black-coated-canvas': [],
  '/products/3-5mm-to-3-5mm-audio-cable-black': [
    ['4.1.2 Name, Role, Value', 'ARIA5: Using WAI-ARIA state and property attributes to expose the state of a user interface component','Using aria-hidden="true" on a focusable image **This works very well with our gaming headphones.** inside a product description.'],
    ['4.1.1 Parsing', 'ARIA10: Using aria-labelledby to provide a text alternative for non-text content', '**mg20-gaming-galactic-white** image has an aria-labelledby attribute references an ID that doesn\'t exist.']
  ],
  '/products/usb-c-to-3-5mm-audio-cable-black': [],
  '/products/mw50-silver-metal-brown-leather': [],
  '/products/mw08-brown-ceramic-stainless-steel-case': [],
  '/products/mh40-wireless-ear-pads': [],
  '/products/mh40-wireless-silver-metal-navy-coated-canvas': [],
  '/products/mw07-plus-charging-case-canvas-pouch-stainless-steel': [],
  '/account/addresses': [],
  '/account/register': [],
  '/account/login' : [
    ['3.3.1 Error Identification', 'G83: Providing text descriptions to identify required fields that were not completed','When user enters wrong login credentials, screen reader announces nothing. Screen reader jumps to **skip to content**']
  ]
}