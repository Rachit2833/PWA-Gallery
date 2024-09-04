"use client"
import React from "react";
import NextErrorComponent from "next/error";
import { useRouter } from "next/navigation";

const Error = ({ statusCode }) => {
  const router = useRouter();

  return (
    <div className="container"
      style={{
         gridColumn:"2 span",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <h1>{statusCode}</h1>
      <p>
        {statusCode === 404
          ? "Sorry, the page you're looking for doesn't exist."
          : "An unexpected error has occurred."}
      </p>
      <button
        onClick={() => router.push("/")}
        style={{
          padding: "10px 20px",
          background: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Go Back Home
      </button>
    </div>
  );
};

Error.getInitialProps = async ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
