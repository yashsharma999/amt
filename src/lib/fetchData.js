const getData = async () => {
  const resp = await fetch(`api/imageSearch`);
  const data = await resp.json();
  console.log(data);
};

await getData();
