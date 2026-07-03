const form = document.getElementById("user-form");
const button = document.getElementById("submit-btn");
const spanSuccess = document.getElementById("success");
const spanError = document.getElementById("error");
const inputs = form.querySelectorAll("input");

const EMPTY_ERROR = "Write something buddy!";
const WTF_ERROR = "What are you doing buddy?";

const getHintSpan = (id) => document.getElementById(`hint-${id}`);
const getErrorSpan = (id) => document.getElementById(`error-${id}`);

const validateText = (text, maxLength = 255, pattern = null) => {
  const textTrimmed = text.trim();
  if (!textTrimmed) return EMPTY_ERROR;
  if (textTrimmed.length > maxLength) return "It can't be that large";
  if (pattern && !pattern.test(textTrimmed)) return WTF_ERROR;
  return "";
};

const validateNumber = (numberText, min = 0, max = 150, pattern = /^\d+$/) => {
  const number = numberText.trim();
  if (number === "") return EMPTY_ERROR;
  if (!pattern.test(number)) return WTF_ERROR;
  const n = Number(number);
  if (n < min || n > max) {
    return `Age must be between ${min} and ${max}.`;
  }
  return "";
};

const VALIDATORS_MAP = {
  username: (input) => validateText(input, 20, /^[A-Za-z0-9_]+$/),
  first_name: (input) => validateText(input),
  last_name: (input) => validateText(input),
  age: (input) => validateNumber(input),
  avatar: (input) => console.log(input),
};

inputs.forEach((input) =>
  input.addEventListener("input", () => {
    const id = input.id;
    const hintSpan = getHintSpan(id);
    const errorSpan = getErrorSpan(id);
    hintSpan.style.display = "inline";
    errorSpan.style.display = "none";
  }),
);

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let isValid = true;

  Object.keys(VALIDATORS_MAP).forEach((key) => {
    const input = document.getElementById(key);
    const hintSpan = document.getElementById(`hint-${key}`);
    const errorSpan = document.getElementById(`error-${key}`);
    const message = VALIDATORS_MAP[key](input.value);

    errorSpan.textContent = message;
    if (message) {
      hintSpan.style.display = "hidden";
      errorSpan.style.display = "inline";
      isValid = false;
    }
  });

  if (!isValid) return;

  button.disabled = true;
  inputs.forEach((input) => (input.disabled = true));
  button.textContent = "Loading...";
  spanSuccess.style.display = "none";
  spanError.style.display = "none";

  const content = {
    username: form.elements.username.value.trim(),
    first_name: form.elements.first_name.value.trim(),
    last_name: form.elements.last_name.value.trim(),
    age: form.elements.age.value.trim(),
  };
  try {
    const response = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(content),
    });

    const data = await response.json();

    if (data.success) {
      form.reset();
      spanSuccess.style.display = "inline";
    } else if (data.errors) {
      spanError.textContent = Object.values(data.errors).join("\n");
      spanError.style.display = "inline";
    } else {
      spanError.textContent = data.message ?? "Something went dodoo!";
      spanError.style.display = "inline";
    }
  } catch (err) {
    console.error(err);
    spanError.textContent = "Start the server mate!";
    spanError.style.display = "inline";
  } finally {
    button.disabled = false;
    inputs.forEach((input) => (input.disabled = false));
    button.textContent = "Register";
  }
});
