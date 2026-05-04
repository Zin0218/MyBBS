export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 仮データ（まずはこれで動作確認）
    if (!env.posts) {
      env.posts = [];
    }

    // GET / → 投稿一覧
    if (url.pathname === "/" && request.method === "GET") {
      return new Response(JSON.stringify(env.posts), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }

    // POST /post → 投稿追加
    if (url.pathname === "/post" && request.method === "POST") {
      const body = await request.json();

      env.posts.push({
        text: body.text,
        time: Date.now()
      });

      return new Response("ok", {
        headers: { "Access-Control-Allow-Origin": "*" }
      });
    }

    return new Response("404 not found", { status: 404 });
  }
};
