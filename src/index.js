async function fetchPages({ page }) {
  let url = `https://rickandmortyapi.com/api/character/?page=${page}`;
  let req = await fetch(url);
  let json = await req.json();
  return json;
}

async function recursiveSequentialFetch({ page, data, maxCalls }) {
  let json = await fetchPages({ page });

  data.push(json);

  console.log("Sequential Fetch", page, data);

  if (page < maxCalls) {
    return recursiveSequentialFetch({ page: page + 1, data, maxCalls });
  } else {
    return { page, data, maxCalls };
  }
}

recursiveSequentialFetch({ page: 1, data: [], maxCalls: 3 })
  .then(data => {
    console.log("Sequential Fetch Done", data);
  })
  .catch(err => {
    console.log(err);
  });
