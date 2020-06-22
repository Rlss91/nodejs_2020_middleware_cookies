async function handleBtnClick() {
  try {
    let div = document.getElementById("div");
    let data = await fetch_post("/auth/login", {
      us: document.getElementById("us").value,
      ps: document.getElementById("ps").value,
    });
    if (data.err) {
      div.innerHTML = "something went wrong";
    } else {
      window.location.href = "http://localhost:3000/numbers";
    }
    console.log(data);
  } catch (e) {
    console.log(e);
  }
}

async function handleBtnClickH() {
  try {
    await fetch_post("http://localhost:3000/altlogin");
  } catch (e) {
    console.log(e);
  }
}
