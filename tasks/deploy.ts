#!/usr/bin/env -S deno run -A --unstable --no-check --no-config

import { $ } from "https://deno.land/x/dax@0.31.0/mod.ts";
import { DenoProject } from "https://stack.curtis.land/core/mod.ts";

async function deploy() {
  const project = new DenoProject({ name: "git-quack-id" });
  $.logStep("Deploying git-quack-id");
  const deployTask = project.taskManager.addDeployTask({
    projectName: "git-quack-id",
    cwd: new URL("../", import.meta.url).pathname,
    entryPointPath: new URL("../server.ts", import.meta.url).pathname,
  });

  for await (const res of project.executeTask(deployTask)) {
    $.logStep(res.name, res.success ? "Success" : "Fail");
  }
}

deploy().catch(console.error);
