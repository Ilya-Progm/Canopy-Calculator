async function get(url) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}

async function post(url, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

async function put(url, data, headers) {
  var requestHeaders;
  if (headers) {
    requestHeaders = headers;
  } else {
    requestHeader = {
      "Content-Type": "application/json",
    };
  }

  const response = await fetch(url, {
    method: "PUT",
    headers: requestHeader,
    body: JSON.stringify(data),
  });
  // return await response.json();
}

async function patch(url, data) {
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

async function remove(url, id) {
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  });
}
