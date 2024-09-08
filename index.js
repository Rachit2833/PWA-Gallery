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
