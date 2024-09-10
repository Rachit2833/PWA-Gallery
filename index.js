if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js", { scope: "/" })
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope,registration);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}
async function handlePaste(event) {
  const clipboardItems = await navigator.clipboard.read();
  for (const item of clipboardItems) {
    if (item.types.includes("image/png")) {
      const blob = await item.getType("image/png");
      const imageUrl = URL.createObjectURL(blob);
      console.log("Pasted image URL:", imageUrl);
      // You can now display or upload the image
    }
  }
}

document.addEventListener("paste", handlePaste);