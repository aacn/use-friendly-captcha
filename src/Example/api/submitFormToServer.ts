type FormValidationProps = {
  solution: string;
  siteKey: string;
};

type FormDataProps<T> = {
  captcha: FormValidationProps;
  content: T;
};

type ExampleForm = {
  ex_1: string | null;
  ex_2: string | null;
};

// @ts-ignore
async function submitFormToServer(
  data: FormDataProps<ExampleForm>
): Promise<boolean> {
  // Your handler here
}

export default submitFormToServer;
