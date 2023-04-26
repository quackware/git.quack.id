# @quackware/git.quack.id

Redirects to QuackWare GitHub

## Overview

This is a simple [Deno](https://deno.land) server that redirects requests from `https://git.quack.id/${PATH}` to `https://raw.githubusercontent.com/quackware/${PATH}` to allow for easy script and file hosting.

It performs a dumb redirect so any authentication is handled via GitHub. If you can't see it on GitHub, you won't see it through this.
