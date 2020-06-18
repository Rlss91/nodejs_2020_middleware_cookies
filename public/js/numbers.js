async function handleBtnClick() {
  try {
    let div = document.getElementById("div");
    let onum = document.getElementById("txt").value;
    let data = await fetch_post("/", {
      data: onum,
    });
    if (data.err) {
      div.innerHTML = "something went wrong";
    } else {
      div.innerHTML = `
          the number is ${onum}<br>
          the mul number is ${data.num}<br>
          the min number is ${data.arr[0]}<br>
          the max number is ${data.arr[data.arr.length - 1]}<br>
        `;
    }
    console.log(data);
  } catch (e) {
    console.log(e);
  }
}
