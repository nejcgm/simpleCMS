const getCsrfToken = async () => {
    const res = await fetch("http://localhost:8080/csrf-token", { credentials: "include" });
    const data = await res.json();
    return data.csrfToken;
  };

  export default getCsrfToken;