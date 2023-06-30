const csvIssues = `ID,"44
Added to list popup","Status
100 Done
0 Deved
8 Not Implemented yet",cart,Scenario,Step,Level,"Criterion
(30As and 20AAs)",Issue Title (EE internal mapping),Details of the issue,"Failure Type (Implicit, Explicit)",Failure technique,Frequency (Came Up Once in This % of Last 80 EE Audits),% of the time across all issues logged in our audits,Web Application Frequency,Manual Testing Time,Severity,By Default?,"Not applicable
(relevant)",Discussion Points,Asset
1,FALSE,Done: Verified by PM,https://a11y-test.com/products/mh40-wireless-silver-metal-navy-coated-canvas,S2: Searching a Product and adding to Cart,,A,1.1.1 Non-text Content,Image does not provide a text alternative,"**MH40 Wireless (Silver Metal / Navy Coated Canvas)** first product image has a bad alt text. It is just its original file name, **20230518.jpg**",Implicit,"F30: Failure of Success Criterion 1.1.1 and 1.2.1 due to using text alternatives that are not alternatives (e.g., filenames or placeholder text)",High,,,,Major,TRUE,FALSE,,
2,TRUE,Done: Verified by PM,https://a11y-test.com/products/mh40-wireless-ear-pads,S6: Product Pages,,A,1.1.1 Non-text Content,Text alternative does not provide a sufficient description.,"In footer, there are 11 logos to show the payment methods.
All have same alt text **Cards**

Each card should have its proper name as alt text, **Visa**, **master**, etc",Explicit,"F30: Failure of Success Criterion 1.1.1 and 1.2.1 due to using text alternatives that are not alternatives (e.g., filenames or placeholder text)",48.24%,1.38%,,,Blocking,FALSE,FALSE,,
4,TRUE,Done: Verified by PM,https://a11y-test.com/pages/contact,S7: Contact,,A,1.1.1 Non-text Content,Text alternative creates a stutter effect.,"4 items, **free shipping**, **Customer service**, Refer a friend**, and **Secure payment**.
Each icon's alt text is same as the text below the icon.
The alt text and the text below are creating stutter effect and should be hidden.",Explicit,"F39: Failure of Success Criterion 1.1.1 due to providing a text alternative that is not null (e.g., alt=""spacer"" or alt=""image"") for images that should be ignored by assistive technology",25.88%,0.86%,,,Major,FALSE,FALSE,,
6,FALSE,Done: Verified by PM,https://a11y-test.com/products/mh40-wireless-silver-metal-navy-coated-canvas,S2: Searching a Product and adding to Cart,,A,1.2.1 Audio-only and Video-only (Prerecorded),Audio-only or video-only transcript is not sufficient.,"**MH40 Wireless (Silver Metal / Navy Coated Canvas)**
The silent video explains the product is made out of machined metal but does not have text or audio equivalent",Explicit,"F30: Failure of Success Criterion 1.1.1 and 1.2.1 due to using text alternatives that are not alternatives (e.g., filenames or placeholder text)",0.00%,0.00%,,,Major,FALSE,FALSE,,
7,TRUE,Done: Verified by PM,https://a11y-test.com/products/mw08-brown-ceramic-stainless-steel-case,S6: Product Pages,,A,1.2.2 Captions (Prerecorded),Captions are not provided for prerecorded audiovisual content.,The Product Video for **MW08 (Brown Ceramic / Stainless Steel Case)** does not have closed captions even though there is spoken narration,Explicit,F75: Failure of Success Criterion 1.2.2 by providing synchronized media without captions when the synchronized media presents more information than is presented on the page,12.94%,0.25%,,,Blocking,FALSE,FALSE,,
11,TRUE,Done: Verified by PM,https://a11y-test.com/products/mw08-brown-ceramic-stainless-steel-case,S6: Product Pages,,A,1.2.3 Audio Description or Media Alternative (Prerecorded),Multimedia transcript is not sufficient.,The video does not have accurate transcript. Linked youtube page has transcript functionality but no punctuation and hard to read it as a text equivalent.,Implicit,G151: Providing a link to a text transcript of a prepared statement or script if the script is followed,2.35%,0.03%,,,Major,FALSE,FALSE,,
13,FALSE,Done: Verified by PM,https://a11y-test.com/products/mh40-wireless-silver-metal-navy-coated-canvas,S2: Searching a Product and adding to Cart,,AA,1.2.5 Audio Description (Prerecorded),Audio description is not provided for prerecorded audiovisual content.,"**MH40 Wireless (Silver Metal / Navy Coated Canvas)**

In the product video, there's text on screen to explain the features of the product but AD is not provided",Implicit,G8: Providing a movie with extended audio descriptions,16.47%,0.68%,,,Major,FALSE,FALSE,,
15,TRUE,Done: Verified by PM,https://a11y-test.com/products/mh40-wireless-silver-metal-navy-coated-canvas,S2: Searching a Product and adding to Cart,,A,1.3.1 Info and Relationships,Elements visually displayed as a list are not correctly expressed as such programmatically.,"A list of features are using just bullet points ""•"" for each item but not using 'ul' and 'li' tag",Explicit,F2: Failure of Success Criterion 1.3.1 due to using changes in text presentation to convey information without using the appropriate markup or text,41.18%,0.82%,,,Major,FALSE,FALSE,,
16,FALSE,Done: Verified by PM,https://a11y-test.com/pages/shipping,S4: Completing a money order transaction for an item,,A,1.3.1 Info and Relationships,Individual radiobutton options are not programmatically associated to a group.,"Radio buttons under ""payment"" heading is not correctly coded

legend or aria-label is not used",Implicit,H90: Indicating required form controls using label or legend,9.41%,0.15%,,,Major,FALSE,FALSE,,
18,FALSE,Done: Verified by PM,https://a11y-test.com/products/mh40-wireless-silver-metal-navy-coated-canvas,S2: Searching a Product and adding to Cart,,A,1.1.1 Non-text Content,Image does not provide a text alternative,"MH40 Wireless (Silver Metal / Navy Coated Canvas)

Star rating of the product is not read by screen reader.
Black and white star icons with empty alt attributes ('alt=""""')",Explicit,F68: Failure of Success Criterion 4.1.2 due to a user interface control not having a programmatically determined name,67.06%,2.46%,,,Major,FALSE,FALSE,,
19,FALSE,Done: Verified by PM,https://a11y-test.com/products/mh40-wireless-ear-pads,S6: Product Pages,,A,1.3.1 Info and Relationships,Not all text is readable by a screen reader.,"Ear pads product page.

Strikethrough on **Get 70% discount by visiting our in-person store. The number of discount coupons are limited so please hurry!** is not announced by screenreader.",Explicit,F2: Failure of Success Criterion 1.3.1 due to using changes in text presentation to convey information without using the appropriate markup or text,Low,,,,Major,FALSE,FALSE,,
20,FALSE,Done: Verified by PM,https://a11y-test.com/products/mh40-wireless-silver-metal-navy-coated-canvas,S2: Searching a Product and adding to Cart,,A,1.3.1 Info and Relationships,Data table does not provide programmatic association between data and headers.,"**MH40 Wireless (Silver Metal / Navy Coated Canvas)**

Table showing the product size and kind does not have **th** tag for headers",Explicit,F91: Failure of Success Criterion 1.3.1 for not correctly marking up table headers,23.53%,0.42%,,,Major,FALSE,FALSE,,
25,FALSE,Done: Verified by PM,https://a11y-test.com/pages/contact,S7: Contact,,A,1.3.1 Info and Relationships,Programmatic heading structure does not match the visual layout.,"Contact Us has visual heading that is styled text, but not programmatic heading **Contact Us**",Explicit,F2: Failure of Success Criterion 1.3.1 due to using changes in text presentation to convey information without using the appropriate markup or text,High,,,,Major,TRUE,FALSE,,
31,TRUE,Done: Verified by PM,https://a11y-test.com/products/mw08-brown-ceramic-stainless-steel-case,S6: Product Pages,,A,1.3.2 Meaningful Sequence,Visual effect degrades the programmatic readability (D o n ‘ t  D o  I t !).,"""S A L E!! 70% OFF!!! Get yours NOW"" has spaces for the headphone. Screen reader announces by character",Explicit,F32: Failure of Success Criterion 1.3.2 due to using white space characters to control spacing within a word,5.88%,0.07%,,,Major,FALSE,FALSE,,
32,FALSE,Done: Verified by PM,https://a11y-test.com/pages/about-us,S6: Product Pages,,A,1.3.3 Sensory Characteristics,"Relies on single sensory characteristic (shape, size, visual location, orientation, or sound).","The heading says ""click the coupon on the bottom left of this page""
Relies on single sensory characteristics.",Explicit,F26: Failure of Success Criterion 1.3.3 due to using a graphical symbol alone to convey information,17.65%,0.28%,,,Major,FALSE,FALSE,,
33,TRUE,Done: Verified by PM,https://a11y-test.com/pages/contact,S7: Contact,,AA,1.3.4 Orientation,Does not support viewers choice in portrait or landscape.,"In smart phone view on contact us page, rotating the device does not rotate the view.",Explicit,F100: Failure of Success Criterion 1.3.4 due to showing a message asking to reorient device,3.53%,0.04%,,,Major,FALSE,FALSE,,
34,FALSE,Done: Verified by PM,checkout/information,S5: Sign-up and Sign-in,,AA,1.3.5 Identify Input Purpose,Known input field type missing autocomplete.,"**Information** section
Under **Contact** is an email input field that does not have auto complete

Also removed 'type' attribute so browser does not detect the email input field",Explicit,F107: Failure of Success Criterion 1.3.5 due to incorrect autocomplete attribute values,2.35%,0.03%,,,Minor,FALSE,FALSE,,
35,FALSE,Done: Verified by PM,https://a11y-test.com/account/register,S5: Sign-up and Sign-in,,A,1.4.1 Use of Color,Element relies on color alone to convey meaning.,"Sign up form

When user types in wrong format (not blank)
Success and fail cue on each field is indicated solely by different color of the dots",Explicit,F13: Failure of Success Criterion 1.1.1 and 1.4.1 due to having a text alternative that does not include information that is conveyed by color differences in the image,31.76%,0.56%,,,Blocking,FALSE,FALSE,,
36,TRUE,Done: Verified by PM,https://a11y-test.com/pages/about-us,S6: Product Pages,,A,1.4.1 Use of Color,Link is not visually distinguishable from text,"On **about us** page
The text **go back to home page** has the link to a11y-test.com. but it uses a slightly different color than the other text but no underline or any other visual cue",Explicit,F73: Failure of Success Criterion 1.4.1 due to creating links that are not visually evident without color vision,Low,,,,Major,FALSE,FALSE,,
37,TRUE,Done: Verified by PM,https://a11y-test.com/pages/about-us,S6: Product Pages,,A,1.4.10 Reflow,"Content doesn’t support reflow, to allow single column reading.","About Us page is not responsive.
Page requires horizontal scroll with 320px width",Explicit,F102: Failure of Success Criterion 1.4.10 due to content disappearing and not being available when content has reflowed,25.88%,0.62%,,,Major,FALSE,FALSE,,
38,TRUE,Done: Verified by PM,https://a11y-test.com,S1: Explore the site for the first time,,AA,1.4.11 Non-text Contrast,User interface component does not have sufficient contrast with background,Social media Icons in the footer do not meet contrast requirement,Implicit,G207: Ensuring that a contrast ratio of 3:1 is provided for icons,75.29%,4.65%,,,Major,FALSE,FALSE,,
39,FALSE,Done: Verified by PM,https://a11y-test.com/pages/about-us,S6: Product Pages,,AA,1.4.12 Text Spacing,Does not support user defined text spacing,Text spacing does not work on about us page,Explicit,F104: Failure of Success Criterion 1.4.12 due to clipped or overlapped content when text spacing is adjusted,2.35%,0.04%,,,Major,FALSE,FALSE,EE wants to blog about this one with you,
41,TRUE,Done: Verified by PM,https://a11y-test.com,S1: Explore the site for the first time,,AA,1.4.13 Content on Hover or Focus,Hover content is itself not hoverable,"Under **Incredible features**, a tooltip appears on hover. However, the tooltip disappears when mouse moves away from the popup.",Explicit,F95: Failure of Success Criterion 1.4.13 due to content shown on hover not being hoverable,0.00%,0.00%,,,Major,FALSE,FALSE,,
42,TRUE,Done: Verified by PM,https://a11y-test.com/products/mw50-silver-metal-brown-leather,S6: Product Pages,,AA,1.4.2 Audio Control,No way to stop automatically started audio.,"As soon as opening a product page, it starts to play a promotional video with sound but no stop button.",Explicit,F23: Failure of 1.4.2 due to playing a sound longer than 3 seconds where there is no mechanism to turn it off,1.18%,0.01%,,,Major,FALSE,FALSE,,
48,FALSE,Done: Verified by PM,https://a11y-test.com/pages/about-us,S6: Product Pages,,AA,1.4.4 Resize text,Zoom is not supported up to 200%.,User cannot increase the text size by zooming without loss of content as the page does not reflow,Explicit,"F69: Failure of Success Criterion 1.4.4 when resizing visually rendered text up to 200 percent causes the text, image or controls to be clipped, truncated or obscured",20.00%,0.37%,,,Major,FALSE,FALSE,,
49,FALSE,Done: Verified by PM,https://a11y-test.com/pages/about-us,S6: Product Pages,,AA,1.4.5 Images of Text,Image of text is used instead of text.,"Image of text is used for ""50% OFF"" message.",Implicit,G140: Separating information and structure from presentation to enable different presentations,16.47%,0.36%,,,Major,FALSE,FALSE,,
51,TRUE,Done: Verified by PM,Search popup,S2: Searching a Product and adding to Cart,,A,2.1.1 Keyboard,Control does not receive keyboard focus.,"**search popup**
Search results on do not receive keyboard focus.
But, the results in the **pages** tab do receive keyboard focus.

Depending on the search keyword, a tab disappear when there's no results in the tab.
Whatever the tabs it displays, only the results in the **last** tab receive keyboard focus.",Explicit,F54: Failure of Success Criterion 2.1.1 due to using only pointing-device-specific event handlers (including gesture) for a function,High,,,,Blocking,FALSE,FALSE,,
55,TRUE,Done: Verified by PM,https://a11y-test.com/cart,S3: View Cart,,A,2.1.2 No Keyboard Trap,Keyboard users cannot navigate away from element once it receives focus,"Once focused on ""checkout"" button, keyboard cannot navigate away.",Explicit,F10: Failure of Success Criterion 2.1.2 and Conformance Requirement 5 due to combining multiple content formats in a way that traps users inside one format type,1.18%,0.01%,,,Major,FALSE,FALSE,,
57,FALSE,Done: Verified by PM,https://a11y-test.com/products/mw65-silver-metal-brown-leather,S3: View Cart,,A,2.2.1 Timing Adjustable,Information is displayed only for a pre-defined time limit and is not adjustable.,"MW65 product page

Page redirects to home page after 30 seconds without user taking any action",Explicit,"F41: Failure of Success Criterion 2.2.1, 2.2.4, and 3.2.5 due to using meta refresh to reload the page",28.24%,0.49%,,,Major,FALSE,FALSE,,
58,FALSE,Done: Verified by PM,https://a11y-test.com/pages/advertisement,S6: Product Pages,,A,"2.2.2 Pause, Stop, Hide","Content has no mechanism to pause, stop, or hide.","Only on **Advertisement** page

Scrolling animation at the top cannot be paused, stopped, or hidden

**50% off sale until July**",Explicit,F50: Failure of Success Criterion 2.2.2 due to a script that causes a blink effect without a mechanism to stop the blinking at 5 seconds or less,High,,,,Blocking,TRUE,FALSE,,
59,TRUE,Done: Verified by PM,https://a11y-test.com/pages/advertisement,S6: Product Pages,,A,2.3.1 Three Flashes or Below Threshold,Element contains flashing or blinking content.,Background animation includes flashing.,Implicit,G176: Keeping the flashing area small enough,1.18%,0.01%,,,Blocking,FALSE,FALSE,,
61,FALSE,Done: Verified by PM,https://a11y-test.com,S1: Explore the site for the first time,,A,2.4.1 Bypass Blocks,Mechanism designed to bypass blocks of content/controls is not working properly,"Skip to content button exist on all pages apart from checkout.

It works on all pages but the top page.

On top page, enter or space does not skip the header navigation. TAB takes the focus to **Miller & Lowe** logo.",Implicit,G1: Adding a link at the top of each page that goes directly to the main content area,18.82%,0.34%,,,Major,TRUE,FALSE,,
63,TRUE,Done: Verified by PM,https://a11y-test.com,S1: Explore the site for the first time,,A,2.4.2 Page Titled,Not supported by unique or accurate title.,"""50% off"" is not descriptive as a title for a top page.",Explicit,F25: Failure of Success Criterion 2.4.2 due to the title of a Web page not identifying the contents,10.59%,0.34%,,,Major,FALSE,FALSE,,
64,TRUE,Done: Verified by PM,"https://a11y-test.com/products/usb-c-to-3-5mm-audio-cable-black
https://a11y-test.com/products/headphone-stand-black",S6: Product Pages,,A,2.4.2 Page Titled,Not supported by unique or accurate title.,"product **USB-C To 3.5mm Audio Cable (Black)** and **Headphone Stand (Black)** pages have the title ""product""",Implicit,G127: Identifying a Web page's relationship to a larger collection of Web pages,10.59%,0.34%,,,Major,FALSE,FALSE,,
65,TRUE,Done: Verified by PM,https://a11y-test.com/pages/contact,S6: Product Pages,,A,2.4.3 Focus Order,Focus moves to a non-interactive control.,"**Contact US** page has 4 items, **free shipping**, **Customer service**, Refer a friend**, and **Secure payment**.
They are all not interactive but receive keyboard focus",Implicit,G59: Placing the interactive elements in an order that follows sequences and relationships within the content,16.47%,0.36%,,,Major,FALSE,FALSE,,
66,FALSE,Done: Verified by PM,https://a11y-test.com/products/mh40-wireless-silver-metal-navy-coated-canvas,S2: Searching a Product and adding to Cart,,A,2.4.3 Focus Order,Logical focus order isn’t provided.,"On **MH40** page

**Submit a review** receives focus earlier than other input fields inside **Write a review** section.",Implicit,C27: Making the DOM order match the visual order,High,,,,Major,FALSE,FALSE,,
69,FALSE,Done: Verified by PM,https://a11y-test.com/collections/all,S2: Searching a Product and adding to Cart,,A,2.4.3 Focus Order,Focus does not move to newly requested dialog/control.,"After activating the **Quick Add** button, focus stays on the button and does not move to the **Added to your cart!** dialog.

Same control as #30 but different behavior",Explicit,F85: Failure of Success Criterion 2.4.3 due to using dialogs or menus that are not adjacent to their trigger control in the sequential navigation order,42.35%,1.99%,,,Major,FALSE,FALSE,,
70,TRUE,Done: Verified by PM,https://a11y-test.com/pages/about-us,S6: Product Pages,,A,2.4.4 Link Purpose (In Context),Link purpose is not provided as part of the link text,"About us page has a link without link text, uses a url as the hyperlink text",Implicit,G91: Providing link text that describes the purpose of a link,35.29%,0.77%,,,Major,FALSE,FALSE,,
72,FALSE,Done: Verified by PM,https://a11y-test.com/products/mw08-brown-ceramic-stainless-steel-case,S6: Product Pages,,AA,2.4.5 Multiple Ways,There is only one way to access the content.,"About us is only reachable from the home page.

Not shown in search result.",Implicit,G63: Providing a site map,3.53%,0.12%,,,Major,FALSE,FALSE,,
74,TRUE,Done: Verified by PM,https://a11y-test.com/pages/about-us,S6: Product Pages,,AA,2.4.6 Headings and Labels,Headings are not unique.,"About us page.
Heading with same text is used twice for different content.",Implicit,G141: Organizing a page using headings,7.06%,0.13%,,,Major,FALSE,FALSE,,
75,FALSE,Done: Verified by PM,https://a11y-test.com/pages/contact,S7: Contact,,AA,2.4.7 Focus Visible,Element does not change its appearance when it has focus.,"On **Contact** page, **Send message** button does not change its color when it has focus",Implicit,G149: Using user interface components that are highlighted by the user agent when they receive focus,56.47%,3.10%,,,Major,FALSE,FALSE,,
76,FALSE,Not Implemented yet,,S6: Product Pages,,AA,2.4.3 Focus Order,Focus can move to a control that is not visible.,Focus not trapped inside of the popup. Focus can go behind the product cards that are not visible,Implicit,G59: Placing the interactive elements in an order that follows sequences and relationships within the content,High,,,,Major,FALSE,FALSE,,
78,FALSE,Done: Verified by PM,https://a11y-test.com/products/3-5mm-to-3-5mm-audio-cable-black,S2: Searching a Product and adding to Cart,,A,2.5.2 Pointer Cancellation,Element is activated on initial touch rather than final touch location,The link that refers to a headset gets activated on initial touch rather than final touch locaiton on mobile. ,Explicit,F101: Failure of Success Criterion 2.5.2 due to activating a control on the down-event,0.00%,0.00%,,,Major,FALSE,FALSE,,
81,FALSE,Not Implemented yet,https://a11y-test.com/cart,S3: View Cart,,A,2.5.4 Motion Actuation,Motion actuation cannot be disabled,Shaking the phone clears the cart items but cannot be disabled,Explicit,F106: Failure due to inability to deactivate motion actuation,Low,,,,Major,FALSE,FALSE,,
82,TRUE,Done: Verified by PM,https://a11y-test.com/products/mc100-wireless-charge-pad-gunmetal-aluminum-black-coated-canvas,S6: Product Pages,,A,3.1.1 Language of Page,Language is not defined programmatically.,"""MC100 Wireless Charge Pad""
There is no lang attribute in html tag on top page.",Implicit,H57: Using the language attribute on the HTML element,14.12%,0.25%,,,Major,FALSE,FALSE,,
84,TRUE,Done: Verified by PM,https://a11y-test.com/products/mw07-plus-charging-case-canvas-pouch-stainless-steel,S6: Product Pages,,AA,3.1.2 Language of Parts,Language changes are not expressed programmatically.,**MW07 Plus Charging Case & Canvas Pouch (Stainless Steel)** has Japanese text in the products details section but does not have lang attribute,Implicit,H58: Using language attributes to identify changes in the human language,7.06%,0.16%,,,Major,FALSE,FALSE,,
86,FALSE,Done: Verified by PM,https://a11y-test.com/products/usb-c-to-3-5mm-audio-cable-black,S3: View Cart,,A,3.2.1 On Focus,Actions is unexpectedly performed on focus vs on user action.,**Checkout** button on cart popup gets activated on focus,Explicit,F52: Failure of Success Criterion 3.2.1 and 3.2.5 due to opening a new window as soon as a new page is loaded,11.76%,0.19%,,,Major,FALSE,FALSE,,
88,FALSE,Done: Verified by PM,https://a11y-test.com/cart,S3: View Cart,,A,3.2.2 On Input,Context is changed unexpectedly based on input.,"When **Country** is not selected, after entering the 5 digits of a Zip Code, focus is moved to **Estimate**",Explicit,F36: Failure of Success Criterion 3.2.2 due to automatically submitting a form and given a value,3.53%,0.04%,,,Major,FALSE,FALSE,,
90,TRUE,Done: Verified by PM,https://a11y-test.com/products/mc100-wireless-charge-pad-gunmetal-aluminum-black-coated-canvas,S6: Product Pages,,AA,3.2.3 Consistent Navigation,Navigation controls are not consistent.,"On page **MC100 Wireless Charge Pad**, header item order is **Contact**, **Home**, **Catalog**",Explicit,F66: Failure of Success Criterion 3.2.3 due to presenting navigation links in a different relative order on different pages,16.47%,0.27%,,,Minor,FALSE,FALSE,,
93,TRUE,Done: Verified by PM,https://a11y-test.com/products/3-5mm-to-3-5mm-audio-cable-black,S6: Product Pages,,AA,3.2.4 Consistent Identification,Links with the same destination use different link text.,**MW50+** has **Get help** button that goes to **Contact**. Even though header and footer buttons with same destination say **Contact**,Explicit,F31: Failure of Success Criterion 3.2.4 due to using two different labels for the same function on different Web pages within a set of Web pages,18.82%,0.40%,,,Minor,FALSE,FALSE,,
95,FALSE,Done: Verified by PM,checkout/information,S4: Completing a money order transaction for an item,,A,3.3.1 Error Identification,Error notification is not announced by screen reader.,"When user leaves **last name** blank, screen reader does not announce the error.",Implicit,G85: Providing a text description when user input falls outside the required format or values,49.41%,1.57%,,,Major,FALSE,FALSE,,
98,FALSE,Done: Verified by PM,https://a11y-test.com/pages/checkout,S5: Sign-up and Sign-in,,A,3.3.1 Error Identification,Complete list of errors is not provided,"Sign up page does not provide the list of all errors. It only shows the error one by one using the browser default UI.

Does not occur on Login page",Implicit,,Medium,,,,Major,TRUE,FALSE,,
99,TRUE,Done: Verified by PM,https://a11y-test.com/pages/contact,S7: Contact,,A,3.3.2 Labels or Instructions,"Control has no visible label (placeholder text is not considered a label, as it is replaced with a value).","**name**, **Email** keep the label when user types in. But not for **message**",Explicit,F82: Failure of Success Criterion 3.3.2 by visually formatting a set of phone number fields but not including a text label,#N/A,#N/A,,,Major,FALSE,FALSE,,
100,FALSE,Done: Verified by PM,https://a11y-test.com/cart,S3: View Cart,,A,3.3.2 Labels or Instructions,Control has no programmatic name/label.,"Expand Estimate Shipping on cart page, the zip code field has no programmatic label ",Implicit,,75.29%,5.46%,,,Major,FALSE,FALSE,,
104,TRUE,Done: Verified by PM,https://a11y-test.com/pages/contact,S1: Explore the site for the first time,,A,2.5.3 Label in Name,Control’s programmatic name/label is inaccurate.,"**Send message** button is announced as ""Create a ticket to the customer support"", which does not match the visual label of ""send message""",Explicit,F96: Failure due to the accessible name not containing the visible label text,67.06%,4.85%,,,Blocking,FALSE,FALSE,,
105,FALSE,Done: Verified by PM,https://a11y-test.com/account/register,S5: Sign-up and Sign-in,,A,3.3.2 Labels or Instructions,Instructions are not provided.,"Sign Up page
Form does not show password formatting requirement beforehand",Implicit,G177: Providing suggested correction text,Low,,,,Minor,TRUE,FALSE,,
106,FALSE,Done: Verified by PM,checkout/payment,S4: Completing a money order transaction for an item,,AA,3.3.3 Error Suggestion,Error message should be clearer.,"Credit card payment does not go through.
The issue is it throws a vague error message, **Credit card validation failed** User would not know what the exact problem was.",Implicit,G177: Providing suggested correction text,17.65%,0.42%,,,Major,FALSE,FALSE,,
109,FALSE,Done: Verified by PM,checkout/payment,S4: Completing a money order transaction for an item,,AA,"3.3.4 Error Prevention (Legal, Financial, Data)",User cannot review legal or financial data before submitting it.,**checkout** does not allow User to confirm the information before completing the purchase,Implicit,G98: Providing the ability for the user to review and correct answers before submitting,High,,,,Major,TRUE,FALSE,,
111,TRUE,Done: Verified by PM,checkout/information,S4: Completing a money order transaction for an item,,A,4.1.1 Parsing,Duplicate use of programmatic IDs.,"id=""first-name"", id=""last-name"", id=""select0"" are used multiple times",Explicit,F70: Failure of Success Criterion 4.1.1 due to incorrect use of start and end tags or attribute markup,35.29%,0.77%,,,Minor,TRUE,FALSE,,
118,FALSE,Done: Verified by PM,https://a11y-test.com,S5: Sign-up and Sign-in,,A,"4.1.2 Name, Role, Value","Control does not provide role, state, and value information.",**Submit** button on **sign up to newsletter** at the bottom of **home page** is made out of a div with no role attribute. Screen reader users would not know it is a button,Explicit,"F15: Failure of Success Criterion 4.1.2 due to implementing custom controls that do not use an accessibility API for the technology, or do so incompletely",62.35%,3.27%,,,Major,FALSE,FALSE,"There are many ways to fail this, so Evinced could have a million examples relating to this.",
121,TRUE,Done: Verified by PM,cart popup,S3: View Cart,,AA,4.1.3 Status Messages,Status updates or confirmation messages are not announced by screenreader,"When user increases the quantity of an item, screen reader does not announce the visual change of price and quantity.

Correct behavior can be seen on a11y-test.com/cart",Explicit,F103: Failure of Success Criterion 4.1.3 due to providing status messages that cannot be programmatically determined through role or properties,High,,,,Major,TRUE,FALSE,,
123,FALSE,Done: Verified by PM,https://a11y-test.com/pages/about-us,S6: Product Pages,,AA,1.4.11 Non-text Contrast,User interface component does not have sufficient contrast with background,"On **about us** page

The text **go back to home page** has the link to a11y-test.com.
But only for the element, the focus rectangle color is edited manually to light blue and does not have enough contrast with the white background.",Explicit,F78: Failure of Success Criterion 2.4.7 due to styling element outlines and borders in a way that removes or renders non-visible the visual focus indicator,75.29%,4.65%,,,Major,FALSE,FALSE,,
124,FALSE,Done: Verified by PM,https://a11y-test.com/cart,S3: View Cart,,A,1.3.1 Info and Relationships,"Control does not provide role, state, and value information.","Cart

**Estimate shipping** expand collapsed state is not announced. 'aria-expanded' does not exist.",Implicit,ARIA5: Using WAI-ARIA state and property attributes to expose the state of a user interface component,62.35%,3.27%,,,Major,FALSE,FALSE,,
125,TRUE,Done: Verified by PM,Search popup,S2: Searching a Product and adding to Cart,,A,4.1.3 Status Messages,Information updated visually on screen is not announced by screen reader.,"On search **popup**, when user searches for a product, search field shows the dynamic search result based on current text being typed.

Screen reader does not announce the visual update when there is no results found.
Also, not consistently reproducing but sometimes voiceover does not announce the search result when user types more than three characters too fast.",Explicit,F103: Failure of Success Criterion 4.1.3 due to providing status messages that cannot be programmatically determined through role or properties,67.06%,3.83%,,,Major,TRUE,FALSE,,
127,TRUE,Done: Verified by PM,https://a11y-test.com/products/mw08-brown-ceramic-stainless-steel-case,S6: Product Pages,,A,1.1.1 Non-text Content,Image does not provide a text alternative,"First product image of **MW08 (Brown Ceramic / Stainless Steel Case)** has a bad alt text.
It says **Someone jogging and wearing pair of silver earphones.** when it is just one brown earphone.",Implicit,"F30: Failure of Success Criterion 1.1.1 and 1.2.1 due to using text alternatives that are not alternatives (e.g., filenames or placeholder text)",67.06%,2.46%,,,Major,FALSE,FALSE,,
128,TRUE,Done: Verified by PM,https://a11y-test.com,S1: Explore the site for the first time,,A,2.1.1 Keyboard,Control does not receive keyboard focus.,**Gaming or Photography** can appear by sliding the bar in the middle. It does not receive keyboard focus.,Explicit,F54: Failure of Success Criterion 2.1.1 due to using only pointing-device-specific event handlers (including gesture) for a function,High,,,,Blocking,TRUE,FALSE,,
129,TRUE,Done: Verified by PM,https://a11y-test.com,S1: Explore the site for the first time,,AA,1.4.3 Contrast (Minimum),Does not meet the contrast minimum of 4.5:1 for regular text.,"Text on Logo image ""miller & lowe"" does not meet contrast with the background on top page",Implicit,G18: Ensuring that a contrast ratio of at least 4.5:1 exists between text (and images of text) and background behind the text,89.41%,5.70%,,,Minor,FALSE,FALSE,,
130,FALSE,Done: Verified by PM,https://a11y-test.com,S1: Explore the site for the first time,,,1.4.13 Content on Hover or Focus,Content that appears on focus or hover cannot be dismissed without moving pointer or keyboard focus,"Tooltip (hot spot) appears on hover.

Only ways to dismiss them is move pointer or focus

ESC does not work to dismiss them.",,"SCR39: Making content on focus or hover hoverable, dismissible, and persistent",,,,,,FALSE,FALSE,,
131,TRUE,Done: Verified by PM,https://a11y-test.com,S1: Explore the site for the first time,,AA,1.4.3 Contrast (Minimum),Does not meet the contrast minimum of 4.5:1 for regular text.,**incredible features** does not meet contrast with the background image of green headset,Implicit,G18: Ensuring that a contrast ratio of at least 4.5:1 exists between text (and images of text) and background behind the text,89.41%,5.70%,,,Minor,FALSE,FALSE,,
132,TRUE,Done: Verified by PM,https://a11y-test.com,S1: Explore the site for the first time,,A,1.3.1 Info and Relationships,Programmatic heading structure does not match the visual layout.,"**Sign up for new stories and personal offers**, **Footer Menu**, **About** inside the footer are visually but not programmatically headings.",Explicit,F2: Failure of Success Criterion 1.3.1 due to using changes in text presentation to convey information without using the appropriate markup or text,High,,,,Major,TRUE,FALSE,,
133,TRUE,Done: Verified by PM,Search popup,S2: Searching a Product and adding to Cart,,,"4.1.2 Name, Role, Value","Inaccurate role, state, or value information supplied.","Search popup can have any of the following tabs, **Products**, **Suggestions**, **Collections**, **Pages**

They are coded as 'role=""tab""' but they don't have a parent with 'role=""tablist""",Implicit,ARIA4: Using a WAI-ARIA role to expose the role of a user interface component,,,,,Minor,TRUE,FALSE,,
134,TRUE,Done: Verified by PM,Search popup,S2: Searching a Product and adding to Cart,,,1.4.3 Contrast (Minimum),Does not meet the contrast minimum of 4.5:1 for regular text.,"Search popup can have any of the following tabs, **Products**, **Suggestions**, **Collections**, **Pages**

When they are not selected, the text don't meet the contrast requirement even though they are not in disabled state",Implicit,G18: Ensuring that a contrast ratio of at least 4.5:1 exists between text (and images of text) and background behind the text,,,,,Major,TRUE,FALSE,,
135,TRUE,Done: Verified by PM,https://a11y-test.com/search,S2: Searching a Product and adding to Cart,,,3.3.2 Labels or Instructions,Control has no programmatic name/label.,Search icon is unlabelled,Explicit,F1: Failure of Success Criterion 1.3.2 due to changing the meaning of content by positioning information with CSS,High,,,,,TRUE,FALSE,,
136,FALSE,Done: Verified by PM,https://a11y-test.com/search,S2: Searching a Product and adding to Cart,,,2.4.3 Focus Order,Logical focus order isn’t provided.,"**In stock only** toggle control and **Price** scroll bar control

Once user activates the control to filter the search result, focus is lost.
Enter/space does not do anything and no visual focus indicator anywhere.
Tabbing once gets the focus to the search field.

Interacting with Price slider control and Price stepper control loses the focus and AJAXes so very hard for keyboard and screen reader users.",Implicit,,High,,,,,TRUE,FALSE,,
137,TRUE,Done: Verified by PM,https://a11y-test.com/search,S2: Searching a Product and adding to Cart,,,4.1.3 Status Messages,Information updated visually on screen is not announced by screen reader.,"Screen reader does not announce the visually updated search results after editing the filters.

It only announces the first product.",Explicit,F103: Failure of Success Criterion 4.1.3 due to providing status messages that cannot be programmatically determined through role or properties,High,,,,,TRUE,FALSE,,
138,FALSE,Done: Verified by PM,https://a11y-test.com/products/mh40-wireless-silver-metal-navy-coated-canvas,S2: Searching a Product and adding to Cart,,,4.1.3 Status Messages,status updates or confirmation messages are not announced by screenreader,"On MH40 page

After adding an item to the cart, the site shows a popup.
Screenreader remains silent.",Implicit,,,,,,,TRUE,FALSE,,
139,FALSE,Done: Verified by PM,https://a11y-test.com/products/mh40-wireless-silver-metal-navy-coated-canvas,S2: Searching a Product and adding to Cart,,,2.4.7 Focus Visible,Element does not change its appearance when it has focus.,Star controls in rating form do not change appearance when they receive focus.,Implicit,,,,,,,TRUE,FALSE,,
140,FALSE,Done: Verified by PM,https://a11y-test.com/products/mh40-wireless-silver-metal-navy-coated-canvas,S2: Searching a Product and adding to Cart,,,3.3.1 Error Identification,Error notification is not announced by screen reader.,"When user submits review without any field filled, the error says ""Not all the fields have been filled out correctly!""

Screenreader does not announce it. Instead, it erroneously announced ""(1500) characters remaining""",Implicit,,,,,,,TRUE,FALSE,,
141,FALSE,Done: Verified by PM,https://a11y-test.com/products/mh40-wireless-silver-metal-navy-coated-canvas,S2: Searching a Product and adding to Cart,,,3.3.1 Error Identification,Complete list of errors is not provided,"When user submits review without any field filled, the error says ""Not all the fields have been filled out correctly!""

It does not display which form had what issue.",Implicit,,,,,,,TRUE,FALSE,,
142,FALSE,Done: Verified by PM,https://a11y-test.com/products/mh40-wireless-silver-metal-navy-coated-canvas,S2: Searching a Product and adding to Cart,,,"4.1.2 Name, Role, Value","Control does not provide role, state, and value information.","Write a review form
Screenreader user would not know how many stars they have added
On star control, screenreader announces just **Link, X of 5 stars**",Implicit,,,,,,,TRUE,FALSE,,
144,FALSE,Done: Verified by PM,cart popup,S3: View Cart,,,2.4.3 Focus Order,Logical focus order isn’t provided.,"After changing quantity, the focus goes back to the close button after a few seconds.
When the page visually updates the price, the focus is set back to the close button.",Implicit,,,,,,,TRUE,FALSE,,
145,FALSE,Not Implemented yet,,,,,,,Wrong spelling. 'aria-labeledby' is not a valid aria attribute,Implicit,,,,,,,FALSE,FALSE,,
146,TRUE,Done: Verified by PM,https://a11y-test.com/account/login,S5: Sign-up and Sign-in,,,3.3.1 Error Identification,Error notification is not announced by screen reader.,"When user enters wrong login credentials, screen reader announces nothing. Screen reader jumps to **skip to content**",Implicit,G83: Providing text descriptions to identify required fields that were not completed,,,,,,TRUE,FALSE,,
147,FALSE,Done: Verified by PM,https://a11y-test.com/pages/about-us,S6: Product Pages,,,1.3.1 Info and Relationships,Information is conveyed to screen readers as a data table when it isn’t.,table elements are used only to visually layout the **Please reach out to us via email.** and the email address.,Implicit,,,,,,,FALSE,FALSE,,
148,FALSE,Not Implemented yet,,,,,,,form missing a label,Implicit,,,,,,,FALSE,FALSE,,
149,FALSE,Not Implemented yet,,,,,,,Formatting expectation for birthdate is not explained. MM/DD/YYYY,Implicit,,,,,,,FALSE,FALSE,,
150,FALSE,Not Implemented yet,payment,,,,,,Alerts and messages popping up without aria-live,Implicit,,,,,,,FALSE,FALSE,,
151,FALSE,Done: Verified by PM,https://a11y-test.com/pages/checkout,,,,2.5.3 Label in Name,Visible label does not map to the programmatic name used for voice control,"Hidden programmatic form label is worded differently from visible label
**First Name** form has a visual label of **First Name (Optional)**. However, programmatic label is **Your name here**",Implicit,C27: Making the DOM order match the visual order,,,,,,FALSE,FALSE,,
152,FALSE,Not Implemented yet,,,,,,,missing form container,Implicit,,,,,,,FALSE,FALSE,,
153,FALSE,Not Implemented yet,,,,,,,Form has a label but it does not have 'for' attribute,Implicit,,,,,,,FALSE,FALSE,,
154,FALSE,Done: Verified by PM,https://a11y-test.com/account/register,,,,"4.1.2 Name, Role, Value","Inaccurate role, state, or value information supplied.",**Create account** button uses 'span' instead of '<input type=submit>' and contains wrong aria attribute 'aria-role=button',Implicit,,,,,,,FALSE,FALSE,,
155,FALSE,Done: Verified by PM,https://a11y-test.com/pages/about-us,S6: Product Pages,,,2.4.9 Link Purpose (Link Only),Link text is not unique.,**click here**,Implicit,,,,,,,FALSE,FALSE,,
156,TRUE,Done: Verified by PM,https://a11y-test.com/products/3-5mm-to-3-5mm-audio-cable-black,S6: Product Pages,,,"4.1.2 Name, Role, Value","Inaccurate role, state, or value information supplied.","Using aria-hidden=""true"" on a focusable image **This works very well with our gaming headphones.** inside a product description.",Implicit,ARIA5: Using WAI-ARIA state and property attributes to expose the state of a user interface component,,,,,,FALSE,FALSE,,
157,TRUE,Done: Verified by PM,https://a11y-test.com/products/3-5mm-to-3-5mm-audio-cable-black,S6: Product Pages,,,4.1.1 Parsing,Does not follow programming syntax.,**mg20-gaming-galactic-white** image has an aria-labelledby attribute references an ID that doesn't exist.,Implicit,ARIA10: Using aria-labelledby to provide a text alternative for non-text content,,,,,,FALSE,FALSE,,
158,FALSE,Done: Verified by PM,https://a11y-test.com/pages/contact,S7: Contact,,,1.3.1 Info and Relationships,,Untagged PDF **Our old products** is used to convey additional information but no HTML or any accessible alternative.,Implicit,,,,,,,FALSE,FALSE,,
159,FALSE,Done: Verified by PM,https://a11y-test.com/pages/about-us,S6: Product Pages,,,1.1.1 Non-text Content,Decorative image is not hidden from screen readers.,**About us** has a green background on top. It is a decorative image but not hidden to screen readers,Implicit,,,,,,,FALSE,FALSE,,
160,TRUE,Done: Verified by PM,checkout/information,,,,1.1.1 Non-text Content,,Dropdown collapsed caret icon is only announced as **image**,Explicit,"F65: Failure of Success Criterion 1.1.1 due to omitting the alt attribute or text alternative on img elements, area elements, and input elements of type ""image""",,,,,,FALSE,FALSE,,
161,TRUE,Done: Verified by PM,checkout/shipping,,,,1.3.1 Info and Relationships,Data table's programmatic association between data and headers is not accurate/complete.,**Contact** and **Ship to** acts as an row header but not programmed as such.,Explicit,F91: Failure of Success Criterion 1.3.1 for not correctly marking up table headers,,,,,,TRUE,FALSE,,
162,TRUE,Done: Verified by PM,https://a11y-test.com/products/mh40-wireless-silver-metal-navy-coated-canvas,,,,2.4.3 Focus Order,Focus moves to a non-interactive control.,Each list item receives focus though they are not interactive,Implicit,G59: Placing the interactive elements in an order that follows sequences and relationships within the content,,,,,,FALSE,FALSE,,
163,FALSE,Done: Verified by PM,https://a11y-test.com/products/3-5mm-to-3-5mm-audio-cable-black,,,,2.1.4 Character Key Shortcuts,No method provided to turn off keyboard shortcuts or customize keyboard shortcuts,"The page uses ""C"" key activates the link to the contact page. No documentation on how to turn it off.",,F99: Failure of Success Criterion 2.1.4 due to implementing character key shortcuts that cannot be turned off or remapped,,,,,,FALSE,FALSE,,
164,FALSE,Done: Verified by PM,All products,,,,2.1.1 Keyboard,Control does not follow traditional keyboard behavior.,Change quantity **+** and **-** icon buttons get activated via keydown event.,,,,,,,,TRUE,FALSE,,
165,FALSE,Done: Verified by PM,checkout,,,,1.4.1 Use of Color,Element relies on color alone to convey meaning.,Payment flow breadcrumb indicates the current page only by color,,G183: Using a contrast ratio of 3:1 with surrounding text and providing additional visual cues on hover for links or controls where color alone is used to identify them,,,,,,FALSE,FALSE,,
167,FALSE,Done: Verified by PM,https://a11y-test.com/pages/checkout,,,,1.1.1 Non-text Content,Image does not provide a text alternative,Image of caret without text alternative is used on breadcrumb,,,,,,,,FALSE,FALSE,,
168,FALSE,Done: Verified by PM,https://a11y-test.com/pages/checkout,,,,2.4.6 Headings and Labels,Control has no programmatic name/label.,**Last name** input field does not have a label,,,,,,,,FALSE,FALSE,,
169,FALSE,Done: Verified by PM,https://a11y-test.com,,,,1.4.3 Contrast (Minimum),Does not meet the contrast minimum of 4.5:1 for regular text.,**You have been subscribed to our newsletter.** green does not meet contrast of 4.5:1,,G18: Ensuring that a contrast ratio of at least 4.5:1 exists between text (and images of text) and background behind the text,,,,,,FALSE,FALSE,,
170,FALSE,Done: Verified by PM,https://a11y-test.com/account/login,,,,1.3.1 Info and Relationships,Content does not specify landmarks for major regions,Main part of the page is not using 'main' landmark,,ARIA11: Using ARIA landmarks to identify regions of a page,,,,,,,,,
171,FALSE,Done: Verified by PM,https://a11y-test.com/account/register,,,,2.1.1 Keyboard,Control does not receive keyboard focus.,**Create account** is not focusable,,"F55: Failure of Success Criteria 2.1.1, 2.4.7, and 3.2.1 due to using script to remove focus when focus is received",,,,,,,,,
172,FALSE,Done: Verified by PM,https://a11y-test.com/account/addresses,,,,"4.1.2 Name, Role, Value","Control does not provide role, state, and value information.",**Add address** button does not have a role ,,ARIA4: Using a WAI-ARIA role to expose the role of a user interface component,,,,,,,,,
173,FALSE,,,,,,,,,,,,,,,,,,,`

