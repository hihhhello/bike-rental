export async function fetchData({
  url,
  method = "GET",
  body = null,
  headers = {},
}) {
  try {
    if (body) {
      body = JSON.stringify(body);
      headers["Content-Type"] = "application/json";
    }
    const response = await fetch(url, {
      method,
      body,
      headers,
    });
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something gone wrong!");
      }
      return data;
    }
    return response.status;
  } catch (e) {
    throw e;
  }
}
