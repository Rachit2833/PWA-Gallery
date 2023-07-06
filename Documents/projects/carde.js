const handleOnMouseMove = e => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.target.style.setProperty("--mouse-x", `${x}px`);
    e.target.style.setProperty("--mouse-y", `${y}px`);
}
for (const card of document.querySelectorAll(".card")) {
    card.onmousemove = e => handleOnMouseMove(e);
}