const issueListFromCSV = [];

// List issue
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
    ['2.5.3 Label in Name','F96: Failure due to the accessible name not containing the visible label text','**Send message** button is announced as "Create a ticket to the customer support", which does not match the visual label of "send message"'],
    ['2.4.3 Focus Order','G59: Placing the interactive elements in an order that follows sequences and relationships within the content','"4 items, **free shipping**, **Customer service**, Refer a friend**, and **Secure payment**. They are all not interactive but receive keyboard focus"']
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
    ['1.1.1 Non-text Content','F30: Failure of Success Criterion 1.1.1 and 1.2.1 due to using text alternatives that are not alternatives (e.g., filenames or placeholder text)','"First product image of **MW08 (Brown Ceramic / Stainless Steel Case)** has a bad alt text. It says **Someone jogging and wearing pair of silver earphones.** when it is just one brown earphone."'],
    ['1.2.2 Captions (Prerecorded)', 'F75: Failure of Success Criterion 1.2.2 by providing synchronized media without captions when the synchronized media presents more information than is presented on the page','The Product Video for **MW08 (Brown Ceramic / Stainless Steel Case)** does not have closed captions even though there is spoken narration'],
    ['1.2.3 Audio Description or Media Alternative (Prerecorded)', 'G151: Providing a link to a text transcript of a prepared statement or script if the script is followed', 'The video does not have accurate transcript. Linked youtube page has transcript functionality but no punctuation and hard to read it as a text equivalent.']
  ],
  '/products/mh40-wireless-ear-pads': [
    ['1.1.1 Non-text Content', 'F30: Failure of Success Criterion 1.1.1 and 1.2.1 due to using text alternatives that are not alternatives (e.g., filenames or placeholder text)', '"In footer, there are 11 logos to show the payment methods. All have same alt text **Cards** Each card should have its proper name as alt text, **Visa**, **master**, etc"']
  ],
  '/products/mh40-wireless-silver-metal-navy-coated-canvas': [
    ['1.3.1 Info and Relationships', 'F2: Failure of Success Criterion 1.3.1 due to using changes in text presentation to convey information without using the appropriate markup or text','"A list of features are using just bullet points ""•"" for each item but not using `ul` and `li` tag"'],
    ['2.4.3 Focus Order', 'G59: Placing the interactive elements in an order that follows sequences and relationships within the content', 'Each list item receives focus though they are not interactive']
  ],
  '/products/mw07-plus-charging-case-canvas-pouch-stainless-steel': [
    ['3.1.2 Language of Parts','H58: Using language attributes to identify changes in the human language','**MW07 Plus Charging Case & Canvas Pouch (Stainless Steel)** has Japanese text in the products details section but does not have lang attribute']
  ],
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
