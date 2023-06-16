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
    ['1.3.1 Info and Relationships','F2: Failure of Success Criterion 1.3.1 due to using changes in text presentation to convey information without using the appropriate markup or text','**Sign up for new stories and personal offers**, **Footer Menu**, **About** inside the footer are visually but not programmatically headings.'],
    ['2.1.1 Keyboard','F54: Failure of Success Criterion 2.1.1 due to using only pointing-device-specific event handlers (including gesture) for a function','"**search popup** Search results on do not receive keyboard focus. But, the results in the **pages** tab do receive keyboard focus. Depending on the search keyword, a tab disappear when there\'s no results in the tab. Whatever the tabs it displays, only the results in the **last** tab receive keyboard focus."'],
    ['4.1.2 Name, Role, Value','ARIA4: Using a WAI-ARIA role to expose the role of a user interface component', '"Search popup can have any of the following tabs, **Products**, **Suggestions**, **Collections**, **Pages** They are coded as `role="tab"` but they don\'t have a parent with `role="tablist"`'],
    ['1.4.3 Contrast (Minimum)','G18: Ensuring that a contrast ratio of at least 4.5:1 exists between text (and images of text) and background behind the text', '"Search popup can have any of the following tabs, **Products**, **Suggestions**, **Collections**, **Pages** When they are not selected, the text don\'t meet the contrast requirement even though they are not in disabled state"'],
    ['4.1.3 Status Messages','F103: Failure of Success Criterion 4.1.3 due to providing status messages that cannot be programmatically determined through role or properties','"On search **popup**, when user searches for a product, search field shows the dynamic search result based on current text being typed. Screen reader does not announce the visual update when there is no results found. Also, not consistently reproducing but sometimes voiceover does not announce the search result when user types more than three characters too fast."']
  ],
  '/collections/all': [
   ],
  '/pages/contact': [
    ['1.1.1 Non-text Content','F39: Failure of Success Criterion 1.1.1 due to providing a text alternative that is not null (e.g., alt="spacer" or alt="image") for images that should be ignored by assistive technology','"4 items, **free shipping**, **Customer service**, Refer a friend**, and **Secure payment**. Each icon\'s alt text is same as the text below the icon. The alt text and the text below are creating stutter effect and should be hidden."'],
    ['1.3.4 Orientation','F100: Failure of Success Criterion 1.3.4 due to showing a message asking to reorient device','In smart phone view on contact us page, rotating the device does not rotate the view.'],
    ['3.3.2 Labels or Instructions','F82: Failure of Success Criterion 3.3.2 by visually formatting a set of phone number fields but not including a text label','**name**, **Email** keep the label when user types in. But not for **message**'],
    ['2.5.3 Label in Name','F96: Failure due to the accessible name not containing the visible label text','**Send message** button is announced as "Create a ticket to the customer support", which does not match the visual label of "send message"']
  ],
  '/pages/about-us': [
    ['1.4.10 Reflow','F102: Failure of Success Criterion 1.4.10 due to content disappearing and not being available when content has reflowed','"About Us page is not responsive. Page requires horizontal scroll with 320px width"'],
    ['2.4.4 Link Purpose (In Context)','G91: Providing link text that describes the purpose of a link','About us page has a link without link text, uses a url as the hyperlink text'],
    ['2.4.6 Headings and Labels','G141: Organizing a page using headings"About us page. Heading with same text is used twice for different content."'],
    ['1.4.1 Use of Color','F73: Failure of Success Criterion 1.4.1 due to creating links that are not visually evident without color vision','"On **about us** page The text **go back to home page** has the link to a11y-test.com. but it uses a slightly different color than the other text but no underline or any other visual cue"'],
  ],
  '/pages/advertisement': [
    ['2.3.1 Three Flashes or Below Threshold', 'G176: Keeping the flashing area small enough', '"Background animation includes flashing."']
  ],
  '/pages/checkout': [
    ['4.1.1 Parsing', 'F70: Failure of Success Criterion 4.1.1 due to incorrect use of start and end tags or attribute markup', 'id="first-name", id="last-name", id="select0" are used multiple times'],
    ['1.1.1 Non-text Content', 'F65: Failure of Success Criterion 1.1.1 due to omitting the alt attribute or text alternative on img elements, area elements, and input elements of type "image"','Dropdown collapsed caret icon is only announced as **image**'],
    ['1.3.1 Info and Relationships','F91: Failure of Success Criterion 1.3.1 for not correctly marking up table headers','**Contact** and **Ship to** acts as an row header but not programmed as such.']
  ],
  '/pages/shipping': [],
  '/pages/payment': [],
  '/cart': [
    ['2.1.2 No Keyboard Trap','F10: Failure of Success Criterion 2.1.2 and Conformance Requirement 5 due to combining multiple content formats in a way that traps users inside one format type','Once focused on "checkout" button, keyboard cannot navigate away.']
  ],
  '/products/mc100-wireless-charge-pad-gunmetal-aluminum-black-coated-canvas': [],
  '/products/3-5mm-to-3-5mm-audio-cable-black': [
    ['4.1.2 Name, Role, Value', 'ARIA5: Using WAI-ARIA state and property attributes to expose the state of a user interface component','Using aria-hidden="true" on a focusable image **This works very well with our gaming headphones.** inside a product description.'],
    ['4.1.1 Parsing', 'ARIA10: Using aria-labelledby to provide a text alternative for non-text content', '**mg20-gaming-galactic-white** image has an aria-labelledby attribute references an ID that doesn\'t exist.'],
    ['3.2.4 Consistent Identification', 'F31: Failure of Success Criterion 3.2.4 due to using two different labels for the same function on different Web pages within a set of Web pages', '**MW50+** has **Get help** button that goes to **Contact**. Even though header and footer buttons with same destination say **Contact**']
  ],
  '/products/usb-c-to-3-5mm-audio-cable-black': [
    ['2.4.2 Page Titled','G127: Identifying a Web page\'s relationship to a larger collection of Web pages','product **USB-C To 3.5mm Audio Cable (Black)** and **Headphone Stand (Black)** pages have the title "product"']
  ],
  '/products/headphone-stand-black': [
    ['2.4.2 Page Titled','G127: Identifying a Web page\'s relationship to a larger collection of Web pages','product **USB-C To 3.5mm Audio Cable (Black)** and **Headphone Stand (Black)** pages have the title "product"']
  ],
  '/products/mc100-wireless-charge-pad-gunmetal-aluminum-black-coated-canvas': [
    ['3.1.1 Language of Page','H57: Using the language attribute on the HTML element','"""MC100 Wireless Charge Pad""There is no lang attribute in html tag on top page."'],
    ['3.2.3 Consistent Navigation','F66: Failure of Success Criterion 3.2.3 due to presenting navigation links in a different relative order on different pages','Header item order is **Contact**, **Home**, **Catalog**']
  ],
  '/products/mw50-silver-metal-brown-leather': [
    ['1.4.2 Audio Control','F23: Failure of 1.4.2 due to playing a sound longer than 3 seconds where there is no mechanism to turn it off','As soon as opening a product page, it starts to play a promotional video with sound but no stop button.']
  ],
  '/products/mw08-brown-ceramic-stainless-steel-case': [
    ['1.3.2 Meaningful Sequence','F32: Failure of Success Criterion 1.3.2 due to using white space characters to control spacing within a word','"S A L E!! 70% OFF!!! Get yours NOW" has spaces for the headphone. Screen reader announces by character'],
    ['1.1.1 Non-text Content','F30: Failure of Success Criterion 1.1.1 and 1.2.1 due to using text alternatives that are not alternatives (e.g., filenames or placeholder text)','"First product image of **MW08 (Brown Ceramic / Stainless Steel Case)** has a bad alt text. It says **Someone jogging and wearing pair of silver earphones.** when it is just one brown earphone."']
  ],
  '/products/mh40-wireless-ear-pads': [
    ['1.1.1 Non-text Content', 'F30: Failure of Success Criterion 1.1.1 and 1.2.1 due to using text alternatives that are not alternatives (e.g., filenames or placeholder text)', '"In footer, there are 11 logos to show the payment methods. All have same alt text **Cards** Each card should have its proper name as alt text, **Visa**, **master**, etc"']
  ],
  '/products/mh40-wireless-silver-metal-navy-coated-canvas': [
    ['1.3.1 Info and Relationships', 'F2: Failure of Success Criterion 1.3.1 due to using changes in text presentation to convey information without using the appropriate markup or text','"A list of features are using just bullet points ""•"" for each item but not using `ul` and `li` tag"'],
    ['2.4.3 Focus Order', 'G59: Placing the interactive elements in an order that follows sequences and relationships within the content', 'Each list item receives focus though they are not interactive']
  ],
  '/products/mw07-plus-charging-case-canvas-pouch-stainless-steel': [],
  '/account/addresses': [],
  '/account/register': [],
  '/account/login' : [
    ['3.3.1 Error Identification', 'G83: Providing text descriptions to identify required fields that were not completed','When user enters wrong login credentials, screen reader announces nothing. Screen reader jumps to **skip to content**']
  ],
  '/search' : [
  ['3.3.2 Labels or Instructions', 'F1: Failure of Success Criterion 1.3.2 due to changing the meaning of content by positioning information with CSS', 'Search icon is unlabelled'],
  ['4.1.3 Status Messages', 'F103: Failure of Success Criterion 4.1.3 due to providing status messages that cannot be programmatically determined through role or properties', '"Screen reader does not announce the visually updated search results after editing the filters. It only announces the first product."']
  ]
}