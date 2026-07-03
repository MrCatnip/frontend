const form = document.getElementById("user-form");
const buttonSubmit = document.getElementById("submit-btn");
const buttonClear = document.getElementById("clear");
const spanSuccess = document.getElementById("success");
const spanError = document.getElementById("error");
const inputs = form.querySelectorAll("input");

const EMPTY_ERROR = "Write something buddy!";
const WTF_ERROR = "What are you doing buddy?";
const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];
const MAX_SIZE_MB = 2;

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
  if (n < min || n > max) return `Must be between ${min} and ${max}.`;
  return "";
};

const validateFile = (fileInput) => {
  const file = fileInput.files[0];
  if (!file) return "";
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) return "Unsupported file type!";
  // Wouldn't hurt to also add the file header vs mime type comparison Ig
  if (file.size > MAX_SIZE_MB * 1024 * 1024) return `File is too large (max ${MAX_SIZE_MB} MB).`;
  return "";
};

const VALIDATORS_MAP = {
  username: (input) => validateText(input, 20, /^[A-Za-z0-9_]+$/),
  first_name: (input) => validateText(input),
  last_name: (input) => validateText(input),
  age: (input) => validateNumber(input),
  avatar: (input) => validateFile(input),
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

buttonClear.addEventListener("click", () => {
  const avatar = document.getElementById("avatar");
  avatar.value = "";
  getHintSpan("avatar").style.display = "inline";
  getErrorSpan("avatar").style.display = "none";
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let isValid = true;

  Object.keys(VALIDATORS_MAP).forEach((key) => {
    const input = document.getElementById(key);
    const hintSpan = document.getElementById(`hint-${key}`);
    const errorSpan = document.getElementById(`error-${key}`);
    const message =
      input.type === "file" ? VALIDATORS_MAP[key](input) : VALIDATORS_MAP[key](input.value);
    errorSpan.textContent = message;
    if (message) {
      hintSpan.style.display = "none";
      errorSpan.style.display = "inline";
      isValid = false;
    }
  });

  if (!isValid) return;

  buttonSubmit.disabled = true;
  buttonClear.disabled = true;
  inputs.forEach((input) => (input.disabled = true));
  buttonSubmit.textContent = "Loading...";
  spanSuccess.style.display = "none";
  spanError.style.display = "none";

  const content = {
    // just leave as is, too ugly if we extract from VALIDATORS
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
    buttonSubmit.disabled = false;
    buttonClear.disabled = false;
    inputs.forEach((input) => (input.disabled = false));
    buttonSubmit.textContent = "Register";
  }
});
