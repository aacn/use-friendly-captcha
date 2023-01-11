# Use Friendly Captcha hook
## Usage
The library has functions for both frontend and backend. Both of them work independent of each other.

### Frontend
Include the `useCaptchaHook()` in your selected file. From there you can then query the widget
and state from the hook, for you to manage and use in your form.

<b>The hook expects the following properties:</b><br/>
```
siteKey: string;
endpoint?: FC_PUZZLE_EP; enum for the currently available endpoints (EU & global)
language?: keyof typeof localizations | Localization;
startMode?: "auto" | "focus" | "none";
showAttribution: boolean
```
<br/>
<b>The hook provides the following parameters:</b><br/>
- `CaptchaWidget` returns the HTML authentification widget.
- `captchaStatus.solution` is used to determine if the puzzle was already solved (`string`) or not (`null`)
- `captchaStatus.error` is used to determine if an error occured while solving (`string`) or not (`null`)

<br/><b>CaptchaWidget custom props</b><br/>
When the `CaptchaWidget` gets rendered, you can add additional properties:<br/><br/>
`props: HTMLAttributes` This includes all possible html attributes. Therefor this is the entry point to add the `className` attribute,
to add custom styling to the outer captcha container. Here can you either directly add TailwindCSS classes or define a custom class for
future styling in the .css file of the project.
<br/><br/>
`customWidgetStyle` allows up to three attributes for specific stylings that are directly applied to the components:
- `icon` The icon of the widget
- `button` The submit button of the widget
- `text` All text elements that appear inside the widget
<br/>These attributes are all optional and if used, they expect a css object like the following example:
```js
CustomWidgetStyle = { icon: {color: "green", background: "yellow"}, text: {color: "blue"} }
```

### Backend
backend wise this library provides a function that uses the FriendlyCaptcha verification
API to check if the submitted puzzle solution is valid or not. It returns a boolean for further
handling in your own code.

<b>The function expects the following properties:</b><br/>
```
endpoint?: FC_VERIFICATION_EP; enum for the currently available endpoints (EU & global)
solution: string;
secret: string;
sitekey?: string;
httpPostFetcher: (see further down)
```

### httpPostFetcher
The backend expects a fetcher function as parameter. This function is provided by the user
and is used to send a http post request to the fc verification server. It should match the following design:
```
function fetcherExample(
    endpoint: string,
    requestBody: { solution: string; secret: string; siteKey: string },
    headers: { 'Content-Type': 'application/json'; 'Accept': 'application/json'; }
) => Promise<{ success: boolean; errors: any; } | null>
```
