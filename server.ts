#!/usr/bin/env -S deno run -A --unstable --no-check --no-config

import { serve } from "https://deno.land/std@0.184.0/http/server.ts";

const EMPTY_PATHS = ["", "/"];

const QUACKWARE_NO_MOD_REDIRECT = !!Deno.env.get("QUACKWARE_NO_MOD_REDIRECT");
const QUACKWARE_MOD_REDIRECT_FILENAME = "mod.ts";

const indexFile = await Deno.readTextFile(new URL("./public/index.html", import.meta.url));
const favicon = await Deno.readFile(new URL("./public/favicon.ico", import.meta.url));

serve((req) => {
  const url = new URL(req.url);

  const { pathname } = url;

  if (pathname === "/favicon.ico") {
    return new Response(favicon);
  }
  if (pathname === "/") {
    return new Response(indexFile, { headers: { "Content-Type": "text/html" } });
  }

  const [, repo, ...rest] = pathname.split("/");

  if (EMPTY_PATHS.includes(repo)) {
    console.log(`Returning error for no repo`);
    return new Response(null, { status: 404 });
  }

  let path = rest.join("/");

  if (EMPTY_PATHS.includes(path)) {
    if (QUACKWARE_NO_MOD_REDIRECT) {
      console.log(
        `Returning error for path due to QUACKWARE_NO_MOD_REDIRECT: '${path}'`,
      );
      return new Response(null, { status: 404 });
    } else {
      console.log(
        `Path '${path}' for repo '${repo}' force redirect to '${QUACKWARE_MOD_REDIRECT_FILENAME}'`,
      );
      path = QUACKWARE_MOD_REDIRECT_FILENAME;
    }
  }

  console.log(`Serving Path: '${path}'`);

  url.hostname = "raw.githubusercontent.com";
  url.pathname = `/quackware/${repo}/master/${path}`;
  url.port = "";

  console.log("Redirecting to:", url.href);

  return Response.redirect(url);
});
