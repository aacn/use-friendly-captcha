## Changelog
### v1.0.1
- Fix naming of typeScript module declaration

### v1.0.2
- Fix a bug, where the widget instantly destroyed itself, caused by reactStrictMode

### v1.1.0
- Add a feature to be able to add custom css to specific widget parts

### v1.1.1
- Add a debug mode

### v1.1.2
- Update react & react-dom peer dependencies
- 
### v1.1.3
- Update more peer dependencies

### v1.2.0
- Add support for next 13

### v1.2.1
- Update range of possible css attributes to style the captcha widget

### v1.2.2
- Fix nextjs hydration error, that occurs when rendering the css for the captcha widget

### v1.2.3
- Adjust nextjs hydration for style tags

### v1.3.0
- Add function that allows to reset the current widget. This is useful if a form is submitted, 
but the server returns an error, so the user is forced to adjust their information. As this often
doesn't reset the page, the widget isn't automatically resetted. When submitting the form again, this would cause an error.
