# UseFriendly Captcha 
## Requirements
Add a 'friendly-captcha' API key to your local .env file like this:
`REACT_APP_AACN_FC_API_KEY=Your_Key`<br/>
This key is required for the friendly-captcha validation server, to match the server request to
the correct fc account. This key is required for your front and  backend.

## Usage
The library is used in both frontend and backend.

### Frontend
Include the `useCaptchaHook()` in your selected file. From there you can then query the widget
and state from the hook, for you to manage.

The hook requires the following properties:<br/>
```
siteKey: string;
endpoint?: string;
language?: keyof typeof localizations | Localization;
startMode?: "auto" | "focus" | "none";
```

### Backend
For the backend this library provides a function that uses the FriendlyCaptcha verification
API to check if the submitted puzzle solution is valid or not. It returns a boolean for you
to handle the actual request further.

The function requires the following properties:
```
endpoint?: string;
solution: string,
secret: string,
sitekey?: string;
```
