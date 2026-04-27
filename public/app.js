const API = "/blogs";

async function loadBlogs() {
    const res = await fetch(API);
    const data = await res.json();

    const list = document.getElementById("list");
    list.innerHTML = "";

    data.forEach((b) => {
        const div = document.createElement("div");
        div.innerHTML = `
      <hr/>
      <b>${b.title}</b> <br/>
      ${b.body} <br/>
      <i>${b.author}</i> <br/>
      <small>${b._id}</small>
    `;
        list.appendChild(div);
    });
}

document.getElementById("createBtn").addEventListener("click", async () => {
    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;
    const author = document.getElementById("author").value;

    const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, author })
    });

    if (!res.ok) {
        const err = await res.json();
        alert(err.message);
        return;
    }

    document.getElementById("title").value = "";
    document.getElementById("body").value = "";
    document.getElementById("author").value = "";

    loadBlogs();
});

loadBlogs();
