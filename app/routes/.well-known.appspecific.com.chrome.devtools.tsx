export async function loader() {
  return Response.json({
    version: 1,
    applications: [
      {
        name: "Boiler Gallery",
        url: "https://boilergallery.com"
      }
    ]
  }, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=86400"
    }
  });
}

