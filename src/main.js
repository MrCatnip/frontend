const form = document.getElementById("user-form");
const button = document.getElementById("submit-btn");
const spanSuccess = document.getElementById("success");
const spanError = document.getElementById("error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  button.disabled = true;
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
    button.textContent = "Register";
  }
});
